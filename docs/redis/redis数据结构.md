---
title: 2022年Redis最新面试题 - Redis数据结构
author: 漫步coding
date: '2022-4-6'
---

### 数据结构

- Redis的数据类型有哪些?
- 说说 Redis 哈希槽的概念？
- Hash如何实现O(1)的查询和设置速度, 以及扩容原理
- 布隆过滤器（推荐）

#### Redis的数据类型有哪些？

出现概率: ★★★★★

Redis 支持五种常用的数据类型：string（ 字符串），hash（ 哈希）， list（ 列表）， set（ 集合） 及 zsetsorted set：有序集合)。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/395d0a03-1f7d-4d6f-911d-7190600a3b10.png)

redis 的基本数据结构对应的底层实现如下图所示：

![](https://images.xiaozhuanlan.com/uploads/photo/2022/6e26ec1d-8d45-4e35-9c6c-09033586309d.png)

1)、Redis 的字符串是动态字符串，是可以修改的字符串，内部结构实现上类似于 Java 的 ArrayList，采用预分配冗余空间的方式来减少内存的频繁分配，如图所示：

len 是当前字符串实际长度，capacity 是为字符串分配的可用空间，当字符串长度小于 1M 时，扩容都是加倍现有的空间，如果超过 1M，扩容时一次只会多扩 1M 的空间。字符串最大长度为 512M。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5fce194c-eb39-41eb-9f48-474c38f0dc73.png)

2)、Hash

Redis Hash通过分桶的方式解决 hash 冲突。它是无序字典。内部实现结构是同样的数组 + 链表二维结构。第一维 hash 的数组位置碰撞时，就会将碰撞的元素使用链表串接起来。第一维是数组，第二维是链表。数组中存储的是第二维链表的第一个元素的指针。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/3ef784a8-0ce9-42af-bb84-076b6fa09839.png)

3)、List

Redis 的列表相当于 Java 语言中的 LinkedList，注意它是链表而不是数组。这意味着 list 的插入和删除操作非常快，时间复杂度为 O(1)，但是索引定位很慢，时间复杂度为 O(n)。

List的特点是:

- 有序
- 可以重复
- 右边进左边出或者左边进右边出，则列表可以充当队列
- 左边进左边出或者右边进右边出，则列表可以充当栈


![](https://images.xiaozhuanlan.com/uploads/photo/2022/7b545730-f7fc-4a81-a0a8-afc3758f196a.png)

4)、set

set和字典非常类似，其内部实现就是上述的hashTable的特殊实现，与字典不同的地方有两点：

- 只关注key值，所有的value都是NULL。
- 在新增数据时会进行去重。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/0215349d-fcc7-4eaf-a199-13f7ae225b33.png)


5)、zsetsorted set

zSet是Redis非常有特色的数据结构，它是基于Set并提供排序的有序集合。其中最为重要的特点就是支持通过score的权重来指定权重。一些延迟任务比如指定1小时执行, 就是使用这个数据结构实现的。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/121dc53f-a84d-46a4-b06c-a86c8e8f8a65.png)


6)、**拓展篇**

如果你说你还知道一些其他的几种数据结构比如: HyperLogLog、Geo、Pub/Sub、Redis Module，BloomFilter，RedisSearch，Redis-ML，面试官得眼睛就开始发亮了。

Redis5.0带来了Stream类型。从字面上看是流类型，但其实从功能上看，应该是Redis对消息队列（MQ，Message Queue）的完善实现。用过Redis做消息队列的都了解，基于Reids的消息队列实现有很多种，例如：

- PUB/SUB，订阅/发布模式
- 基于List的 LPUSH+BRPOP 的实现
- 基于Sorted-Set的实现

Redis Stream的结构如图所示，它有一个消息链表，将所有加入的消息都串起来，每个消息都有一个唯一的ID和对应的内容。消息是持久化的，Redis重启后，内容还在。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/48a57d0c-934b-4172-9783-3abb6a06b408.png)


漫步coding还在整理中, 敬请期待, 可以关注公众号: `漫步coding` 了解最新情况...


![](https://images.xiaozhuanlan.com/uploads/photo/2022/5cb0c91e-fd83-4a04-8df6-65fb602b3834.png)
