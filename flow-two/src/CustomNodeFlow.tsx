import { useCallback, useState } from 'react';
import {
  Background,
  ReactFlow,
  addEdge,
  Position,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node,
  Panel,
  BackgroundVariant,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';


const nodeTypes = {
  custom: CustomNode,
};

const CustomNodeFlow = () => {
  const [variant, setVariant] = useState<BackgroundVariant>(BackgroundVariant.Cross);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([
    {
      id: '1',
      type: 'input',
      data: { label: 'Node 1' },
      position: { x: 0, y: 25 },
      sourcePosition: Position.Right,
    },
    {
      id: '2',
      type: 'custom',
      data: {},
      position: { x: 250, y: 50 },
    },
    {
      id: '3',
      type: 'input',
      data: { label: 'Node 2' },
      position: { x: 0, y: 100 },
      sourcePosition: Position.Right,
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant={variant} />
        <Panel position="top-right">
          <button onClick={()=>setVariant(BackgroundVariant.Dots)}>Dots</button>
          <button onClick={() => setVariant(BackgroundVariant.Lines)}>Lines</button>
          <button onClick={() => setVariant(BackgroundVariant.Cross)}>Cross</button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default CustomNodeFlow;
