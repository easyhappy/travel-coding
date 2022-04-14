---
title: 2022年Redis最新面试题 - Redis分布式锁
author: 漫步coding
date: '2022-4-14'
---


- 你知道怎么用Redis实现实现分布式锁?

#### 你知道怎么用Redis实现实现分布式锁?

出现概率: ★★★★

Redis 官方站提出了一种权威的基于 Redis 实现分布式锁的方式名叫<font color=#FF000 >Redlock</font>，此种方式比原先的单节点的方法更安全。它可以保证以下特性：

安全特性：互斥访问，即<font color=#FF000 >永远只有一个client能拿到锁</font>

避免死锁：最终 client 都可能拿到锁，不会出现死锁的情况，即使原本锁住某资源的 client crash 了或者出现了网络分区

容错性：只要大部分 Redis 节点存活就可以正常提供服务

漫步coding还在整理中, 敬请期待, 可以关注公众号: `漫步coding` 了解最新情况...


![](https://images.xiaozhuanlan.com/uploads/photo/2022/5cb0c91e-fd83-4a04-8df6-65fb602b3834.png)
