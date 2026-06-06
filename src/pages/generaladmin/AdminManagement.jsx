import React, { useState } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import { useCreateAdmin } from "../../hooks/queries/useAdminQueries";
import { UserPlus, AlertCircle, CheckCircle, X } from "lucide-react";
import { ADMIN_ROLES_CONFIG, ROLES } from "../../constants";

const AdminManagement = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: ROLES.ADMIN,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const mutation = useCreateAdmin();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    mutation.mutate(formData, {
      onSuccess: () => {
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          role: "admin",
        });
      }
    });
  };

  return (
    <Layout title="Admin Management">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <UserPlus className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Create Admin Account</h2>
          </div>
          <p className="text-slate-300 mb-6">
            Create a new admin account. Only company emails are allowed.
          </p>

          {error && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-400">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* No success banner needed, toast will handle it */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter company email"
                />
                <p className="mt-1 text-xs text-slate-400">
                  Must be a company email address
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password (min 6 characters)"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Admin Role <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {ADMIN_ROLES_CONFIG.map((role) => (
                  <label
                    key={role.value}
                    className={`relative flex items-start p-4 cursor-pointer rounded-lg border transition-all ${
                      formData.role === role.value
                        ? "bg-blue-500/20 border-blue-500"
                        : "bg-slate-700/30 border-slate-600 hover:border-slate-500"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <span
                        className={`block text-sm font-medium ${
                          formData.role === role.value
                            ? "text-blue-300"
                            : "text-white"
                        }`}
                      >
                        {role.label}
                      </span>
                      <span className="block text-xs text-slate-400 mt-1">
                        {role.description}
                      </span>
                    </div>
                    {formData.role === role.value && (
                      <CheckCircle className="w-5 h-5 text-blue-400 absolute top-2 right-2" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={mutation.isPending}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  mutation.isPending
                    ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                }`}
              >
                {mutation.isPending ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Admin
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AdminManagement;
