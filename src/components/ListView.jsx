import React from "react";
import { ChevronRight } from "lucide-react";

const ListView = ({ tasks, getStatusColor, getPriorityColor }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
        <div className="col-span-4">Task Name</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Due Date</div>
        <div className="col-span-2">Assignee</div>
        <div className="col-span-2">Priority</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 items-center"
          >
            <div className="col-span-4 flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">{task.name}</span>
            </div>
            <div className="col-span-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status}
              </span>
            </div>
            <div className="col-span-2 text-sm text-gray-500">
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
            <div className="col-span-2 text-sm text-gray-500">{task.assignee}</div>
            <div className="col-span-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListView;
