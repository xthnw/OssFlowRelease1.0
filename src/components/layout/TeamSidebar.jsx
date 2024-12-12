import React, { useState } from 'react';
import { Menu, Home, Folder, Users, ChevronDown, ChevronRight, Plus, CircleGauge } from 'lucide-react';
import { MOCK_DATA } from '../../data/mockData';
import { Link } from 'react-router-dom';

export const TeamSidebar = ({ setShowCreateCase }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [expandedProjects, setExpandedProjects] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleAddClick = (projectId) => {
        if (projectId === "medical") {
            setShowCreateCase(true);
        }
    };

    return (
        <div className={`${isCollapsed ? 'w-14' : 'w-64'} transition-all duration-300 bg-gray-50 flex flex-col relative`}>
            {/* Gradient overlay */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-teal-600/40 via-emerald-500/20 to-transparent -translate-y-1/2 -translate-x-1/4 blur-xl pointer-events-none" />
            {/* Logo section */}
            <div className="h-14 flex items-center justify-between px-4 relative">
                {!isCollapsed && (
                    <div className="flex items-center space-x-2">
                        <img
                            src="https://res.cloudinary.com/djgpgveds/image/upload/v1733062717/jdzga0vkqkswho3wgsan.png"
                            alt="OssFlow Logo"
                            className="object-contain"
                        />
                        {/* <span className="font-medium">OssFlow</span> */}
                    </div>
                )}
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 hover:bg-gray-100 rounded">
                    <Menu className="w-4 h-4" />
                </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 p-2 space-y-1 mt-4 relative">
                <Link to="/" className="w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2">
                    <Home className="w-4 h-4" />
                    {!isCollapsed && <span className="text-sm">Home</span>}
                </Link>
                <Link to="/dashboard" className="w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2">
                    <CircleGauge className="w-4 h-4" />
                    {!isCollapsed && <span className="text-sm">Dashboard</span>}
                </Link>
                <button
                    className="w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center justify-between"
                    onClick={() => setExpandedProjects(!expandedProjects)}
                >
                    <div className="flex items-center space-x-2">
                        <Folder className="w-4 h-4" />
                        {!isCollapsed && <span className="text-sm">Case</span>}
                    </div>
                    {!isCollapsed && (
                        expandedProjects ?
                            <ChevronDown className="w-4 h-4 text-gray-400" /> :
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                </button>

                {!isCollapsed && expandedProjects && (
                    <div className="ml-4 space-y-1 mt-1">
                        {MOCK_DATA.projects.map((project) => (
                            <div
                                key={project.id}
                                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100"
                                onMouseEnter={() => setHoveredItem(project.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <Link to={`/${project.id}`} className="text-sm truncate">
                                    {project.name}
                                </Link>
                                {hoveredItem === project.id && (
                                    <Plus
                                        className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                                        onClick={() => handleAddClick(project.id)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
                <Link to="/team" className="w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    {!isCollapsed && <span className="text-sm">People</span>}
                </Link>
            </div>
        </div>
    )
}