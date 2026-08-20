+++
title = "非典型题目: 恢复被打乱的神经网络层序"
date = "2026-05-17T00:00:00+08:00"
draft = false
categories = ["problems", "machine learning"]
+++

## 背景

题目来源是 Jane Street: https://huggingface.co/spaces/jane-street/droppedaneuralnet . 看到题目的第一反应是, 有数据有参数恢复一个 permutation, 这应该很简单吧? Jane Street 降智了? 正好拿来试试 AI 的能力.

## 解题过程
题目直接给 Codex (26 年春节后不久的某个版本) 它的方向完全不对, 说明这至少是一道全新的题目, 不 trivial.

给了几个粗暴的 data driven 思路让 Codex 尝试, 比如用给的数据训练一些同样结构的网络再学层序和参数的相关性, 都有一些效果但很快卡住, 也不知道离正确答案差多远, 48 层的 permutation 刚好碰到 NP-hard 的强度, 题目还是有点水平的.

重新仔细审题, 发现 residual 的线索: 后层 bias 不仅直接连到输出, 也互相通过 residual 连接, (一部分)梯度是稳定传递的. 按这个思路根据 bias 相似性排序,能得到很漂亮的图. 解决一半了. 

这时候大意了,又觉得题目简单, 又丢给 Codex data driven 学前后层的关联, 效果还是很差. 启动人脑思考, 回忆起读博时那些让人痛苦的近似算法, 至少要有一个 heuristic 方向, 突然醒悟 loss 就是现成的 heuristic. 然后又大意了, 让 Codex 按 loss 搜索, 弄出了一坨愚蠢而勤奋的 beam search. 无奈又启动人脑思考, 现在的问题是: 每次选一层, 中间步骤没有反馈, 全部选完可以得到结果. RL啊, 显然是 RL, 这还要人脑想么, AI 这都意识不到? 失望. 

不过 Codex 执行还是没问题的, 很快验证了 soft permutation 不行, 但 policy gradient 有效果. 但 loss 始终还不够小, 暴力搜索两步发现有一个后层错了, 摆正后就是正确结果了. 

## 总结

确实是一道好题目. 

首先是新, 看梯度和 policy gradient 都是简单方法 (应该不是唯一解法), 但整体结构甚至没有相似的, 所以(当时的) AI 毫无办法. 现在题目已经放出来太久了, 说不定 Fable 5 之类 已经学会了.

其次是难度得当, 48!大小正好, 后层梯度也有一些干扰(可能是分阶段训练或者训练时冻住了最后一层之类), 有一些亲自做的人才能体会到的地方. 

结论: 人类 > AI . 

AI 做辅助工作是足够的, 这是 Codex 整理的代码: https://github.com/chenzhao/janestreet-drop-a-net .



