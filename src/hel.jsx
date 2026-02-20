// import { applyEdgeChanges, Background, Controls, ReactFlow } from "@xyflow/react";
// import "@xyflow/react/dist/style.css"
// import { useState } from "react";


// const initialNodes=[{
//   id:'1',
//   position:{x:0,y:0},
//   data:{label:'Node 1'}
// },{
//   id:'2',
//   position:{x:0,y:100},
//   data:{label:'Node 2'}
// }];
// const initialEdges=[{
//   id:'1-2',
//   source:'1',
//   target:'2',
//   type:'step',
//   label:'connect with'
// }];
// export default function Hel() {
//     const [nodes,setNodes]=useState(initialNodes);
//     const [edges,setEdges]=useState(initialEdges);

//     const onNodesChange=useCallback((changes)=>setNodes((nodesSnapshot)=>applyEdgeChanges(changes,nodesSnapshot),[]));
//     const onEdgesChange=useCallback((changes)=>setEdges(edgesSnapshot)=>applyEdgeChanges(changes,edgesSnapshot),[]);
//     const onConnect=useCallback((params)=>setEdges(edgesSnapshot)=>addEdge(params,edgesSnapshot),[]
//   return (
//     <div style={{ height: '100%', width: '100%' }}>
//       <ReactFlow nodes={initialNodes} edges={initialEdges} nodes={onNodesChange} edges={onEdgesChange} onConnect={onConnect} fitView>
//         <Background />
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// }