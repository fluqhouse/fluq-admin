import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/dashboard/layouts/Layout";
import ConfirmationModal from "../../components/dashboard/reuseables/ConfirmationModal";
import {
  useItems,
  useCategories,
  useDeleteItem,
  useCreateItem,
} from "../../hooks/queries/useRaffleQueries";
import { CreateItemModal } from "../../components/raffle/CreateItemModal";
import { formatCurrency, formatDate } from "../../utils/format";

const RaffleItems = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    status: "",
    categoryId: "",
    search: "",
    sortBy: "created_at",
    sortOrder: "DESC",
  });

  const { data: itemsData, isLoading, error, refetch } = useItems(filters);
  const { data: categoriesData } = useCategories();
  const deleteItemMutation = useDeleteItem();
  const createItemMutation = useCreateItem();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    action: null,
    itemId: null,
    itemTitle: "",
  });

  const handleSubmit = async (formData) => {
    await createItemMutation.mutateAsync(formData, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  const items = itemsData?.data || [];
  const pagination = itemsData?.pagination;
  const categories = categoriesData?.data || [];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const openConfirmModal = (action, itemId, itemTitle) => {
    setConfirmModal({
      isOpen: true,
      action,
      itemId,
      itemTitle,
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      isOpen: false,
      action: null,
      itemId: null,
      itemTitle: "",
    });
  };

  const handleConfirmAction = async () => {
    const { action, itemId } = confirmModal;

    try {
      switch (action) {
        case "delete":
          await deleteItemMutation.mutateAsync(itemId);
          break;
        default:
          return;
      }

      closeConfirmModal();
      refetch();
    } catch (error) {
      console.error(`Failed to ${action} item:`, error);
    }
  };

  const getConfirmModalProps = () => {
    const { action, itemTitle } = confirmModal;
    switch (action) {
      case "delete":
        return {
          title: "Delete Raffle Item",
          message: `Are you sure you want to delete "${itemTitle}"? This action cannot be undone and will permanently remove all associated data.`,
          confirmText: "Delete Item",
          type: "danger",
        };
      default:
        return {};
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: "bg-gray-600/20 text-gray-400 border-gray-600/30",
      open: "bg-green-600/20 text-green-400 border-green-600/30",
      closed: "bg-red-600/20 text-red-400 border-red-600/30",
      archived: "bg-slate-600/20 text-slate-400 border-slate-600/30",
    };
    return colors[status] || colors.draft;
  };

  if (error) {
    return (
      <Layout title="Raffle Items">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-2">
              Error loading raffle items
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
    <Layout title="Raffle Items">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Raffle Items
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Manage your raffle items and prizes
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              + Create Item
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 sm:p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  placeholder="Search items..."
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={filters.categoryId}
                  onChange={(e) =>
                    handleFilterChange("categoryId", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={() => {
                  setFilters({
                    page: 1,
                    limit: 12,
                    status: "",
                    categoryId: "",
                    search: "",
                    sortBy: "created_at",
                    sortOrder: "DESC",
                  });
                }}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Items Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-slate-300">Loading items...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-12 text-center">
            <div className="text-slate-400 text-lg">No raffle items found</div>
            <p className="text-slate-500 text-sm mt-2">
              Try adjusting your filters or create a new item
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => {
              const frontImage = item.media?.find((m) => m.view === "front");

              return (
                <div
                  key={item.id}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition-all group"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-slate-700/30 overflow-hidden">
                    {frontImage ? (
                      <img
                        src={frontImage.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <svg
                          className="w-16 h-16"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          item.status,
                        )}`}
                      >
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-white font-semibold text-sm line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">
                        {item.category?.title}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Ticket Price</span>
                        <span className="text-blue-400 font-semibold">
                          {item.ticket_price > 0
                            ? formatCurrency(item.ticket_price)
                            : "Free"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Winners</span>
                        <span className="text-white">
                          {item.expected_winners}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">End Date</span>
                        <span className="text-white">
                          {formatDate(item.end_time)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t border-slate-700/50">
                      <button
                        onClick={() =>
                          navigate(`/rafflemanager/items/${item.id}`)
                        }
                        className="flex-1 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs rounded-lg transition-colors border border-blue-600/30"
                      >
                        View
                      </button>
                      <button
                        onClick={() =>
                          openConfirmModal("delete", item.id, item.title)
                        }
                        disabled={deleteItemMutation.isPending}
                        className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs rounded-lg transition-colors border border-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-slate-400">
                Page {pagination.currentPage} of {pagination.totalPages} (
                {pagination.totalItems} total items)
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleFilterChange("page", filters.page - 1)}
                  disabled={!pagination.hasPrev}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handleFilterChange("page", filters.page + 1)}
                  disabled={!pagination.hasNext}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Item Modal */}
        <CreateItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          categories={categoriesData?.data || []}
          onSubmit={handleSubmit}
          isCreating={createItemMutation.isPending}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onClose={closeConfirmModal}
          onConfirm={handleConfirmAction}
          isLoading={deleteItemMutation.isPending}
          {...getConfirmModalProps()}
        />
      </div>
    </Layout>
  );
};

export default RaffleItems;
