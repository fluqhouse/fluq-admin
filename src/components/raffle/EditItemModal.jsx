import React, { useState, useEffect } from "react";
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

export const EditItemModal = ({
  isOpen,
  onClose,
  item,
  categories,
  onSubmit,
  isUpdating,
}) => {
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    description: "",
    ticketPrice: "",
    // startTime: "",
    // endTime: "",
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
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize form data when item changes
  useEffect(() => {
    if (item && isOpen) {
      setFormData({
        categoryId: item.category_id?.toString() || "",
        title: item.title || "",
        description: item.description || "",
        ticketPrice: item.ticket_price || "",
        ticketsPerIcon: item.tickets_per_icon || "",
        expectedWinners: item.expected_winners || "",
      });

      // Set existing media URLs as previews
      const frontImage = item.media?.find((m) => m.view === "front");
      const sideImage = item.media?.find((m) => m.view === "side");
      const videoMedia = item.media?.find((m) => m.type === "video");

      setPreviewUrls({
        frontImage: frontImage?.url || null,
        sideImage: sideImage?.url || null,
        video: videoMedia?.url || null,
      });

      setHasChanges(false);
    }
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setHasChanges(true);
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
    setHasChanges(true);

    const url = URL.createObjectURL(file);
    setPreviewUrls((prev) => ({ ...prev, [fieldName]: url }));
  };

  const removeFile = (fieldName) => {
    setFiles((prev) => ({ ...prev, [fieldName]: null }));
    // Keep the original preview URL if it exists from the item
    const originalMedia = item.media?.find(
      (m) =>
        (fieldName === "frontImage" && m.view === "front") ||
        (fieldName === "sideImage" && m.view === "side") ||
        (fieldName === "video" && m.type === "video"),
    );

    if (originalMedia) {
      setPreviewUrls((prev) => ({ ...prev, [fieldName]: originalMedia.url }));
    } else {
      setPreviewUrls((prev) => ({ ...prev, [fieldName]: null }));
    }
    setHasChanges(true);
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
    if (!formData.ticketsPerIcon || formData.ticketsPerIcon < 1) {
      newErrors.ticketsPerIcon = "Must be at least 1 ticket per icon";
    }
    if (!formData.expectedWinners || formData.expectedWinners < 1) {
      newErrors.expectedWinners = "Must have at least 1 expected winner";
    }

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
    submitData.append("ticketsPerIcon", formData.ticketsPerIcon);
    submitData.append("expectedWinners", formData.expectedWinners);

    // Only append new files if they were changed
    if (files.frontImage) {
      submitData.append("frontImage", files.frontImage);
    }
    if (files.sideImage) {
      submitData.append("sideImage", files.sideImage);
    }
    if (files.video) {
      submitData.append("video", files.video);
    }

    onSubmit(submitData);
  };

  const handleClose = () => {
    // Clean up preview URLs that were created from File objects
    Object.entries(files).forEach(([key, file]) => {
      if (file && previewUrls[key]) {
        URL.revokeObjectURL(previewUrls[key]);
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-white">Edit Raffle Item</h2>
            <p className="text-sm text-slate-400 mt-1">
              Update the details of your raffle item
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
            disabled={isUpdating}
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
            </div>

            <InputField
              name="title"
              label="Item Title"
              placeholder="e.g., iPhone 15 Pro Max"
              value={formData.title}
              onChange={handleInputChange}
              error={errors.title}
              required
            />

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
                error={errors.ticketPrice}
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
                error={errors.expectedWinners}
                min="1"
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
              error={errors.ticketsPerIcon}
              min="1"
              required
            />

            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Media Files (Optional - Upload new files to replace)
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

        <div className="flex items-center justify-between p-6 border-t border-slate-700 bg-slate-800/50">
          <div className="text-sm text-slate-400">
            {hasChanges ? "You have unsaved changes" : "No changes made"}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              disabled={isUpdating}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isUpdating || !hasChanges}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUpdating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Updating...
                </>
              ) : (
                "Update Item"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
