import React, { useState } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import { useUsers, useUpdateUserStatus, useDeleteUser } from "../../hooks/queries/useUserQueries";
import {
  Search,
  RefreshCw,
  AlertCircle,
  X,
  Users,
  ChevronLeft,
  ChevronRight,
  Shield,
  ShieldCheck,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  Edit2,
} from "lucide-react";
import { USER_ROLES_CONFIG, ROLES } from "../../constants";

// Build role options for filter dropdown (includes "All Roles" option)
const ROLE_OPTIONS = [
  { value: "", label: "All Roles" },
  ...USER_ROLES_CONFIG,
];

const STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  { value: "verified", label: "Verified" },
  { value: "unverified", label: "Unverified" },
];

const UserManagement = () => {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    role: "",
    status: "",
    sortBy: "createdAt",
    sortOrder: "DESC",
    page: 1,
    limit: 10,
  });

  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { data, isLoading: loading, error: queryError, refetch: fetchUsers } = useUsers(filters);

  const users = data?.data?.users || [];
  const pagination = data?.data?.pagination || { currentPage: 1, totalPages: 1, totalUsers: 0 };
  const error = queryError ? (queryError.error?.message || queryError.message || "Failed to fetch users") : null;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const updateMutation = useUpdateUserStatus();
  const deleteMutation = useDeleteUser();

  const handleUpdateStatus = (userId, updates) => {
    updateMutation.mutate(
      { userId, updates },
      {
        onSuccess: () => setEditingUser(null),
      }
    );
  };

  const handleDeleteUser = (userId) => {
    deleteMutation.mutate(userId, {
      onSuccess: () => setDeleteConfirm(null),
    });
  };

  const actionLoading = updateMutation.isPending || deleteMutation.isPending;
  const actionError = updateMutation.error || deleteMutation.error;
  
  const displayError = error || (actionError ? (actionError.error?.message || actionError.message || "Failed to handle action") : null);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case ROLES.SUPERADMIN:
        return "bg-purple-500/20 text-purple-400 border-purple-500/50";
      case ROLES.ADMIN:
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case ROLES.MARKETING_ADMIN:
        return "bg-pink-500/20 text-pink-400 border-pink-500/50";
      case ROLES.LOTTO_ADMIN:
      case ROLES.RAFFLE_ADMIN:
      case ROLES.LOGISTICS_ADMIN:
      case ROLES.FINANCE_ADMIN:
      case ROLES.SUPPORT_ADMIN:
      case ROLES.ACCOUNTING_ADMIN:
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/50";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/50";
    }
  };

  return (
    <Layout title="User Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">User Management</h2>
                <p className="text-slate-400 text-sm">
                  Manage all users in the system
                </p>
              </div>
            </div>

            <button
              onClick={fetchUsers}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {/* Filters */}
          <form onSubmit={handleSearch} className="mt-6 pt-6 border-t border-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search by name, email, or ID..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Role Filter */}
              <select
                name="role"
                value={filters.role}
                onChange={handleFilterChange}
                className="px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Search Button */}
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Messages */}
        {displayError && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="text-red-400">{displayError}</span>
            <button onClick={() => { updateMutation.reset(); deleteMutation.reset(); }} className="ml-auto text-red-400 hover:text-red-300">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-green-400">{success}</span>
            <button onClick={() => setSuccess(null)} className="ml-auto text-green-400 hover:text-green-300">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between">
          <p className="text-slate-400">
            {loading ? (
              "Loading..."
            ) : (
              <>
                Showing <span className="text-white font-medium">{users.length}</span> of{" "}
                <span className="text-white font-medium">{pagination.totalUsers}</span> users
              </>
            )}
          </p>
        </div>

        {/* Users Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Joined</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-12 text-center">
                      <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-3" />
                      <span className="text-slate-400">Loading users...</span>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-12 text-center">
                      <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <span className="text-slate-400">No users found</span>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-white font-medium">
                            {user.first_name} {user.last_name}
                          </p>
                          <p className="text-slate-400 text-xs">{user.user_id}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded border ${getRoleBadgeColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {user.is_verified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded bg-green-500/20 text-green-400 border border-green-500/50">
                            <ShieldCheck className="w-3 h-3" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/50">
                            <Shield className="w-3 h-3" />
                            Unverified
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">{formatDate(user.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingUser(user)}
                            className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(user)}
                            className="p-1.5 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-700">
              <p className="text-sm text-slate-400">
                Page {pagination.currentPage} of {pagination.totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPreviousPage}
                  className="p-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="p-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-bold text-white mb-4">Edit User</h3>
              <p className="text-slate-400 mb-4">
                {editingUser.first_name} {editingUser.last_name} ({editingUser.email})
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {ROLE_OPTIONS.filter((r) => r.value).map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Verification Status</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={editingUser.is_verified === true}
                        onChange={() => setEditingUser({ ...editingUser, is_verified: true })}
                        className="text-blue-500"
                      />
                      <span className="text-slate-300">Verified</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={editingUser.is_verified === false}
                        onChange={() => setEditingUser({ ...editingUser, is_verified: false })}
                        className="text-blue-500"
                      />
                      <span className="text-slate-300">Unverified</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    handleUpdateStatus(editingUser.user_id, {
                      role: editingUser.role,
                      is_verified: editingUser.is_verified,
                    })
                  }
                  disabled={actionLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-bold text-white mb-4">Delete User</h3>
              <p className="text-slate-400 mb-4">
                Are you sure you want to delete{" "}
                <span className="text-white font-medium">
                  {deleteConfirm.first_name} {deleteConfirm.last_name}
                </span>
                ? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteUser(deleteConfirm.user_id)}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserManagement;
