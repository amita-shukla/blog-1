---
title: Rate Limter v/s Circuit Breaker in Microservices
tags: ["SOFTWARE ARCHITECTURE"]
author: Amita Shukla
---

A Rate Limiter is a pattern put in place in order for a service to protect itself from too many calls. A resource intensive service is always at a danger of overloading if triggered multiple times, or it may endup calling other resource intensive services, bringing the whole system down. If such a service is exposed directly to clients, it is susceptible to DDOS attacks as well. Another use case is that we may want to limit the user to calls a request, depending on the Pricing Plan they are subscribed to. e.g. a user can be restricted to call a service only 'n' times a day depending upon what plan they've chosen. In such cases, we implement a Rate Limter.

A Circuit Breaker is a pattern put in place in order for a service to protect itself from calling too many unresponsive services. If a service is being unresponsive, it makes sense to not overload it further my retrying it. If a service I am attempting to call repeatedly fails, the circuit 'breaks' and I return a default response for sometime. After a wait duration only I attempt to call the failing service. 

**Note that, a rate limiter is applied on the serivce being called (or the *callee*) by other services and circuit breaker is implemented on the service calling other services (or the *caller*).**
