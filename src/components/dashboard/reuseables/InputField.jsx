// src/components/dashboard/reuseables/InputField.jsx
import React from "react";
import { AlertCircle } from "lucide-react";

const InputField = ({
  name,
  label,
  type = "text",
  icon: Icon,
  value,
  onChange,
  error,
  required,
  ...props
}) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-2">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon className="w-4 h-4" />
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full ${
          Icon ? "pl-10" : "pl-3"
        } pr-3 py-2.5 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-500/50 focus:ring-red-500/30"
            : "border-slate-600 focus:ring-blue-500/30"
        }`}
        {...props}
      />
    </div>
    {error && (
      <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
        <AlertCircle className="w-3 h-3" />
        <span>{error}</span>
      </div>
    )}
  </div>
);

export default React.memo(InputField);
