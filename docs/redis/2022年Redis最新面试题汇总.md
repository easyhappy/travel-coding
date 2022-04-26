最近整理一份关于Redis常见面试题的，也会根据自己的经验， 标注一些出现的概率，最高5颗★出现的概率最高。比如这样:

Redis 最适合的场景, 可以简单的说说吗?   
出现概率: ★★★★


一般来讲在面试当中， 关于Redis相关的面试题频率出现比较高的几个关键词是适合哪些场景、数据结构、hash实现原理和如何扩容、如何做持久化、关系型数据库和非关系数据库对比等等。 把这几个点问完基本也差不多10~20分钟了(一般一轮面试1小时左右), 基本这些可以让面试官对你的Redis知识有一定的了解了。


也欢迎关注我的公众号: `漫步coding`。 一起交流, 在coding的世界里漫步, 回复: <font color=#FF000 >`redis`</font>, 免费获取最新Redis面试题(含答案)。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5cb0c91e-fd83-4a04-8df6-65fb602b3834.png)

希望这篇文章可以帮助大家, 也希望大家都能找到的好工作。

### 目录

- 一、Redis基础知识
	- 1、什么是 Redis, 有哪些优缺点?
	- 2、Redis 最适合的场景, 可以简单的说说吗?
	- 3、Redis 相比 Memcached 有哪些优势？
	- 4、一个字符串类型的值能存储最大容量是多少？
	- 5、Redis 读写分离
- 二、数据结构
	- 1、Redis的数据类型有哪些?
	- 2、说说 Redis 哈希槽的概念？
	- 3、Hash如何实现O(1)的查询和设置速度, 以及扩容原理
	- 4、布隆过滤器
- 三、事务
	- 1、怎么理解 Redis 事务？
	- 2、Redis事务执行过程
	- 3、Redis事务的一些使用场景
	- 4、Redis事务与Redis pipeline的区别
	- 5、集群模式下Redis事务如何保证原子性
- 四、Redis数据持久化
	- 1、为什么 Redis 需要把所有数据放到内存中？
	- 2、Redis如何做持久化的？
	- 3、Redis key 的过期时间和永久有效分别怎么设置？

- 五、Redis集群
	- 1、Redis 是单进程单线程的？
	- 2、是否使用过 Redis 集群，集群的原理是什么？
	- 3、可以简单说说你对Redis Sentinel的理解
	- 4、Redis Sentinal和Redis Cluster的区别
	- 5、Redis 的同步机制了解么？
	- 6、Redis 集群最大节点个数是多少？
- 六、Redis淘汰策略
	- 1、Redis过期键的删除策略？
	- 2、你可以简单聊聊Redis内存淘汰机制(回收策略)
- 七、Redis分布式锁
	- 1、你知道实现实现分布式锁有哪些方案?
- 八、Redis缓存问题
	- 1、Redis缓存雪崩
	- 2、Redis缓存击穿
	- 3、Redis缓存穿透
	- 4、缓存预热
	- 5、缓存降级
- 九、运维和部署
	- 1、Redis 如何设置密码及验证密码？
	- 2、Redis 如何做内存优化？

### 一、Redis基础知识

- 1、什么是 Redis, 有哪些优缺点?
- 2、Redis 最适合的场景, 可以简单的说说吗?
- 3、Redis 相比 Memcached 有哪些优势？
- 4、一个字符串类型的值能存储最大容量是多少？
- 5、Redis 读写分离



#### 1、什么是 Redis, 有哪些优缺点?

出现概率: ★★★★

Redis是一个非关系性数据库, 开源的、使用C语言编写、支持网络、可基于内存亦可持久化的日志型、key-value（键值对）数据库，是目前分布式架构中不可或缺的一环。

Redis服务器程序是<font color=#FF000 >单进程模型</font>，也就是在一台服务器上可以同时启动多个Redis进程，而Redis的实际处理速度则完全依靠于主进程的的执行效率。若在服务器上只运行一个Redis进程，当多个客户端同时访问时，服务器的处理能力会有一定程度的下降，若在同一台服务器上开启多个Redis进程，Redis在提高并发处理能力的同时会给服务器的CPU造成很大压力。也就是说，在实际生产环境中，需要根据实际的需求来决定开启多少个Redis进程。若对高并发要求更高一些，可能会考虑在同一台服务器上开启多个进程。若CPU资源比较紧张，采用单进程即可。

<font color=#FF000 >Redis优点</font>：

1)、性能极高, 读写性能优异，从内存当中进行IO读写速度快。

2)、支持数据的持久化(支持<font color=#FF000 >AOF</font>和<font color=#FF000 >RDB</font>两种持久化方式)，对数据的更新采用<font color=#FF000 >Copy-on-write</font>技术（写拷贝），可以异步的保存在磁盘上

由于Redis的数据都存放在内存中，如果没有配置持久化，redis重启后数据就全丢失了，于是需要开启redis的持久化功能，将数据保存到磁 盘上，当redis重启后，可以从磁盘中恢复数据。

redis提供两种方式进行持久化，一种是RDB持久化:指在指定的时间间隔内将内存中的数据集快照写入磁盘，实际操作过程是fork一个子进程，先将数据集写入临时文件，写入成功后，再替换之前的文件，用二进制压缩存储。

还有一种是AOF持久化：以日志的形式记录服务器所处理的每一个写、删除操作，查询操作不会记录，以文本的方式记录，可以打开文件看到详细的操作记录。


3)、支持主从复制，主机会自动将数据同步到从机，可以进行读写分离。

4)、数据结构丰富：除了支持string类型的value外还支持string、hash、set、sortedset、list等数据结构。

5)、原子性：多个操作通过MULTI和EXEC指令支持事务
 

<font color=#FF000 >Redis缺点</font>：

1)、主从同步，如果主机宕机，宕机前有一部分数据没有同步到从机，会导致数据不一致。

2)、主从同步，数据同步会有延迟。

3)、读写分离，主机写的负载量太大，也会导致主机的宕机

4)、数据库容量受到物理内存的限制，不能用作海量数据的高性能读写


#### 2、Redis 最适合的场景, 可以简单的说说吗?

出现概率: ★★★★

1、会话缓存（Session Cache）最常用的一种使用Redis的情景是会话缓存（session cache）, Redis缓存会话比其他存储（如Memcached）的优势在于：Redis提供持久化。

2、排行榜/计数器

Redis在内存中对数字进行递增或递减的操作实现的非常好。集合（Set）和有序集合（Sorted Set）也使得我们在执行这些操作的时候变的非常简单，Redis只是正好提供了这两种数据结构。

3、发布/订阅

Redis的发布/订阅功能。发布/订阅的使用场景确实非常多。我已看见人们在社交网络连接中使用，还可作为基于发布/订阅的脚本触发器，甚至用Redis的发布/订阅功能来建立聊天系统！

4、缓存热数据

可以缓存一些高频读, 低频写的内容， 比如app首页一些设置等。

5、利用BitMap统计用户签到、统计活跃用户、用户在线状态等

Redis从2.2.0版本开始新增了setbit,getbit,bitcount等几个bitmap相关命令。虽然是新命令，但是并没有新增新的数据类型，因为setbit等命令只不过是在set上的扩展。

可以利用BitMap统计用户签到、统计活跃用户、用户在线状态

![](https://images.xiaozhuanlan.com/uploads/photo/2022/780caa3d-e2ac-4edb-815b-7390cc6883b1.png)

6、限速，接口访问频率限制：比如发送短信验证码的接口，通常为了防止别人恶意频刷，会限制用户每分钟获取验证码的频率，例如一分钟不能超过 5 次。




假设用于数据量上亿的场景下，例如几亿用户系统的签到，去重登录次数统计，某用户是否在线状态等等。腾讯10亿用户，要几个毫秒内查询到某个用户是否在线，能怎么做？

千万别说给每个用户建立一个key，然后挨个记（你可以算一下需要的内存会很恐怖，而且这种类似的需求很多。这里要用到位操作——使用setbit、getbit、bitcount命令。原理是：

redis内构建一个足够长的数组，每个数组元素只能是0和1两个值，然后这个数组的下标index用来表示用户id（必须是数字哈），那么很显然，这个几亿长的大数组就能通过下标和元素值（0和1）来构建一个记忆系统。

Redis key name 约定
```
$dayKey = 'login:'.\date('Ymd',\time());
```
Redis 数据结构

key | sign:20220405  | sign:20220405| sign:20220405 ...
----|----|----|----|
offset (UserId) | 1000|   1001  | 1002|   ...
value|  0|  1|  1|  ...
status|   未签到|  已签到|  已签到 | ...

使用经验

```
127.0.0.1:6379> setbit 'login-20220405' 2 1
127.0.0.1:6379> setbit 'login-20220405' 100 1
(integer) 1
127.0.0.1:6379> setbit 'login-20220405' 200000000 1
(integer) 1
127.0.0.1:6379> setbit 'login-20220405' 4290000000 1
(integer) 1
127.0.0.1:6379> setbit 'login-20220405' 4300000000 1
(error) ERR bit offset is not an integer or out of range
127.0.0.1:6379> getbit 'login-20220405' 100
(integer) 1
127.0.0.1:6379> getbit 'login-20220405' 101
(integer) 0
127.0.0.1:6379>
```

这里需要注意的是Redis中字符串限制最大为512MB，所以位图中最大可以设置2^32个不同的位（42.9亿个）。图位的最小单位是比特(bit)，每个bit的值只能是0或1。 同时注意setbit时的偏移量，当偏移量很大时，可能会有较大耗时。 位图不是绝对的好，有时可能更浪费空间。

#### 3、Redis 相比 Memcached 有哪些优势？

出现概率: ★★★

如果简单地比较Redis与Memcached的区别，大多数都会得到以下观点：

1 、数据支持类型 Memcache 对数据类型支持相对简单。Redis 有复杂的数据类型。Redis不仅仅支持简单的k/v类型的数据，同时还提供list，set，zset，hash等数据结构的存储。

2 、Redis支持数据的备份，即master-slave模式的数据备份。

3 、存储方式 Memecache 把数据全部存在内存之中， 断电后会挂掉， 数据不能超过内存大小。Redis支持数据的持久化，可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用。


#### 4、一个字符串类型的值能存储最大容量是多少？

Redis中<font color=#FF000 >字符串限制最大为512MB</font>

#### 5、Redis 读写分离

出现概率: ★★★

读取请求QPS（Queries Per Second）压力较大的服务, 可以采用Redis读写分离，可以提供高可用、高性能、灵活的读写分离服务，满足热点数据集中及高并发读取的业务需求，最大化地节约运维成本。

读写分离版采取<font color=#FF000 >链式复制架构</font>，可以通过扩展只读实例个数使整体实例性能呈线性增长，同时基于源码层面对Redis复制流程的定制优化，可以最大程度地提升线性复制的系统稳定性，充分利用每一个只读节点的物理资源。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/45df7655-e3d7-4cea-a129-3758e487c431.png)


由于数据同步至只读节点存在一定延迟，且采用链式复制，只读节点数越多，靠近链路末端的只读节点数据延迟越大，因此选用此架构时，业务需要能接受一定程度的脏数据。如果对数据一致性要求较高，推荐选用集群架构。

#### 6、你知道怎么用Redis实现实现分布式锁?

出现概率: ★★★★

Redis 官方站提出了一种权威的基于 Redis 实现分布式锁的方式名叫<font color=#FF000 >Redlock</font>，此种方式比原先的单节点的方法更安全。它可以保证以下特性：

安全特性：互斥访问，即<font color=#FF000 >永远只有一个client能拿到锁</font>

避免死锁：最终 client 都可能拿到锁，不会出现死锁的情况，即使原本锁住某资源的 client crash 了或者出现了网络分区

容错性：只要大部分 Redis 节点存活就可以正常提供服务


### 二、数据结构

- 1、Redis的数据类型有哪些?
- 2、说说 Redis 哈希槽的概念？
- 3、Hash如何实现O(1)的查询和设置速度, 以及扩容原理
- 4、布隆过滤器

#### 1、Redis的数据类型有哪些？

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


#### 2、Hash如何实现O(1)的查询和设置速度, 以及扩容原理

出现概率: ★★★★★

<font color=#FF000 >Redis Hash通过分桶的方式解决 hash 冲突。它是无序字典。内部实现结构是同样的数组 + 链表二维结构</font>。第一维 hash 的数组位置碰撞时，就会将碰撞的元素使用链表串接起来。第一维是数组，第二维是链表。数组中存储的是第二维链表的第一个元素的指针。

因为是通过数组取模的方式, 可以实现O(1)的查询和设置速度。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/3ef784a8-0ce9-42af-bb84-076b6fa09839.png)

不过如果概率多时, 链表长度过长时，查询时间复杂度会降低到O(n)。这个需要进行扩容了。

<font color=#FF000 >大字典的扩容</font>是非常耗时间的，需要<font color=#FF000 >重新申请新的数组</font>，正常情况下，当 hash 表中元素的个数等于第一维数组的长度时，就会开始扩容，扩容的新数组是原数组大小的 2 倍，然后将旧字典所有链表中的元素重新挂接到新的数组下面，这是一个 O(n)级别的操作，Redis 使用渐进式 rehash 扩容，分多次来慢慢的将旧数组中的键值对rehash到新数组的操作就称之为渐进式rehash。渐进式rehash可以避免了集中式rehash带来的庞大计算量，在渐进式rehash过程中，因为还可能会有新的键值对存进来，此时Redis的做法是新添加的键值对统一放入ht[1]中，这样就确保了ht[0]键值对的数量只会减少，当执行rehash操作时需要执行查询操作，此时会先查询ht[0]，查找不到结果再到ht[1]中查询。

#### 3、说说 Redis 哈希槽的概念？

出现概率: ★★★

Redis集群没有使用一致性hash,而是引入了哈希槽的概念，<font color=#FF000 >Redis集群有16384个哈希槽</font>，每个key通过CRC16校验后对16384取模来决定放置哪个槽，集群的每个节点负责一部分hash槽。

#### 4、布隆过滤器

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

### 三、事务

- 1、怎么理解 Redis 事务？
- 2、Redis事务执行过程
- 3、Redis事务的一些使用场景
- 4、Redis事务与Redis pipeline的区别
- 5、集群模式下Redis事务如何保证原子性


#### 1、怎么理解 Redis 事务？

出现概率: ★★★★

<font color=#FF000 >Redis事务的本质是一组命令的集合</font>。事务支持一次执行多个命令，一个事务中所有命令都会被序列化。在事务执行过程，会按照顺序串行的执行队列中的命令，其他客户端提交的命令请求不会插入到事务执行命令序列中。 

总结说：Redis事务就是一次性、顺序性、排他性的执行一个队列中的一系列命令。 

 1)、Redis事务相关命令和使用 

 MULTI 、 EXEC 、 DISCARD 和 WATCH 是 Redis 事务相关的命令。 

 - MULTI: 开启事务，redis会将后续的命令逐个放入队列中，然后使用EXEC命令来原子化执行这个命令系列。 
 - EXEC: 执行事务中的所有操作命令。
 - DISCARD: 取消事务，放弃执行事务块中的所有命令。 
 - WATCH: 监视一个或多个key,如果事务在执行前，这个key(或多个key)被其他命令修改，则事务被中断，不会执行事务中的任何命令。 
 - UNWATCH: 取消WATCH对所有key的监视。

example:

```
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> SET name '漫步coding'
QUEUED
127.0.0.1:6379> SET brief '一个专注于算法、数据库、职场的公众号'
QUEUED
127.0.0.1:6379> GET name
QUEUED
127.0.0.1:6379> EXEC
1) OK
2) OK
3) "漫步coding"
```

画重点, <font color=#FF000 >**Redis事务不支持Rollback**</font>

事实上Redis命令在事务执行时可能会失败，但仍会继续执行剩余命令而不是Rollback（事务回滚）。如果你使用过关系数据库，这种情况可能会让你感到很奇怪。然而针对这种情况Redis官方也给出了解释：


Redis命令可能会执行失败，仅仅是由于错误的语法被调用（命令排队时检测不出来的错误），或者使用错误的数据类型操作某个Key：    这意味着，实际上失败的命令都是编程错误造成的，都是开发中能够被检测出来的，生产环境中不应该存在。（这番话，彻底甩锅，“都是你们自己编程错误，与我们无关”。）


由于不必支持Rollback,Redis内部简洁并且更加高效。


#### 2、Redis事务执行过程

出现概率: ★★★

一个Redis事务从开始到执行会经历以下三个阶段：

- 1）开始事务。
- 2）命令放入Queue。
- 3）执行事务。

1）开始事务

MULTI命令的执行标记着事务的开始：

```
127.0.0.1:6379> MULTI
OK
```
这个命令唯一做的就是， 将客户端的 REDIS_MULTI 选项打开， 让客户端从非事务状态切换到事务状态。

2）命令放入Queue

当客户端处于非事务状态下时， 所有发送给服务器端的命令都会立即被服务器执行：

```
127.0.0.1:6379> SET name '漫步coding'
OK

127.0.0.1:6379> GET name
"漫步coding"
```

但是， 当客户端进入事务状态之后， 服务器在收到来自客户端的命令时， 不会立即执行命令， 而是将这些命令全部放进一个事务队列里， 然后返回QUEUED， 表示命令已入队：

```
 127.0.0.1:6379> MULTI
OK

127.0.0.1:6379> SET name "漫步coding"
QUEUED

127.0.0.1:6379> GET name
QUEUED
```

3）执行事务

当客户端进入事务状态之后， 客户端发送的命令就会被放进事务队列里。

EXEC 、 DISCARD 、 MULTI 和 WATCH 这四个命令 —— 当这四个命令从客户端发送到服务器时， 它们会像客户端处于非事务状态一样， 会被服务器立即执行。

```
127.0.0.1:6379> EXEC
1) OK
2) OK
3) "漫步coding"
```

4)、关于WATCH命令

<font color=#FF000 >WATCH指令，有点类似乐观锁</font>，事务提交时，如果 key 的值已被别的客户端改变，比如某个 list 已被别的客户端push/pop 过了，整个事务队列都不会被执行。（当然也可以用 Redis 实现分布式锁来保证安全性，属于悲观锁）

WATCH机制的作用是，在事务执行前，监控一个或多个键的值变化情况，当事务调用EXEC命令执行时，WATCH机制会先检查监控的键是否被其它客户端修改了。如果修改了，就放弃事务执行，避免事务的隔离性被破坏。然后，客户端可以再次执行事务，此时，如果没有并发修改事务数据的操作了，事务就能正常执行，隔离性也得到了保证。

WATCH机制的具体实现是由WATCH命令实现的，我给你举个例子，你可以看下面的图，进一步理解下WATCH命令的使用。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/292a1e72-0701-40aa-8455-66c0e88a04a6.png)

example:

```
127.0.0.1:6379>set k 1
OK
127.0.0.1:6379>WATCH k
OK
127.0.0.1:6379>set k 2
OK
127.0.0.1:6379>MULTI
OK
127.0.0.1:6379>set k 3
QUEUED
127.0.0.1:6379>EXEC
(nil)
127.0.0.1:6379>get k
"2"
```

提交事务，<font color=#FF000 >但k值不会被修改为3，因为在事务开启之前k的值被修改了</font>。


#### 3、Redis事务的一些使用场景

出现概率: ★★★

可利用watch命令监听key，实现乐观锁，来保证不会出现冲突，应用场景比如秒杀来防止超卖。

秒杀场景伪代码如下：

这块代码其实还没有想好, 如果有经验的朋友，欢迎留言, 后续我研究透彻会也专门写一篇秒杀场景的文章。

```
set total_quantity 100
WATCH goods_quantity
MULTI
if goods_quantity < total_quantity && user_id not in 'user_list'
   incr goods_quantity
   set 'user_list' user_id
end
EXEC
```

#### 4、Redis事务与Redis pipeline的区别

出现概率: ★★★

<font color=#FF000 >Redis Pipeline主要用于批量发送命令，一次性发送多个请求，一次性读取所有返回结果</font>。可以节省连接->发送命令->返回结果这个过程所产生的时间（RTT），减少read()和write()的系统调用（从用户态到内核态之间的切换）次数。

Redis事务、Redis Pipeline表面上它们可以作为批量执行命令的方式，但实际也有许多区别。

1)、命令缓冲队列方式不同  
Redis事务包含的命令是缓冲在服务端内存队列，而Redis Pipeline则是缓冲在客户端本地内存中；

2)、请求次数不同   
Redis事务中每个命令都需要发送到服务端，而<font color=#FF000 >Pipeline只需要发送一次，请求次数更少</font>；

3)、原子性保证   
Redis事务可以保证命令原子化执行，而Pipeline不保证原子性。

Redis事务、Pipeline都只能作用于单个节点。集群环境下，执行Redis命令时，会根据key计算出一个槽位（slot）,然后根据槽位重定向到特定的节点上执行操作。

4)、<font color=#FF000 >在使用事务时，建议配合 Pipeline 使用</font>。

a) 如果不使用 Pipeline，客户端是先发一个 MULTI 命令到服务端，客户端收到 OK，然后客户端再发送一个个操作命令，客户端依次收到 QUEUED，最后客户端发送 EXEC 执行整个事务（文章例子就是这样演示的），这样消息每次都是一来一回，效率比较低，而且在这多次操作之间，别的客户端可能就把原本准备修改的值给修改了，所以无法保证隔离性。

b) 而使用 Pipeline 是一次性把所有命令打包好全部发送到服务端，服务端全部处理完成后返回。这么做好的好处，一是减少了来回网络 IO 次数，提高操作性能。二是一次性发送所有命令到服务端，服务端在处理过程中，是不会被别的请求打断的（Redis单线程特性，此时别的请求进不来），这本身就保证了隔离性。我们平时使用的 Redis SDK 在使用开启事务时，一般都会默认开启 Pipeline 的，可以留意观察一下。


#### 5、集群模式下Redis事务如何保证原子性

出现概率: ★★★

Redis事务中每个命令都需要发送到服务端, 不过Redis事务可以保证命令原子化执行

Redis事务只能作用于单个节点。集群环境下，执行Redis命令时，会根据key计算出一个槽位（slot）,然后根据槽位重定向到特定的节点上执行操作。



### 四、Redis数据持久化

- 1、为什么 Redis 需要把所有数据放到内存中？
- 2、Redis如何做持久化的？
- 3、Redis key 的过期时间和永久有效分别怎么设置？


#### 1、为什么 Redis 需要把所有数据放到内存中？

出现概率: ★★★

<font color=#FF000 >Redis为了达到最快的读写速度将数据都读到内存中，并通过异步的方式将数据写入磁盘</font>。所以Redis具有快速和数据持久化的特性。如果不将数据放到内存中，磁盘的I/O速度会严重影响redis的性能。在内存越来越便宜的今天，redis将会越来越受欢迎。不过也可以设置了最大使用的内存， 则数据已有记录数达到内存限值后将不能继续插入新值。


#### 2、Redis如何做持久化的？

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

### 五、Redis集群


- 1、Redis 是单进程单线程的？
- 2、是否使用过 Redis 集群，集群的原理是什么？
- 3、可以简单说说你对Redis Sentinel的理解
- 4、Redis Sentinal和Redis Cluster的区别
- 5、Redis 的同步机制了解么？
- 6、Redis 集群最大节点个数是多少？


#### 1、Redis 是单进程单线程的？

出现概率: ★★★★

大家所熟知的 Redis 确实是单线程模型，指的是执行 Redis 命令的<font color=#FF000 >核心模块是单线程的</font>，而不是整个 Redis 实例就一个线程，Redis 其他模块还有各自模块的线程的。

下面这个解释比较好：

![](https://images.xiaozhuanlan.com/uploads/photo/2022/8b5326a5-2082-4b6e-ac52-102c96cf18e1.png)

同时Redis 采用<font color=#FF000 >网络 I/O 多路复用技术</font>，来保证在多连接的时候系统的高吞吐量。关于 I/O 多路复用(又被称为“事件驱动”)，首先要理解的是，操作系统为你提供了一个功能，当你的某个 socket 可读或者可写的时候，它可以给你一个通知。这样当配合非阻塞的 socket 使用时，只有当系统通知我哪个描述符可读了，我才去执行 read 操作，可以保证每次 read 都能读到有效数据而不做纯返回 -1 和 EAGAIN 的无用功，写操作类似。

目前多路复用主要有三种技术：select，poll，epoll。epoll 是最新的也是目前最好的多路复用技术。

采用多路 I/O 复用技术可以让单个线程高效的处理多个连接请求(尽量减少网络 I/O 的时间消耗)，且 Redis 在内存中操作数据的速度非常快，也就是说内存内的操作不会成为影响 Redis 性能的瓶颈，基于这两点 Redis 具有很高的吞吐量。


#### 2、是否使用过 Redis 集群，集群的原理是什么？

出现概率: ★★★


Redis Cluster 是 在 <font color=#FF000 >3.0 版本正式推出的高可用集群方案</font>，相比Redis Sentinel，Redis Cluster方案不需要额外部署Sentinel集群，而是通过集群内部通信实现集群监控，故障时主从切换；同时，支持内部基于哈希实现数据分片，支持动态水平扩容。

- Redis集群有多个master，可以减小访问瞬断问题的影响；若集群中有一个master挂了，正好需要向这个master写数据，这个操作需要等待一下；但是向其他master节点写数据是不受影响的。
- Redis集群有多个master，可以提供更高的并发量；
- Redis集群可以分片存储，这样就可以存储更多的数据；

![](https://images.xiaozhuanlan.com/uploads/photo/2022/931716e2-c836-4794-ba94-b5f4581101ce.png)

将整个数据集按照一定规则分配到多个节点上，称为数据分片，Redis Cluster采用的<font color=#FF000 >分片方案是哈希分片</font>, 基本原理如下： Redis Cluster首先定义了编号0 ~ 16383的区间，称为槽，所有的键根据哈希函数映射到0 ~ 16383整数槽内，计算公式：slot=CRC16（key）&16383。每一个节点负责维护一部分槽以及槽所映射的键值数据。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/e0ad2ef5-abb1-4552-b5f1-ce24ecfc29d3.png)




#### 3、可以简单说说你对Redis Sentinel的理解

出现概率: ★★★

Redis Sentinel是官方从Redis 2.6版本提供的高可用方案，在Redis主从复制集群的基础上，增加Sentinel集群监控整个Redis集群。当Redis集群master节点发生故障时，Sentinel进行故障切换，选举出新的master，同时Sentinel本身支持高可用集群部署。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5fe058e5-245a-45cc-bbd4-ad4bfb1e0e52.png)

#### 4、Redis Sentinal和Redis Cluster的区别

出现概率: ★★★

Redis Sentinal和Redis Cluster的区别主要在于侧重点不同:

- <font color=#FF000 >Redis Sentinal主要聚焦于高可用</font>，在master宕机时会自动将slave提升为master，继续提供服务。
- <font color=#FF000 >Redis Cluster主要聚焦于扩展性</font>，在单个redis内存不足时，使用Cluster进行分片存储。


#### 5、Redis 的同步机制了解么？

出现概率: ★★★

<font color=#FF000 >主从同步</font>。第一次同步时，主节点做一次<font color=#FF000 >bgsave</font>，并同时将后续修改操作记录到内存buffer，待完成后将rdb文件全量同步到复制节点，复制节点接受完成后将rdb镜像加载到内存。加载完成后，再通知主节点将<font color=#FF000 >期间修改的操作记录</font>同步到复制节点进行重放就完成了同步过程。

<font color=#FF000 >全备份过程中，在slave启动时，会向其master发送一条SYNC消息</font>，master收到slave的这条消息之后，将可能启动后台进程进行备份，备份完成之后就将备份的数据发送给slave，初始时的全同步机制是这样的：

![](https://images.xiaozhuanlan.com/uploads/photo/2022/41856c14-f8ee-426b-99d8-f77ef21eb326.png)

#### 6、Redis 集群最大节点个数是多少？

出现概率: ★★★

这个比较偏， 知道的人不多， 如果你可以答出最大节点数，然后给出解释, 估计面试官的好感度, 会蹭蹭的往上涨。

<font color=#FF000 >16384 个</font>。这是因为Redis 集群并没有使用一致性hash，而是引入了哈希槽的概念。Redis 集群有16384个哈希槽，每个key通过CRC16校验后对16384取模来决定放置哪个槽，集群的每个节点负责一部分hash槽。

**但为什么哈希槽的数量是16384（2^14）个呢?**

在redis节点发送心跳包时需要把所有的槽放到这个心跳包里，以便让节点知道当前集群信息，16384=16k，在发送心跳包时使用char进行<font color=#FF000 >bitmap压缩后是2k</font>（2 * 8 (8 bit) * 1024(1k) = 16K），也就是说使用2k的空间创建了16k的槽数。

虽然使用CRC16算法最多可以分配65535（2^16-1）个槽位，65535=65k，压缩后就是8k（8 * 8 (8 bit) * 1024(1k) =65K），也就是说需要需要8k的心跳包，Redis作者认为这样做不太值得；并且一般情况下一个redis集群不会有超过1000个master节点，所以16k的槽位是个比较合适的选择。

关于Redis作者讨论为什么这么设计, 可以[看这里](https://github.com/redis/redis/issues/2576)。

### 六、Redis淘汰策略

- 1、Redis过期键的删除策略？
- 2、你可以简单聊聊Redis内存淘汰机制(回收策略)


#### 1、Redis 过期键的删除策略？

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

#### 2、你可以简单聊聊Redis内存淘汰机制(回收策略)

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


### 七、Redis分布式锁

- 1、你知道实现实现分布式锁有哪些方案?


#### 1、你知道实现实现分布式锁有哪些方案?

出现概率: ★★★★★

分布式锁无论是在平时开发中还是面试中都是很常见的问题, 所以建议自己多梳理一下。知其然， 且知其所以然。

1、在开始之前首先要知道什么是分布式锁 ？

分布式锁其实就是<font color=#FF000 >控制分布式系统不同进程共同访问共享资源的一种锁的实现</font>。如果不同的系统或同一个系统的不同主机之间共享了某个临界资源，往往需要互斥来防止彼此干扰，以保证一致性。

在分布式锁方面, Redis有广泛应用， 日常开发中分布式锁的一些常见常见有秒杀下单、抢红包等等。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/86c652d6-ba4f-41de-89e9-8213c4b19e25.png)

2、分布式锁的特点如下：

- 互斥性：和我们本地锁一样互斥性是最基本，但是分布式锁需要保证在不同节点的不同线程的互斥。
- 可重入性：同一个节点上的同一个线程如果获取了锁之后那么也可以再次获取这个锁。
- 锁超时：和本地锁一样支持锁超时，防止死锁。
- 高效，高可用：加锁和解锁需要高效，同时也需要保证高可用防止分布式锁失效，可以增加降级。
- 支持阻塞和非阻塞：和 ReentrantLock 一样支持 lock 和 trylock 以及 tryLock(long timeOut)。
- 支持公平锁和非公平锁(可选)：公平锁的意思是按照请求加锁的顺序获得锁，非公平锁就相反是无序的。这个一般来说实现的比较少。




3、一些比较常见的分布式锁方案

- SETNX + EXPIRE
- SETNX + value值是（系统时间+过期时间）
- SET EX PX NX + 校验唯一随机值,再释放锁
- 多机实现的分布式锁Redlock
- ZooKeeper实现分布式锁
- 使用数据库实现分布式锁

1)、方案一: SETNX和EXPIRE

伪代码如下: 

```
if (setnx(key, 1) == 1){
    expire(key, 10)
    try {
        //TODO 业务逻辑
    } finally {
        del(key)
    }
}
```


这种方案的优点是优点是实现简单，通过修改过期时间可以支持锁重入，锁超时自动释放；

缺点：因为上述命令是分两步执行，如果第二步执行失败，将造成无法解锁, <font color=#FF000 >很容易导致死锁</font>。

2)、方案二: SETNX + value值是（系统时间+过期时间）

```
当前时间:  '2022-04-17 11:00:00'.to_time 
value = '2022-04-17 11:00:10'.to_time // 10s后过期
if (setnx(key, value) == 1){ // 代码1
    try {
        //TODO 业务逻辑
    } finally {
        del(key)
    }
}else{
  if  redisClient.get(key_resource_id)  < Time.now { // 表示已过期
     del(key)
     goto 代码1 
  }
}
```


优点：加锁是原子操作，解决了方案一的缺点，避免了死锁问题。   
缺点：实现复杂，每个机器的时间必须保持同步，<font color=#FF000 >其他加锁线程会修改过期时间</font>，锁有可能被其他线程错误释放。

3)、SET EX PX NX + 校验唯一随机值,再释放锁

SETNX和EXPIRE 为两个指令， 不是原子性操作，如果 SETNX 成功，在设置锁超时时间后，服务器挂掉、重启或网络问题等，导致 EXPIRE 命令没有执行，锁没有设置超时时间变成死锁。针对该问题，redis 在2.6.12版本过后增加新的解决方案。

```
set key value [expiration EX seconds|PX milliseconds] [NX|XX]
```

EX seconds:将键的过期时间设置为 seconds 秒。  
SET key value EX seconds 等同于 SETEX key seconds value   
PX millisecounds:将键的过期时间设置为 milliseconds 毫秒。   
SET key value PX milliseconds 等同于 PSETEX key milliseconds value   
NX:只在键不存在的时候，才对键进行设置操作。  
SET key value NX 等同于 SETNX key value   
XX:只在键已经存在的时候，才对键进行设置操作   

比如当key不存在时， 设置10s的锁, 可以这么设置:

```
SET product:10001 true  ex  10  nx
```

如果SET操作成功后,返回的是OK,失败返回NIL

最后为删除时，防止可能被其他线程误删。可以加锁时设置一下当前线程的一个随机ID, 然后在删除时判断一下。
伪代码如下:

```
if（redisClient.set(key_resource_id, uni_request_id, "NX", "EX", 100s) == 1）{ //加锁
    try {
        ... //业务处理
    }
　finally {
       //判断是不是当前线程加的锁,是才释放
       if (redisClient.get(key_resource_id) == uni_request_id) {
          redisClient.del(lockKey); //释放锁
        }
   }
}
```

这种方案的优点是可以保证加锁的原子性，使用LUA释放锁的话，锁不会被其他线程错误释放。

缺点：<font color=#FF000 >锁没有自动续期机制</font>，锁无法支持重入。不过其实平时开发中, 大部分场景不用考虑自动续期机制。

4)、多机实现的分布式锁Redlock

Redis 官方站提出了一种权威的基于 Redis 实现分布式锁的方式名叫<font color=#FF000 >Redlock</font>，此种方式比原先的单节点的方法更安全。


Redlock 的方案基于 2 个前提：

- 不再需要部署从库和哨兵实例，只部署主库
- 但主库要部署多个，官方推荐至少 5 个实例  

整体的流程是这样的，一共分为 5 步：

a)、客户端先获取「当前时间戳T1」   
b)、客户端依次向这 5 个 Redis 实例发起加锁请求（用前面讲到的 SET 命令），且每个请求会设置超时时间（毫秒级，要远小于锁的有效时间），如果某一个实例加锁失败（包括网络超时、锁被其它人持有等各种异常情况），就立即向下一个 Redis 实例申请加锁   
c)、如果<font color=#FF000 >客户端从 >=3 个（大多数）以上 Redis 实例加锁成功</font>，则再次获取「当前时间戳T2」，如果 T2 - T1 < 锁的过期时间，此时，认为客户端加锁成功，否则认为加锁失败   
d)、加锁成功，去操作共享资源（例如修改 MySQL 某一行，或发起一个 API 请求）   
e)、加锁失败，向「全部节点」发起释放锁请求（前面讲到的 Lua 脚本释放锁）  

<font color=#FF000 >Redlock加锁步骤相对还是比较繁琐的,有点重</font>，官方给出的解释是为了「容错」，部分实例异常宕机，剩余的实例加锁成功，整个锁服务依旧可用。

其实Redlock一出来, 就受到了业界著名的分布式系统专家Martin的质疑，他马上写了篇文章，质疑这个 Redlock 的算法模型是有问题的，并对分布式锁的设计，提出了自己的看法，之后，Redis 作者 Antirez 面对质疑，不甘示弱，也写了一篇文章，反驳了对方的观点，并详细剖析了 Redlock 算法模型的更多设计细节。这里就不展开细讲了, [感兴趣的朋友可以看看这个文章。](https://mp.weixin.qq.com/s?__biz=MzIyMjIxMjM3MQ==&mid=2247484112&idx=1&sn=8b1088ac8596fedca19afe9b66093fdc&chksm=e831baacdf4633baf1b286887fa1bdec232300ea733ee6c198815d5ae354941379aa3d04cc7d&token=931638143&lang=zh_CN#rd)

5)、也可以使用ZooKeeper实现分布式锁

Zookeeper的节点Znode有四种类型：

- 持久节点：默认的节点类型。创建节点的客户端与zookeeper断开连接后，该节点依旧存在。
- 持久节点顺序节点：所谓顺序节点，就是在创建节点时，Zookeeper根据创建的时间顺序给该节点名称进行编号，持久节点顺序节点就是有顺序的持久节点。
- 临时节点：和持久节点相反，当创建节点的客户端与zookeeper断开连接后，临时节点会被删除。
- 临时顺序节点：有顺序的临时节点。

<font color=#FF000 >Zookeeper分布式锁实现应用了临时顺序节点</font>, 这里大概讲下zk分布式锁的实现原理吧。

大致思想为：每个客户端对某个方法加锁时，在ZooKeeper上与该方法对应的指定节点的目录下，生成一个唯一的临时有序节点。 判断是否获取锁的方式很简单，只需要判断有序节点中序号最小的一个。 当释放锁的时候，只需将这个临时节点删除即可。同时，其可以避免服务宕机导致的锁无法释放，而产生的死锁问题。


![](https://images.xiaozhuanlan.com/uploads/photo/2022/c879a8cf-6293-4470-a242-d03420e7bbe9.png)


优点：

- 有效的解决单点问题，不可重入问题，非阻塞问题以及锁无法释放的问题
- 实现较为简单

缺点：

- 性能上不如使用缓存实现的分布式锁，因为每次在创建锁和释放锁的过程中，都要动态创建、销毁临时节点来实现锁功能
- 需要对ZooKeeper的原理有所了解

这里就不展开细讲ZooKeeper的原理， 后面会专门用一篇文章讲如何用Zookeeper实现分布式锁。

6)、使用数据库实现分布式锁

可以使用<font color=#FF000 >select ... for update 来实现分布式锁</font>。我们自己的项目，分布式定时任务，就使用类似的实现方案

优点：

-  简单，使用方便，不需要引入Redis、zookeeper等中间件。

缺点：

- 不适合高并发的场景  
- db操作性能较差，有锁表的风险；


结语:

- 从性能角度（从高到低）Redis > Zookeeper >= 数据库；
- 从理解的难易程度角度（从低到高）数据库 > Redis > Zookeeper；
- 从实现的复杂性角度（从低到高）Zookeeper > Redis > 数据库；
- 从可靠性角度（从高到低）Zookeeper > Redis > 数据库。
- <font color=#FF000 >平时开发中 SET EX PX NX + 校验唯一随机值,再释放锁</font>  方案就可以了。


### 八、Redis缓存问题


- 1、Redis缓存雪崩
- 2、Redis缓存击穿
- 3、Redis缓存穿透
- 4、缓存预热
- 5、缓存降级


#### 1、Redis缓存雪崩


出现概率: ★★★★★


这个在Redis面试的题目中算是出镜率特别高的问题了, 建议仔细消化一下。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/484cab7c-e4bb-476d-889e-b68c0f60124d.png)


1)、缓存雪崩是指<font color=#FF000 >大量的缓存key</font>无法在Redis缓存中进行处理，紧接着，<font color=#FF000 >短时间大量请求直接打到数据库层</font>，导致数据库层的压力激增, 可能瞬间就会导致数据库宕机。


缓存雪崩一般是由两个原因导致的，应对方案也有所不同，我们一个个来看。

第一个原因是：缓存中有大量数据同时过期，比如说一些APP首页缓存数据，都设置了当天有效， 凌晨过期， 在第二天流量高峰时, 大量用户访问的请求， 没有换成从数据库中读取数据。如果应用的并发请求量很大，那么数据库的压力也突然变得很大，可能会造成缓存雪崩。

这种类似的问题解决思路也基本简单, 打散过期时间, 比如设置过期时间为 24小时之后 + 随机N分钟。

另外一个原因是Redis宕机, 这个就需要分析Redis宕机的原因了， 是因为磁盘满了还是内存满了, 根据情况进行处理，或者升配置什么的。
如果是内存满了, 也需要考虑是不是缓存过期回收策略的问题。


![](https://images.xiaozhuanlan.com/uploads/photo/2022/eed166b8-45d3-4cec-8add-fc1c6102ef1a.png)

#### 2、Redis缓存击穿


出现概率: ★★★★

缓存击穿跟缓存雪崩有点类似，缓存雪崩是大规模的key失效，而<font color=#FF000 >缓存击穿是某个热点的key失效</font>，大并发集中对其进行请求，就会造成大量请求读缓存没读到数据，从而导致高并发访问数据库，引起数据库压力剧增。这种现象就叫做缓存击穿。

解决方案：

a)、在缓存失效后，通过互斥锁或者队列来控制读数据写缓存的线程数量，比如某个key只允许一个线程查询数据和写缓存，其他线程等待。这种方式会阻塞其他的线程，此时系统的吞吐量会下降

b)、热点数据缓存永远不过期。

永不过期实际包含两层意思：

物理不过期，针对热点key不设置过期时间

逻辑过期，把过期时间存在key对应的value里，如果发现要过期了，通过一个后台的异步线程进行缓存的构建

![](https://images.xiaozhuanlan.com/uploads/photo/2022/f7043613-5895-4044-b4c2-f85a0cae3a46.png)



#### 3、Redis缓存穿透

出现概率: ★★★★

缓存穿透是指用户请求的数据在<font color=#FF000 >缓存中不存在即没有命中，同时在数据库中也不存在</font>，导致用户每次请求该数据都要去数据库中查询一遍。

如果短时间大量类似请求落在数据库上，造成数据库压力过大，可能导致数据库承受不住而宕机崩溃。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/e83cb6d7-ef75-4844-a11f-e0fc066c27f4.png)


解决方法：

a)、将无效的key存放进Redis中：

当出现Redis查不到数据，数据库也查不到数据的情况，我们就把这个key保存到Redis中，设置value="null"，并设置其过期时间极短，后面再出现查询这个key的请求的时候，直接返回null，就不需要再查询数据库了。但这种处理方式是有问题的，假如传进来的这个不存在的Key值每次都是随机的，那存进Redis也没有意义。

b)、使用布隆过滤器：

如果布隆过滤器判定某个 key 不存在布隆过滤器中，那么就一定不存在，如果判定某个 key 存在，那么很大可能是存在(存在一定的误判率)。于是我们可以在缓存之前再加一个布隆过滤器，将数据库中的所有key都存储在布隆过滤器中，在查询Redis前先去布隆过滤器查询 key 是否存在，如果不存在就直接返回，不让其访问数据库，从而避免了对底层存储系统的查询压力。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/ab84f46b-1b14-47b0-b15c-5fc40b78f1be.png)


#### 4、Redis缓存预热

出现概率: ★★★

缓存预热如字面意思，当系统上线时，缓存内还没有数据，如果直接提供给用户使用，每个请求都会穿过缓存去访问底层数据库，如果并发大的话，很有可能在上线当天就会宕机，因此我们需要在上线前先将数据库内的热点数据缓存至Redis内再提供出去使用，这种操作就成为"缓存预热"。

缓存预热的实现方式有很多，比较通用的方式是写个批任务，在启动项目时或定时去触发将底层数据库内的热点数据加载到缓存内。


#### 5、Redis缓存降级

出现概率: ★★★

缓存降级是指当访问量剧增、服务出现问题（如响应时间慢或不响应）或非核心服务影响到核心流程的性能时，即使是有损部分其他服务，仍然需要保证主服务可用。可以将其他次要服务的数据进行缓存降级，从而提升主服务的稳定性。

降级的目的是保证核心服务可用，即使是有损的。如去年双十一的时候淘宝购物车无法修改地址只能使用默认地址，这个服务就是被降级了，这里阿里保证了订单可以正常提交和付款，但修改地址的服务可以在服务器压力降低，并发量相对减少的时候再恢复。


### 九、运维和部署

- 1、Redis 如何设置密码及验证密码？
- 2、Redis 如何做内存优化？

#### 1、Redis 如何设置密码及验证密码？

出现概率: ★★★

redis没有实现访问控制这个功能，但是它提供了一个轻量级的认证方式，可以编辑redis.conf配置来启用认证。

1、初始化Redis密码：

在配置文件中有个参数： requirepass  这个就是配置redis访问密码的参数；

比如 requirepass test123；（Ps:需重启Redis才能生效）

redis的查询速度是非常快的，<font color=#FF000 >外部用户一秒内可以尝试多达150K个密码；所以密码要尽量长</font>（对于DBA 没有必要必须记住密码）；

2、不重启Redis设置密码：

在配置文件中配置requirepass的密码（当redis重启时密码依然有效）。

```
redis 127.0.0.1:6379> config set requirepass test123
```

查询密码：

```
redis 127.0.0.1:6379> config get requirepass
(error) ERR operation not permitted
```

密码验证：

```
redis 127.0.0.1:6379> auth test123
OK
```

再次查询：

```
redis 127.0.0.1:6379> config get requirepass
1) "requirepass"
2) "test123"
```

PS：如果配置文件中没添加密码 那么redis重启后，密码失效；


3、在Redis集群中使用认证密码

如果Redis服务器，使用了集群。除了在master中配置密码外，也需要在slave中进行相应配置。在slave的配置文件中找到如下行，去掉注释并修改与master相同的密码即可：

```
# masterauth master-password
```

#### 2、Redis 如何做内存优化？

出现概率: ★★★

在思考如何做内存优化之前, 我们先看看redisObject对象的结构

![](https://images.xiaozhuanlan.com/uploads/photo/2022/b0817efd-cea7-4e9c-8a5d-06ffe5dcbba7.png)

- type 代表数据类型，比如 list, set, hash, 由于一共是 4 bits, 所以 redis 最多能支持 16 种
- encoding 代表底层编码类型，比如 ziplist, intset, EMBSTR, raw 等等
-  <font color=#FF000 >refcount 引用计数，对象创建时为 1, 当值为 0 时释放</font>
- ptr 指向真实数据，虽然是个指针，但有时为了高效使用内存，直接存储整型

对象有如下特性：

- redis 在执行命令之前，根据对象的类型就可以判断命令是否可以执行。
- 依托对象，可以针对不同的使用场景，为对象设置不同的数据结构实现，从而优化对象在不同场景下的使用效率。
- redis 对象系统实现了基于引用计数技术的内存回收机制，当程序不再使用某个对象的时候，这个对象所占用的内存就会被自动释放。
- redis 使用引用计数技术实现了对象共享机制，一定场景下，可以通过让多个数据库键共享同一个对象来节约内存。
- redis 对象带有访问时间记录，可以用来计算数据库键的空转时间，在服务器启用 maxmemory 的情况下，空转时长较大的键可能被优先删除。

1、<font color=#FF000 >缩减键值对象</font>

缩减键（key）和值（value）的长度

key长度：如在设计键时，在完整描述业务情况下，键值越短越好。   
value长度：值对象缩减比较复杂，常见需求是把业务对象序列化成二进制数组放入Redis。

类似如果想在Redis 存用户的简介:

这样如果一个用户的

```
{gender: 'male', name: '漫步coding'} 
```

可以做一些映射

```
keyMap = {
  'gender': 'a'
  'sex': 'b',
  ...
  'profile': 'a1',
  'name': 'b1',
}
```

存在redis映射后就是

```
{'a': 'male', 'b1': '漫步coding'}
```

同时也可以对female, male 这些枚举值做一次映射。

同时值对象除了存储二进制数据之外，通常还会使用通用格式存储数据比如:json，xml等作为字符串存储在Redis中。这种方式优点是方便调试和跨语言，但是同样的数据相比字节数组所需的空间更大，在内存紧张的情况下，可以使用通用压缩算法压缩json,xml后再存入Redis，从而降低内存占用，例如使用GZIP压缩后的json可降低约60%的空间。

2、<font color=#FF000 >共享对象池</font>

对象共享池指<font color=#FF000 >Redis内部维护[0-9999]的整数对象池</font>。创建大量的整数类型redisObject存在内存开销，每个redisObject内部结构至少占16字节，甚至超过了整数自身空间消耗。所以Redis内存维护一个[0-9999]的整数对象池，用于节约内存。 除了整数值对象，其他类型如list,hash,set,zset内部元素也可以使用整数对象池。因此开发中在满足需求的前提下，尽量使用整数对象以节省内存。

```
 127.0.0.1:6379> set a 1
OK
127.0.0.1:6379> object refcount a
(integer) 2147483647
127.0.0.1:6379> set b 1
OK
127.0.0.1:6379> object refcount b
(integer) 2147483647
127.0.0.1:6379> set c 10000
OK
127.0.0.1:6379> object refcount c
(integer) 1
127.0.0.1:6379>
```

`object refcount b`和 `object refcount a`为什么是2147483647, 查看源码，发现新版本的redis中OBJ\_SHARED\_INTEGERS变量定义了共享整数10000(0-9999)，并且定义不被销毁的全局对象的引用数量OBJ\_SHARED\_REFCOUNT为INT\_MAX，INT\_MAX = 2^31 - 1 =2147483647。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/f1b1e108-fd59-4bfd-a173-d54bbf847511.png)

![](https://images.xiaozhuanlan.com/uploads/photo/2022/0cb9d4d0-f4e2-4627-9923-a597d7d18914.png)

但是如果对象超出 9999 范围等于 10000 的时候，比如 ` object refcount c` 返回的是 (integer) 1，就不会使用对象内存。另外， 这些共享对象不单单只有字符串键可以使用， 那些在数据结构中嵌套了字符串对象的对象（linkedlist 编码的列表对象、 hashtable 编码的哈希对象、 hashtable 编码的集合对象、以及 zset 编码的有序集合对象）都可以使用这些共享对象。


为什么 Redis 不共享包含字符串的对象？

redis 之所以只能使用数字共享，因为数字的复用概率最大，其次就是对于使用对象共享的关键问题就是判断相等性，只有在共享对象和目标对象完全相等的情况下，redis 才会使用共享对象。数字的比较算法复杂度是 o (1)，如果判断的是字符串，那么比较的复杂度是 o (n)，特别是长字符串更消耗性能。对于更复杂的数据结构，比如 hash、list 等，相等比较复杂度需要 o (n ^ 2)。对于单线程的 reids 来说，这显然不合理。其中只保留 10000 个对象共享也是防止对象池浪费。

3、<font color=#FF000 >字符串优化</font>

Redis自身实现的字符串结构有如下特点:

- O(1)时间复杂度获取：字符串长度，已用长度，未用长度。
- 可用于保存字节数组，支持安全的二进制数据存储。
- 内部实现空间预分配机制，降低内存再分配次数。
- 惰性删除机制，字符串缩减后的空间不释放，作为预分配空间保留。

在高并发写入场景中，<font color=#FF000 >条件允许的情况下建议字符串长度控制在39字节以内，减少创建redisObject内存分配次数从而提高性能</font>。

4、<font color=#FF000 >控制key的数量</font>

当使用Redis存储大量数据时，通常会存在<font color=#FF000 >大量键，过多的键同样会消耗大量内存</font>。Redis本质是一个数据结构服务器，它为我们提供多种数据结构，如hash，list，set，zset 等结构。使用Redis时不要进入一个误区，大量使用get/set这样的API，把Redis当成Memcached使用。对于存储相同的数据内容利用Redis的数据结构降低外层键的数量，也可以节省大量内存。如下图所示，通过在客户端预估键规模，把大量键分组映射到多个hash结构中降低键的数量。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/246a8b53-1f60-48ec-a4bc-5b077aeaef6a.png)


也欢迎关注我的公众号: `漫步coding`。 一起交流, 在coding的世界里漫步, 回复: <font color=#FF000 >`redis`</font>, 免费获取最新Redis面试题(含答案)。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5cb0c91e-fd83-4a04-8df6-65fb602b3834.png)

希望这篇文章可以帮助大家, 也希望大家都能找到的好工作。