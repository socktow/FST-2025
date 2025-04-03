import React from 'react';

const ImageStore = () => (
  <div>
    <h2 className="text-2xl font-bold">Image Store</h2>
    <p>Quản lý kho lưu trữ hình ảnh tại đây.</p>
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Image Gallery</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Upload Image</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="relative group">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-500">Image Placeholder</div>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button className="bg-white text-gray-800 px-2 py-1 rounded text-sm mr-2">View</button>
              <button className="bg-red-600 text-white px-2 py-1 rounded text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ImageStore;
