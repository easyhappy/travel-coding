---
title: 2022年最新Charles使用教程(文中含激活码)
author: 漫步coding
date: '2022-3-28'
---

### Charles简介

俗话说: 工欲善其事，必先利其器, 前几天在安装Charles进行抓包，所以把安装过程整理了出来，希望对您有所帮助。本文首发于公众号: 漫步coding

Charles是在 Mac 下常用的网络抓包工具，在做移动开发时调试接口特别方便。不过Charles是收费软件，可以免费试用 30 天。试用期过后，未付费的用户仍然可以继续使用，但是每次使用时间不能超过 30 分钟，并且启动时将会有 10 秒种的延时。因此，该付费方案对广大用户还是相当友好的，即使你长期不付费，也能使用完整的软件功能。只是当你需要长时间进行封包调试时，会因为Charles 强制关闭而遇到影响。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/59405308-7da1-4ce1-be37-5094e93aad57.png)

### Charles 主要功能:

- 截取 Http 和 Https 网络封包
- 支持重发网络请求，方便后端调试
- 支持修改网络请求参数
- 支持网络请求的截获并动态修改
- 支持弱网测试
- 给服务器做压力测试
- 修改服务器返回内容
- 截取 iphone、android 上的网络封包
- 过滤网络请求

### 安装破解版

chares安装可以直接去官网下载，官网地址： www.charlesproxy.com

如果你不想付费， 或者说不想被30分钟那个限制干扰，可以考虑使用破解版的，之前我在网上找到了一个的Charles激活码， 需要的朋友可以关注公众号: `漫步coding` , 回复: `charles` 获取破解版软件。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5cb0c91e-fd83-4a04-8df6-65fb602b3834.png)

### 设置代理

1、点击 Help -> Local IP Address 查看 IP地址

![](https://images.xiaozhuanlan.com/uploads/photo/2022/c1ff7f71-bc2a-4100-a6dd-6704f3775e48.png)

2、然后点击Proxy -> Proxy Settings 查看端口

![](https://images.xiaozhuanlan.com/uploads/photo/2022/ef966bb2-7a77-4b71-a06d-e76b49e34c0a.png)

3、然后打开自己手机， 设置代理IP和端口

![](https://images.xiaozhuanlan.com/uploads/photo/2022/c3211c10-01f6-434e-91cc-10ef125ba2ff.png)

4、如果显示Denying access from address not on ACL:/192.168.0.101(我自己的手机在WiFi下的IP, 你可以点击自己手机WIFI， 查看手机IP)

![](https://images.xiaozhuanlan.com/uploads/photo/2022/cda22f24-c3ef-43b8-957e-fb81af4012fa.png)

5、点击Proxy -> Access Controll Setting, 将自己的手机IP 添加到访问白名单里面就可以访问了。

6、点击Proxy -> Start Throtting, 就可以进行抓包了。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/c6adbdf2-8e08-4fd0-94f6-9877dee2e8ed.png)

### 支持查看https请求

如果是https请求出现的乱码, 可以按照下面的几个步骤进行配置

1、Charles SSL 代理配置， 点击Proxy -> SSL Proxying Settings, 添加信任地址 【host】:443 ( 全信任的话 可以配置 *：443 ) 和打开Enable SSL Proxying

![](https://images.xiaozhuanlan.com/uploads/photo/2022/83ffa9bb-46ac-4690-8c54-fb43438924ec.png)

2、Mac 上做 Charles SSL证书认证，点击help -> SSL Proxying -> Install Charles Root Certificate, 会出现是否将证书加入到 系统钥匙串中，选择添加即可。提示: 如果证书显示已过期 点击help -> SSL Proxying -> Reset Charles Root Certificate 在重试步骤2。

找到证书后，去信任该证书， 都选择永久信任。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/fcc879ba-eb5a-494a-a79e-76f93ec7a525.png)

3、移动端 之 ios 系统做 Charles SSL证书认证

这时候你就需要安装Charles的CA证书了，首先到去 http://www.charlesproxy.com/ssl.zip 下载CA证书文件。双击crt文件，选择总是信任就可以了，当然如果要抓取iPhone设备上的HTTPS请求，需要在iPhone上也安装一个证书，在手机浏览器输入这个网址：http://charlesproxy.com/getssl ，点击安装即可。然后你就可以告别那烦人的乱码，可以愉快地抓包了。

4、移动端 之 android 系统做 Charles SSL证书认证

a)、注意：这里的证书文件和浏览器下载证书文件一样，也是通过Charles的提示从chls.pro/ssl或者http://charlesproxy.com/getssl下载，打开手机QQ浏览器，输入下载地址，自动下载证书文件

b)、选择通过手机浏览器下载好的Charles证书

![](https://images.xiaozhuanlan.com/uploads/photo/2022/f1123e74-108a-4213-8bbc-310c6c6ea6d7.png)

c)、注意：需要注意下载的证书文件的名称是否完整，正确的证书文件名称如上图，如果证书文件名称与上图不一致，根据作者实际使用Charles的经验，就算证书下载成功且手机提示安装成功，依然不能正确抓取https的报文的。此时我们需要换一个浏览器，建议QQ浏览器，同样在浏览器网址栏输入chls.pro/ssl下载证书，此时证书文件名称如上图，同时还需要注意如果下载的证书文件后缀非 .crt，需要将证书文件后缀修改为 .crt，文件名称不变，否则识别不了证书文件。

d)、给安装的证书命名并如下图设置

![](https://images.xiaozhuanlan.com/uploads/photo/2022/263c8e52-03d1-4215-93c1-6e63bf080643.png)

点击确定，至此手机上Charles证书安装成功，https的包不在显示为Unknown。

注意：除了手机在未安装证书的情况下，Charles抓取Https包会出现Unknown外，在网络出现问题，接口响应超时或者响应失败的情况也会出现Unknown


### 相关问题

- 最新Chareles破解教程
- Chareles激活码
- Chareles邀请码
- Chareles破解版
