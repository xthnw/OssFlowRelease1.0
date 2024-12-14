import React, { useState, useRef, useEffect } from 'react';
import { X, ThumbsUp, CheckCircle, Heart, Bell, Trash2 } from 'lucide-react';
import { COMMENTS_DATA } from '../../data/commentData';

const REACTION_TYPES = [
    { type: 'thumbsUp', Icon: ThumbsUp, label: 'Agree' },
    { type: 'checkCircle', Icon: CheckCircle, label: 'Complete' },
    { type: 'heart', Icon: Heart, label: 'Thanks' },
    { type: 'bell', Icon: Bell, label: 'Acknowledgement' }
];

export const SlideComment = ({ taskId, isOpen, onClose }) => {
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const textareaRef = useRef(null);
    const maxLength = 500;

    const [replyContent, setReplyContent] = useState('');

    const [localComments, setLocalComments] = useState(COMMENTS_DATA[taskId] || []);

    useEffect(() => {
        setLocalComments(COMMENTS_DATA[taskId] || []);
    }, [taskId]);



    const [editingComment, setEditingComment] = useState(null);
    const [editContent, setEditContent] = useState('');

    const handleEditComment = (commentId, newContent) => {
        setLocalComments(prev => prev.map(comment => {
            if (comment.id === commentId) {
                const oldContent = comment.content.includes('~~')
                    ? comment.content
                    : `~~${comment.content}~~`;
                return {
                    ...comment,
                    content: `${oldContent}\n${newContent}`,
                    isEdited: true
                };
            }
            return comment;
        }));
        setEditingComment(null);
    };

    // เพิ่ม ref สำหรับ edit textarea
    const editTextareaRef = useRef(null);

    // เพิ่ม useEffect สำหรับ focus textarea เมื่อเริ่มแก้ไข
    useEffect(() => {
        if (editingComment && editTextareaRef.current) {
            editTextareaRef.current.focus();
        }
    }, [editingComment]);

    const addCustomStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
          @keyframes scaleUp {
            0% {
              opacity: 0;
              transform: scale(0.95) translateY(10px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `;
        document.head.appendChild(style);
    };

    useEffect(() => {
        addCustomStyles();
    }, []);



    const handleSubmitReply = (parentId) => {
        if (replyContent.trim()) {
            const newReply = {
                id: `c${Date.now()}`,
                taskId,
                userId: "currentUser",
                userName: "Current User",
                userAvatar: "/avatars/avatar1.jpg",
                content: replyContent,
                timestamp: new Date().toISOString(),
                mentions: [],
                parentId,
                reactions: []
            };

            setLocalComments(prev => [...prev, newReply]);
            setReplyContent('');
            setReplyingTo(null);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmitComment();
        }
    };

    const handleSubmitComment = () => {
        if (newComment.trim()) {
            const newCommentObj = {
                id: `c${Date.now()}`,
                taskId,
                userId: "currentUser",
                userName: "Current User",
                userAvatar: "/avatars/avatar1.jpg",
                content: newComment,
                timestamp: new Date().toISOString(),
                mentions: [],
                reactions: []
            };

            setLocalComments(prev => [...prev, newCommentObj]);
            setNewComment('');
        }
    };

    const formatContent = (content) => {
        // สำหรับข้อความที่ถูกแก้ไข (มีเครื่องหมาย ~~)
        if (content.includes('~~')) {
            const parts = content.split('\n');
            return parts.map((part, index) => {
                if (part.startsWith('~~') && part.endsWith('~~')) {
                    return (
                        <span key={index} className="text-red-500 line-through block">
                            {part.slice(2, -2)}
                        </span>
                    );
                }
                // handle mentions in new content
                return <span key={index} className="block">{formatMentions(part)}</span>;
            });
        }
        return formatMentions(content);
    };

    const formatMentions = (text) => {
        return text.split(/(@[\w\s]+)/g).map((part, index) => {
            if (part.startsWith('@')) {
                return <span key={index} className="bg-teal-50 text-teal-600 px-1 rounded">{part}</span>;
            }
            return part;
        });
    };

    const Comment = ({ comment, isReply }) => {
        const [showReactions, setShowReactions] = useState(false);
        const reactionRef = useRef(null);

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (reactionRef.current && !reactionRef.current.contains(event.target)) {
                    setShowReactions(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        return (
            <div className={`p-4 ${isReply ? 'ml-8' : ''}`}>
                <div className="flex gap-3">
                    <img
                        src={comment.userAvatar}
                        alt={comment.userName}
                        className="w-8 h-8 rounded-full shadow-sm"
                    />
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <span className="font-medium">{comment.userName}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                    {getRelativeTime(comment.timestamp)}
                                </span>
                            </div>
                        </div>
                        {editingComment === comment.id && (
                            <div className="mt-2">
                                <textarea
                                    ref={editTextareaRef}
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value.slice(0, maxLength))}
                                    className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                    rows={2}
                                />
                                <div className="mt-2 flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                        {editContent.length}/{maxLength} Character
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingComment(null)}
                                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                                        >
                                            ยกเลิก
                                        </button>
                                        <button
                                            onClick={() => handleEditComment(comment.id, editContent)}
                                            className="px-3 py-1 text-sm bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                                        >
                                            บันทึก
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <p className="mt-1 text-sm text-gray-600 break-all whitespace-pre-wrap">{formatContent(comment.content)}</p>

                        {/* Reactions */}
                        <div className="mt-2 flex flex-wrap items-center gap-2" ref={reactionRef}>
                            {comment.reactions?.map(reaction => {
                                const ReactionIcon = REACTION_TYPES.find(r => r.type === reaction.type)?.Icon;
                                return (
                                    <div key={reaction.type}
                                        className="group relative flex items-center gap-1 text-xs bg-teal-50 text-teal-600 px-2 py-1 rounded-full hover:bg-teal-100">
                                        {ReactionIcon && <ReactionIcon size={12} />}
                                        <span>{reaction.users.length}</span>

                                        <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block z-50">
                                            <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                                                {reaction.users.map(user => user.name).join(', ')}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="relative">
                                <button
                                    onClick={() => setShowReactions(!showReactions)}
                                    className="text-xs text-gray-500 hover:text-gray-700"
                                >
                                    Like
                                </button>

                                {/* Reaction picker popup */}
                                {showReactions && (
                                    <div className="absolute bottom-full left-0 mb-2 z-50">
                                        <div className="bg-white shadow-lg rounded-full border flex items-center gap-1 p-1">
                                            {REACTION_TYPES.map(({ type, Icon, label }) => (
                                                <button
                                                    key={type}
                                                    className="p-2 hover:bg-gray-100 rounded-full group relative transition-all duration-200 hover:scale-110"
                                                    onClick={() => {
                                                        setLocalComments(prev => prev.map(c => {
                                                            if (c.id === comment.id) {
                                                                const existingReaction = c.reactions?.find(r => r.type === type);
                                                                if (existingReaction) {
                                                                    return {
                                                                        ...c,
                                                                        reactions: c.reactions.map(r =>
                                                                            r.type === type
                                                                                ? { ...r, users: [...r.users, { id: 'currentUser', name: 'Current User' }] }
                                                                                : r
                                                                        )
                                                                    };
                                                                } else {
                                                                    return {
                                                                        ...c,
                                                                        reactions: [...(c.reactions || []), {
                                                                            type,
                                                                            label,
                                                                            users: [{ id: 'currentUser', name: 'Current User' }]
                                                                        }]
                                                                    };
                                                                }
                                                            }
                                                            return c;
                                                        }));
                                                        setShowReactions(false);
                                                    }}
                                                >
                                                    <Icon size={16} className="transition-colors hover:text-teal-500" />
                                                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">
                                                        {label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => setReplyingTo(comment.id)}
                                className="text-xs text-gray-500 hover:text-gray-700"
                            >
                                Reply
                            </button>
                            <button
                                onClick={() => {
                                    setEditingComment(comment.id);
                                    setEditContent(comment.content);
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const getRelativeTime = (timestamp) => {
        const diff = new Date().getTime() - new Date(timestamp).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} days ago`;
        if (hours > 0) return `${hours} hours ago`;
        if (minutes > 0) return `${minutes} minites ago`;
        return 'Just now';
    };

    return (
        <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Header */}
            <div className="px-4 py-3 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="text-lg font-semibold text-gray-900">Comments</h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Comments list */}
            <div className="h-[calc(100vh-180px)] overflow-y-scroll scrollbar bg-white">
                {localComments.map(comment => (
                    !comment.parentId ? (
                        <div key={comment.id}>
                            <Comment comment={comment} />
                            {localComments
                                .filter(reply => reply.parentId === comment.id)
                                .map(reply => (
                                    <Comment key={reply.id} comment={reply} isReply />
                                ))
                            }
                            {replyingTo === comment.id && (
                                <div className="ml-8 p-4">
                                    <textarea
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value.slice(0, maxLength))}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSubmitReply(comment.id);
                                            }
                                        }}
                                        placeholder="Reply..."
                                        className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                        rows={2}
                                    />
                                    <div className="mt-2 flex justify-between items-center">
                                        <span className="text-xs text-gray-500">
                                            {replyContent.length}/{maxLength} Character
                                        </span>
                                        <button
                                            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
                                            disabled={!replyContent.trim()}
                                            onClick={() => handleSubmitReply(comment.id)}
                                        >
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : null
                ))}
            </div>

            {/* Comment input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                <textarea
                    ref={textareaRef}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value.slice(0, maxLength))}
                    onKeyPress={handleKeyPress}
                    placeholder="Type comment..."
                    className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    rows={3}
                />
                <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                        {newComment.length}/{maxLength} Character
                    </span>
                    <button
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
                        disabled={!newComment.trim()}
                        onClick={handleSubmitComment}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};