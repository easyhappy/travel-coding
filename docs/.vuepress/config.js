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
      clientId: '8022a11ea627286012fb',
      clientSecret: '2f67f50e620b7095b3a35b8cd634e41267bc4a4d',
    },
    sidebar: [
            {
              title: "首页",
              path: '/',
              collapsable: true // 不折叠
            },
            
            {
                title: '2026年MySQL最新面试题',
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
              title: '2026年Redis最新面试题',
                collapsable: true, // 不折叠
                children: [
                    { title: "前言", path: "/redis/前言", collapsable: false},
                    { title: "Redis基础知识", path: "/redis/redis基础知识", collapsable: false},
                    { title: "Redis数据结构", path: "/redis/redis数据结构", collapsable: false},
                    { title: "Redis事务", path: "/redis/redis事务", collapsable: false},
                    { title: "Redis数据持久化", path: "/redis/redis数据持久化", collapsable: false},
                    { title: "Redis集群", path: "/redis/redis集群", collapsable: false},
                    { title: "Redis淘汰策略", path: "/redis/redis淘汰策略", collapsable: false},
                    { title: "Redis分布式锁", path: "/redis/redis分布式锁", collapsable: false},
                    { title: "Redis缓存问题", path: "/redis/redis缓存问题", collapsable: false},
                    { title: "Redis运维和部署", path: "/redis/redis运维和部署", collapsable: false},
                ]
            },
            {
              title: 'LeetCode高频算法面试题',
              collapsable: true, // 不折叠
              children: [
                  { title: "前言", path: "/leetcode/前言", collapsable: false},
                  { title: "0001 - 两数之和", path: "/leetcode/001_两数之和", collapsable: false},
                  { title: "0002 - 两数相加", path: "/leetcode/002_两数相加", collapsable: false},
                  { title: "0003 - 无重复字符的最长子串", path: "/leetcode/003_无重复字符的最长子串", collapsable: false},
                  { title: "0004 - 寻找两个正序数组的中位数", path: "/leetcode/004_寻找两个正序数组的中位数", collapsable: false},
                  { title: "0005 - 最长回文子串", path: "/leetcode/005_最长回文子串", collapsable: false},
                  { title: "0006 - Z字形变换", path: "/leetcode/006_Z字形变换", collapsable: false},
                  { title: "0007 - 整数反转", path: "/leetcode/007_整数反转", collapsable: false},
                  { title: "0008 - 字符串转换整数atoi", path: "/leetcode/008_字符串转换整数atoi", collapsable: false},
                  { title: "0009 - 回文数", path: "/leetcode/009_回文数", collapsable: false},
                  { title: "0010 - 正则表达式匹配", path: "/leetcode/010_正则表达式匹配", collapsable: false},
                  { title: "0011 - 盛最多水的容器", path: "/leetcode/011_盛最多水的容器", collapsable: false},
                  { title: "0015 - 三数之和", path: "/leetcode/015_三数之和", collapsable: false},
                  { title: "017 - 电话号码的字母组合", path: "/leetcode/017_电话号码的字母组合", collapsable: false},
                  { title: "更多内容, 漫步coding正在整理中...", collapsable: false},
              ]
            },
            // {
            //   title: '2026年互联网大厂最新面试题',
            //     collapsable: true, // 不折叠
            //     children: [
            //         { title: "前言", path: "/interview/前言", collapsable: false},
            //         { title: "阿里巴巴面试题", path: "/interview/阿里巴巴", collapsable: false},
            //         { title: "漫步coding正在整理中,敬请期待...", collapsable: false},
            //     ]
            // },
            // {
            //     title: 'IDEA系列教程',
            //     collapsable: true, // 不折叠
            //     children: [
            //         { title: "2026年PyCharm最新破解教程", path: "/idea/PyCharm最新破解教程", collapsable: false},
            //         { title: "2026年Goland最新破解教程", path: "/idea/Goland最新破解教程", collapsable: false},
            //         { title: "2026年IntelliJIDEA最新破解教程", path: "/idea/IntelliJIDEA最新破解教程", collapsable: false},
            //         { title: "2026年PhpStorm最新破解教程", path: "/idea/PhpStorm最新破解教程", collapsable: false},
            //         { title: "2026年webStorm最新破解教程", path: "/idea/webStorm最新破解教程", collapsable: false},
            //         { title: "2026年AppCode最新破解教程", path: "/idea/AppCode最新破解教程", collapsable: false},
            //     ]
            // },

            {
              title: '开发工具',
                collapsable: true, // 不折叠
                children: [
                    { title: "2026年最新Charles使用教程(文中含激活码)", path: "/tools/最新Charles使用教程", collapsable: false},
                    { title: "VuePress和GithubPage博客搭建", path: "/tools/VuePress和GithubPage博客搭建", collapsable: false},
                ]
            },
            {
              title: "公众号",
              collapsable: true, // 不折叠
              children: [
                    { title: "关注公众号", path: "/about_me/wechat", collapsable: false}
                ]
            },
          ]
  },
}