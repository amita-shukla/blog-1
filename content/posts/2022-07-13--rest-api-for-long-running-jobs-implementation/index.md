---
title: Implementing REST API for Long Running Jobs
tags: ["SOFTWARE ARCHITECTURE", "REST"]
author: Amita Shukla
---

In previous post <a href="">Rest API For Long Running Job</a> we discussed the design of an API exposed to handle long runnining jobs. Such an API decouples the long running process with the actual API, and instead of indefinitely waiting for a response we expose an `/status` to monitor the progress of the running task.

In this post we will implement such an API. 

## Simple API Structure
Let's first start with implementing a simple API, when the long running job is not in the picture. I will be using Java with Spring for this purpose. If you wish to directly jump to the implementation of the long runnning API, you can click <a href="">here</a>.

### Define Order Entity
Let's start by defining an entity `Order`. We name the table name as `customer_order` as Order is not a valid name for a table (We are using the H2 database here for simplicity). The customer_order table has 5 columns, `id` being the primary key, `description`, `price`, `quantity` and `amount`.

```java
@Entity
@Table(name = "customer_order") // 'order' is not a valid table name
@Getter @Setter @NoArgsConstructor
public class Order {
    private @Id Long id;
    private String description;

    private Integer price;
    private Integer quantity;
    private Integer amount;

    public Order(Long id, String description, Integer price, Integer quantity, Integer amount) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.amount = amount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Order)) return false;
        Order order = (Order) o;
        return Objects.equals(id, order.id) && Objects.equals(description, order.description) && Objects.equals(price, order.price) && Objects.equals(quantity, order.quantity) && Objects.equals(amount, order.amount);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, description, price, quantity, amount);
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", amount=" + amount +
                '}';
    }
}
```

### Define Order Repository
Let's define an `OrderRepository` for introducing database operations on this entity:
```java
public interface OrderRepository extends JpaRepository<Order, Long> {
}
```

### Define REST Endpoints
We take the order description, price and quantity as input, and generate the value of the `id` column each time a new order is created. **Assume that the calculation of the `amount` is a time taking operation**. As long as the amount has not been populated, the order creation is not considered complete.

Let's define the endpoints `GET /orders`, `POST /orders` and `GET /orders/{id}` on  `OrderController.java`:
```java
@RestController
@Slf4j
public class OrderController {
    @Autowired
    OrderRepository repository;

    @Autowired
    OrderCreationService orderCreationService;

    @GetMapping("/orders")
    public ResponseEntity<Order> all(){
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> newOrder(@RequestBody Order order){
        order.setId(orderCreationService.generateOrderId());
        repository.save(order);
        // LONG RUNNING TASK!!!
        orderCreationService.createOrder(order);
        return ResponseEntity.created().body(order);
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        Order order = repository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, new OrderNotFoundException(id).getMessage()));

        return ResponseEntity.ok(order);
    }
}
```

### Define Long Running Operation
We have a service `OrderCreationService.java` that deals with the long running operation of order creation. Here, we calculate the amount and to deliberately make this slow, we make the method sleep for 10 seconds in between:

```java
@Component
@Slf4j
public class OrderCreationService {
    @Autowired
    OrderRepository orderRepository;

    public void createOrder(Order order) {
        Long id = order.getId();
        try {
            // sleep this thread for 10 seconds now
            Thread.sleep(10000);
            if (order.getPrice() < 0) throw new ValidationException("Price must not be negative");
            if (order.getQuantity() < 0) throw new ValidationException("Quantity can not be negative");
            order.setAmount(order.getPrice() * order.getQuantity());
        } catch (Exception e) {
            log.error("Job failed");
            throw new RuntimeException(e);
        } finally {
            orderRepository.save(order);
        }
    }

    public Long generateOrderId(){
        return orderRepository.count()+ 1L;
    }
}
```

> Before you point this out, let me say I understand that we can make the `id` column autogenerated, but I have kept a seperate method for this as I wish to generate the id before saving it to the repository, to keep in line with the implementaion I will be doing later. Also, yes, I am not proud of the `orderRepository.count()+1L` there either.

### The Problem

As discussed in detail in <a href="">my previous post</a>, when using this application on production, usually a system wide or project timeout is placed. This will cause our Order creation process to fail, as it's going to take atleast 10 seconds. Even if the timeouts are not in place, it's a bad user experience.

## Implementing API for such Long Running Tasks
With initial setup out of the way, let's move on to modify this API to support such long running operations. We introduce another variable/column `Status`, using which we will track the status of the order creation:
```java
public enum Status {
    IN_PROGRESS,
    COMPLETED,
    CANCELLED,
    FAILED
}
```
Let's add this status to our table:
```java
@Entity
@Table(name = "customer_order")
@Getter @Setter @NoArgsConstructor
public class Order {
    private @Id Long id;
    private String description;

    private Integer price;
    private Integer quantity;
    private Integer amount;
    private Status status;

    public Order(Long id, String description, Integer price, Integer quantity, Integer amount, Status status) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.amount = amount;
        this.status = status;
    }

    // EQUALS, HASHCODE AND TOSTRING modified to include status column
    // ...
}

```
### Response Code
Now when the POST `/orders` is called, instead of sending the `201 CREATED`  response, I now send back `202 ACCEPTED`. This indicates that we have accepted the request to create an order, however we may or may not have actually created the resource.

### Response Data
Alongwith the above response code, we generate and send back the `id`. This `id` is used as the token to keep track of this particular request. 

### Set Status of the Creation Process
We then change the status to `IN_PROGRESS`.

We save this not-yet-fully-created order object to the repostory, so the object against the generated id can be tracked and updated further as the creation proceeds. 

### Making the Long Running Job Asynchronous
Now once we set the job in progress, we move it to run in the background in the `OrderCreationService`:
```java
@Async
public void createOrder(Order order) {
    Long id = order.getId();
    try {
        Thread.sleep(10000);
        if (order.getPrice() < 0) throw new ValidationException("Price must not be negative");
        if (order.getQuantity() < 0) throw new ValidationException("Quantity can not be negative");
        order.setAmount(order.getPrice() * order.getQuantity());
        order.setStatus(Status.COMPLETED);
        log.info("Async job completed");
    } catch (Exception e) {
        order.setStatus(Status.FAILED);
        log.error("Job failed");
        throw new RuntimeException(e);
    } finally {
        orderRepository.save(order);
    }
}
```
### Trigger the Asynchornous Job and Return ID
Now in order for this endpoint to return immediately, we need to call `createOrder` asynchronously. Let's see how our endpoint looks now:
```java
@PostMapping("/orders")
public ResponseEntity<OrderCreationResponse> newOrder(@RequestBody Order order){
    order.setStatus(Status.IN_PROGRESS);
    order.setId(orderCreationService.generateOrderId());
    repository.save(order);

    log.info("Triggering creation async job...");
    orderCreationService.createOrder(order);
    return ResponseEntity.accepted().body(new OrderCreationResponse(order.getId()));
}
```
Where the `OrderCreationResponse` is:
```java
@Getter @Setter @AllArgsConstructor
public class OrderCreationResponse {
    private Long id;
}
```

### Getting Job Status
Once we have received an `id` back from the POST `/orders` request, we now expose an endpoint that can be polled to return the status of the background job:
```java
@GetMapping("/orders/{id}/status")
public ResponseEntity<OrderStatus> getOrderStatus(@PathVariable Long id){
    Order order = repository.findById(id).orElseThrow(() -> new OrderNotFoundException(id));
    Status status = order.getStatus();
    return ResponseEntity.ok(new OrderStatus(id, status));
}
```
Here the `OrderStatus` is the object returning the id and the corresponsing status:
```java
@Getter @Setter @AllArgsConstructor
public class OrderStatus {
    private Long id;
    private Status status;
}
```
### Getting Job Result
After we receive `status: COMPLETE` from the `/orders/{id}/status, when we can finally get the object details by exposing a new `/orders/{id}/result` endpoint:
```java
@GetMapping("/orders/{id}/result")
public ResponseEntity<Order> getOrderResult(@PathVariable Long id){
    Order order = repository.findById(id).orElseThrow(() -> new OrderNotFoundException(id));
    if(!order.getStatus().equals(Status.COMPLETED)){
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).build();
    }
    return ResponseEntity.ok(order);
}
```
Observe that the response body is of the type `Order` here. We no more need the `GET /orders/{id}` endpoint, as this one will only display the order details after the job has completed.