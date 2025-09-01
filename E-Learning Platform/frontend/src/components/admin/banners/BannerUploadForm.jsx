import React, { useMemo, useRef, useState } from "react";
import { Upload, Image, X, Plus, AlertCircle, Loader2 } from "lucide-react";

const BannerUploadForm = ({ onSubmit, disabled }) => {
  const [files, setFiles] = useState([]);
  const [captions, setCaptions] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const previews = useMemo(
    () => files.map((file) => URL.createObjectURL(file)),
    [files]
  );

  const handleFileChange = (fileList) => {
    setFiles(fileList);
    setCaptions(new Array(fileList.length).fill(""));
  };

  const onFileInputChange = (e) => {
    handleFileChange(Array.from(e.target.files || []));
  };

  const onCaptionChange = (idx, val) => {
    const newCaptions = [...captions];
    newCaptions[idx] = val;
    setCaptions(newCaptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) return;

    setUploading(true);
    try {
      await onSubmit(files, captions);
      if (inputRef.current) inputRef.current.value = "";
      setFiles([]);
      setCaptions([]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const fileList = Array.from(e.dataTransfer.files || []).filter((file) =>
      file.type.startsWith("image/")
    );

    if (fileList.length > 0) {
      handleFileChange(fileList);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setCaptions((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
  };

  const isDisabled = disabled || uploading;
  const fileCount = files.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* File Upload Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Banner Images <span className="text-red-500">*</span>
        </label>

        {!fileCount ? (
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-gray-100 rounded-full">
                <Image className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <p className="text-lg text-gray-700 mb-2">
                  <span className="font-medium text-blue-600">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, WEBP up to 6MB each
                </p>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={onFileInputChange}
                disabled={isDisabled}
                className="hidden"
                id="banner-upload"
              />
              <label
                htmlFor="banner-upload"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                Choose Images
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {fileCount} image{fileCount !== 1 ? "s" : ""} selected
              </span>
              <button
                type="button"
                onClick={() => {
                  setFiles([]);
                  setCaptions([]);
                  if (inputRef.current) inputRef.current.value = "";
                }}
                className="text-sm text-red-600 hover:text-red-700 transition-colors"
                disabled={isDisabled}
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
                >
                  <div className="relative">
                    <img
                      src={previews[idx]}
                      alt={file.name}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      disabled={isDisabled}
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                  <div className="p-3">
                    <p
                      className="text-xs text-gray-500 mb-2 truncate"
                      title={file.name}
                    >
                      {file.name}
                    </p>
                    <input
                      type="text"
                      placeholder="Caption (optional)"
                      value={captions[idx] || ""}
                      onChange={(e) => onCaptionChange(idx, e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upload Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Upload Tips:</p>
            <ul className="space-y-1">
              <li>• Use high-quality images for best results</li>
              <li>• Add descriptive captions to engage users</li>
              <li>• Images will be automatically optimized</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={isDisabled || !fileCount}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Upload{" "}
              {fileCount > 0
                ? `${fileCount} Banner${fileCount !== 1 ? "s" : ""}`
                : "Banners"}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default BannerUploadForm;
