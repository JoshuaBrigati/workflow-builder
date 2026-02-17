import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
  Background,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Plus } from "lucide-react";
import QuestionNode from "./components/QuestionNode";
import "./App.css";

const PREDEFINED_QUESTIONS = [
  "What percentage does the plan cover for co-insurance on diagnostic lab services?",
  "What is the deductible amount for in-network providers?",
  "Does the plan require prior authorization for specialist visits?",
  "What is the out-of-pocket maximum for the current policy year?",
  "Is there a copay for emergency room visits under this plan?",
  "What are the covered benefits for outpatient mental health services?",
  "Does the plan include coverage for durable medical equipment?",
  "What is the coinsurance rate for outpatient surgery?",
];

const initialNodes: Node[] = [
  {
    id: "1",
    type: "question",
    position: { x: 0, y: 0 },
    data: { question: PREDEFINED_QUESTIONS[0] },
  },
  {
    id: "2",
    type: "question",
    position: { x: 0, y: 200 },
    data: { question: PREDEFINED_QUESTIONS[0] },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    style: { stroke: "#A500DD", strokeWidth: 1.5 },
    markerEnd: {
      type: "arrowclosed" as const,
      color: "#A500DD",
      width: 16,
      height: 16,
    },
  },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(() => ({ question: QuestionNode }), []);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: "smoothstep",
            style: { stroke: "#A500DD", strokeWidth: 1.5 },
            markerEnd: {
              type: "arrowclosed" as const,
              color: "#A500DD",
              width: 16,
              height: 16,
            },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const addNode = useCallback(() => {
    const lastNode = nodes[nodes.length - 1];
    const newId = String(nodes.length + 1);
    const questionIndex = nodes.length % PREDEFINED_QUESTIONS.length;

    const newNode: Node = {
      id: newId,
      type: "question",
      position: {
        x: lastNode ? lastNode.position.x : 0,
        y: lastNode ? lastNode.position.y + 200 : 0,
      },
      data: { question: PREDEFINED_QUESTIONS[questionIndex] },
    };

    const newEdge: Edge = {
      id: `e${lastNode?.id}-${newId}`,
      source: lastNode?.id || "1",
      target: newId,
      type: "smoothstep",
      style: { stroke: "#A500DD", strokeWidth: 1.5 },
      markerEnd: {
        type: "arrowclosed" as const,
        color: "#A500DD",
        width: 16,
        height: 16,
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
  }, [nodes, setNodes, setEdges]);

  return (
    <div className="app">
      <header className="header">
        <span className="header-title">Workflow Builder</span>
        <button className="add-node-btn" onClick={addNode}>
          <Plus size={16} strokeWidth={2.5} />
          Add Node
        </button>
      </header>
      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.4 }}
          defaultEdgeOptions={{
            type: "smoothstep",
            style: { stroke: "#A500DD", strokeWidth: 1.5 },
          }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1.5}
            color="#d1d5db"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
