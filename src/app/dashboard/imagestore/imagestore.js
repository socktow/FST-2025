'use client';
import React, { useRef, useState, useEffect } from 'react';
import { imageApi } from "../../api/api";

const ImageStore = () => {
  const [images, setImages] = useState([]);
  const [imageName, setImageName] = useState('');
  const [imageTag, setImageTag] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    setIsClient(true);
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const imageList = await imageApi.getAll();
      setImages(imageList);
    } catch (err) {
      setError('Không thể tải danh sách ảnh. Vui lòng thử lại sau.');
      console.error('Failed to load images:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Vui lòng chọn ảnh để upload');
      return;
    }

    if (!imageName.trim()) {
      setError('Vui lòng nhập tên ảnh');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const result = await imageApi.upload(selectedFile, imageName, imageTag);
      if (result) {
        setImages(prev => [...prev, { name: result.name, tag: result.tag, url: result.url }]);
        setImageName('');
        setImageTag('');
        setSelectedFile(null);
      } else {
        throw new Error('Upload thất bại');
      }
    } catch (err) {
      setError('Upload thất bại. Vui lòng thử lại sau.');
      console.error('Upload failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (file) => {
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">Image Store</h2>
      <p className="mb-4 text-gray-600">Quản lý kho lưu trữ hình ảnh tại đây.</p>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow border mb-6">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên ảnh *</label>
              <input
                type="text"
                placeholder="Nhập tên ảnh"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
              <input
                type="text"
                placeholder="Nhập tag"
                value={imageTag}
                onChange={(e) => setImageTag(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleUpload}
              disabled={isLoading || !selectedFile || !imageName.trim()}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang tải...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Upload Ảnh
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              {selectedFile ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    Đã chọn: {selectedFile.name}
                  </p>
                  <button
                    className="mt-2 text-sm text-blue-600 hover:text-blue-500"
                    onClick={() => setSelectedFile(null)}
                  >
                    Chọn ảnh khác
                  </button>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    Kéo và thả ảnh vào đây, hoặc{' '}
                    <button
                      className="text-blue-600 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleButtonClick}
                      disabled={isLoading}
                    >
                      chọn file
                    </button>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Hỗ trợ: PNG, JPG, JPEG (tối đa 5MB)</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-4">Image Gallery</h3>
        {!isClient ? (
          <div className="flex justify-center items-center h-40">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center h-40">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Chưa có ảnh nào được upload
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={image.url} alt={image.name} className="object-cover w-full h-40" />
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium">{image.name}</p>
                  {image.tag && (
                    <p className="text-xs text-gray-500">Tag: {image.tag}</p>
                  )}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="bg-white text-gray-800 px-2 py-1 rounded text-sm mr-2">View</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageStore;
