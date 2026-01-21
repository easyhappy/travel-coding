---
title: 2026年Redis最新面试题 - Redis淘汰策略
author: 漫步coding
date: '2022-4-12'
---


### 概要

- Redis过期键的删除策略？
- 你可以简单聊聊Redis内存淘汰机制(回收策略)


#### Redis 过期键的删除策略？

出现概率: ★★★★

Redis过期键的删除策略是：<font color=#FF000 >定期删除+惰性删除</font>。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/a0daa9be-c5e0-432b-a05d-fd4ddc795fd7.png)


1)、关于<font color=#FF000 >定期删除</font>, Redis默认会每隔100ms就<font color=#FF000 >随机</font>选取一些已经过期了的key，检查其是否过期，如果已经过期就删除。

不过假设Redis里放了100w个key，而且都设置了过期时间，你每隔几百毫秒，就检查100w个key，那 Redis基本上就卡死了，cpu负载也会很高的，基本都消耗在检查过期key上了。

注意，这里可不是每隔100ms就遍历所有的设置过期时间的key，那样就是一场性能上的灾难。实际情况是每次随机选取一些key进行检查和删除的。

但因为<font color=#FF000 >随机会带来不确定性</font>，可能会导致很多过期key到了时间并没有被删除掉，那应该怎么办呢？所以就**需要惰性删除了**。

关于定期删除源码解析：每当 Redis 服务器的周期性操作 redis.c/serverCron 函数执行时，redis.c/activeExpireCycle 会被调用。
activeExpireCycle 函数在规定的时间内，分多次遍历服务器中的各个数据库，从数据库的 expires 字典中随机检查一部分键的过期时间，并删除其中的过期键。

current\_db 记录当前检查的数据库，如果函数 activeExpireCycle 当前正在处理 2 号数据库，时间超限，返回后，下次检查时，会从 3 号数据库开始检查。所有数据库检查一遍后，current\_db 重置为 0，然后再次开始一轮的检查工作。


2)、关于<font color=#FF000 >惰性删除</font>， 当用户获取某个key的时候，Redis会检查一下这个key是不是设置了过期时间， 并且是否过期了？如果过期了此时就会删除，不会给用户返回任何东西。

惰性删除有一个问题， 依赖用户的主动调用，那如果一些用户就长时间没有访问怎么办， 会导致大量过期 key堆积在内存里，进而导致Redis 内存块耗尽了，咋整？

答案就是：<font color=#FF000 >触发Redis内存淘汰机制</font>。(下面会讲到)

#### 你可以简单聊聊Redis内存淘汰机制(回收策略)

出现概率: ★★★★

1)、Redis内存淘汰机制有以下几个：

- noeviction: 当内存不足以容纳新写入数据时，新写入操作会报错。（这个有点过于暴力, 不推荐）
- allkeys-lru：当内存不足以容纳新写入数据时，在键空间中，移除最近最少使用的 key（<font color=#FF000 >这个是最常用的</font>）。
- allkeys-random：当内存不足以容纳新写入数据时，在键空间中，随机移除某个 key。
- volatile-lru：当内存不足以容纳新写入数据时，在设置了过期时间的键空间中，移除最近最少使用的 key（这个一般不太合适）。
- volatile-random：当内存不足以容纳新写入数据时，在设置了过期时间的键空间中，随机移除某个 key。
- volatile-ttl：当内存不足以容纳新写入数据时，在设置了过期时间的键空间中，有更早过期时间的 key 优先移除。

2)、Redis<font color=#FF000 >默认的过期策略是noeviction</font>, 最暴力那个, 如果内存满了那就是一场“华丽”的故事了。 😂

```
127.0.0.1:6379> config get maxmemory-policy
1) "maxmemory-policy"
2) "noeviction"
127.0.0.1:6379>
```

![](https://images.xiaozhuanlan.com/uploads/photo/2022/cc905607-484e-42a1-9641-85741bafb36d.png)


3)、redis.conf 中的过期淘汰配置如下:

```
# MAXMEMORY POLICY: how Redis will select what to remove when maxmemory
# is reached. You can select among five behaviors:
#最大内存策略：当到达最大使用内存时，你可以在下面5种行为中选择，Redis如何选择淘汰数据库键

#当内存不足以容纳新写入数据时

# volatile-lru -> remove the key with an expire set using an LRU algorithm
# volatile-lru ：在设置了过期时间的键空间中，移除最近最少使用的key。这种情况一般是把 redis 既当缓存，又做持久化存储的时候才用。

# allkeys-lru -> remove any key according to the LRU algorithm
# allkeys-lru ：移除最近最少使用的key （推荐）

# volatile-random -> remove a random key with an expire set
# volatile-random ：在设置了过期时间的键空间中，随机移除一个键，不推荐

# allkeys-random -> remove a random key, any key
# allkeys-random ：直接在键空间中随机移除一个键，弄啥叻

# volatile-ttl -> remove the key with the nearest expire time (minor TTL)
# volatile-ttl ：在设置了过期时间的键空间中，有更早过期时间的key优先移除 不推荐

# noeviction -> don't expire at all, just return an error on write operations
# noeviction ：不做过键处理，只返回一个写操作错误。不推荐

# Note: with any of the above policies, Redis will return an error on write
# operations, when there are no suitable keys for eviction.
# 上面所有的策略下，在没有合适的淘汰删除的键时，执行写操作时，Redis 会返回一个错误。下面是写入命令：
# At the date of writing these commands are: set setnx setex append
# incr decr rpush lpush rpushx lpushx linsert lset rpoplpush sadd
# sinter sinterstore sunion sunionstore sdiff sdiffstore zadd zincrby
# zunionstore zinterstore hset hsetnx hmset hincrby incrby decrby
# getset mset msetnx exec sort

# 过期策略默认是：
# The default is:
# maxmemory-policy noeviction
```

也欢迎关注我的公众号: `漫步coding`。 一起交流, 在coding的世界里漫步, 回复: <font color=#FF000 >`redis`</font>, 免费获取最新Redis面试题(含答案)。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5cb0c91e-fd83-4a04-8df6-65fb602b3834.png)

希望这篇文章可以帮助大家, 也希望大家都能找到的好工作。