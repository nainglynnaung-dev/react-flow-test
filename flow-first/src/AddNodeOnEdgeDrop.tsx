import React, { useCallback, useRef, useState } from 'react';
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Panel,
  type Node,
  type Edge,
  type Connection,
  OnConnectEnd,
  // type OnConnectEnd,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '0',
    type: 'input',
    data: { label: 'Node' },
    position: { x: 0, y: 50 },
  },
];

let id = 1;
const getId = () => `${id++}`;
const nodeOrigin: [number, number] = [0.5, 0];

export function AddNodeOnEdgeDrop()  {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [variant, setVariant] = useState(BackgroundVariant.Dots);
  const { screenToFlowPosition } = useReactFlow();
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      // when a connection is dropped on the pane it's not valid
      if (!connectionState.isValid) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;
        const newNode: Node = {
          id,
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectionState.fromNode!.id, target: id }),
        );
      }
    },
    [screenToFlowPosition],
  );

  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={nodeOrigin}
      >
        <Background variant={variant} />
        <Panel position="top-right">
          <div style={{ padding: '10px', background: '#fff', borderRadius: '8px', border: '1px solid #ccc', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Background</div>
            <button onClick={() => setVariant(BackgroundVariant.Dots)}>Dots</button>
            <button onClick={() => setVariant(BackgroundVariant.Lines)}>Lines</button>
            <button onClick={() => setVariant(BackgroundVariant.Cross)}>Cross</button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);
