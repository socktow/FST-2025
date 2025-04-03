import React from 'react';

const ActiveModel = () => (
  <div>
    <h2 className="text-2xl font-bold">Active Model</h2>
    <p>Quản lý mô hình hoạt động tại đây.</p>
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Current Active Models</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[{ title: "Team Performance Model", updated: "2 days ago" }, { title: "Player Statistics Model", updated: "5 days ago" }].map((model, index) => (
          <div key={index} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{model.title}</h4>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Last updated: {model.updated}</p>
            <button className="text-blue-600 text-sm hover:underline">View Details</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ActiveModel;
