---
title: 如何利用VuePress和Github Page搭建一个轻量级博客
author: 漫步coding
date: '2022-3-28'
---

> 摘要: 相信每个人都想拥有一个博客, 一个属于自己写作的地方，今天讲讲如何用VuePress和github Github Pages打造一个属于自己的博客，不用建站，也不用域名的轻量级博客, 关键还支持markdown写作, 大大提高了写作的好感度。本文首发于公众号:  `漫步coding`

### 博客地址如下：

- 博客地址: [https://easyhappy.github.io/travel-coding/](https://easyhappy.github.io/travel-coding/)
- 代码地址: [https://github.com/easyhappy/travel-coding](https://github.com/easyhappy/travel-coding)

大家可以打开看看效果:

![](https://images.xiaozhuanlan.com/uploads/photo/2022/dc70d9a9-6adc-45f8-800a-f239cbe251b5.png)

### VuePress

VuePress 自然不用多说，基于 Vue 的静态网站生成器，风格简约，配置也比较简单。之所以不使用 VitePress，是因为想使用现有的主题， 而 VitePress 不兼容当前 VuePress 的生态系统，至于为什么不选择 VuePress@next，考虑到还处于 Beta 阶段，等稳定后再开始迁移。

### 安装过程

目前我用的node版本是: v16.14.2, 大家在安装之前要检查一下自己的node版本, 太低了可能安装不了。

大家也可以看VuePress的官网教程: https://v2.vuepress.vuejs.org/guide/getting-started.html

1、创建项目

```
mkdir vuepress-starter
cd vuepress-starter
```
2、初始化项目

```
git init
yarn init
```

3、安装VuePress

```
yarn add -D vuepress
```

4、将下面的script 添加到package.json中

```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

5、创建第一个文件

```
mkdir docs
echo '# Hello VuePress' > docs/README.md
```
6、运行下面的命令启动local server

```
yarn docs:dev
```

这时你访问http://localhost:8080/，如果能出现以下界面，说明到你已经搭建好了博客。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/1f2efce4-7317-4d1f-8fc4-795c923c9d44.png)

7、基础配置

在docs目录下创建一个 .vuepress 目录，所有 VuePress 相关的文件都会被放在这里。

命令

```
mkdir docs/.vuepress
touch docs/.vuepress/config.js
```

此时你的项目结构可能是这样：

```
.
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
└─ package.json
```

8、在 .vuepress 文件夹下添加 config.js，配置网站的标题和描述，方便 SEO：

```
cat > docs/.vuepress/config.js
```

```
module.exports = {
  title: '漫步coding的博客',
  description: '公众号: 漫步coding, 欢迎大家关注， 一个聚焦于算法、数据库、架构的公众号'
}

```

这个时候就可以看到网站title 已经变成了: 漫步coding的博客

![](https://images.xiaozhuanlan.com/uploads/photo/2022/722bb0a7-edb5-4e37-b46a-df95cbb92abe.png)


9、添加导航栏

我们现在在页首的右上角添加导航栏，修改 config.js:

```
module.exports = {
  title: '漫步coding的博客',
  description: '公众号: 漫步coding, 欢迎大家关注， 一个聚焦于算法、数据库、架构的公众号',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { 
          text: '漫步coding 博客', 
          items: [
              { text: 'Github', link: 'https://github.com/easyhappy/travel-coding' },
              { text: '公众号', link: 'https://mp.weixin.qq.com/s/Npkk0oHEszZrUP2yRiTaSA' }
          ]
      }
    ]
  }
}
```

运行效果如下:

![](https://images.xiaozhuanlan.com/uploads/photo/2022/cad03c42-c7f5-44ee-9acc-228a0dc17618.png)

10、添加左侧边栏

现在我们添加一些 md 文档，目前文档的目录如下：

运行以下命令

命令1:

```
mkdir docs/about
cat > docs/about/brief.md
Hello 大家好，我是公众号: 漫步coding 的作者, 很高兴我们能在这里相聚。可以关注公众号, 一起交流。
```
命令2:

```
mkdir docs/mysql
cat >  docs/mysql/brief

一般来讲在面试当中， 关于数据库相关的面试题频率出现比较高的几个关键词是SQL优化、索引、存储引擎、事务、死锁、乐观锁、悲观锁、关系型数据库和非关系数据库对比等等。 把这几个点问完基本也差不多10~20分钟了(一般一轮面试1小时左右), 基本这些可以让面试官对你的数据库知识有一定的了解了。

如果你线上运维经验, 一般也会问一些比如数据库扩容, 如何给大表加索引, 如何在业务高峰是给一个大表添加字段等。
```

目前文档的目录如下：

```
.
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
 |  └─ mysql
 |      └─ brief.md
 |  └─ about
 |      └─ brief.md
 |
└─ package.json
```

11、设置docs/.vuepressconfig.js sidebar模块, 添加左侧导航栏, 完成设置如下:

```
module.exports = {
  title: '漫步coding的博客',
  description: '公众号: 漫步coding, 欢迎大家关注， 一个聚焦于算法、数据库、架构的公众号',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { 
          text: '漫步coding 博客', 
          items: [
              { text: 'Github', link: 'https://github.com/easyhappy/travel-coding' },
              { text: '公众号', link: 'https://mp.weixin.qq.com/s/Npkk0oHEszZrUP2yRiTaSA' }
          ]
      }
    ],
    sidebar: [
        {
          title: 'mysql',
          path: '/',
          collapsable: false, // 不折叠
          children: [
              { title: "前言", path: "/mysql/brief"},
          ]
        },

        {
          title: '关于我',
          path: '/',
          collapsable: false, // 不折叠
          children: [
              { title: "公众号", path: "/about/brief"},
          ]
        }
      ]
  }
}
```

效果图如下:

![](https://images.xiaozhuanlan.com/uploads/photo/2022/39ca6560-5cb2-4ed5-b257-38506719cc2f.png!large)

12、设置博客主题

```
yarn add vuepress-theme-reco
```

将以下代码放到config.js中
```
module.exports = {
  // ...
  theme: 'reco'
  // ...
}  
```

就可以自主设置显示模式了。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/b30be0eb-edd6-46a4-a92e-b2b06bae9e44.png)

13、此时基本完成了VuePress的搭建, 下面就是将博客发布到Github Page上。我们在 Github 上新建一个仓库，这里我取得仓库名为：travel-coding。

```
module.exports = {
    // 路径名为 "/<您建的REPO名字>/"
    base: '/travel-coding/',
    //...
}
```

14、将下面添加一些文件或者目录放到.gitignore文件中.

```
echo 'node_modules' >> .gitignore
echo '.temp' >> .gitignore
echo '.cache' >> .gitignore
```

15、然后我们在项目 vuepress-starter 目录下建立一个脚本文件：deploy.sh，注意修改一下对应的用户名和仓库名：

```
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

### imporant 注意替换 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:easyhappy/travel-coding.git master:gh-pages

cd -
```

16、运行命令, 会将编译好的博客文件, push到github 项目的gh-pages

```
sh deploy.sh
```

17、在项目的Settings -> Pages 就可以看到对应的博客地址， 也可以自己设置根目录和自定义域名

![](https://images.xiaozhuanlan.com/uploads/photo/2022/d4572751-b084-4219-b882-5f28e11a9549.png)


我最后生成的博客地址: [https://easyhappy.github.io/travel-coding/](https://easyhappy.github.io/travel-coding/)  
代码地址: [https://github.com/easyhappy/travel-coding](https://github.com/easyhappy/travel-coding)

到此为止, 我们就完成了 VuePress 和 Github Pages 的部署。

让我们一起漫步coding, enjoy your self.


18、扩展篇 给博客添加评论功能


a)、创建 GitHub OAuth App

这里我们使用 GitHub 作为托管平台，打开 GitHub 的开发者设置：https://github.com/settings/developers

b)、选择「Oauth Apps」，然后点击「Register a new application」:

我用的是 vuepress-theme-reco 主题，主题内置评论插件 @vuepress-reco/vuepress-plugin-comments，可以根据自己的喜好选择 Valine 或者 Vssue。

c)、修改 config.js

```

module.exports = {
  ...
  theme: 'reco',
  themeConfig: {
    vssueConfig: {
      platform: 'github',
      owner: 'OWNER_OF_REPO',
      repo: 'NAME_OF_REPO',
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
    }
  }
  ...
}

```

重新部署一下, 就可以看到效果了:

![](https://images.xiaozhuanlan.com/uploads/photo/2022/f658db90-e44b-4054-a925-8b518ceab5fd.png)


