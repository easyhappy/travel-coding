(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{599:function(n,s,t){"use strict";t.r(s);var e=t(17),a=Object(e.a)({},(function(){var n=this,s=n.$createElement,t=n._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[t("p",[n._v("给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。")]),n._v(" "),t("p",[n._v("注意：答案中不可以包含重复的三元组。")]),n._v(" "),t("p",[t("font",{attrs:{color:"#FF000"}},[n._v("题目难度: ★★★, 中等")])],1),n._v(" "),t("p",[n._v("示例 1：")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("输入：nums = [-1,0,1,2,-1,-4]\n输出：[[-1,-1,2],[-1,0,1]]\n")])])]),t("p",[n._v("示例 2：")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("输入：nums = []\n输出：[]\n")])])]),t("p",[n._v("示例 3：")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("输入：nums = [0]\n输出：[]\n")])])]),t("p",[n._v("提示：")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("0 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5\n")])])]),t("h3",{attrs:{id:"解题思路"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#解题思路"}},[n._v("#")]),n._v(" 解题思路")]),n._v(" "),t("ul",[t("li",[n._v("首先对数组进行排序，排序后固定一个数 nums[i]，再使用左右指针指向 nums[i]后面的两端，数字分别为 nums[left] 和 nums[right]，计算三个数的和 sum 判断是否满足为 0，满足则添加进结果集")]),n._v(" "),t("li",[n._v("如果 nums[i]大于 0，则三数之和必然无法等于 0，结束循环")]),n._v(" "),t("li",[n._v("如果 nums[i] = nums[i-1]，则说明该数字重复，会导致结果重复，所以应该跳过")]),n._v(" "),t("li",[n._v("当 sum = 0 时，nums[left] = nums[left+1] 说明结果重复，应该跳过left+1，left++")]),n._v(" "),t("li",[n._v("当 sum = 0 时，nums[right] = nums[right−1] 说明结果重复，应该跳过right-1，right--")]),n._v(" "),t("li",[n._v("当 sum < 0 时, 移动left, left++")]),n._v(" "),t("li",[n._v("当 sum > 0 时, 移动right, right--")]),n._v(" "),t("li",[n._v("时间复杂度：O(n^2)，n 为数组长度")])]),n._v(" "),t("p",[t("font",{attrs:{color:"#FF000"}},[n._v("这题的重点是要先排序，排序后在遍历，可以降低时间复杂度")]),n._v("。")],1),n._v(" "),t("h3",{attrs:{id:"代码实现"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#代码实现"}},[n._v("#")]),n._v(" 代码实现")]),n._v(" "),t("blockquote",[t("p",[n._v("tips: 以下代码是使用Go代码实现的不同解法, 文章最后可以看C++、C、Java、Python实现")])]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("func threeSum(nums []int) [][]int {\n  result := make([][]int, 0)\n  length := len(nums)\n  if length < 3 {\n    return result\n  }\n\n  sort.Ints(nums)\n  i := 0\n  for{\n    if i >= length-2{\n      break\n    }\n    if nums[i] > 0 {\n      break\n    }\n    if i > 0 && nums[i] == nums[i-1]{\n      i += 1\n      continue\n    }\n    left := i +1\n    right := length - 1\n\n    for {\n      if left >= right{\n        break\n      }\n      sum := nums[i] + nums[left] + nums[right]\n\n      if sum == 0{\n        result = append(result, []int{nums[i], nums[left], nums[right]})\n        for {\n          if left < right && nums[left] == nums[left+1]{\n            left += 1\n          }else{\n            left += 1\n            break\n          }\n\n        }\n\n        for{\n          if left < right && nums[right] == nums[right-1]{\n            right -=1\n          }else{\n            right -= 1\n            break\n          }\n        }\n      }\n\n      if sum < 0{\n        left += 1\n      }\n\n      if sum > 0{\n        right -= 1\n      }\n    }\n\n    i += 1\n  }\n\n  return result\n}\n")])])]),t("p",[t("img",{attrs:{src:"https://images.xiaozhuanlan.com/uploads/photo/2022/424ad5a2-e9d9-497f-84b0-634e29e07f1e.png!large",alt:""}})]),n._v(" "),t("h3",{attrs:{id:"其他语言版本实现"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#其他语言版本实现"}},[n._v("#")]),n._v(" 其他语言版本实现")]),n._v(" "),t("p",[n._v("1、Java")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("class Solution {\n    public static List<List<Integer>> threeSum(int[] nums) {\n        List<List<Integer>> ans = new ArrayList();\n        int len = nums.length;\n        if(nums == null || len < 3) return ans;\n        Arrays.sort(nums); // 排序\n        for (int i = 0; i < len ; i++) {\n            if(nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环\n            if(i > 0 && nums[i] == nums[i-1]) continue; // 去重\n            int L = i+1;\n            int R = len-1;\n            while(L < R){\n                int sum = nums[i] + nums[L] + nums[R];\n                if(sum == 0){\n                    ans.add(Arrays.asList(nums[i],nums[L],nums[R]));\n                    while (L<R && nums[L] == nums[L+1]) L++; // 去重\n                    while (L<R && nums[R] == nums[R-1]) R--; // 去重\n                    L++;\n                    R--;\n                }\n                else if (sum < 0) L++;\n                else if (sum > 0) R--;\n            }\n        }        \n        return ans;\n    }\n}\n")])])]),t("p",[t("img",{attrs:{src:"https://images.xiaozhuanlan.com/uploads/photo/2022/2b4d0877-3aad-42ba-b122-43a11ad60139.png!large",alt:""}})]),n._v(" "),t("p",[n._v("2、Javascript")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar threeSum = function(nums) {\n    let ans = [];\n    const len = nums.length;\n    if(nums == null || len < 3) return ans;\n    nums.sort((a, b) => a - b); // 排序\n    for (let i = 0; i < len ; i++) {\n        if(nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环\n        if(i > 0 && nums[i] == nums[i-1]) continue; // 去重\n        let L = i+1;\n        let R = len-1;\n        while(L < R){\n            const sum = nums[i] + nums[L] + nums[R];\n            if(sum == 0){\n                ans.push([nums[i],nums[L],nums[R]]);\n                while (L<R && nums[L] == nums[L+1]) L++; // 去重\n                while (L<R && nums[R] == nums[R-1]) R--; // 去重\n                L++;\n                R--;\n            }\n            else if (sum < 0) L++;\n            else if (sum > 0) R--;\n        }\n    }        \n    return ans;\n};\n")])])]),t("p",[t("img",{attrs:{src:"https://images.xiaozhuanlan.com/uploads/photo/2022/5164e6cd-e985-46ca-a0e7-abdba8360e38.png!large",alt:""}})]),n._v(" "),t("p",[n._v("3、Python3")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        \n        n=len(nums)\n        res=[]\n        if(not nums or n<3):\n            return []\n        nums.sort()\n        res=[]\n        for i in range(n):\n            if(nums[i]>0):\n                return res\n            if(i>0 and nums[i]==nums[i-1]):\n                continue\n            L=i+1\n            R=n-1\n            while(L<R):\n                if(nums[i]+nums[L]+nums[R]==0):\n                    res.append([nums[i],nums[L],nums[R]])\n                    while(L<R and nums[L]==nums[L+1]):\n                        L=L+1\n                    while(L<R and nums[R]==nums[R-1]):\n                        R=R-1\n                    L=L+1\n                    R=R-1\n                elif(nums[i]+nums[L]+nums[R]>0):\n                    R=R-1\n                else:\n                    L=L+1\n        return res\n\n")])])]),t("p",[t("img",{attrs:{src:"https://images.xiaozhuanlan.com/uploads/photo/2022/20c39eb7-2497-4717-9f96-c7f2b6ab6583.png!large",alt:""}})]),n._v(" "),t("p",[n._v("4、C++")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        int n = nums.size();\n        sort(nums.begin(), nums.end());\n        vector<vector<int>> ans;\n        // 枚举 a\n        for (int first = 0; first < n; ++first) {\n            // 需要和上一次枚举的数不相同\n            if (first > 0 && nums[first] == nums[first - 1]) {\n                continue;\n            }\n            // c 对应的指针初始指向数组的最右端\n            int third = n - 1;\n            int target = -nums[first];\n            // 枚举 b\n            for (int second = first + 1; second < n; ++second) {\n                // 需要和上一次枚举的数不相同\n                if (second > first + 1 && nums[second] == nums[second - 1]) {\n                    continue;\n                }\n                // 需要保证 b 的指针在 c 的指针的左侧\n                while (second < third && nums[second] + nums[third] > target) {\n                    --third;\n                }\n                // 如果指针重合，随着 b 后续的增加\n                // 就不会有满足 a+b+c=0 并且 b<c 的 c 了，可以退出循环\n                if (second == third) {\n                    break;\n                }\n                if (nums[second] + nums[third] == target) {\n                    ans.push_back({nums[first], nums[second], nums[third]});\n                }\n            }\n        }\n        return ans;\n    }\n};\n")])])]),t("p",[t("img",{attrs:{src:"https://images.xiaozhuanlan.com/uploads/photo/2022/f66fe651-356e-40e5-ab36-b2134e198f22.png!large",alt:""}})]),n._v(" "),t("h3",{attrs:{id:"不用语言版本运行情况对比"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#不用语言版本运行情况对比"}},[n._v("#")]),n._v(" 不用语言版本运行情况对比")]),n._v(" "),t("p",[t("img",{attrs:{src:"https://images.xiaozhuanlan.com/uploads/photo/2022/74fdfcec-15f7-4d18-822d-2cd3728e9f38.png!large",alt:""}})]),n._v(" "),t("p",[n._v("也欢迎关注我的公众号: "),t("code",[n._v("漫步coding")]),n._v("。 一起交流, 在coding的世界里漫步。")]),n._v(" "),t("p",[t("img",{attrs:{src:"https://images.xiaozhuanlan.com/uploads/photo/2022/5cb0c91e-fd83-4a04-8df6-65fb602b3834.png",alt:""}})])])}),[],!1,null,null,null);s.default=a.exports}}]);