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
- Redis 的同步机制了解么？
- Redis 集群最大节点个数是多少？


#### Redis 是单进程单线程的？

出现概率: ★★★★

大家所熟知的 Redis 确实是单线程模型，指的是执行 Redis 命令的<font color=#FF000 >核心模块是单线程的</font>，而不是整个 Redis 实例就一个线程，Redis 其他模块还有各自模块的线程的。

下面这个解释比较好：

![](https://images.xiaozhuanlan.com/uploads/photo/2022/8b5326a5-2082-4b6e-ac52-102c96cf18e1.png)

同时Redis 采用<font color=#FF000 >网络 I/O 多路复用技术</font>，来保证在多连接的时候系统的高吞吐量。关于 I/O 多路复用(又被称为“事件驱动”)，首先要理解的是，操作系统为你提供了一个功能，当你的某个 socket 可读或者可写的时候，它可以给你一个通知。这样当配合非阻塞的 socket 使用时，只有当系统通知我哪个描述符可读了，我才去执行 read 操作，可以保证每次 read 都能读到有效数据而不做纯返回 -1 和 EAGAIN 的无用功，写操作类似。

目前多路复用主要有三种技术：select，poll，epoll。epoll 是最新的也是目前最好的多路复用技术。

采用多路 I/O 复用技术可以让单个线程高效的处理多个连接请求(尽量减少网络 I/O 的时间消耗)，且 Redis 在内存中操作数据的速度非常快，也就是说内存内的操作不会成为影响 Redis 性能的瓶颈，基于这两点 Redis 具有很高的吞吐量。


#### 是否使用过 Redis 集群，集群的原理是什么？

出现概率: ★★★


Redis Cluster 是 在 <font color=#FF000 >3.0 版本正式推出的高可用集群方案</font>，相比Redis Sentinel，Redis Cluster方案不需要额外部署Sentinel集群，而是通过集群内部通信实现集群监控，故障时主从切换；同时，支持内部基于哈希实现数据分片，支持动态水平扩容。

- Redis集群有多个master，可以减小访问瞬断问题的影响；若集群中有一个master挂了，正好需要向这个master写数据，这个操作需要等待一下；但是向其他master节点写数据是不受影响的。
- Redis集群有多个master，可以提供更高的并发量；
- Redis集群可以分片存储，这样就可以存储更多的数据；

![](https://images.xiaozhuanlan.com/uploads/photo/2022/931716e2-c836-4794-ba94-b5f4581101ce.png)

将整个数据集按照一定规则分配到多个节点上，称为数据分片，Redis Cluster采用的<font color=#FF000 >分片方案是哈希分片</font>, 基本原理如下： Redis Cluster首先定义了编号0 ~ 16383的区间，称为槽，所有的键根据哈希函数映射到0 ~ 16383整数槽内，计算公式：slot=CRC16（key）&16383。每一个节点负责维护一部分槽以及槽所映射的键值数据。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/e0ad2ef5-abb1-4552-b5f1-ce24ecfc29d3.png)




#### 可以简单说说你对Redis Sentinel的理解

出现概率: ★★★

Redis Sentinel是官方从Redis 2.6版本提供的高可用方案，在Redis主从复制集群的基础上，增加Sentinel集群监控整个Redis集群。当Redis集群master节点发生故障时，Sentinel进行故障切换，选举出新的master，同时Sentinel本身支持高可用集群部署。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5fe058e5-245a-45cc-bbd4-ad4bfb1e0e52.png)

#### Redis Sentinal和Redis Cluster的区别

出现概率: ★★★

Redis Sentinal和Redis Cluster的区别主要在于侧重点不同:

- Redis Sentinal主要聚焦于高可用，在master宕机时会自动将slave提升为master，继续提供服务。
- Redis Cluster主要聚焦于扩展性，在单个redis内存不足时，使用Cluster进行分片存储。


#### Redis 的同步机制了解么？

出现概率: ★★★

<font color=#FF000 >主从同步</font>。第一次同步时，主节点做一次<font color=#FF000 >bgsave</font>，并同时将后续修改操作记录到内存buffer，待完成后将rdb文件全量同步到复制节点，复制节点接受完成后将rdb镜像加载到内存。加载完成后，再通知主节点将<font color=#FF000 >期间修改的操作记录</font>同步到复制节点进行重放就完成了同步过程。

全备份过程中，在slave启动时，会向其master发送一条SYNC消息，master收到slave的这条消息之后，将可能启动后台进程进行备份，备份完成之后就将备份的数据发送给slave，初始时的全同步机制是这样的：

![](https://images.xiaozhuanlan.com/uploads/photo/2022/41856c14-f8ee-426b-99d8-f77ef21eb326.png)

#### Redis 集群最大节点个数是多少？

出现概率: ★★★

这个比较偏， 知道的人不多， 如果你可以答出最大节点数，然后给出解释, 估计面试官的好感度, 会蹭蹭的往上涨。

<font color=#FF000 >16384 个</font>。这是因为Redis 集群并没有使用一致性hash，而是引入了哈希槽的概念。Redis 集群有16384个哈希槽，每个key通过CRC16校验后对16384取模来决定放置哪个槽，集群的每个节点负责一部分hash槽。

**但为什么哈希槽的数量是16384（2^14）个呢?**

在redis节点发送心跳包时需要把所有的槽放到这个心跳包里，以便让节点知道当前集群信息，16384=16k，在发送心跳包时使用char进行<font color=#FF000 >bitmap压缩后是2k</font>（2 * 8 (8 bit) * 1024(1k) = 16K），也就是说使用2k的空间创建了16k的槽数。

虽然使用CRC16算法最多可以分配65535（2^16-1）个槽位，65535=65k，压缩后就是8k（8 * 8 (8 bit) * 1024(1k) =65K），也就是说需要需要8k的心跳包，Redis作者认为这样做不太值得；并且一般情况下一个redis集群不会有超过1000个master节点，所以16k的槽位是个比较合适的选择。

关于Redis作者讨论为什么这么设计, 可以[看这里](https://github.com/redis/redis/issues/2576)。

漫步coding还在整理中, 敬请期待, 可以关注公众号: `漫步coding` 了解最新情况...

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5cb0c91e-fd83-4a04-8df6-65fb602b3834.png)
