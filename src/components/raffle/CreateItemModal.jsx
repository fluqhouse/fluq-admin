import React, { useState } from "react";
import {
  X,
  Upload,
  Image,
  Video,
  AlertCircle,
  Calendar,
  DollarSign,
  Ticket,
  Trophy,
} from "lucide-react";
import InputField from "../dashboard/reuseables/InputField";
import FileUploadZone from "../dashboard/reuseables/FileUploadZone";

export const CreateItemModal = ({
  isOpen,
  onClose,
  categories,
  onSubmit,
  isCreating,
}) => {
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    description: "",
    ticketPrice: "",
    startTime: "",
    endTime: "",
    ticketsPerIcon: "",
    expectedWinners: "",
  });

  const [files, setFiles] = useState({
    frontImage: null,
    sideImage: null,
    video: null,
  });

  const [previewUrls, setPreviewUrls] = useState({
    frontImage: null,
    sideImage: null,
    video: null,
  });

  const [errors, setErrors] = useState({});
  // const [dragActive, setDragActive] = useState({});

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateFile = (file, type) => {
    const imageTypes = ["image/jpeg", "image/png", "image/webp"];
    const videoTypes = [
      "video/mp4",
      "video/avi",
      "video/mov",
      "video/quicktime",
      "video/x-ms-wmv",
    ];
    const maxImageSize = 5 * 1024 * 1024;
    const maxVideoSize = 50 * 1024 * 1024;

    if (type === "image") {
      if (!imageTypes.includes(file.type)) {
        return "Please upload a JPEG, PNG, or WebP image";
      }
      if (file.size > maxImageSize) {
        return "Image must be less than 5MB";
      }
    } else if (type === "video") {
      if (!videoTypes.includes(file.type)) {
        return "Please upload an MP4, AVI, MOV, or WMV video";
      }
      if (file.size > maxVideoSize) {
        return "Video must be less than 50MB";
      }
    }

    return null;
  };

  const handleFileChange = (e, fieldName, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const error = validateFile(file, type);
    if (error) {
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
      return;
    }

    setFiles((prev) => ({ ...prev, [fieldName]: file }));
    setErrors((prev) => ({ ...prev, [fieldName]: null }));

    const url = URL.createObjectURL(file);
    setPreviewUrls((prev) => ({ ...prev, [fieldName]: url }));
  };

  // const handleDrag = (e, fieldName) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (e.type === "dragenter" || e.type === "dragover") {
  //     setDragActive((prev) => ({ ...prev, [fieldName]: true }));
  //   } else if (e.type === "dragleave") {
  //     setDragActive((prev) => ({ ...prev, [fieldName]: false }));
  //   }
  // };

  // const handleDrop = (e, fieldName, type) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setDragActive((prev) => ({ ...prev, [fieldName]: false }));

  //   const file = e.dataTransfer.files[0];
  //   if (!file) return;

  //   const error = validateFile(file, type);
  //   if (error) {
  //     setErrors((prev) => ({ ...prev, [fieldName]: error }));
  //     return;
  //   }

  //   setFiles((prev) => ({ ...prev, [fieldName]: file }));
  //   setErrors((prev) => ({ ...prev, [fieldName]: null }));

  //   const url = URL.createObjectURL(file);
  //   setPreviewUrls((prev) => ({ ...prev, [fieldName]: url }));
  // };

  const removeFile = (fieldName) => {
    setFiles((prev) => ({ ...prev, [fieldName]: null }));
    if (previewUrls[fieldName]) {
      URL.revokeObjectURL(previewUrls[fieldName]);
    }
    setPreviewUrls((prev) => ({ ...prev, [fieldName]: null }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.ticketPrice !== "" && formData.ticketPrice < 0) {
      newErrors.ticketPrice =
        "Ticket price cannot be negative (can be 0 for free)";
    }
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (
      formData.startTime &&
      formData.endTime &&
      new Date(formData.startTime) >= new Date(formData.endTime)
    ) {
      newErrors.endTime = "End time must be after start time";
    }
    if (!formData.ticketsPerIcon || formData.ticketsPerIcon < 1) {
      newErrors.ticketsPerIcon = "Must be at least 1 ticket per icon";
    }
    if (!formData.expectedWinners || formData.expectedWinners < 1) {
      newErrors.expectedWinners = "Must have at least 1 expected winner";
    }
    if (!files.frontImage) newErrors.frontImage = "Front image is required";
    if (!files.sideImage) newErrors.sideImage = "Side image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const submitData = new FormData();
    submitData.append("categoryId", formData.categoryId);
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append(
      "ticketPrice",
      formData.ticketPrice ? formData.ticketPrice : 0,
    );
    submitData.append("startTime", formData.startTime);
    submitData.append("endTime", formData.endTime);
    submitData.append("ticketsPerIcon", formData.ticketsPerIcon);
    submitData.append("expectedWinners", formData.expectedWinners);
    submitData.append("frontImage", files.frontImage);
    submitData.append("sideImage", files.sideImage);
    if (files.video) {
      submitData.append("video", files.video);
    }

    onSubmit(submitData);
  };

  const handleClose = () => {
    Object.values(previewUrls).forEach((url) => {
      if (url) URL.revokeObjectURL(url);
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-white">Create Raffle Item</h2>
            <p className="text-sm text-slate-400 mt-1">
              Fill in the details to create a new raffle
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
            disabled={isCreating}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 bg-slate-700/50 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all ${
                    errors.categoryId
                      ? "border-red-500/50 focus:ring-red-500/30"
                      : "border-slate-600 focus:ring-blue-500/30"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.categoryId}</span>
                  </div>
                )}
              </div>

              <InputField
                name="title"
                label="Item Title"
                placeholder="e.g., iPhone 15 Pro Max"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe the raffle item..."
                className={`w-full px-3 py-2.5 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.description
                    ? "border-red-500/50 focus:ring-red-500/30"
                    : "border-slate-600 focus:ring-blue-500/30"
                }`}
              />
              {errors.description && (
                <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.description}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                name="ticketPrice"
                label="Ticket Price (NGN)"
                type="number"
                icon={Ticket}
                placeholder="0 for free"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />

              <InputField
                name="expectedWinners"
                label="Expected Winners"
                type="number"
                icon={Trophy}
                placeholder="1"
                value={formData.expectedWinners}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                name="startTime"
                label="Start Time"
                type="datetime-local"
                icon={Calendar}
                value={formData.startTime}
                onChange={handleInputChange}
                required
              />

              <InputField
                name="endTime"
                label="End Time"
                type="datetime-local"
                icon={Calendar}
                value={formData.endTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <InputField
              name="ticketsPerIcon"
              label="Tickets Per Icon"
              type="number"
              icon={Ticket}
              placeholder="100"
              value={formData.ticketsPerIcon}
              onChange={handleInputChange}
              min="1"
              required
            />

            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Media Files
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FileUploadZone
                  fieldName="frontImage"
                  type="image"
                  label="Front Image"
                  icon={Image}
                  accept="image/jpeg,image/png,image/webp"
                  file={files.frontImage}
                  previewUrl={previewUrls.frontImage}
                  onFileChange={(file) =>
                    handleFileChange(
                      { target: { files: [file] } },
                      "frontImage",
                      "image",
                    )
                  }
                  onRemove={() => removeFile("frontImage")}
                  error={errors.frontImage}
                  required
                />
                <FileUploadZone
                  fieldName="sideImage"
                  type="image"
                  label="Side Image"
                  icon={Image}
                  accept="image/jpeg,image/png,image/webp"
                  file={files.sideImage}
                  previewUrl={previewUrls.sideImage}
                  onFileChange={(file) =>
                    handleFileChange(
                      { target: { files: [file] } },
                      "sideImage",
                      "image",
                    )
                  }
                  onRemove={() => removeFile("sideImage")}
                  error={errors.sideImage}
                  required
                />
              </div>
              <FileUploadZone
                fieldName="video"
                type="video"
                label="Video (Optional)"
                icon={Video}
                accept="video/mp4,video/avi,video/mov,video/quicktime,video/x-ms-wmv"
                file={files.video}
                previewUrl={previewUrls.video}
                onFileChange={(file) =>
                  handleFileChange(
                    { target: { files: [file] } },
                    "video",
                    "video",
                  )
                }
                onRemove={() => removeFile("video")}
                error={errors.video}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700 bg-slate-800/50">
          <button
            onClick={handleClose}
            disabled={isCreating}
            className="px-4 py-2 text-slate-300 hover:text-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isCreating}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Creating...
              </>
            ) : (
              "Create Item"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
