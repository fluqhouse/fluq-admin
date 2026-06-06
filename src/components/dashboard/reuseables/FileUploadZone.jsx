// src/components/dashboard/reuseables/FileUploadZone.jsx
import React, { useState } from "react";
import { AlertCircle, X } from "lucide-react";

const FileUploadZone = ({
  fieldName,
  type,
  label,
  icon: Icon,
  accept,
  file,
  previewUrl,
  onFileChange,
  onRemove,
  error,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) onFileChange(droppedFile);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label} {accept && <span className="text-red-400">*</span>}
      </label>

      {!file ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
            dragActive
              ? "border-blue-400 bg-blue-500/10"
              : error
              ? "border-red-500/50 bg-red-500/5"
              : "border-slate-600 hover:border-slate-500 bg-slate-700/30"
          }`}
        >
          <input
            type="file"
            accept={accept}
            onChange={(e) => onFileChange(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Icon className="w-10 h-10 mx-auto mb-3 text-slate-400" />
          <p className="text-sm text-slate-300 mb-1">
            Drag & drop or click to upload
          </p>
          <p className="text-xs text-slate-500">
            {type === "image"
              ? "JPEG, PNG, WebP (max 5MB)"
              : "MP4, AVI, MOV, WMV (max 50MB)"}
          </p>
        </div>
      ) : (
        <div className="relative border border-slate-600 rounded-lg p-4 bg-slate-700/30">
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-1 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
          {type === "image" ? (
            <img
              src={previewUrl}
              alt={label}
              className="w-full h-40 object-cover rounded"
            />
          ) : (
            <video
              src={previewUrl}
              className="w-full h-40 object-cover rounded"
              controls
            />
          )}
          <p className="text-xs text-slate-400 mt-2 truncate">{file.name}</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1 mt-2 text-red-400 text-xs">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(FileUploadZone);
