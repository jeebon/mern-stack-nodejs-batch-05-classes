# Class Template Structure

This folder contains the canonical structure that every `class-N/` directory should follow.

Use this as a reference when building new class materials. Each class is self-contained and follows this layout:

```
class-N/
├── README.md                      ← Class landing page: objectives, agenda, links
├── slides/
│   └── outline.md                 ← Speaker notes with timing & talking points
├── notes/
│   ├── 01-concepts.md             ← Theory, definitions, mermaid diagrams
│   ├── 02-industry-context.md    ← Real-world practices from companies
│   └── 03-glossary-banglish.md   ← Translations and terminology
├── code/
│   └── demo-*-*/                  ← One or more runnable TypeScript demos
│       ├── src/
│       ├── package.json
│       ├── tsconfig.json
│       ├── .env.example
│       └── README.md              ← How to run this demo
├── exercises/
│   ├── README.md                  ← Problem statements (3-5 problems)
│   ├── starter/                   ← Skeleton code for students
│   │   ├── problem-1/
│   │   ├── problem-2/
│   │   └── ...
│   └── solutions/                 ← Reference solutions
│       ├── problem-1/
│       ├── problem-2/
│       └── ...
├── quiz/
│   └── quiz.md                    ← 10 MCQs with explanations
└── homework/
    └── README.md                  ← One take-home assignment
```

## Key Principles

1. **Self-contained**: Each demo and exercise should run independently.
2. **TypeScript strict mode**: No `any`, explicit types everywhere.
3. **Clear structure**: Consistent naming, layout, and formatting.
4. **Runnable code**: Every `npm i && npm dev` should succeed.
5. **Banglish sparingly**: Only for genuinely confusing terms, boxed clearly.
6. **Practical focus**: Theory + real-world context + hands-on code.

## Checklist When Building a New Class

- [ ] Create `class-N/` directory
- [ ] Write comprehensive `README.md` with objectives, prerequisites, agenda, key takeaways
- [ ] Create `slides/outline.md` with timing (60-90 min total)
- [ ] Write `notes/01-concepts.md` with diagrams and core theory
- [ ] Write `notes/02-industry-context.md` with real-world patterns
- [ ] Write `notes/03-glossary-banglish.md` with terminology
- [ ] Build runnable demo(s) in `code/`
- [ ] Create exercise starters and solutions
- [ ] Write 10 MCQs in `quiz/quiz.md`
- [ ] Write one homework assignment in `homework/README.md`
- [ ] Test all demos: `pnpm install && pnpm dev` should work
- [ ] Proofread all markdown and code

