module.exports = {
  // site config
  lang: 'en-US',
  title: '漫步coding',
  description: '漫步coding的博客',
  base: '/travel-coding/',
  theme: 'reco',
  themeConfig: {
    themeConfig: {
     subSidebar: 'auto'
    },
    vssueConfig: {
      platform: 'github',
      owner: 'easyhappy',
      repo: 'travel-coding',
      clientId: 'c98ad941018b4a89cccd',
      clientSecret: 'c93bdc23a86b43fe665812ce57daa05996929c09',
    },
    sidebar: [
            {
              title: "首页",
              path: '/',
              collapsable: true // 不折叠
            },
            
            {
                title: '2022年MySQL最新面试题',
                collapsable: true, // 不折叠
                children: [
                    { title: "前言", path: "/mysql/前言", collapsable: false},
                    { title: "数据库基础知识", path: "/mysql/数据库基础知识", collapsable: false},
                    { title: "索引", path: "/mysql/索引", collapsable: false},
                    { title: "存储引擎", path: "/mysql/存储引擎", collapsable: false},
                    { title: "事务", path: "/mysql/事务", collapsable: false},
                    { title: "数据库锁", path: "/mysql/数据库锁", collapsable: false},
                    { title: "视图", path: "/mysql/视图", collapsable: false},
                    { title: "触发器", path: "/mysql/触发器", collapsable: false},
                    { title: "常用SQL语句", path: "/mysql/常用SQL语句", collapsable: false},
                    { title: "SQL优化", path: "/mysql/SQL优化", collapsable: false},
                    { title: "数据库优化", path: "/mysql/数据库优化", collapsable: false},
                    { title: "部署和运维", path: "/mysql/部署和运维", collapsable: false},
                    { title: "MySQL最新面试题及思维导图", path: "/mysql/MySQL最新面试题及思维导图", collapsable: false},
                ]
            },
            {
              title: '2022年Redis最新面试题',
                collapsable: true, // 不折叠
                children: [
                    { title: "前言", path: "/redis/前言", collapsable: false},
                    { title: "Redis基础知识", path: "/redis/redis基础知识", collapsable: false},
                    { title: "Redis数据结构", path: "/redis/redis数据结构", collapsable: false},
                    { title: "漫步coding还在整理中, 敬请期待...", path: "", collapsable: false},
                ]
            },
            {
                title: 'IDEA系列教程',
                collapsable: true, // 不折叠
                children: [
                    { title: "2022年PyCharm最新破解教程", path: "/idea/PyCharm最新破解教程", collapsable: false},
                    { title: "2022年Goland最新破解教程", path: "/idea/Goland最新破解教程", collapsable: false},
                    { title: "2022年IntelliJIDEA最新破解教程", path: "/idea/IntelliJIDEA最新破解教程", collapsable: false},
                    { title: "2022年PhpStorm最新破解教程", path: "/idea/PhpStorm最新破解教程", collapsable: false},
                    { title: "2022年webStorm最新破解教程", path: "/idea/webStorm最新破解教程", collapsable: false},
                    { title: "2022年AppCode最新破解教程", path: "/idea/AppCode最新破解教程", collapsable: false},
                ]
            },

            {
              title: '开发工具',
                collapsable: true, // 不折叠
                children: [
                    { title: "2022年最新Charles使用教程(文中含激活码)", path: "/tools/最新Charles使用教程", collapsable: false},
                    { title: "VuePress和GithubPage博客搭建", path: "/tools/VuePress和GithubPage博客搭建", collapsable: false},
                ]
            },
            {
              title: "公众号",
              collapsable: true, // 不折叠
              children: [
                    { title: "关注公众号", path: "/about_me/", collapsable: false},
                    { title: "添加微信", path: "/about_me/wechat", collapsable: false},
                ]
            },
          ]
  },
}