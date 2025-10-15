---
title: CORS
tags: ["OBSERVABILITY"]
author: Amita Shukla
---
Prometheus is a popular open-source monitoring and alerting toolkit designed to collect and store metrics as time-series data. It’s mainly used cloud native, containerised and microservices environments — where services are dynamic (e.g., running in Kubernetes).

## What Prometheus does?
At its core, it:
- collects metrics from applications, services, containers etc.
- stores them in a time-series database (so that every data point has a timestamp associated with it).
- lets you query these metrics and visualize those metrics.
- sends alerts according to rules defined

## Why Prometheus came into picture
Prometheus was developed by engineers at SoundCloud, they wanted to support monitoring of their growing microservices environments, and were facing serious limitations with their existing tools such as StatsD and Graphite. Here is a snippet from the [SoundCloud dev blog introducing Prometheus](https://developers.soundcloud.com/blog/prometheus-monitoring-at-soundcloud) and explaining their rationale behind it:

> In [previous](https://developers.soundcloud.com/blog/building-products-at-soundcloud-part-1-dealing-with-the-monolith) [blog](https://developers.soundcloud.com/blog/building-products-at-soundcloud-part-2-breaking-the-monolith) [posts](https://developers.soundcloud.com/blog/building-products-at-soundcloud-part-3-microservices-in-scala-and-finagle), we discussed how SoundCloud has been moving towards a microservice architecture. Soon we had hundreds of services, with many thousand instances running and changing at the same time. With our existing monitoring set-up, mostly based on StatsD and Graphite, we ran into a number of serious limitations. What we really needed was a system with the following features:
> - A **multi-dimensional** data model, so that data can be sliced and diced at will, along dimensions like instance, service, endpoint, and method.
> - **Operational simplicity**, so that you can spin up a monitoring server where and when you want, even on your local workstation, without setting up a distributed storage backend or reconfiguring the world.
> - **Scalable data collection** and decentralized architecture, so that you can reliably monitor the many instances of your services, and independent teams can set up independent monitoring servers.
> - Finally, a **powerful query language** that leverages the data model for meaningful alerting (including easy silencing) and graphing (for dashboards and for ad-hoc exploration).

> All of these features existed in various systems. However, we could not identify a system that combined them all until a colleague started an ambitious pet project in 2012 that aimed to do so. Shortly thereafter, we decided to develop it into SoundCloud’s monitoring system: [Prometheus](http://prometheus.io/) was born.
