---
title: 2026年Redis最新面试题 - Redis数据结构
author: 漫步coding
date: '2022-4-6'
---

### 数据结构

- Redis的数据类型有哪些?
- 说说 Redis 哈希槽的概念？
- Hash如何实现O(1)的查询和设置速度, 以及扩容原理
- 布隆过滤器

#### Redis的数据类型有哪些？

出现概率: ★★★★★

这个在面试的过程出现的概率特别高了。

<font color=#FF000 >Redis 支持五种常用的数据类型：string（ 字符串），hash（ 哈希）， list（ 列表）， set（ 集合） 及 zsetsorted set：有序集合)</font>。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/395d0a03-1f7d-4d6f-911d-7190600a3b10.png)

redis 的基本数据结构对应的底层实现如下图所示：

![](https://images.xiaozhuanlan.com/uploads/photo/2022/6e26ec1d-8d45-4e35-9c6c-09033586309d.png)

1)、Redis 的字符串是<font color=#FF000 >动态字符串</font>，是可以修改的字符串，内部结构实现上类似于 Java 的 ArrayList，采用<font color=#FF000 >预分配冗余空间</font>的方式来减少内存的频繁分配，如图所示：

len 是当前字符串实际长度，capacity 是为字符串分配的可用空间，当字符串长度小于 1M 时，扩容都是加倍现有的空间，如果超过 1M，扩容时一次只会多扩 1M 的空间。字符串最大长度为 512M。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5fce194c-eb39-41eb-9f48-474c38f0dc73.png)

2)、hash

Redis Hash通过<font color=#FF000 >分桶的方式</font>解决 hash 冲突。它是无序字典。内部实现结构是同样的<font color=#FF000 >数组 + 链表二维结构</font>。第一维 hash 的数组位置碰撞时，就会将碰撞的元素使用链表串接起来。第一维是数组，第二维是链表。数组中存储的是第二维链表的第一个元素的指针。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/3ef784a8-0ce9-42af-bb84-076b6fa09839.png)

3)、list

Redis 的列表相当于 Java 语言中的 LinkedList，注意<font color=#FF000 >它是链表而不是数组</font>。这意味着 list 的插入和删除操作非常快，时间复杂度为 O(1)，但是<font color=#FF000 >索引定位很慢</font>，时间复杂度为 O(n)。

list的特点是:

- 有序
- 可以重复
- 右边进左边出或者左边进右边出，则列表可以充当队列
- 左边进左边出或者右边进右边出，则列表可以充当栈


![](https://images.xiaozhuanlan.com/uploads/photo/2022/7b545730-f7fc-4a81-a0a8-afc3758f196a.png)

4)、set

<font color=#FF000 >set和字典非常类似</font>，其内部实现就是上述的hashTable的特殊实现，与字典不同的地方有两点：

- 只关注key值，所有的value都是NULL。
- 在新增数据时会进行去重。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/0215349d-fcc7-4eaf-a199-13f7ae225b33.png)


5)、zsetsorted set

zset是Redis非常有特色的数据结构，它是基于Set并提供排序的有序集合。其中最为重要的特点就是支持通过score的权重来指定权重。一些排行榜、延迟任务比如指定1小时后执行, 就是使用这个数据结构实现的。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/121dc53f-a84d-46a4-b06c-a86c8e8f8a65.png)


6)、**拓展篇**

如果你说你还知道一些其他的几种数据结构比如: HyperLogLog、Geo、Pub/Sub、Redis Module，BloomFilter，RedisSearch，Redis-ML，面试官得眼睛就开始发亮了。

Redis5.0带来了Stream类型。从字面上看是流类型，但其实从功能上看，应该是Redis对消息队列（MQ，Message Queue）的完善实现。用过Redis做消息队列的都了解，基于Reids的消息队列实现有很多种，例如：

- PUB/SUB，订阅/发布模式
- 基于List的 LPUSH+BRPOP 的实现
- 基于Sorted-Set的实现

Redis Stream的结构如图所示，它有一个消息链表，将所有加入的消息都串起来，每个消息都有一个唯一的ID和对应的内容。消息是持久化的，Redis重启后，内容还在。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/48a57d0c-934b-4172-9783-3abb6a06b408.png)


#### Hash如何实现O(1)的查询和设置速度, 以及扩容原理

出现概率: ★★★★★

<font color=#FF000 >Redis Hash通过分桶的方式解决 hash 冲突。它是无序字典。内部实现结构是同样的数组 + 链表二维结构</font>。第一维 hash 的数组位置碰撞时，就会将碰撞的元素使用链表串接起来。第一维是数组，第二维是链表。数组中存储的是第二维链表的第一个元素的指针。

因为是通过数组取模的方式, 可以实现O(1)的查询和设置速度。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/3ef784a8-0ce9-42af-bb84-076b6fa09839.png)

不过如果概率多时, 链表长度过长时，查询时间复杂度会降低到O(n)。这个需要进行扩容了。

<font color=#FF000 >大字典的扩容</font>是非常耗时间的，需要<font color=#FF000 >重新申请新的数组</font>，正常情况下，当 hash 表中元素的个数等于第一维数组的长度时，就会开始扩容，扩容的新数组是原数组大小的 2 倍，然后将旧字典所有链表中的元素重新挂接到新的数组下面，这是一个 O(n)级别的操作，Redis 使用渐进式 rehash 扩容，分多次来慢慢的将旧数组中的键值对rehash到新数组的操作就称之为渐进式rehash。渐进式rehash可以避免了集中式rehash带来的庞大计算量，在渐进式rehash过程中，因为还可能会有新的键值对存进来，此时Redis的做法是新添加的键值对统一放入ht[1]中，这样就确保了ht[0]键值对的数量只会减少，当执行rehash操作时需要执行查询操作，此时会先查询ht[0]，查找不到结果再到ht[1]中查询。

#### 说说 Redis 哈希槽的概念？

出现概率: ★★★

Redis集群没有使用一致性hash,而是引入了哈希槽的概念，<font color=#FF000 >Redis集群有16384个哈希槽</font>，每个key通过CRC16校验后对16384取模来决定放置哪个槽，集群的每个节点负责一部分hash槽。

#### 布隆过滤器

出现概率: ★★★

这个在面试中出现的概率, 主要看面试官的偏好, 不过如果问到，而且你能回答比较好的， 估计是一个比较好的加分项。

布隆过滤器是 Redis 的高级功能，虽然这种结构的去重率并不完全精确，但和其他结构一样都有特定的应用场景，比如当处理<font color=#FF000 >海量数据时</font>，就可以使用布隆过滤器实现去重。

一些场景: 百度爬虫系统每天会面临海量的 URL 数据，我们希望它每次只爬取最新的页面，而对于没有更新过的页面则不爬取，因策爬虫系统必须对已经抓取过的 URL 去重，否则会严重影响执行效率。但是如果使用一个 set（集合）去装载这些 URL 地址，那么将造成资源空间的严重浪费。

布隆过滤器（Bloom Filter）是一个高空间利用率的概率性数据结构，由二进制向量（即位数组）和一系列随机映射函数（即哈希函数）两部分组成。

布隆过滤器使用exists()来判断某个元素是否存在于自身结构中。当布隆过滤器判定某个值存在时，其实这个值只是有可能存在；当它说某个值不存在时，那这个值肯定不存在，这个误判概率大约在 1% 左右。

**Bloom Filter的原理**

1)、工作流程-添加元素

布隆过滤器主要由位数组和一系列 hash 函数构成，其中位数组的初始状态都为 0。

下面对布隆过滤器工作流程做简单描述，如下图所示：

![](https://images.xiaozhuanlan.com/uploads/photo/2022/13eb793d-1a5a-4c03-9d36-9bdc2380829a.png)

2)、工作流程-判定元素是否存在

当我们需要判断一个元素是否存时，其流程如下：首先对给定元素再次执行哈希计算，得到与添加元素时相同的位数组位置，判断所得位置是否都为 1，如果其中有一个为 0，那么说明元素不存在，若都为 1，则说明元素有可能存在。

3)、 为什么是可能“存在”

您可能会问，为什么是有可能存在？其实原因很简单，那些被置为 1 的位置也可能是由于其他元素的操作而改变的。比如，元素1 和 元素2，这两个元素同时将一个位置变为了 1（图1所示）。在这种情况下，我们就不能判定“元素 1”一定存在，这是布隆过滤器存在误判的根本原因。

**Bloom Filter的缺点**

bloom filter<font color=#FF000 >牺牲了判断的准确率、删除的便利性</font> ，才做到在时间和空间上的效率比较高，是因为

1)、存在误判，可能要查到的元素并没有在容器中，但是hash之后得到的k个位置上值都是1。如果bloom filter中存储的是黑名单，那么可以通过建立一个白名单来存储可能会误判的元素。
 
2)、删除数据。一个放入容器的元素映射到bit数组的k个位置上是1，删除的时候不能简单的直接置为0，可能会影响其他元素的判断。可以考虑Counting Bloom Filter

也欢迎关注我的公众号: `漫步coding`。 一起交流, 在coding的世界里漫步, 回复: <font color=#FF000 >`redis`</font>, 免费获取最新Redis面试题(含答案)。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5cb0c91e-fd83-4a04-8df6-65fb602b3834.png)

希望这篇文章可以帮助大家, 也希望大家都能找到的好工作。