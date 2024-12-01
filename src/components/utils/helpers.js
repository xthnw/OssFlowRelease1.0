export const getStatusColor = (status) => {
    const statuses = {
      "NEW COMING": "bg-gray-100",
      "PLANNING AND DESIGN": "bg-yellow-100",
      "MANUFACTURING": "bg-blue-100"
    };
    return statuses[status] || "bg-gray-100";
  };
  
  export const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-50 text-red-700",
      medium: "bg-yellow-50 text-yellow-700", 
      low: "bg-green-50 text-green-700"
    };
    return colors[priority] || "bg-gray-50 text-gray-700";
  };