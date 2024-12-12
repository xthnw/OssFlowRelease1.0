import React, { useState, useEffect } from 'react';
import { Share2, Copy, Trash2, ExternalLink, X } from 'lucide-react';

export const MagicLinkDialog = ({ isOpen, onClose, taskId }) => {
    const [duration, setDuration] = useState('7');
    const [generatedLink, setGeneratedLink] = useState('');
    const [linkHistory, setLinkHistory] = useState(null);
    const [isCopied, setIsCopied] = useState(false);

    // Load link history on mount
    useEffect(() => {
        if (isOpen && taskId) {
            const existingLink = localStorage.getItem(`link_${taskId}`);
            if (existingLink) {
                setLinkHistory(JSON.parse(existingLink));
            }
        }
    }, [isOpen, taskId]);

    const generateLink = () => {
        const uniqueHash = Math.random().toString(36).substring(2, 15);
        const expirationDate = duration === 'no-expiration'
            ? null
            : new Date(Date.now() + parseInt(duration) * 24 * 60 * 60 * 1000);

        const linkData = {
            url: `domain.com/track/${taskId}/${uniqueHash}`,
            created: new Date().toISOString(),
            expires: expirationDate?.toISOString(),
            isActive: true
        };

        localStorage.setItem(`link_${taskId}`, JSON.stringify(linkData));
        setGeneratedLink(linkData.url);
        setLinkHistory(linkData);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const deleteLink = () => {
        localStorage.removeItem(`link_${taskId}`);
        setLinkHistory(null);
        setGeneratedLink('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-15 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Generate Magic Link</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Duration Selector */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Access Duration
                    </label>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                        disabled={linkHistory}
                    >
                        <option value="7">7 Days</option>
                        <option value="10">10 Days</option>
                        <option value="15">15 Days</option>
                        <option value="no-expiration">No Expiration</option>
                    </select>
                </div>

                {/* Link Preview */}
                {linkHistory ? (
                    <div className="mb-4 p-4 bg-gray-50 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">
                                Created: {new Date(linkHistory.created).toLocaleString('th-TH', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                            {linkHistory.expires && (
                                <span className="text-sm text-gray-600">
                                    Expires: {new Date(linkHistory.expires).toLocaleDateString()}
                                </span>
                            )}
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                Active
                            </span>
                        </div>
                        <div className="text-sm text-gray-800 break-all">
                            {linkHistory.url}
                        </div>
                        <div className="flex space-x-2 mt-2">
                            <button
                                onClick={() => copyToClipboard(linkHistory.url)}
                                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                            >
                                <Copy className="h-4 w-4" />
                                <span>Copy</span>
                            </button>
                            <button
                                onClick={() => window.open(`/track/${taskId}`, '_blank')}
                                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                            >
                                <ExternalLink className="h-4 w-4" />
                                <span>View</span>
                            </button>
                            <button
                                onClick={deleteLink}
                                className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={generateLink}
                        className={`w-full flex justify-center items-center space-x-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${isCopied
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'bg-teal-600 hover:bg-teal-700'}`}
                    >
                        <Share2 className="h-4 w-4" />
                        <span>{isCopied ? 'Copied to Clipboard' : 'Generate Link'}</span>
                    </button>
                )}
            </div>
        </div>
    );
};
