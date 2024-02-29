---
title: Design Patterns In Spring Framework
tags: ["SOFTWARE ARCHITECTURE", "REST"]
author: Amita Shukla
---


Understanding design patterns is best achieved through practical application. However, we often miss how they're built into the frameworks or libraries we use. In Spring Framework, different design patterns are used to make applications flexible and easy to maintain. Sometimes we use these patterns unknowingly. Let's explore them to understand how they work in real-world applications:

### Dependency Injection (DI) / Inversion of Control (IoC)

Central to the Spring Framework, DI/IoC allows objects to be constructed and wired together by an external entity (the Spring container), rather than within the objects themselves. IoC is not a design pattern per se, but a design principle, which the Spring framework implements using Dependency Injection. It's so core to the spring's functionality that I thought its worth starting this list with it before proceeding to 'official' patterns.

#### Inversion of Control
Ioc refers to transferring the control of objects and their dependencies from the main program to a container framework.

#### Dependency Injection
Dependency Injection is a technique that allows objects to be separated from objects they depend upon. e.g. an object `A` requires a method of object `B` to complete its functionality. In dependency injection, instead of creating an instance of class `B` in class `A` using the `new` operator, the object of class `B` should be injected in class `A` using either:
- Constructor injection
- Setter injection
- Interface injection

Let's see DI in action. Tradionally, we have a class defined like this:
```java
public class MyApplication {
    private final MessageService messageService;

    public MyApplication(MessageService messageService) {
        this.messageService = new EmailService();
    }

    public void processMessage() {
        System.out.println(messageService.getMessage());
    }
}
```
In Spring, we can do the same like:
```java
@Component
public class MyApplication {
    private final MessageService messageService; 

    @Autowired
    public MyApplication(MessageService messageService) {
        this.messageService = messageService; // an object of type EmailService is automatically injected by Spring.
    }

    public void processMessage() {
        System.out.println(messageService.getMessage());
    }
}

public interface MessageService {
    String getMessage();
}

@Component
public class EmailService implements MessageService {
    public String getMessage() {
        return "Email message";
    }
}
```

Now, here we do not need to instantiate `EmailService` inside `MyApplication`, spring handles it. How? As `EmailService` is registered as a component (which makes it a bean), it is automatically injected by Spring. 

Note: If there are more than one type of `MessageService` defined, then we can either use a `@Qualifier` annotation, or define a Factory to fix the amobiguity.

### Factory Pattern

#### Bean
In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans. A bean is an object that is instantiated, assembled, and managed by a Spring IoC container. Otherwise, a bean is simply one of many objects in your application. Beans, and the dependencies among them, are reflected in the configuration metadata used by a container.

Spring employs `BeanFactory`, which contains factory methods to create objects, often used in conjunction with DI/IoC to configure and instantiate objects based on their types or other factors.

Depending on the bean definition, the factory returns either an independent instance of a contained object (the Prototype design pattern), or a single shared instance (a superior alternative to the Singleton design pattern, in which the instance is a singleton in the scope of the factory). Which type of instance will be returned depends on the bean factory configuration.

```java
public interface BeanFactory {
    public static <T> T getBean();
    // more methods
}

```

### Singleton Pattern

Spring beans are often configured as singletons by default, ensuring that only one instance of a bean exists per container. This promotes efficient resource usage and consistent state management.

The latest version of the Spring framework defines six types of scopes - singleton, prototype, request, session, application, and websocket. The scope of bean defines its lifecycle and visibility. 

```java
@Configuration // A class marked @Configuration means it is the source of bean definitions.
public class MyBeanConfig {

    @Bean
    public SingletonBean MyBean() {
        return new MyBean(); // the object returned here is singleton by default
    }

}
```

However, it is a little different from the standard singleton pattern. As mentioned in Spring Docs:
> Spring’s concept of a singleton bean differs from the singleton pattern as defined in the Gang of Four (GoF) patterns book. The GoF singleton hard-codes the scope of an object such that one and only one instance of a particular class is created per ClassLoader. The scope of the Spring singleton is best described as being per-container and per-bean. This means that, if you define one bean for a particular class in a single Spring container, the Spring container creates one and only one instance of the class defined by that bean definition.

### The Prototype Scope for Beans

#### The Prototype Pattern
The prototype pattern lets you copy exising objects without making your code dependent on their classes. A prototype usually contains a method `clone()`, that contains the cloning logic in the same class.

In Spring, when a bean is scoped as a prototype, a new instance of the bean is created every time it is requested from the container. This aligns with the Prototype pattern, where new instances are created based on an existing instance.

The below code defines a bean with `prototype` scope:
```java
@Bean
@Scope("prototype")
public Person personPrototype() {
    return new Person();
}
```

### Proxy Pattern

Spring AOP (Aspect-Oriented Programming) utilizes dynamic proxies to apply cross-cutting concerns, such as logging, security, and transaction management, to target objects without modifying their code directly.

### Template Method Pattern

Spring's template classes (e.g., JdbcTemplate, RestTemplate) encapsulate common operations, providing a template method that can be customized by subclasses to execute specific logic.

### Decorator Pattern

Spring's bean post-processors and aspect-oriented programming allow for the decoration of beans with additional functionality, such as adding caching, validation, or retry logic.

### Observer Pattern

Spring's event handling mechanism allows beans to publish events and other beans to subscribe to these events, enabling loosely coupled communication between components.

### Strategy Pattern

Spring's various strategies, such as transaction management strategies, enable developers to plug in different implementations at runtime based on configuration or conditions.

### Composite Pattern

Spring's hierarchical application context and nested beans support a composite structure, allowing for the construction of complex object graphs.

### Builder Pattern

Spring's Fluent API for bean configuration, along with its support for programmatic bean registration, follows the builder pattern, providing a concise and expressive way to configure beans.

These are some of the main design patterns used within the Spring Framework, contributing to its flexibility, extensibility, and ease of use in developing enterprise applications.

### Read more
- https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring
- https://www.baeldung.com/spring-annotations-resource-inject-autowire
- https://www.baeldung.com/spring-component-repository-service
- https://www.baeldung.com/spring-boot-singleton-vs-beans