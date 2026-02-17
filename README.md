# Workflow Builder

A node-based workflow editor for defining LLM agent call sequences. Built for Smarter Technology's virtual call center — allows humans to define the questions an AI agent asks when collecting information from insurers.

**[Live Demo →](https://joshuabrigati.github.io/workflow-builder/)**

## Stack

- React 19 + TypeScript
- [React Flow](https://reactflow.dev) for the node graph
- [Lucide](https://lucide.dev) for iconography
- Vite for bundling
- Geist font (matches design spec)

## Running Locally

```bash
npm install
npm run dev
```

## How It Works

- Nodes represent questions the LLM agent will ask during a call
- Edges (arrows) define the sequence between questions
- **Add Node** appends a new question to the end of the chain
- Nodes are draggable — rearrange the layout freely
- Connect nodes manually by dragging between handles

## Design Decisions

- **React Flow** over a custom canvas — handles zoom, pan, drag, and edge routing out of the box. No reason to reinvent it for an MVP.
- **Node types are extensible** — `nodeTypes` map makes it straightforward to add new node variants (e.g., conditional branching, API calls) without touching the graph logic.
- **Edge config is centralized** — single source of truth for styling/markers, so adding new edge types or changing the theme is a one-line change.
- **CSS over Tailwind** — the design spec has specific values (14px Geist semibold, #A500DD, 14px border-radius, 295px card width). Plain CSS maps 1:1 to the Figma tokens without abstraction overhead.
