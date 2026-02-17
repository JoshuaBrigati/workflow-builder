import { Handle, Position, type NodeProps } from "@xyflow/react";
import { MessageCircleQuestion } from "lucide-react";

interface QuestionNodeData {
  question: string;
  [key: string]: unknown;
}

export default function QuestionNode({ data }: NodeProps) {
  const { question } = data as QuestionNodeData;

  return (
    <div className="question-node">
      <Handle
        type="target"
        position={Position.Top}
        className="handle"
      />
      <div className="question-node-header">
        <MessageCircleQuestion size={20} className="question-icon" />
        <span className="question-label">Question</span>
      </div>
      <div className="question-body">
        <p className="question-text">{question}</p>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="handle"
      />
    </div>
  );
}
