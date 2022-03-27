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
                title: 'IDEA破解教程',
                path: '/',
                collapsable: false, // 不折叠
                children: [
                    { title: "MySQL系列教程", path: "/", collapsable: false },
                    { title: "2022 年 PyCharm 最新破解教程", path: "/idea/PyCharm破解", collapsable: false},
                ]
            }
          ]
    }
}