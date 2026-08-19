+++
title = "Label Error in Machine Learning"
date = "2026-08-19T23:57:10+08:00"
draft = false
translation_source_hash = "f4b43aa24e72607751bcc2bebe2a4bc25da29d82b50459742cb90fc4f88112a4"
+++

An attempt to explain clearly where errors in machine learning data come from and how to eliminate them.

It is intuitive that supervised learning can work given $X Y$: choose a hypothesis $X Y \sim P$ and infer the parameters of $P$; anyone with basic probability and statistics can understand it. However, some work claims it can work even without accurate $Y$, which is less intuitive.

In the simplest case, the real-world performance of a binary classifier $h$ is called the true risk / generalization error $R(h)$, which cannot be observed, but it can be estimated by the empirical risk $\hat{R}(h)$ obtained from finite $X Y$; the gap between the two is called the generalization gap. Here PAC theory uses Hoeffding's inequality (simplified form)
$$P(\hat{\mu}-\mu \geq \epsilon ) \leq e^{-2n\epsilon^2}$$
to give a bound so loose that it is useless except for deriving formulas:
$$ R(h) \leq \hat{R}(h) + \sqrt{\frac{\ln(2/\delta)}{2n}} , \delta= 2e^{-2n\epsilon^2}$$
At least it proves: the more data, the more accurate the estimate (well, duh...), specifically with effect $O(\frac{1}{\sqrt{n}})$.

(A side note: the proof of Hoeffding's inequality also uses the trick of exponentiating and multiplying probabilities; see the exponential post.)

Also, it is generally assumed that even the theoretically optimal classifier makes mistakes, because in the real world feature distributions of different classes often overlap, i.e. $P(y=1|x)>0$ and $P(y=0|x)>0$. In this case, even if we know the posterior for all features (e.g. $P(y=1|x)=0.9$, $P(y=0|x)=0.1$), the best we can do is always choose the larger one, minimizing the proportion of mistakes; this is the so-called Bayes classifier, denoted $h^{\ast}$. Obviously $0 \leq R(h^{\ast})\leq R(h) \approx \hat{R}(h)$.
The goal of training is to narrow the gap to the optimal classifier; $R(h)-R(h^{\ast})$ is called the excess risk (ML theory would also say here that there exists an optimal $h$ within the hypothesis class, and the hypothesis class itself has approximation error; the formulas are pretty but practically useless). In practice, trained models often perform better on the train split than the $R(h)$ estimated on the test split; this gap is also called the generalization gap (a crude application of PAC theory: if the training split is large enough relative to the hypothesis space, overfitting is not a problem).

Next, look at the effect of data quality on the model. Suppose $Y$ has probability $p$ of being flipped (here simplified to label-independent flipping; for more complex cases see: https://proceedings.neurips.cc/paper/2013/file/3871bd64012152bfb53fdf04b401193f-Paper.pdf ). Let the error rate on the original $Y$ be $R(h)$, and the error rate on the flipped $Y$ be $R'(h)$. $R'(h)$
has two parts: the part misclassified on the original $Y$ and not flipped is $(1-p)R(h)$, and the part correct on the original $Y$ but flipped is $p(1-R(h))$, so
$$R'(h)=(1-p)R(h)+p(1-R(h))= p + (1-2p)R(h).$$
The $h$ in the relation above is an arbitrary classifier, so it obviously also holds for the optimal $h^{\ast}$; subtracting the two gives
$$ R'(h)-R'(h^{\ast})=(1-2p)(R(h)-R(h^{\ast})). $$
That is to say, a flip probability of $p$ increases the excess risk by a factor of $1/(1-2p)$. This looks a bit frightening, but its actual impact is small because excess risk is usually small. For example, if Bayes accuracy is 95% and model accuracy is 90%, even with $p=20\%$, the gap goes from 5% to 8.3%, and accuracy at most loses 3.3%. If we use the PAC bound $O(1/\sqrt{n})$ above, the data efficiency is actually reduced by a factor of $(1-2p)^2$; that is, to eliminate this 3.3% loss one needs a frightening $n/(1-2p)^2=2.78n$ samples. Again, the PAC bound is a very loose bound, so this 2.78n is a conservative theoretical guarantee and of little practical significance. But this raises a new question: under a limited budget, should one reduce $p$ or increase $n$?

This is an important problem that has been studied for a long time, and there has even been recent progress ( https://arxiv.org/abs/2402.02249 ). Active learning needs to decide what to do next, crowdsourcing needs to design labeling schemes, etc. People's models differ quite a bit, and there is currently no unified solution framework for this problem.

<!-- For crowdsourcing, the goals can be divided into several categories: how to infer true labels from existing annotations; how to spend the annotation budget to label most accurately; how to improve model performance over the whole labeling process. -->

<!-- The earliest crowdsourcing work is usually traced back to a 1979 paper, abbreviated DS, Dawid–Skene. DS assumes each worker has a per-class confusion matrix, different workers are independent, and then uses EM to infer all the matrices. -->

We view data programming/Snorkel and crowdsourcing as one line of work: they both start from the source of labels. In theory, the core of Snorkel and crowdsourcing is the same problem: label inference from multiple noisy sources. The true label $Y$ is unknown; one can only observe unreliable labels from multiple information sources $S_1,\ldots,S_m$; by modeling $P(S_1,\ldots,S_m\mid Y)$, one estimates the reliability of the information sources and the posterior probability of the true label.
A simple crowdsourcing model, i.e. DS, assumes each worker has a per-class confusion matrix, different workers are independent, and then uses EM to infer all the matrices.
Snorkel's model is similar, except that human workers are replaced by labeling functions (LFs): an LF can output a class or abstain. The main difference in setup from crowdsourcing is that the number of LFs is finite but they can be called at no cost. In addition, Snorkel assumes that LFs are correlated; from this perspective, DS can be viewed as a special case of Snorkel that does not consider correlation (later crowdsourcing work also considers worker correlation, but it is not mainstream). Among Snorkel's follow-ups, the latest is FABLE, which assumes LF performance is instance-dependent (an assumption borrowed from crowdsourcing work...), but in later weak-supervision benchmarks, DS often performs better. So in practice, the most useful way to improve labeling quality is to write more LFs.

Another angle is Confident Learning, which tries to use training results to infer which data points are problematic; removing these data makes training perform better (consistent with the $1-2p$ conclusion above).
The CL workflow is simple: train some models via cross-validation to predict each $y$; if the model's prediction disagrees with the label and the model is very confident, then the label is considered mislabeled.
The concrete procedure is also intuitive (the notation here is written casually and may differ from the original paper).
Assume that labels are produced by class-wise flipping, with flip probability matrix $T_{ij}= P(\tilde{y}=j|y=i)$, where $T_{ii}>T_{i\neg i}, T_{\neg ii}$ (a very reasonable assumption). If the classifier is ideal (the core assumption), the probability that true class $i$ is assigned to class $j$ should also be $\hat{p}(j|y=i) = T_{ij}$.

Because every class has some probability of being flipped to $j$, for an $x$ that is actually class $i$ and appears as class $j$, the probability that the ideal classifier assigns it to $j$ is $\hat{p}(j|y=i, \tilde{y}=j)$. By the ideal-classifier assumption, this probability is independent of $\tilde{y}$ and is always $T_{ij}$. (This is too strong an assumption; if it were satisfied, CL would be 100% effective, so this does not affect the fact that CL is very effective in practice.)

Then the (marginal) probability that a sample $x$ with apparent label $j$ is assigned to $j$ by the ideal classifier is

$$
\begin{aligned}
 t_j=& \sum_i \hat{p}(j|y=i, \tilde{y}=j) P(y=i|\tilde{y}=j)  \\
 =  &\sum_i T_{ij}P(y=i|\tilde{y}=j)
\end{aligned}
$$

The latter probability is the true source of apparent label $j$; these probabilities sum to 1, so $t_j$ is a weighted average of the $j$-th column of $T$.

An extra property that is not very useful: the weight
$$P(y=i|\tilde{y}=j) = \frac{P(\tilde{y}=j|y=i) P(y=i)}{P(\tilde{y}=j)}= \frac{T_{ij} P(y=i)}{P(\tilde{y}=j)}.$$
Here the apparent label distribution $P(\tilde{y}=j)$ is obtained by flipping the true label distribution through $T$:
$$P(\tilde{y}=j) = \sum_{i}T_{ij}P(y=i).$$
Substituting back gives
$$t_j=\frac{\sum_{i}T_{ij}^2P(y=i)}{\sum_{i}T_{ij}P(y=i)},$$
which depends only on $T$ and the true label distribution. (Because of the ideal-classifier assumption, this is quite reasonable.)

On the other hand, for the subset of data whose apparent label is $j$, denoted $X_j$, the actual model's average predicted probability of class $j$, $\frac{\sum_{x\in X_j} p(j|x)}{|X_j|} \approx E[\hat{p}(j)|\tilde{y}=j]$, is an unbiased estimate of $t_j$.

Using $t_j$ to filter all samples classified as class $j$, keep only samples with probability greater than $t_j$: $C_{ij} = |\{\tilde{y}=i , \hat{p}(j)>t_j\}|$. Because $t_j$ is a weighted average and by assumption $T_{jj}$ is the largest in its row, $t_j$ is guaranteed to be smaller than $T_{jj}$; if multiple classes have probability larger than $t_j$, choose the class with the largest probability, because by assumption $T_{jj}$ is also the largest in its column. The selected samples are the more trustworthy class samples.
Normalizing the matrix $C$ then gives an estimate of $T$.
