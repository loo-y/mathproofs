"use client";

import { useEffect, useRef } from "react";
import { ProofTreeData } from "@/lib/types";
import gsap from "gsap";

interface ProofTreeProps {
  proofTree: ProofTreeData;
}

export function ProofTree({ proofTree }: ProofTreeProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const nodes = svg.querySelectorAll(".node");
    const edges = svg.querySelectorAll(".edge");
    const labels = svg.querySelectorAll(".node-label");

    // Animate the tree
    gsap.fromTo(
      edges,
      { strokeDashoffset: 1000, strokeDasharray: 1000 },
      { strokeDashoffset: 0, duration: 1.5, stagger: 0.1, ease: "power2.out" },
    );

    gsap.fromTo(
      nodes,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5,
      },
    );

    gsap.fromTo(
      labels,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, stagger: 0.1, delay: 1 },
    );
  }, []);

  // Calculate positions
  const width = 600;
  const height = 350;
  const nodeRadius = 20;

  const levels: Record<string, number> = {
    n1: 0,
    n2: 1,
    n3: 1,
    n4: 2,
    n5: 2,
    n6: 3,
    n7: 3,
  };

  const nodesPerLevel: Record<number, string[]> = {};

  proofTree.nodes.forEach((node) => {
    const level = levels[node.id];
    if (!nodesPerLevel[level]) {
      nodesPerLevel[level] = [];
    }
    nodesPerLevel[level].push(node.id);
  });

  const nodePositions: Record<string, { x: number; y: number }> = {};

  // Calculate positions for each node
  Object.entries(nodesPerLevel).forEach(([level, nodeIds]) => {
    const levelNum = parseInt(level);
    const totalWidth = width * 0.8;
    const startX = (width - totalWidth) / 2;
    const spaceBetween = totalWidth / (nodeIds.length + 1);
    const y = 50 + levelNum * 80;

    nodeIds.forEach((nodeId, index) => {
      const x = startX + spaceBetween * (index + 1);
      nodePositions[nodeId] = { x, y };
    });
  });

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      className="max-w-full max-h-full"
    >
      {/* Edges */}
      {proofTree.edges.map((edge, index) => {
        const source = nodePositions[edge.from];
        const target = nodePositions[edge.to];

        if (!source || !target) return null;

        return (
          <line
            key={`${edge.from}-${edge.to}`}
            x1={source.x}
            y1={source.y + nodeRadius * 0.8}
            x2={target.x}
            y2={target.y - nodeRadius * 0.8}
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.6"
            className="edge"
          />
        );
      })}

      {/* Nodes */}
      {proofTree.nodes.map((node) => {
        const position = nodePositions[node.id];
        if (!position) return null;

        return (
          <g
            key={node.id}
            transform={`translate(${position.x}, ${position.y})`}
          >
            <circle
              r={nodeRadius}
              fill="currentColor"
              fillOpacity="0.1"
              stroke="currentColor"
              strokeWidth="2"
              className="node"
            />
            <foreignObject
              x={-90}
              y={-10}
              width="180"
              height="20"
              className="node-label"
            >
              <div className="h-full w-full flex items-center justify-center">
                <p className="text-xs text-center truncate">{node.label}</p>
              </div>
            </foreignObject>
          </g>
        );
      })}
    </svg>
  );
}
