---
title: 2022年Redis最新面试题 - Redis数据持久化
author: 漫步coding
date: '2022-4-10'
---

#### 概要

- 为什么 Redis 需要把所有数据放到内存中？
- Redis如何做持久化的？
- Redis key 的过期时间和永久有效分别怎么设置？


#### 为什么 Redis 需要把所有数据放到内存中？

出现概率: ★★★

Redis为了达到最快的读写速度将数据都读到内存中，并通过异步的方式将数据写入磁盘。所以Redis具有快速和数据持久化的特性。如果不将数据放到内存中，磁盘的I/O速度会严重影响redis的性能。在内存越来越便宜的今天，redis将会越来越受欢迎。不过也可以设置了最大使用的内存， 则数据已有记录数达到内存限值后将不能继续插入新值。


#### Redis如何做持久化的？

出现概率: ★★★★★

<font color=#FF000 >bgsave做镜像全量持久化，AOF做增量持久化</font>。因为bgsave会耗费较长时间，不够实时，在停机的时候会导致大量丢失数据，所以需要AOF来配合使用。在redis实例重启时，优先使用AOF来恢复内存的状态，如果没有AOF日志，就会使用RDB文件来恢复。

如果再问AOF文件过大恢复时间过长怎么办？你告诉面试官，Redis会定期做AOF重写，压缩AOF文件日志大小。如果面试官不够满意，再拿出杀手锏答案，Redis4.0之后有了混合持久化的功能，将bgsave的全量和AOF的增量做了融合处理，这样既保证了恢复的效率又兼顾了数据的安全性。这个功能甚至很多面试官都不知道，他们肯定会对你刮目相看。

如果对方追问那如果突然机器掉电会怎样？取决于AOF日志sync属性的配置，如果不要求性能，在每条写指令时都sync一下磁盘，就不会丢失数据。但是在高性能的要求下每次都sync是不现实的，一般都使用定时sync，比如1s1次，这个时候最多就会丢失1s的数据。


![](https://images.xiaozhuanlan.com/uploads/photo/2022/0fea0966-a3a5-4aab-a54c-ec5f41b5a301.png)


1)、RDB工作原理

既然说RDB是Redis中数据集的时间点快照，在Redis内完成RDB持久化的方法有<font color=#FF000 >rdbSave</font>和<font color=#FF000 >rdbSaveBackground</font>两个函数方法（源码文件rdb.c中），先简单说下两者差别：

- rdbSave：是同步执行的，方法调用后就会立刻启动持久化流程。由于Redis是单线程模型，持久化过程中会阻塞，Redis无法对外提供服务；
- rdbSaveBackground：是后台（异步）执行的，该方法会fork出子进程，真正的持久化过程是在子进程中执行的（调用rdbSave），主进程会继续提供服务；

RDB持久化的触发必然离不开以上两个方法，触发的方式分为手动和自动。手动触发容易理解，是指我们通过Redis客户端人为的对Redis服务端发起持久化备份指令，然后Redis服务端开始执行持久化流程，这里的指令有save和bgsave。

整个持久化的过程中，主进程不进行任何 io 操作，全程都有子进程来完成，这就确保了极高的性能。如果需要进行大规模的数据恢复，且对数据恢复的完整性不是非常敏感，那么 rdb 方式要比 AOF 方式更加的高效，rdb 的缺点是最后一次持久化的数据可能会丢失。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/401f54b1-0eb4-4e61-ae6e-0488075636a8.png)


2)、AOF 工作原理

<font color=#FF000 >AOF 持久化全称 append only file</font>，以日志形式记录每个写操作，将 redis 执行过得所有写操作指令记录下来（读操作不记录）。只许追加文件但不可以改写文件，redis 启动之初会读取该文件重新构建数据，换言之，redis 重启的话就根据日志文件的内容将写操作指令从前到后执行一次以完成数据的恢复工作。

AOF 默认保存的是 appendonly.AOF 文件，此文件具有可读性。

AOF 的工作原理其实类似于 mysql 的 binlog 日志语句复制。是以日志的形式记录服务器所处理的每一个写，删除操作，查询操作不会记录，以文本的方式进行记录，该文件具有可读性。

数据同步有三种同步策略：修改同步、每秒同步、不主动调用 fsync 同步。

AOF 优缺点

AOF 利用 appendfsync 持久化机制，异步操作每秒记录，数据完整性要高于 rdb 如果一秒宕机，有可能丢失 1 秒数据。相同的数据集而言 AOF 文件要远大于 rdb 文件。恢复速度要慢于 rdb，AOF 运行效率要慢于 rdb。每秒同步策略效率较好，不同步效率和 rdb 相同。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/bbbd186a-125d-4389-8f34-a14e2e582faf.png)

#### Redis key 的过期时间和永久有效分别怎么设置？

出现概率: ★★★

<font color=#FF000 >EXPIRE 和 PERSIST 命令</font>。Redis Expire 命令用于设置 key 的过期时间，key 过期后将不再可用。单位以秒计。 Redis PERSIST 命令用于移除给定 key 的过期时间，使得 key 永不过期。

```
127.0.0.1:6379> set name '漫步coding' EX 100000
OK
127.0.0.1:6379> ttl name # ttl 查看key过期时间
(integer) 99997
127.0.0.1:6379> set brief '一个专注算法、数据库、架构、计算机网络的公众号'
OK
127.0.0.1:6379> ttl brief
(integer) -1
127.0.0.1:6379> PERSIST name
(integer) 1
127.0.0.1:6379> ttl name
(integer) -1 # -1 表示永久有效
127.0.0.1:6379>
```

漫步coding还在整理中, 敬请期待, 可以关注公众号: `漫步coding` 了解最新情况...

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5cb0c91e-fd83-4a04-8df6-65fb602b3834.png)

