# Workflow Builder

A workflow node editor for defining LLM agent phone call sequences. Built as a technical exercise for the Design Technologist role at Smarter Technologies.

## Overview

This single-page application displays a visual workflow of question nodes that an LLM agent will ask during phone calls. Nodes are connected by edges (arrows) in a sequence, and new nodes can be appended via the "Add Node" button.

## Tech Stack

- **React 19** + TypeScript
- **React Flow** (`@xyflow/react`) — node graph rendering, drag-and-drop, zoom/pan
- **Lucide React** — icon set
- **Vite** — build tooling

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Features

- Visual node graph with question cards connected by directed edges
- "Add Node" button appends a new node to the end of the sequence
- Nodes are draggable and the canvas supports zoom/pan
- Purple-themed handles and edges matching the design spec
- Dot grid background
- Clean, accessible component architecture

## Project Structure

```
src/
├── App.tsx              # Main app with React Flow canvas and state
├── App.css              # Styles
├── components/
│   └── QuestionNode.tsx # Custom node component
└── main.tsx             # Entry point
```
