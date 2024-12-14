import React, { useEffect, useState } from 'react';
import { Users, Network } from 'lucide-react';

export const TeamCollaborationNetwork = ({ tasksData }) => {
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);

    // Process data to find collaborations
    useEffect(() => {
        const processCollaborationData = () => {
            const collaborations = {};
            const teamMembers = new Set();

            // Collect all team members and collaborations
            Object.values(tasksData).forEach(tasks => {
                tasks.forEach(task => {
                    // Add all assignees
                    task.assignees.forEach(assignee => teamMembers.add(assignee.name));

                    // Record collaborations between main task assignees
                    for (let i = 0; i < task.assignees.length; i++) {
                        for (let j = i + 1; j < task.assignees.length; j++) {
                            const pair = [task.assignees[i].name, task.assignees[j].name].sort().join('-');
                            collaborations[pair] = (collaborations[pair] || 0) + 1;
                        }
                    }

                    // Record collaborations with subtask assignees
                    task.subtasks.forEach(subtask => {
                        teamMembers.add(subtask.assignee.name);
                        task.assignees.forEach(mainAssignee => {
                            if (mainAssignee.name !== subtask.assignee.name) {
                                const pair = [mainAssignee.name, subtask.assignee.name].sort().join('-');
                                collaborations[pair] = (collaborations[pair] || 0) + 1;
                            }
                        });
                    });
                });
            });

            // Create nodes
            const nodesList = Array.from(teamMembers).map((name, index) => ({
                id: name,
                x: 150 + 100 * Math.cos(index * 2 * Math.PI / teamMembers.size),
                y: 150 + 100 * Math.sin(index * 2 * Math.PI / teamMembers.size),
            }));

            // Create links
            const linksList = Object.entries(collaborations).map(([pair, strength]) => {
                const [source, target] = pair.split('-');
                return {
                    source,
                    target,
                    strength: strength
                };
            });

            setNodes(nodesList);
            setLinks(linksList);
        };

        processCollaborationData();
    }, [tasksData]);

    // Simple force-directed layout simulation
    useEffect(() => {
        const simulation = () => {
            const force = 0.1;
            const newNodes = nodes.map(node => ({ ...node }));

            // Apply forces
            links.forEach(link => {
                const sourceNode = newNodes.find(n => n.id === link.source);
                const targetNode = newNodes.find(n => n.id === link.target);
                if (sourceNode && targetNode) {
                    const dx = targetNode.x - sourceNode.x;
                    const dy = targetNode.y - sourceNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 0) {
                        const moveX = (dx / distance) * force;
                        const moveY = (dy / distance) * force;
                        sourceNode.x += moveX;
                        sourceNode.y += moveY;
                        targetNode.x -= moveX;
                        targetNode.y -= moveY;
                    }
                }
            });

            // Keep nodes within bounds
            newNodes.forEach(node => {
                node.x = Math.max(50, Math.min(node.x, 250));
                node.y = Math.max(50, Math.min(node.y, 250));
            });

            setNodes(newNodes);
        };

        const interval = setInterval(simulation, 100);
        return () => clearInterval(interval);
    }, [nodes, links]);

    // Get link strength class
    const getLinkStrength = (strength) => {
        if (strength >= 3) return 'stroke-2 opacity-90';
        if (strength >= 2) return 'stroke-1 opacity-70';
        return 'stroke-[0.5] opacity-50';
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-2 mb-4">
                <Network size={20} className="text-purple-500" />
                <h2 className="text-lg font-medium">Team Collaboration Network</h2>
            </div>

            <div className="relative w-full h-[300px]">
                <svg className="w-full h-full">
                    {/* Links */}
                    {/* {links.map((link, i) => {
                        const sourceNode = nodes.find(n => n.id === link.source);
                        const targetNode = nodes.find(n => n.id === link.target);
                        if (!sourceNode || !targetNode) return null;

                        return (
                            <line
                                key={`link-${i}`}
                                x1={sourceNode.x}
                                y1={sourceNode.y}
                                x2={targetNode.x}
                                y2={targetNode.y}
                                className={`stroke-purple-300 ${getLinkStrength(link.strength)}`}
                            />
                        );
                    })} */}

                    {/* Nodes */}
                    {/* {nodes.map(node => (
                        <g key={node.id}>
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={20}
                                className="fill-purple-100 stroke-purple-500 stroke-2"
                            />
                            <text
                                x={node.x}
                                y={node.y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-xs fill-purple-700 pointer-events-none"
                            >
                                {node.id.split(' ')[0]}
                            </text>
                        </g>
                    ))} */}
                </svg>
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">
                Line thickness indicates collaboration frequency
            </div>
        </div>
    );
};