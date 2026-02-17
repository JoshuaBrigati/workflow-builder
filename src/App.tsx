import { useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  type Connection,
  type Node,
  type Edge,
  type EdgeMarker,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Plus } from "lucide-react";
import QuestionNode from "./components/QuestionNode";
import "./App.css";

const QUESTIONS = [
  "What percentage does the plan cover for co-insurance on diagnostic lab services?",
  "What is the deductible amount for in-network providers?",
  "Does the plan require prior authorization for specialist visits?",
  "What is the out-of-pocket maximum for the current policy year?",
  "Is there a copay for emergency room visits under this plan?",
  "What are the covered benefits for outpatient mental health services?",
  "Does the plan include coverage for durable medical equipment?",
  "What is the coinsurance rate for outpatient surgery?",
];

const EDGE_STYLE = { stroke: "#A500DD", strokeWidth: 1.5 };

const EDGE_MARKER: EdgeMarker = {
  type: "arrowclosed" as const,
  color: "#A500DD",
  width: 16,
  height: 16,
};

const nodeTypes = { question: QuestionNode };

let nodeIdCounter = 2;

const initialNodes: Node[] = [
  {
    id: "1",
    type: "question",
    position: { x: 0, y: 0 },
    data: { question: QUESTIONS[0] },
  },
  {
    id: "2",
    type: "question",
    position: { x: 0, y: 200 },
    data: { question: QUESTIONS[1] },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    style: EDGE_STYLE,
    markerEnd: EDGE_MARKER,
  },
];

function createEdge(sourceId: string, targetId: string): Edge {
  return {
    id: `e${sourceId}-${targetId}`,
    source: sourceId,
    target: targetId,
    type: "smoothstep",
    style: EDGE_STYLE,
    markerEnd: EDGE_MARKER,
  };
}

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: "smoothstep",
            style: EDGE_STYLE,
            markerEnd: EDGE_MARKER,
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const addNode = useCallback(() => {
    const lastNode = nodes[nodes.length - 1];
    const newId = String(++nodeIdCounter);
    const question = QUESTIONS[nodeIdCounter % QUESTIONS.length];

    const newNode: Node = {
      id: newId,
      type: "question",
      position: {
        x: lastNode?.position.x ?? 0,
        y: (lastNode?.position.y ?? -200) + 200,
      },
      data: { question },
    };

    setNodes((nds) => [...nds, newNode]);

    if (lastNode) {
      setEdges((eds) => [...eds, createEdge(lastNode.id, newId)]);
    }
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
            style: EDGE_STYLE,
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
