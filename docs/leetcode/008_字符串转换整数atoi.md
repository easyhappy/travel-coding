---
title: LeetCode高频算法面试题 - 008 -  字符串转换整数 (atoi)
author: 漫步coding
date: '2022-5-6'
---


请你来实现一个 myAtoi(string s) 函数，使其能将字符串转换成一个 32 位有符号整数（类似 C/C++ 中的 atoi 函数）。

函数 myAtoi(string s) 的算法如下：

- 读入字符串并丢弃无用的前导空格  
- 检查下一个字符（假设还未到字符末尾）为正还是负号，读取该字符（如果有）。 确定最终结果是负数还是正数。 如果两者都不存在，则假定结果为正。   
- 读入下一个字符，直到到达下一个非数字字符或到达输入的结尾。字符串的其余部分将被忽略。  
- 将前面步骤读入的这些数字转换为整数（即，"123" -> 123， "0032" -> 32）。如果没有读入数字，则整数为 0 。必要时更改符号（从步骤 2 开始）。  
- <font color=#FF000 >如果整数数超过 32 位有符号整数范围 [−2^31,  2^31 − 1]</font> ，需要截断这个整数，使其保持在这个范围内。具体来说，小于 −2^31 的整数应该被固定为 −2^31 ，大于 2^31 − 1 的整数应该被固定为 2^31 − 1 。  
- 返回整数作为最终结果。  

<font color=#FF000 >注意：</font>

本题中的空白字符只包括空格字符 ' ' 。   
除前导空格或数字后的其余字符串外，请勿忽略 任何其他字符。   
 

<font color=#FF000 >题目难度: ★★</font>

示例 1：

```
输入：s = "42"
输出：42
```

解释：

```
第 1 步："42"（当前没有读入字符，因为没有前导空格）
         ^
第 2 步："42"（当前没有读入字符，因为这里不存在 '-' 或者 '+'）
         ^
第 3 步："42"（读入 "42"）
           ^
解析得到整数 42 。
由于 "42" 在范围 [-2^31, 2^31 - 1] 内，最终结果为 42 。
```

示例 2：

```
输入：s = "   -42"
输出：-42
```

解释：

```
第 1 步："   -42"（读入前导空格，但忽视掉）
            ^
第 2 步："   -42"（读入 '-' 字符，所以结果应该是负数）
             ^
第 3 步："   -42"（读入 "42"）
               ^
解析得到整数 -42 。
由于 "-42" 在范围 [-2^31, 2^31 - 1] 内，最终结果为 -42 。
```

示例 3：

```
输入：s = "4193 with words"
输出：4193
```

解释：  

```
第 1 步："4193 with words"（当前没有读入字符，因为没有前导空格）  
         ^ 
第 2 步："4193 with words"（当前没有读入字符，因为这里不存在 '-' 或者 '+'）  
         ^
第 3 步："4193 with words"（读入 "4193"；由于下一个字符不是一个数字，所以读入停止）  
             ^
解析得到整数 4193 。  
由于 "4193" 在范围 [-231, 231 - 1] 内，最终结果为 4193 。  
```

提示：

```
0 <= s.length <= 200
s 由英文字母（大写和小写）、数字（0-9）、' '、'+'、'-' 和 '.' 组成
```

### 代码实现

> tips: 以下代码是使用Go代码实现的不同解法, 文章最后可以看C++、C、Java、Python实现

<font color=#FF000 >这题整体难度中等， 主要考察的地方是一些边界情况的处理</font>

```
func myAtoi(str string) int {
  if str == "" {
    return 0
  } 
  x := 0
  for {
    if x >= len(str) -1 {
      break
    }
    if str[x] == 32 {
      str = str[x+1:]
    } else {
      break
    }
  }

  if str[0] != 45 && str[0] != 43 && isNumChar(str[0]) == 0 {
    return 0
  }
  flag := 0  // 是否负数
  if str[0] == 45 {
    flag = 1
  }
  if str[0] == 43 {
    flag = 0
  }
  // 去除头
  if str[0] == 45 || str[0] == 43 {
    str = str[1:len(str)]
  }
  if str == "" {
    return 0
  } 
  ssum := 0

  for i := 0; i < len(str); i++ {
    if isNumChar(str[i]) == 1 {
      ssum = ssum*10 + int(str[i] - 48)
      if ssum > mi(2, 31) || ssum < 0  {
        // 溢出
        ssum = mi(2, 31)
        break
      }
    } else {
      break
    }
  }

  if flag == 1 {
    if ssum > mi(2, 31) || ssum < 0  {
      ssum = mi(2, 31)
    }
    ssum = ssum * (-1)
  } else {
    if ssum >= mi(2, 31) || ssum < 0 {
      ssum = mi(2, 31) - 1 
    }
  }
  return ssum

}

func mi(d byte, count int) int {
  sum := 1
  for i := 0; i < count; i++ {
    sum = int(d) * sum
    if sum > 2147483647 || sum < 0  {
      // 溢出
      sum = 2147483648
      break
    }
  }
  return sum
}

func isNumChar(u byte) int{
  if  48 <= u &&  u <= 57 {
    return 1
  } else {
    return 0
  }
}

```

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5a4c0a6f-e4a8-4ad1-ba55-96d1e3ca3932.png)


### 其他语言版本

1、Python3

```
INT_MAX = 2 ** 31 - 1
INT_MIN = -2 ** 31

class Automaton:
    def __init__(self):
        self.state = 'start'
        self.sign = 1
        self.ans = 0
        self.table = {
            'start': ['start', 'signed', 'in_number', 'end'],
            'signed': ['end', 'end', 'in_number', 'end'],
            'in_number': ['end', 'end', 'in_number', 'end'],
            'end': ['end', 'end', 'end', 'end'],
        }
        
    def get_col(self, c):
        if c.isspace():
            return 0
        if c == '+' or c == '-':
            return 1
        if c.isdigit():
            return 2
        return 3

    def get(self, c):
        self.state = self.table[self.state][self.get_col(c)]
        if self.state == 'in_number':
            self.ans = self.ans * 10 + int(c)
            self.ans = min(self.ans, INT_MAX) if self.sign == 1 else min(self.ans, -INT_MIN)
        elif self.state == 'signed':
            self.sign = 1 if c == '+' else -1

class Solution:
    def myAtoi(self, str: str) -> int:
        automaton = Automaton()
        for c in str:
            automaton.get(c)
        return automaton.sign * automaton.ans

```

![](https://images.xiaozhuanlan.com/uploads/photo/2022/66e0e700-e792-4cbd-a505-901800acf6bd.png)

2、C++

```
class Automaton {
    string state = "start";
    unordered_map<string, vector<string>> table = {
        {"start", {"start", "signed", "in_number", "end"}},
        {"signed", {"end", "end", "in_number", "end"}},
        {"in_number", {"end", "end", "in_number", "end"}},
        {"end", {"end", "end", "end", "end"}}
    };

    int get_col(char c) {
        if (isspace(c)) return 0;
        if (c == '+' or c == '-') return 1;
        if (isdigit(c)) return 2;
        return 3;
    }
public:
    int sign = 1;
    long long ans = 0;

    void get(char c) {
        state = table[state][get_col(c)];
        if (state == "in_number") {
            ans = ans * 10 + c - '0';
            ans = sign == 1 ? min(ans, (long long)INT_MAX) : min(ans, -(long long)INT_MIN);
        }
        else if (state == "signed")
            sign = c == '+' ? 1 : -1;
    }
};

class Solution {
public:
    int myAtoi(string str) {
        Automaton automaton;
        for (char c : str)
            automaton.get(c);
        return automaton.sign * automaton.ans;
    }
};
```



![](https://images.xiaozhuanlan.com/uploads/photo/2022/47b91ef2-20d7-4b7e-b81f-b7bacaf230ae.png)

3、Java

```
class Solution {
    public int myAtoi(String str) {
        Automaton automaton = new Automaton();
        int length = str.length();
        for (int i = 0; i < length; ++i) {
            automaton.get(str.charAt(i));
        }
        return (int) (automaton.sign * automaton.ans);
    }
}

class Automaton {
    public int sign = 1;
    public long ans = 0;
    private String state = "start";
    private Map<String, String[]> table = new HashMap<String, String[]>() {{
        put("start", new String[]{"start", "signed", "in_number", "end"});
        put("signed", new String[]{"end", "end", "in_number", "end"});
        put("in_number", new String[]{"end", "end", "in_number", "end"});
        put("end", new String[]{"end", "end", "end", "end"});
    }};

    public void get(char c) {
        state = table.get(state)[get_col(c)];
        if ("in_number".equals(state)) {
            ans = ans * 10 + c - '0';
            ans = sign == 1 ? Math.min(ans, (long) Integer.MAX_VALUE) : Math.min(ans, -(long) Integer.MIN_VALUE);
        } else if ("signed".equals(state)) {
            sign = c == '+' ? 1 : -1;
        }
    }

    private int get_col(char c) {
        if (c == ' ') {
            return 0;
        }
        if (c == '+' || c == '-') {
            return 1;
        }
        if (Character.isDigit(c)) {
            return 2;
        }
        return 3;
    }
}
```

![](https://images.xiaozhuanlan.com/uploads/photo/2022/c99be988-654a-4597-aa86-872c2747c1be.png)


### 几种语言运行效果对比

![](https://images.xiaozhuanlan.com/uploads/photo/2022/02cf74f7-48b3-441a-8abe-36e85660e0a8.png)

也欢迎关注我的公众号: `漫步coding`。 一起交流, 在coding的世界里漫步。

![](https://images.xiaozhuanlan.com/uploads/photo/2022/5cb0c91e-fd83-4a04-8df6-65fb602b3834.png)

