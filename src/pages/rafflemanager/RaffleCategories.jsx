import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/dashboard/layouts/Layout";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeactivateCategory,
} from "../../hooks/queries/useRaffleQueries";

const CategoryPreview = ({ category, onClose }) => {
  if (!category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">{category.title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {category.image_url && (
            <div className="mb-4 w-full h-80 sm:h-96 bg-slate-700/30 rounded-lg overflow-hidden">
              <img
                src={category.image_url}
                alt={category.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {category.description && (
            <p className="text-slate-300 text-sm">{category.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const RaffleCategories = () => {
  const navigate = useNavigate();
  const [previewCategory, setPreviewCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const { data: categoriesData, isLoading, error, refetch } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deactivateMutation = useDeactivateCategory();

  const categories = categoriesData?.data || [];

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        title: category.title,
        description: category.description || "",
        image: null,
      });
      setPreviewImage(category.image_url);
    } else {
      setEditingCategory(null);
      setFormData({ title: "", description: "", image: null });
      setPreviewImage(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ title: "", description: "", image: null });
    setPreviewImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      if (editingCategory) {
        await updateMutation.mutateAsync({
          id: editingCategory.id,
          formData: formDataToSend,
        });
      } else {
        await createMutation.mutateAsync(formDataToSend);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };

  const handleDeactivate = async (id, title) => {
    if (window.confirm(`Are you sure you want to deactivate "${title}"?`)) {
      await deactivateMutation.mutateAsync(id);
    }
  };

  if (error) {
    return (
      <Layout title="Categories">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-2">
              Error loading categories
            </div>
            <button
              onClick={() => refetch()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Raffle Categories">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Categories
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Manage raffle item categories
              </p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              + Create Category
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-slate-300">Loading categories...</span>
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-12 text-center">
            <div className="text-slate-400 text-lg">No categories found</div>
            <p className="text-slate-500 text-sm mt-2">
              Create your first category to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition-all group"
              >
                {/* Image */}
                <div
                  className="relative aspect-video bg-slate-700/30 overflow-hidden cursor-pointer"
                  onClick={() => setPreviewCategory(category)}
                >
                  {" "}
                  {category.image_url ? (
                    <img
                      src={category.image_url}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <svg
                        className="w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                  )}
                  {/* Active Badge */}
                  {category.is_active && (
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 border border-green-600/30 rounded-full text-xs font-medium">
                        ACTIVE
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-white font-semibold text-base">
                      {category.title}
                    </h3>
                    {category.description && (
                      <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-slate-700/50">
                    <button
                      onClick={() => handleOpenModal(category)}
                      className="flex-1 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs rounded-lg transition-colors border border-blue-600/30"
                    >
                      Edit
                    </button>
                    {category.is_active && (
                      <button
                        onClick={() =>
                          handleDeactivate(category.id, category.title)
                        }
                        className="flex-1 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs rounded-lg transition-colors border border-red-600/30"
                      >
                        Deactivate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {editingCategory ? "Edit Category" : "Create Category"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Electronics"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Brief description of this category..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Category Image
                </label>
                <div className="space-y-3">
                  {previewImage && (
                    <div className="relative aspect-video bg-slate-700/30 rounded-lg overflow-hidden">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                  />
                  <p className="text-xs text-slate-400">
                    Supported formats: JPEG, PNG, WebP (max 15MB)
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingCategory
                    ? "Update Category"
                    : "Create Category"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {previewCategory && (
        <CategoryPreview
          category={previewCategory}
          onClose={() => setPreviewCategory(null)}
        />
      )}
    </Layout>
  );
};

export default RaffleCategories;
