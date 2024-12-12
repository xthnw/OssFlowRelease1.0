import React, { useState } from 'react';
import { Bike, Package, ChevronRight, Clock, MapPin, CheckCircle2, Truck } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const MagicLinkPreview = () => {

    const { taskId } = useParams();
    const [currentStatus, setCurrentStatus] = useState('Manufacturing');

    const statuses = [
        {
            key: 'New Coming',
            label: 'รับเคส',
            icon: Package,
            description: 'รับเคสและเริ่มกระบวนการ',
            color: 'blue'
        },
        {
            key: 'Planning & Design',
            label: 'วางแผนและออกแบบ',
            icon: MapPin,
            description: 'ออกแบบและวางแผนการรักษา',
            color: 'indigo'
        },
        {
            key: 'Manufacturing',
            label: 'กำลังผลิต',
            icon: Truck,
            description: 'อยู่ในขั้นตอนการผลิต',
            color: 'purple'
        },
        {
            key: 'ผลิตสำเร็จ',
            label: 'ผลิตเสร็จสิ้น',
            icon: Package,
            description: 'การผลิตเสร็จสมบูรณ์',
            color: 'yellow'
        },
        {
            key: 'ส่งมอบให้หมอสำเร็จ',
            label: 'ส่งมอบสำเร็จ',
            icon: Bike,
            description: 'จัดส่งและส่งมอบเรียบร้อย',
            color: 'green'
        }
    ];

    const currentStep = statuses.findIndex(s => s.key === currentStatus);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
            <div className="max-w-lg mx-auto">
                {/* Header Card - Optimized for mobile */}
                <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
                    <h1 className="text-md font-bold mb-2">Case 125 - Knee replacement surgery - Dr.สมชาย [รพ.จุฬา]</h1>
                    <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Last updated: Oct 15, 2024 09:30 AM</span>
                    </div>
                </div>

                {/* Status Timeline - Mobile optimized */}
                <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                    <div className="space-y-6">
                        {statuses.map((status, index) => {
                            const isCompleted = index < currentStep;
                            const isCurrent = index === currentStep;
                            const Icon = status.icon;

                            return (
                                <div key={status.key} className="relative">
                                    {/* Connector Line */}
                                    {index < statuses.length - 1 && (
                                        <div
                                            className={`absolute left-5 top-10 w-0.5 h-12 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'
                                                }`}
                                        />
                                    )}

                                    {/* Status Item */}
                                    <div className="relative flex items-start">
                                        {/* Icon */}
                                        <div
                                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isCompleted
                                                ? 'bg-green-100'
                                                : isCurrent
                                                    ? 'bg-blue-100 animate-pulse'
                                                    : 'bg-gray-100'
                                                }`}
                                        >
                                            {isCompleted ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <Icon className={`w-5 h-5 ${isCurrent ? 'text-blue-500' : 'text-gray-400'
                                                    }`} />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="ml-3 flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className={`text-sm font-semibold ${isCompleted
                                                        ? 'text-green-500'
                                                        : isCurrent
                                                            ? 'text-blue-500'
                                                            : 'text-gray-500'
                                                        }`}>
                                                        {status.label}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {status.description}
                                                    </p>
                                                </div>
                                                {isCompleted && (
                                                    <span className="text-xs text-gray-500 ml-2">
                                                        Oct 15, 09:30
                                                    </span>
                                                )}
                                            </div>

                                            {/* Progress Details for Current Status */}
                                            {isCurrent && (
                                                <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-xs">
                                                            <span className="text-gray-600">ความคืบหน้า</span>
                                                            <span className="text-blue-600 font-medium">75%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                            <div
                                                                className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000"
                                                                style={{ width: '75%' }}
                                                            />
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            กำลังอยู่ในขั้นตอนการผลิต คาดว่าจะเสร็จภายในวันที่ 20 ต.ค. 2024
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Additional Info Card - Mobile optimized */}
                    <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:items-center sm:justify-between">
                            <div>
                                <h4 className="text-sm font-medium mb-1">รายละเอียดเพิ่มเติม</h4>
                                <p className="text-xs text-gray-600">
                                    หากมีข้อสงสัยเพิ่มเติม กรุณาติดต่อ Project Manager
                                </p>
                            </div>
                            <button className="w-full sm:w-auto px-4 py-2 text-sm bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50">
                                ติดต่อ PM
                            </button>
                        </div>
                    </div>
                </div>

                {/* Simulation Controls (for demo only) */}
                <div className="mt-6 bg-white rounded-lg p-4 border">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Simulate Status
                    </label>
                    <select
                        className="block w-full rounded-md border-gray-300 shadow-sm"
                        value={currentStatus}
                        onChange={(e) => setCurrentStatus(e.target.value)}
                    >
                        {statuses.map((status) => (
                            <option key={status.key} value={status.key}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};