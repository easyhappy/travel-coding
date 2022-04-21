---
title: 2022年Redis最新面试题 - Redis运维和部署
author: 漫步coding
date: '2022-4-19'
---


### 运维和部署

- Redis 如何设置密码及验证密码？
- Redis 如何做内存优化？

#### Redis 如何设置密码及验证密码？

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

#### Redis 如何做内存优化？

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


漫步coding还在整理中, 敬请期待, 可以关注公众号: `漫步coding` 了解最新情况...

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5cb0c91e-fd83-4a04-8df6-65fb602b3834.png)
