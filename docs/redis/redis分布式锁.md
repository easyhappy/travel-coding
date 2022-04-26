---
title: 2022年Redis最新面试题 - Redis分布式锁
author: 漫步coding
date: '2022-4-14'
---



- 你知道实现实现分布式锁有哪些方案?


#### 你知道实现实现分布式锁有哪些方案?

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

也欢迎关注我的公众号: `漫步coding`。 一起交流, 在coding的世界里漫步, 回复: <font color=#FF000 >`redis`</font>, 免费获取最新Redis面试题(含答案)。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5cb0c91e-fd83-4a04-8df6-65fb602b3834.png)

希望这篇文章可以帮助大家, 也希望大家都能找到的好工作。