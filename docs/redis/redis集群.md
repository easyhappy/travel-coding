---
title: 2022年Redis最新面试题 - Redis集群
author: 漫步coding
date: '2022-4-11'
---


#### 概要

- Redis 是单进程单线程的？
- 是否使用过 Redis 集群，集群的原理是什么？
- 可以简单说说你对Redis Sentinel的理解
- Redis Sentinal和Redis Cluster的区别
- Redis 集群方案什么情况下会导致整个集群不可用？
- Redis 集群的主从复制模型是怎样的？
- Redis 集群会有写操作丢失吗？为什么？
- Redis 集群之间是如何复制的？
- Redis 集群最大节点个数是多少？16384个。
- Redis 集群如何选择数据库？
- Redis 的同步机制了解么？


#### Redis 是单进程单线程的？


出现概率: ★★★★

大家所熟知的 Redis 确实是单线程模型，指的是执行 Redis 命令的核心模块是单线程的，而不是整个 Redis 实例就一个线程，Redis 其他模块还有各自模块的线程的。

下面这个解释比较好：

![](https://images.xiaozhuanlan.com/uploads/photo/2022/8b5326a5-2082-4b6e-ac52-102c96cf18e1.png)

同时Redis 采用网络 I/O 多路复用技术，来保证在多连接的时候系统的高吞吐量。关于 I/O 多路复用(又被称为“事件驱动”)，首先要理解的是，操作系统为你提供了一个功能，当你的某个 socket 可读或者可写的时候，它可以给你一个通知。这样当配合非阻塞的 socket 使用时，只有当系统通知我哪个描述符可读了，我才去执行 read 操作，可以保证每次 read 都能读到有效数据而不做纯返回 -1 和 EAGAIN 的无用功，写操作类似。

目前多路复用主要有三种技术：select，poll，epoll。epoll 是最新的也是目前最好的多路复用技术。

采用多路 I/O 复用技术可以让单个线程高效的处理多个连接请求(尽量减少网络 I/O 的时间消耗)，且 Redis 在内存中操作数据的速度非常快，也就是说内存内的操作不会成为影响 Redis 性能的瓶颈，基于这两点 Redis 具有很高的吞吐量。


#### 是否使用过 Redis 集群，集群的原理是什么？

出现概率: ★★★


Redis Cluster 是 在 3.0 版本正式推出的高可用集群方案，相比Redis Sentinel，Redis Cluster方案不需要额外部署Sentinel集群，而是通过集群内部通信实现集群监控，故障时主从切换；同时，支持内部基于哈希实现数据分片，支持动态水平扩容。

- Redis集群有多个master，可以减小访问瞬断问题的影响；若集群中有一个master挂了，正好需要向这个master写数据，这个操作需要等待一下；但是向其他master节点写数据是不受影响的。
- Redis集群有多个master，可以提供更高的并发量；
- Redis集群可以分片存储，这样就可以存储更多的数据；

![](https://images.xiaozhuanlan.com/uploads/photo/2022/931716e2-c836-4794-ba94-b5f4581101ce.png)

将整个数据集按照一定规则分配到多个节点上，称为数据分片，Redis Cluster采用的分片方案是哈希分片, 基本原理如下： Redis Cluster首先定义了编号0 ~ 16383的区间，称为槽，所有的键根据哈希函数映射到0 ~ 16383整数槽内，计算公式：slot=CRC16（key）&16383。每一个节点负责维护一部分槽以及槽所映射的键值数据。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/e0ad2ef5-abb1-4552-b5f1-ce24ecfc29d3.png)


出现概率: ★★★

#### 可以简单说说你对Redis Sentinel的理解

Redis Sentinel是官方从Redis 2.6版本提供的高可用方案，在Redis主从复制集群的基础上，增加Sentinel集群监控整个Redis集群。当Redis集群master节点发生故障时，Sentinel进行故障切换，选举出新的master，同时Sentinel本身支持高可用集群部署。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5fe058e5-245a-45cc-bbd4-ad4bfb1e0e52.png)

#### Redis Sentinal和Redis Cluster的区别

出现概率: ★★★

Redis Sentinal和Redis Cluster的区别主要在于侧重点不同:

- Redis Sentinal主要聚焦于高可用，在master宕机时会自动将slave提升为master，继续提供服务。
- Redis Cluster主要聚焦于扩展性，在单个redis内存不足时，使用Cluster进行分片存储。



漫步coding还在整理中, 敬请期待, 可以关注公众号: `漫步coding` 了解最新情况...


![](https://images.xiaozhuanlan.com/uploads/photo/2022/5cb0c91e-fd83-4a04-8df6-65fb602b3834.png)
