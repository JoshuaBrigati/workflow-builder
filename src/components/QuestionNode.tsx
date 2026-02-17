import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import { MessageCircleQuestion } from "lucide-react";

type QuestionNodeData = Node<{ question: string }>;

export default function QuestionNode({ data }: NodeProps<QuestionNodeData>) {
  return (
    <div className="question-node">
      <Handle type="target" position={Position.Top} className="handle" />
      <div className="question-node-header">
        <MessageCircleQuestion size={24} className="question-icon" />
        <span className="question-label">Question</span>
      </div>
      <div className="question-body">
        <p className="question-text">{data.question}</p>
      </div>
      <Handle type="source" position={Position.Bottom} className="handle" />
    </div>
  );
}
