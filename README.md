# asu2304.github.io

**🔗 [asu2304.github.io](https://asu2304.github.io/)**

Personal revision notes by Ashutosh Patidar, served with GitHub Pages. The notes cover maths and machine learning: one page per lecture or chapter, most with interactive demos.

## Notes

| Section | Source | What's inside | Status |
|---|---|---|---|
| [Linear Algebra](https://asu2304.github.io/linear-algebra/) | Gilbert Strang, MIT 18.06 | All 34 lectures read through an ML / DL lens, a PCA prologue, and a revision sheet. | Complete |
| [Probability and Statistics](https://asu2304.github.io/probability-statistics/) | — | — | Coming soon |
| [SQL for Data Science](https://asu2304.github.io/sql/) | Nitish Singh, CampusX | 12 chapters and a practice session, with quizzes and an in-browser SQL lab. | Complete |
| [Machine Learning](https://asu2304.github.io/machine-learning/) | Arun Rajkumar, DA5400 (IIT Madras) | All 74 lectures: PCA and kernels, clustering, estimation and EM, regression, classification, ensembles, loss functions and neural networks. Plus my own notes and a 5-page detour on gradient boosting (XGBoost, LightGBM, CatBoost). | Complete |
| [Deep Learning](https://asu2304.github.io/deep-learning/) | Mitesh Khapra, IIT Madras ([lecture playlist](https://www.youtube.com/playlist?list=PLZ2ps__7DhBZVxMrSkTIcG6zZBDKUXCnM)) | First 10 lectures: a brief history of deep learning (up to transformers and the call for sanity), biological neurons, the McCulloch–Pitts neuron, perceptrons, error surfaces and the perceptron learning algorithm. | In progress |
| [Transformers](https://asu2304.github.io/transformers/) | — | — | Coming soon |
| [Quantization](https://asu2304.github.io/quantization/) | — | — | Coming soon |
| [LLMOps](https://asu2304.github.io/llmops/) | — | — | Coming soon |
| [RAG](https://asu2304.github.io/rag/) | — | — | Coming soon |
| [Agentic AI](https://asu2304.github.io/agentic-ai/) | — | — | Coming soon |

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
machine-learning/          DA5400 notes (L1–L74, N1–N3, D1–D5)
deep-learning/             Deep learning notes (Mitesh Khapra; L1–L10 so far)
transformers/              coming soon
quantization/              coming soon
llmops/                    coming soon
rag/                       coming soon
agentic-ai/                coming soon
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
