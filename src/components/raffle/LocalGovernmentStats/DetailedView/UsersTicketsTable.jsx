import React from "react";

export const UsersTicketsTable = ({ users }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
      <div className="p-6 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">Users & Tickets</h3>
      </div>

      <div className="overflow-x-auto">
        {users?.map((user, userIndex) => (
          <div
            key={userIndex}
            className="border-b border-slate-700/50 last:border-0"
          >
            {/* User Header */}
            <div className="bg-slate-700/30 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">
                    {user.first_name || "N/A"} {user.last_name || ""}
                  </p>
                  <p className="text-sm text-slate-400">{user.email}</p>
                  <p className="text-xs text-slate-500">{user.user_id}</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-600/20 text-blue-400 border border-blue-600/30">
                  {user.tickets?.length || 0} tickets
                </span>
              </div>
            </div>

            {/* User Tickets */}
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {user.tickets?.map((ticket, ticketIndex) => (
                  <div
                    key={ticketIndex}
                    className="bg-slate-700/50 rounded-lg p-3 border border-slate-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg">{ticket.icon_name}</span>
                      <span className="text-xs text-slate-400">
                        Item #{ticket.item_id}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-blue-400 mb-1">
                      {ticket.ticket_number}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(ticket.booked_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
