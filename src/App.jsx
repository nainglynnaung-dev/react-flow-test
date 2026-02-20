import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  SelectionMode,
  useEdgesState,
  useNodesState,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes=[{
  id:'1',
  position:{x:0,y:0},
  data:{label:'Node 1'}
},{
  id:'2',
  position:{x:0,y:100},
  data:{label:'Node 2'}
}];
const initialEdges=[{
  id:'1-2',
  source:'1',
  target:'2',
  type:'step',
  label:'connect with'
}];

const panOnDrag = [1, 2];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      panOnScroll
      selectionOnDrag
      panOnDrag={panOnDrag}
      selectionMode={SelectionMode.Partial}
      fitView
    >
      <Background />
    </ReactFlow>
  );
}

export default Flow;
