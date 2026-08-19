+++
title = "An Unusual Problem: Recovering the Order of a Scrambled Neural Network"
date = "2026-07-17T00:00:00+08:00"
draft = false
categories = ["problems"]
translation_source_hash = "0c395bd670bf003925b61c789ad07e27678fd6f55945d89a888e621e69149aae"
ai_translation = true
translation_source_language = "zh"
+++

## Background

The problem came from Jane Street: https://huggingface.co/spaces/jane-street/droppedaneuralnet. My first reaction was: there is data, there are model parameters, and we only need to recover a permutation. This should be easy, right? Has Jane Street made the problem too simple? It also seemed like a good test of AI's abilities.

## How I Solved It

I gave the problem directly to Codex (a version from shortly after the 2026 Spring Festival). It went in the completely wrong direction. This showed that the problem was at least new and not trivial.

I suggested several direct, data-driven approaches. For example, I asked Codex to train networks with the same structure and learn the relationship between layer order and parameters. These approaches made some progress, but quickly got stuck. There was also no way to tell how far they were from the correct answer. A permutation of 48 layers is just large enough to have NP-hard-level complexity. The problem was better than I had first thought.

I then read the problem more carefully and noticed the residual connections. The biases of the back layers connect directly to the output, and they are also connected to one another through the residual path. This means that part of the gradient passes through them in a stable way. Sorting the layers by bias similarity produced a very clear graph. Half of the problem was solved.

At this point, I became careless again and thought the rest would be easy. I asked Codex to learn the relationship between the front and back layers from data, but the result was still poor. I had to think about it myself. I remembered the painful approximation algorithms from my PhD years: at minimum, the search needed a heuristic direction. Then I realized that the loss itself was already the heuristic.

I asked Codex to search using the loss. It produced a large, hardworking, but foolish beam search. I had to think again. The real structure of the problem was this: we choose one layer at a time, receive no feedback during the intermediate steps, and get a result only after choosing all the layers. That is clearly a reinforcement learning problem. Why did a human still have to notice this? I was disappointed.

Codex was good at execution, however. It quickly confirmed that a soft permutation did not work, while policy gradient did. The loss was still not small enough. A brute-force search over two steps showed that one back layer was in the wrong position. After moving it to the correct position, the full order was recovered.

## Summary

This was a genuinely good problem.

First, it was new. Looking at the gradients and using policy gradient are both simple ideas, and they are probably not the only solution. But the overall structure had no close precedent, so AI at the time could not solve it. The problem has now been public for a long time, so perhaps models such as Fable 5 have already learned it.

Second, the difficulty was well chosen. A search space of `48!` is just large enough. The gradients of the back layers also contain some noise, possibly because the model was trained in stages or because the final layer was frozen during training. These details are hard to appreciate without solving the problem yourself.

Conclusion: humans > AI.

AI was still useful for the supporting work. Codex organized the code here: https://github.com/chenzhao/janestreet-drop-a-net.
