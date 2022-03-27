module.exports = {
    themeConfig: {
        nav: ['漫步coding的博客'],
        title: "漫步coding的博客",
        themeConfig: {
         subSidebar: 'auto'
        },
        sidebar: [
            {
              title: "漫步coding",
              path: '/about_me/',
              collapsable: false, // 不折叠
            },
            {
                title: 'MySQL系列教程',
                path: '/#',
                collapsable: false, // 不折叠
                children: [
                    { title: "MySQL最新面试题及思维导图", path: "/mysql/MySQL最新面试题及思维导图", collapsable: false},
                ]
            },
            {
                title: 'IDEA系列教程',
                path: '/#',
                collapsable: false, // 不折叠
                children: [
                    { title: "2022年PyCharm最新破解教程", path: "/idea/PyCharm最新破解教程", collapsable: false},
                    { title: "2022年Goland最新破解教程", path: "/idea/Goland最新破解教程", collapsable: false},
                    { title: "2022年IntelliJIDEA最新破解教程", path: "/idea/IntelliJIDEA最新破解教程", collapsable: false},
                    { title: "2022年PhpStorm最新破解教程", path: "/idea/PhpStorm最新破解教程", collapsable: false},
                    { title: "2022年webStorm最新破解教程", path: "/idea/webStorm最新破解教程", collapsable: false},
                ]
            },
            {
              title: '开发工具',
                path: '/#',
                collapsable: false, // 不折叠
                children: [
                    { title: "2022年最新Charles使用教程(文中含激活码)", path: "/tools/最新Charles使用教程", collapsable: false},
                ]
            }
          ]
    }
}