![](https://images.xiaozhuanlan.com/uploads/photo/2022/9b9e0dc3-70e3-4b7a-b580-4a77408a859b.png)


![](https://images.xiaozhuanlan.com/uploads/photo/2022/f1d6a4d8-0568-4d20-b743-cd1dc32075e8.png)

### Redis基础知识

- 什么是 Redis, 有哪些优缺点?
- 一个字符串类型的值能存储最大容量是多少？
- Redis 相比 Memcached 有哪些优势？
- Redis 最适合的场景, 可以简单的说说吗?

### 数据结构

- Redis 的数据类型？
- 说说 Redis 哈希槽的概念？
- Hash如何实现O(1)的查询和设置速度, 以及扩容原理
- 布隆过滤器（推荐）

### 事务

- 怎么理解 Redis 事务？
- Redis 事务相关的命令有哪几个？
- 如何利用Redis提供的原子指令来实现分布式锁
- Redis 事务相关的命令有哪几个?​ ​MULTI、EXEC、DISCARD、WATCH

### 数据持久化

- 为什么 Redis 需要把所有数据放到内存中？

- Redis 的同步机制了解么？
- Redis 的持久化机制是什么？各自的优缺点？
	- 8.1、 RDBRedis DataBase)持久化方式：
	- 8.2、 AOFAppend-only file)持久化方式

- Redis key 的过期时间和永久有效分别怎么设置？

### Redis集群

- Redis 是单进程单线程的？
- 是否使用过 Redis 集群，集群的原理是什么？
- Redis 集群方案什么情况下会导致整个集群不可用？
- Redis 集群的主从复制模型是怎样的？
- Redis 集群会有写操作丢失吗？为什么？
- Redis 集群之间是如何复制的？
- Redis 集群最大节点个数是多少？16384个。
- Redis 集群如何选择数据库？
- Redis 的同步机制了解么？

### 缓存问题
 
- 本地缓存
- 分布式缓存
- 缓存雪崩、击穿、穿透
- 缓存预热
- 缓存降级
- 热点数据和冷数据

### 淘汰策略

- redis 过期键的删除策略？
- Redis 的回收策略（淘汰策略）或者说 Redis回收使用的是什么算法?
- Redis 回收进程如何工作的？

### Redis 常见性能问题和解决方案

- Pipeline 有什么好处，为什么要用 pipeline？
- Redis 的内存用完了会发生什么？
- 一个 Redis 实例最多能存放多少的 keys？List、Set、 Sorted Set 他们最多能存放多少元素？
- MySQL 里有 2000w 数据，redis 中只存 20w 的数据，如 何保证 redis 中的数据都是热点数据？
- 假如 Redis 里面有 1 亿个 key，其中有 10w 个 key 是以 某个固定的已知的前缀开头的，如果将它们全部找出来？
- 如果有大量的 key 需要设置同一时间过期，一般需要注意 什么？
- 缓存热点key

### 运维和部署

- Redis 如何设置密码及验证密码？
- Redis 如何做内存优化？
- 都有哪些办法可以降低 Redis 的内存使用情况呢？
- 使用过 Redis 做异步队列么，你是怎么用的？
- 使用过 Redis 分布式锁么，它是什么回事？
- 如何用Redis实现定时任务或者Redis如何实现延时队列？
- 如何保证缓存与数据库双写时的数据一致性？

如何保持mysql和redis中数据的一致性？
https://www.zhihu.com/question/319817091/answer/2110995185


https://segmentfault.com/a/1190000022029639

2022年01月03日整理发布：Redis的那些常见面试题总结附答案解析
https://www.jxshyzhx.com/guonei/202201/36641.html

https://juejin.cn/post/6844904017387077640


2W字！详解20道Redis经典面试题
https://www.sohu.com/a/486868862_121124376



https://www.php.cn/faq/457390.html

https://blog.51cto.com/u_14433813/5095091?b=totalstatistic

https://z.itpub.net/article/detail/DEF79B1D32141A69369CFA91D46289DC

关于Redis的十个高频面试问题
https://www.1024sou.com/article/267804.html

Redis面试宝典

https://gitchat.csdn.net/column/5ee1d22c4a99494972797132