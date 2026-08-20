+++
title = "机器学习中的错误数据"
date = "2026-01-11T00:35:08+08:00"
draft = false
translate = false

categories = ["research", "machine learning"]
+++

尝试理清楚机器学习数据的错误是哪来的以及如何处理. 

监督学习可以在给定 $X Y$
的前提下 work 是很直观的, 选一个 hypothesis $X Y \sim P $ 
推断 P 的参数即可, 懂基本的统计概率知识就能理解. 然而有些工作 claim 没有准确的 Y 也能 work , 就没那么直观了. 

最简单的情况, 二分类器 h 在真实世界的表现叫 true risk/generalization error  R(h) 是观察不到的, 但可以用有限 X Y 得到的empirical risk $\hat{R}(h)$ 去估计, 两者的差距叫做 generalization gap. PAC 理论在这里用 hoeffding 不等式 (简化形式) 
$$P(\hat{\mu}-\mu \geq \epsilon ) \leq e^{-2n\epsilon^2}$$
给一个宽到除了推公式就没什么用的 bound: 
$$ R(h) \leq \hat{R}(h) + \sqrt{\frac{\ln(2/\delta)}{2n}} , \delta= 2e^{-2n\epsilon^2}$$
不过至少证明了: 数据越多估计越准(废话...), 具体影响是 $O(\frac{1}{\sqrt{n}})$

(插一句: hoeffding的证明也用到指数+概率相乘这个trick, 参见指数那篇). 

另外, 一般假设理论上最优的分类器也是会犯错的, 因为真实世界往往不同类型的特征分布有重叠, 即 P(y=1|x)>0 and P(y=0|x)>0, 这时即使知道所有特征的后验 (e.g. P(y=1|x)=0.9, P(y=0|x)=0.1), 也只能做到每次都选大的那个, 把选错的比例降到最低, 这也就是所谓的 bayes 分类器, 记作$h^{\ast}$. 显然 $0 \leq R(h^{\ast})\leq R(h) \approx \hat{R}(h)$ .
 训练的目的是缩小与最优的分类器的差距 $R(h)-R(h^{\ast})$ 叫做 excess risk (机器学习理论还会在这里说还存在一个符合 hypothesis 的最优 h, hypothesis本身存在 approximation error, 公式很漂亮, 实际没什么用).  实际上, 训练得到的模型经常在train split 上表现好过 R(h) (用 test split 估计), 这个差距也被叫做 generalization gap(粗暴的 PAC 理论应用: 相比于 hypothesis 空间 training split 足够大的话, overfitting 就不是问题了). 

下面来看数据质量对模型的影响: 若 Y 有 p 的概率翻转 (这里简化为标签无关的翻转, 复杂情况见: https://proceedings.neurips.cc/paper/2013/file/3871bd64012152bfb53fdf04b401193f-Paper.pdf ), 设在原始 Y 的错误率是 R(h), 翻转 Y 上的错误率是$R'(h)$, $R'(h)$ 
有两部分,在原始Y上分错且没有翻转的部分是 (1-p)R(h) , 在原始 Y 分对但翻转了的部分是 p(1-R(h)), so 
$$R'(h)=(1-p)R(h)+p(1-R(h))= p + (1-2p)R(h) $$
上边的关系里的h是任意分类器, 那显然它对于最优的 h* 也成立, 两个关系相减一下就得到
$$ R'(h)-R'(h^{\ast})=(1-2p)(R(h)-R(h^{\ast})) $$
也就是说 p 的翻转会让 excess risk 增加1/(1-2p)倍, 看起来有点惊悚, 但其实影响不大, 因为 excess risk 通常不大. E.g. bayes acc 95% acc 90% 的话, 即使 p 20% , gap 从 5% 变为 8.3% , acc 最多损失 3.3% 而已. 如果用上边 pac 的 bound $O(1/\sqrt{n})$ 此时数据的效率其实是降低了 $(1-2p)^2$ , 即要消除这 3.3%的损失, 需要吓人的 $n/(1-2p)^2=2.78 n$ 条数据. again, pac bound 是个非常宽的 bound, 所以这 2.78n 是个保守的理论保证, 实际意义不大. 但这带来一个新问题, 在预算有限的情况下, 应该降低 p 还是增加 n ? 

这是一个很重要而且研究了很久的问题, 最近还有新进展( https://arxiv.org/abs/2402.02249 ). active learning 需要判断下一步干什么, crowdsourcing 需要制定标注方案, etc. . 大家建模都不太一样, 这个问题目前并没有统一的解决框架. 


<!-- 以 crowdsourcing 来说, 目标分为几类: 如何用已有标注推断真值; 标注预算怎么花标的最准; 整体标注过程如何提高模型表现.  -->

<!-- 最早的crowdsourcing一般追溯到1979的一个工作, 简称 DS Dawid–Skene . DS 假设每个 worker 有个按类别的 confusion matrix, 不同 worker 是独立的, 然后用 EM 推断所有 matrix .  -->


我们把 data programming/snorkel 和 crowdsourcing 看成一类工作, 它们都是从标签的来源出发. 理论上，Snorkel 和 crowdsourcing 的核心是同一个问题: 多噪声来源的标签推断. 真实标签 $Y$ 未知，只能观察多个信息源 $S_1,\ldots,S_m$ 给出的不可靠标签，通过建模 $P(S_1,\ldots,S_m\mid Y)$ 来估计信息源的可靠性和真实标签的后验概率。
简单的 crowdsourcing 模型, i.e. DS, 假设每个 worker 有个按类别的 confusion matrix, 不同 worker 是独立的, 然后用 EM 推断所有 matrix .
Snorkel 的模型类似，只是把人类 worker 换成了 labeling function（LF）：LF 可以输出某个类别，也可以 abstain. 与 crowdsourcing 在设定上的的主要区别是 LF 个数是有限的但可以无成本调用. 另外 snorkel 认为 LF 之间是有相关性的, 从这个角度, DS 可以看作 Snorkel 的一个不考虑相关性的特例(后续的 crowdsourcing 工作也有考虑 worker 相关性的, 但不主流). Snorkel 的后续中最新的是 FABLE , 假设 LF 表现是和题目相关的(从crowdsourcing 工作借鉴来的假设...),  不过在后续的弱监督 benchmark 里, DS 经常表现更好. 所以实际上提升标注质量最有用的方法是写更多 LF . 





另一个角度是 Confident Learning , 尝试用训练结果去推测哪些数据有问题, 删掉这些数据会让训练效果更好(符合上边的 1-2p 结论). 
CL 的流程很简单: cross validation 训练一些模型去预测每个 y , 如果模型预测结果与标签不一致且模型很坚定, 就认为标错了. 
具体做法也很直观 (符号是随手写的,可能与原文不同), 
假设标签是按照类别翻转得到的, 翻转概率矩阵: $T_{ij}= P(\tilde{y}=j|y=i)$, 其中$T_{ii}>T_{i\neg i}, T_{\neg ii}$(很合理的假设) , 若分类器是理想的(核心假设), 实际是 i 类被分成 j 类的概率就应该也是 $\hat{p}(j|y=i) = T_{ij}$ .

因为每个类别都有翻转到 j 的可能, 对于一个实际是 i 表面是 j 的 x, 它被理想分类器分为 j 的概率是 $\hat{p}(j|y=i, \tilde{y}=j)$ , 根据理想分类器假设, 这个概率与$\tilde{y}$无关, 始终是 $T_{ij}$. (这是个过强的假设, 符合这个假设的话 CL 是 100% 的效果, 所以这并不影响 CL 实际很有效)

那么表面为 j 类的样本 x 被理想分类器分为 j 的(边缘)概率是

 $$ 
\begin{aligned}
 t_j=& \sum_i \hat{p}(j|y=i, \tilde{y}=j) P(y=i|\tilde{y}=j)  \\
 =  &\sum_i T_{ij}P(y=i|\tilde{y}=j)
\end{aligned}
  $$

后边的概率是表面 j 的真实来源, 和是 1, 因此 $t_j$ 是$T$的$j$行的加权平均. 

额外推一步没什么用的性质: 权重 
$$P(y=i|\tilde{y}=j) = \frac{P(\tilde{y}=j|y=i) P(y=i)}{P(\tilde{y}=j)}= \frac{T_{ij} P(y=i)}{P(\tilde{y}=j)}$$
 这里边表面标签分布$P(\tilde(y)=j)$是真实标签分布经过 T 翻转得来的
$$P(\tilde{y}=j) = \sum_{i}T_{ij}P(y=i)$$
代回去就会发现
$$t_j=\frac{\sum_{i}T_{ij}^2P(y=i)}{\sum_{i}T_{ij}P(y=i)}$$
只和 T 与真实标签分布分布有关.  (因为有理想分类器假设, 很合理)

 
另一方面, 所有表面为 j 的数据子集是$X_j$, 实际模型预测为 j 概率均值  $\frac{\sum_{x\in X_j} p(j|x)}{|X_j|} \approx E[\hat{p}(j)|\tilde{y}=j]$ , 是$t_j$的一个无偏估计.

用 $t_j$ 
去筛选所有被分为 j 类的样本, 只计概率更大的样本, $C_{ij} = |\{\tilde{y}=i , \hat{p}(j)>t_j\}|$ . 因为是加权平均而且假设$T_{jj}$在行里最大, $t_j$保证小于 $T_{jj}$ ; 如果有多个分类的概率都大于$t_j$, 就选概率最大的分类, 因为假设$T_{jj}$在列里也最大 . 选出来就是比较可信的分类样本.    
矩阵 C 归一化一下就可以估出 T 了.
