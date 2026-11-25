# asu2304.github.io

**🔗 [asu2304.github.io](https://asu2304.github.io/)**

Personal revision notes by Ashutosh Patidar, served with GitHub Pages. The notes cover maths and machine learning: one page per lecture or chapter, most with interactive demos.

## Notes

| Section | Source | What's inside | Status |
|---|---|---|---|
| [Linear Algebra](https://asu2304.github.io/linear-algebra/) | Gilbert Strang, MIT 18.06 | All 34 lectures read through an ML / DL lens, a PCA prologue, and a revision sheet. | Complete |
| [Probability and Statistics](https://asu2304.github.io/probability-statistics/) | — | — | Coming soon |
| [SQL for Data Science](https://asu2304.github.io/sql/) | Nitish Singh, CampusX | 12 chapters and a practice session, with quizzes and an in-browser SQL lab. | Complete |
| [OOP in Python](https://asu2304.github.io/oop/) | Nitish Singh, CampusX | 10 parts: classes and objects, constructors and self, own data types, encapsulation, reference variables, static members, aggregation and inheritance, super() and MRO, overloading and a project. | Complete |
| [Machine Learning](https://asu2304.github.io/machine-learning/) | Arun Rajkumar, DA5400 (IIT Madras) | All 74 lectures: PCA and kernels, clustering, estimation and EM, regression, classification, ensembles, loss functions and neural networks. Plus my own notes and a 5-page detour on gradient boosting (XGBoost, LightGBM, CatBoost). | Complete |
| [Deep Learning](https://asu2304.github.io/deep-learning/) | Mitesh Khapra, IIT Madras ([lecture playlist](https://www.youtube.com/playlist?list=PLZ2ps__7DhBZVxMrSkTIcG6zZBDKUXCnM)) | All 67 lectures: a brief history of deep learning, perceptrons and sigmoid neurons, gradient descent, feedforward networks and backpropagation, optimisers from momentum to Adam, bias, variance and regularisation, pre-training and activations, and transformers. | Complete |
| [Transformers](https://asu2304.github.io/transformers/) | Tengyu Ma, Stanford CS229 (Spring 2026) | 4 lectures in 22 pages: tokenisation and the transformer, efficient attention and mixture of experts, prompting and fine-tuning, RL basics and policy gradient, PPO and RL for reasoning LLMs. | Complete |
| [Quantization](https://asu2304.github.io/quantization/) | — | — | Coming soon |
| [LLMOps](https://asu2304.github.io/llmops/) | — | — | Coming soon |
| [RAG](https://asu2304.github.io/rag/) | — | — | Coming soon |
| [Agentic AI](https://asu2304.github.io/agentic-ai/) | Diyi Yang, Stanford CS329Z (Fall 2026) | Lecture 1 in 5 pages: the history of agents, agent anatomy (planning and reasoning, memory, tools, environment), multi-agent systems, tool use and MCP, workflows vs agents, and key challenges. | In progress |

## What a page looks like

- A short summary of the lecture, with the derivations written out.
- Interactive demos that run in the browser (sliders, step-through algorithms, live training).
- "Going beyond the video" boxes, which mark anything I added that isn't in the lecture.
- A link to the original lecture video, and links to related lectures.
- Light and dark mode, and a layout that works on phones.

## Repository layout

```
index.html                 home page
assets/                    shared styles, and the script that opens videos in the YouTube app on phones
linear-algebra/            MIT 18.06 notes
probability-statistics/    coming soon
sql/                       SQL notes and the SQL lab
oop/                       OOP in Python notes (CampusX)
machine-learning/          DA5400 notes (L1–L74, N1–N3, D1–D5)
deep-learning/             Deep learning notes (Mitesh Khapra; L1–L67)
transformers/              Transformers and LLMs notes (Stanford CS229; 4 lectures, 22 pages)
quantization/              coming soon
llmops/                    coming soon
rag/                       coming soon
agentic-ai/                Agentic AI notes (Stanford CS329Z; lecture 1, 5 pages)
```

Every page is plain, self-contained HTML; there is no build step. Maths is rendered with KaTeX (MathJax in the linear algebra notes), loaded from a CDN.

## Run locally

```bash
git clone https://github.com/asu2304/asu2304.github.io.git
cd asu2304.github.io
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Note

These are personal, unofficial notes. Explanations and extensions are my own, so check the original lectures for the definitive treatment.
