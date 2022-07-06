---
title: Creating REST API for Long Running Jobs
tags: ["PROGRAMMING", "REST"]
author: Amita Shukla
---

## The Case of Long Running Jobs
Consider the case below where we have an API for a 'orders'. We want to expose endpoints for a user to create a new order, list all orders, or get order details for a particular order.

So we create a GET endpoint `/orders` to list all orders:
```
GET /orders
```
The server responds:
```
200 OK
{"orders" : [
    {"id": 1, "products": ["a", "b", "c"]},
    {"id": 2, "products": ["b", "f", "x"]}
]}
```
And to get order details for a particular order:
```
GET /orders/2
```
with the server responding:
```
200 OK
{"id" : 2, "products" : ["b", "f", "x"]}
```
For creating an order, we create a POST endpoint which accepts the list of products for that order:
```
POST /orders/
{"products" : ["y", "z"]}
```
The server gets back to you with:
```
201 CREATED
{"id" : 3, "link": "/orders/3"}
```
To check the result of this order:
```
GET /orders/3
```
```
200 OK
{"id" : 3, "products" : ["y", "z"]}
```
This is a simple workflow for resources which are trivial to create. But sometimes a lot of work can go into creating a resource, e.g. in our case we would need to access database,  call other services such as a products service, users service, a metadata service and so on. In general, even if it's not about creating a resource per se, a POST request caters to a variety of functions.

### More such Use Cases
- Perform some analytics and generate a report by calculating a number of data points. 
- Scan a pdf, process its contents and save in database.
- Upload multiple files onto server, but before saving combine, resize, format those files.

These all are long running operations that take a lot more time for an HTTP request. Most applications have a standard timeout, and such jobs can easily surpass thst time. Also, suppose a client application/ frontend calls this request, then it would need to wait for this call to complete. For such long running operations, it is always a better option that we trigger a background operation that does all the heavy lifting and the current request returns a handler which the user can later use to cancel this ongoing request, or come back later to view results.

Let's see how this API would look like:

Get a list of orders:
```
GET /orders/
```
Response:
```
200 OK
{"orders" : [
    { "id" : 1, "products" : ["a", "b", "c"] }, 
    { "id" : 2, "products" : ["b", "f", "x"] }
]}
```
Create a new order, send a POST request with the body containing order details.
```
POST /orders/
{"products" : ["y", "z"]}
```
In response, the creation is accepted (not completed), and the process starts in the background.

An automatically generated "id" is assigned to the order.
```
202 ACCEPTED
{
    "id" : 3
    "status" : "/orders/3/status"
}
```
Now this resource creation is a long running process, so you keep polling for the status:
```
GET /orders/3/status
200 OK
```
The response to this call contains the status of the job, such as "started", "running", "cancelled", "completed" or "failed"...
```
{
    "id" : 3,
    "status" : "running"
    "cancel" : "/orders/3/cancel"        
}
```
If the status is "running", this job can be cancelled:
```
DELETE /orders/3/cancel
```
The delete call doesn't delete the resource here, but marks it as "cancelled". It also responds with 204 response code, meaning that the call has succeeded but the no-body response is intentional.
```
204 NO CONTENT 
```
You can check the status of this cancelled job using the `/status` endpoint:
```
GET /orders/3/status
```
```
200 OK
{
    "id" : 3,
    "status" : "cancelled"
}
```
Now, if you really need the results, you can decide to keep polling the status for this job, until it's "complete":
```
GET /orders/3/status
```
```
200 OK
{
    "id" : 1,
    "status" : "complete"
    "result" : "/orders/1/result"
}
```
If the status is "complete", get the result:
```
GET /orders/3/result
```
```
200 OK
{
    "id" : 3,
    "products" : ["y", "z"]
}
```