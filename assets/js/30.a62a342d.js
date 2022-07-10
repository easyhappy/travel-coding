(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{592:function(n,s,a){"use strict";a.r(s);var t=a(17),r=Object(t.a)({},(function(){var n=this,s=n.$createElement,a=n._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[a("p",[n._v("将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。")]),n._v(" "),a("p",[a("font",{attrs:{color:"#FF000"}},[n._v("题目难度: ★★, 中等")])],1),n._v(" "),a("p",[n._v('比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：')]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("P   A   H   N\nA P L S I I G\nY   I   R\n")])])]),a("p",[n._v('之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。')]),n._v(" "),a("p",[n._v("请你实现这个将字符串进行指定行数变换的函数：")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("string convert(string s, int numRows);\n")])])]),a("p"),n._v(" "),a("p",[n._v("示例 1：")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('输入：s = "PAYPALISHIRING", numRows = 3\n输出："PAHNAPLSIIGYIR"\n')])])]),a("p",[n._v("示例 2：")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('输入：s = "PAYPALISHIRING", numRows = 4\n输出："PINALSIGYAHRPI"\n解释：\n\nP     I    N\nA   L S  I G\nY A   H R\nP     I\n')])])]),a("p",[n._v("示例 3：")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('输入：s = "A", numRows = 1\n输出："A"\n')])])]),a("p"),n._v(" "),a("p",[n._v("提示：")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("1 <= s.length <= 1000\ns 由英文字母（小写和大写）、',' 和 '.' 组成\n1 <= numRows <= 1000\n\n")])])]),a("h3",{attrs:{id:"代码实现"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代码实现"}},[n._v("#")]),n._v(" 代码实现")]),n._v(" "),a("blockquote",[a("p",[n._v("tips: 以下代码是使用Go代码实现的不同解法, 文章最后可以看C++、C、Java、Python实现")])]),n._v(" "),a("p",[n._v("解题思路:")]),n._v(" "),a("p",[n._v('可以根据官方给的实例为例，比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时')]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("L   C   I   R\nE T O E S I I G\nE   D   H   N\n")])])]),a("p",[n._v("每满 行数-1 ("),a("code",[n._v("numRows-1")]),n._v(") 可以为一组，因为字符串每第numRows个元素是Z形字符串的方向转折点。")]),n._v(" "),a("p",[n._v("如上图")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("分组: LE   ET  CO   DE ...等等为一组，\n组数: 0    1   2    3\n顺序: 正序 倒序 正序  倒序...\n")])])]),a("p",[n._v("important: "),a("font",{attrs:{color:"#FF000"}},[n._v("当组数为偶数时给数组("),a("code",[n._v("strArr")]),n._v(")正序赋值，当组数为奇数时数组("),a("code",[n._v("strArr")]),n._v(")倒序赋值即可")]),n._v("。")],1),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('func convert(s string, numRows int) string {\n  if numRows == 1 {\n    return s\n  }\n\n  b := numRows - 1\n  strArr := make([]string, numRows)\n  for k, v := range s {\n    if (k/b)%2 == 0 { // 组数是偶数\n      strArr[k%b] += string(v) // 数组(`strArr`)正序赋值\n    } else {\n      strArr[b-(k%b)] += string(v) // 数组(`strArr`)倒序赋值\n    }\n  }\n  return strings.Join(strArr,"")\n}\n')])])]),a("p",[n._v("执行结果分析:")]),n._v(" "),a("p",[n._v("时间复杂度: O(n)"),a("br"),n._v("\n空间复杂度: O(n)")]),n._v(" "),a("p",[a("img",{attrs:{src:"https://images.xiaozhuanlan.com/uploads/photo/2022/bc412453-9ba1-4dd5-9e7d-bf10d9018e17.png",alt:""}})]),n._v(" "),a("h3",{attrs:{id:"其他版本的语言实现"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#其他版本的语言实现"}},[n._v("#")]),n._v(" 其他版本的语言实现")]),n._v(" "),a("p",[n._v("1、Python3")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("        反转   反转    反转\nL       C      I      R\nE   T   O   E  S   I  I   G\nE       D      H      N\n反转    反转    反转    反转\n")])])]),a("p",[n._v("算法思路:")]),n._v(" "),a("ul",[a("li",[n._v("i 初始化 为0， flag = -1")]),n._v(" "),a("li",[n._v("res[i] += c, 将遍历每个字符 放入对应的行中")]),n._v(" "),a("li",[n._v("i += flag, 更新当前字符c 的所在的数组索引")]),n._v(" "),a("li",[a("strong",[n._v("important")]),n._v(": 引入一个flag, 初始化=-1, "),a("font",{attrs:{color:"#FF000"}},[n._v("当达到Z字形顶点, 方向反转")]),n._v(" flag=-flag.")],1)]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('class Solution:\n    def convert(self, s: str, numRows: int) -> str:\n        if numRows < 2: return s\n        res = ["" for _ in range(numRows)]\n        i, flag = 0, -1\n        for c in s:\n            res[i] += c\n            if i == 0 or i == numRows - 1: flag = -flag\n            i += flag\n        return "".join(res)\n\n')])])]),a("p",[a("img",{attrs:{src:"https://images.xiaozhuanlan.com/uploads/photo/2022/c232f507-0b31-4bde-9b9e-618ed6fff198.png",alt:""}})]),n._v(" "),a("p",[n._v("2、Java")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("        反转   反转    反转\nL       C      I      R\nE   T   O   E  S   I  I   G\nE       D      H      N\n反转    反转    反转    反转\n")])])]),a("p",[n._v("算法思路和上面的Python3的思路一样:")]),n._v(" "),a("ul",[a("li",[n._v("i 初始化 为0， flag = -1")]),n._v(" "),a("li",[n._v("res[i] += c, 将遍历每个字符 放入对应的行中")]),n._v(" "),a("li",[n._v("i += flag, 更新当前字符c 的所在的数组索引")]),n._v(" "),a("li",[a("strong",[n._v("important")]),n._v(": 引入一个flag, 初始化=-1, "),a("font",{attrs:{color:"#FF000"}},[n._v("当达到Z字形顶点, 方向反转")]),n._v(" flag=-flag.")],1)]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("class Solution {\n    public String convert(String s, int numRows) {\n        if(numRows < 2) return s;\n        List<StringBuilder> rows = new ArrayList<StringBuilder>();\n        for(int i = 0; i < numRows; i++) rows.add(new StringBuilder());\n        int i = 0, flag = -1;\n        for(char c : s.toCharArray()) {\n            rows.get(i).append(c);\n            if(i == 0 || i == numRows -1) flag = - flag;\n            i += flag;\n        }\n        StringBuilder res = new StringBuilder();\n        for(StringBuilder row : rows) res.append(row);\n        return res.toString();\n    }\n}\n\n")])])]),a("p",[a("img",{attrs:{src:"https://images.xiaozhuanlan.com/uploads/photo/2022/84eff0e8-902d-489d-9e19-1e951b5e1d21.png",alt:""}})]),n._v(" "),a("p",[n._v("3、C++")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("        反转   反转    反转\nL       C      I      R\nE   T   O   E  S   I  I   G\nE       D      H      N\n反转    反转    反转    反转\n")])])]),a("p",[n._v("算法思路和上面的Python3的思路一样:")]),n._v(" "),a("ul",[a("li",[n._v("i 初始化 为0， flag = -1")]),n._v(" "),a("li",[n._v("res[i] += c, 将遍历每个字符 放入对应的行中")]),n._v(" "),a("li",[n._v("i += flag, 更新当前字符c 的所在的数组索引")]),n._v(" "),a("li",[a("strong",[n._v("important")]),n._v(": 引入一个flag, 初始化=-1, "),a("font",{attrs:{color:"#FF000"}},[n._v("当达到Z字形顶点, 方向反转")]),n._v(" flag=-flag.")],1)]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("class Solution {\npublic:\n  string convert(string s, int numRows) {\n\n    if (numRows == 1) return s;\n\n    vector<string> res(min(numRows, int(s.size()))); // 防止s的长度小于行数\n    int i = 0;\n    int flag = -1;\n\n    for (char c : s) {\n      res[i] += c;\n      if (i == 0 || i == numRows - 1) {// 当前行i为0或numRows -1时，flag发生反向转折\n        flag = -flag;\n      }\n      i += flag;\n    }\n\n    string ret;\n    for (string row : res) {// 从上到下遍历行\n      ret += row;\n    }\n\n    return ret;\n  }\n};\n")])])]),a("p",[a("img",{attrs:{src:"https://images.xiaozhuanlan.com/uploads/photo/2022/7f46bd53-cbc2-41fe-9d89-124bcec2347e.png",alt:""}})]),n._v(" "),a("h3",{attrs:{id:"几种语言运行效果对比"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#几种语言运行效果对比"}},[n._v("#")]),n._v(" 几种语言运行效果对比")]),n._v(" "),a("p",[n._v("Go程序在内存方面表现最佳, Python在内存和运行时间表现 比较其他的语言都比较差。")]),n._v(" "),a("p",[a("img",{attrs:{src:"https://images.xiaozhuanlan.com/uploads/photo/2022/c2d8c17b-9ad9-4efa-aed3-39a746f2dfd5.png",alt:""}})]),n._v(" "),a("p",[n._v("也欢迎关注我的公众号: "),a("code",[n._v("漫步coding")]),n._v("。 一起交流, 在coding的世界里漫步。")]),n._v(" "),a("p",[a("img",{attrs:{src:"https://images.xiaozhuanlan.com/uploads/photo/2022/5cb0c91e-fd83-4a04-8df6-65fb602b3834.png",alt:""}})])])}),[],!1,null,null,null);s.default=r.exports}}]);