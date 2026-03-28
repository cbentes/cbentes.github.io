---
layout: post
title: JEPA for audio encoding
date: 2026-02-23 10:00:00
description: JEPA architecture for audio encoding
tags: JEPA
categories: research encoder pinch
thumbnail: assets/img/post_jepa_encoding/thumbnail_wave.png
toc:
  sidebar: left
---


## Intro

> Our initial findings were published in the following blog post: [JEPA-v0: a self-supervised audio encoder for real-time speech translation](https://startpinch.com/research/en/jepa-encoder-translation)
{: .block-tip }

As part of our research at Pinch, we explored how the Joint-Embedding Predictive Architecture (JEPA) can be used to encode audio signal. JEPA is an emerging self-supervised learning method with big implications for how we can leverage unlabeled audio data and model semantics. Here my goal is just to highlight learnings and organize some thoughts.

## Collapse

Without explicit constraints, JEPA training can collapse to trivial solutions where all inputs map to the same representation. The most common safeguard is the Exponential Moving Average (EMA) target encoder. By stopping gradients through the target branch, EMA breaks the symmetry between the two encoders and removes the gradient signal that would otherwise drive both toward a trivial minimum.

Recent literature shows that we can add regularization terms to the loss function that directly penalize collapse. SIGreg (used in LeJEPA) regularizes the covariance matrix to prevent dimensional collapse, while LpJEPA takes a different route using Lp-norm sparsity to enforce a spread-out distribution of embeddings.


## Semantic low-pass filter

JEPA's prediction-in-latent-space objective creates a strong inductive bias toward slowly varying features. 
This was what we found during our encoder development for Interspeech 2026, where we over-represented speaker/prosodic features and under-represented phonemic detail. JEPA does capture phonetic content when architectural choices (multi-layer target averaging, short mask spans, Transformer backbones) are deliberately tuned to counteract the low-pass bias. The precise cutoff frequency of this "filter" is a design parameter, not a fixed property of the architecture.

In our case, using a 12.5Hz temporal resolution meant we would do well in tasks that require low modulation rate (like speaker identity) but have difficulty in tasks requiring higher frequency resolution (like phonemic content).

The combination of masking and EMA creates a cascaded low-pass filter.

**The masking strategy imposes a Nyquist-like frequency cutoff** <br>
The relationship between mask span and recoverable temporal modulation frequencies follows from elementary sampling theory. Using a Nyquist-like argument, we can expect that the context encoder can only support prediction of features whose modulation period exceeds roughly $$2T_{\text{mask}}$$. This makes mask span a primary tuning knob: we can use ~50–100 ms spans for phoneme-heavy tasks, ~200–400 ms for prosodic/semantic tasks, and even try ~1+ s for speaker/emotion tasks.

**The EMA target encoder applies a second temporal smoothing stage** <br>
The EMA update rule creates an exponential moving average. The target encoder averages over representations spanning hours of training data. This means the target encoder's parameters evolve on a timescale far longer than any single utterance, creating target representations that emphasize features stable across many utterances.


## Trajectory and Translation

There are possible ways to counterbalance the low-pass filter behavior and recover phonetic content. The most direct one is adjusting mask length. Shorter masks force the predictor to reconstruct finer temporal detail, shifting the bias back toward phonemic features at the cost of making the prediction task easier.

Context also helps. Given surrounding phonemes and prosodic cues, the next phoneme is partially predictable. As the predictor learns these statistical regularities, it indirectly forces the encoder to represent enough phonemic detail for those predictions to succeed.

Different layers of the encoder capture different levels of information: speaker identity concentrates in early/middle layers, phonemic content in middle layers, and semantic information in upper layers. Averaging targets across multiple layers, rather than using only the final layer, can produce representations that retain phonetic detail that would otherwise be smoothed away.


## References

JEPA-v0: a self-supervised audio encoder for real-time speech translation - 
[https://startpinch.com/research/en/jepa-encoder-translation](https://startpinch.com/research/en/jepa-encoder-translation)

Audio-JEPA: Joint-Embedding Predictive Architecture for Audio Representation Learning - 
[https://arxiv.org/abs/2507.02915](https://arxiv.org/abs/2507.02915)

JEPA as a Neural Tokenizer: Learning Robust Speech Representations with Density Adaptive Attention - 
[https://arxiv.org/abs/2512.07168](https://arxiv.org/abs/2512.07168)

Dual Perspectives on Non-Contrastive Self-Supervised Learning - 
[https://arxiv.org/abs/2507.01028](https://arxiv.org/abs/2507.01028)

LeJEPA: Provable and Scalable Self-Supervised Learning Without the Heuristics
[https://arxiv.org/abs/2511.08544](https://arxiv.org/abs/2511.08544)

Rectified LpJEPA: Joint-Embedding Predictive Architectures with Sparse and Maximum-Entropy Representations
[https://arxiv.org/abs/2602.01456](https://arxiv.org/abs/2602.01456)

---

CB
