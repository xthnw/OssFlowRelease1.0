import React from 'react';
import { Building2 } from 'lucide-react';

export const HospitalDistributionDonut = ({ tasksData }) => {
    // Process data to count tasks by hospital
    const getHospitalCounts = () => {
        const hospitalCounts = {};
        let total = 0;

        Object.values(tasksData).forEach(tasks => {
            tasks.forEach(task => {
                if (!hospitalCounts[task.hospital]) {
                    hospitalCounts[task.hospital] = {
                        name: task.hospital,
                        count: 0,
                        color: getRandomColor(Object.keys(hospitalCounts).length)
                    };
                }
                hospitalCounts[task.hospital].count += 1;
                total += 1;
            });
        });

        // Calculate percentages and angles
        let currentAngle = 0;
        const hospitalData = Object.values(hospitalCounts).map(hospital => {
            const percentage = (hospital.count / total) * 100;
            const startAngle = currentAngle;
            const angle = (percentage / 100) * 360;
            currentAngle += angle;

            return {
                ...hospital,
                percentage,
                startAngle,
                angle
            };
        }).sort((a, b) => b.count - a.count);

        return { hospitalData, total };
    };

    // Get color for each hospital
    const getRandomColor = (index) => {
        const colors = [
            '#3b82f6', // blue-500
            '#22c55e', // green-500
            '#eab308', // yellow-500
            '#a855f7', // purple-500
            '#ec4899', // pink-500
            '#6366f1', // indigo-500
            '#ef4444', // red-500
            '#14b8a6'  // teal-500
        ];
        return colors[index % colors.length];
    };

    // Convert polar coordinates to SVG path
    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    // Create SVG arc path
    const createArc = (startAngle, angle, radius, innerRadius) => {
        const start = polarToCartesian(100, 100, radius, startAngle);
        const end = polarToCartesian(100, 100, radius, startAngle + angle);
        const startInner = polarToCartesian(100, 100, innerRadius, startAngle);
        const endInner = polarToCartesian(100, 100, innerRadius, startAngle + angle);

        const largeArcFlag = angle > 180 ? 1 : 0;

        return `
      M ${start.x} ${start.y}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
      L ${endInner.x} ${endInner.y}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}
      Z
    `;
    };

    const { hospitalData, total } = getHospitalCounts();

    return (
        <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-2 mb-4">
                <Building2 size={20} className="text-blue-500" />
                <h2 className="text-lg font-medium">Hospital Distribution</h2>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Donut Chart */}
                <div className="relative w-64 h-64">
                    <svg viewBox="0 0 200 200" className="transform -rotate-90">
                        {hospitalData.map((hospital) => (
                            <path
                                key={hospital.name}
                                d={createArc(hospital.startAngle, hospital.angle, 80, 50)}
                                fill={hospital.color}
                                className="transition-all duration-300 hover:opacity-80"
                            />
                        ))}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-3xl font-bold">{total}</div>
                            <div className="text-sm text-gray-500">Total Cases</div>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-1 gap-3 flex-1">
                    {hospitalData.map((hospital) => (
                        <div key={hospital.name} className="flex items-center gap-3">
                            <div
                                className={`w-3 h-3 rounded`}
                                style={{ backgroundColor: hospital.color }}
                            />
                            <div className="flex-1 text-sm">{hospital.name}</div>
                            <div className="text-sm text-gray-500">
                                {hospital.count} cases ({hospital.percentage.toFixed(1)}%)
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};