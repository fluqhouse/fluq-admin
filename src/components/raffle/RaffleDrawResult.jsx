import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../dashboard/layouts/Layout";
import {
  useWinningTickets,
  useItemById,
} from "../../hooks/queries/useRaffleQueries";
import { formatCurrency, formatDate } from "../../utils/format";

const RaffleDrawResults = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: itemData,
    isLoading: isLoadingItem,
  } = useItemById(itemId);

  const {
    data: winningData,
    isLoading: isLoadingWinners,
    error: winnersError,
    refetch: refetchWinners,
  } = useWinningTickets(itemId);

  const item = itemData?.data;
  const winners = winningData?.data || [];

  const filteredWinners = searchTerm
    ? winners.filter(
        (winner) =>
          winner.ticket_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          winner.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          winner.user?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          winner.user?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : winners;

  if (winnersError) {
    return (
      <Layout title="Draw Results">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-2">
              {winnersError.response?.status === 404
                ? "Draw results not found for this raffle"
                : "Error loading draw results"}
            </div>
            <button
              onClick={() => refetchWinners()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoadingItem || isLoadingWinners) {
    return (
      <Layout title="Draw Results">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-slate-300">Loading draw results...</span>
        </div>
      </Layout>
    );
  }

  if (!item) {
    return (
      <Layout title="Draw Results">
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-slate-400">
            Item not found
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Raffle Draw Results">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate(-1)}
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {item?.title}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Draw Results | Expected Winners: {item?.expected_winners}
              </p>
            </div>
          </div>
        </div>

        {/* Draw Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
            <p className="text-xs text-slate-400 mb-1">Ticket Price</p>
            <p className="text-2xl font-bold text-white">
              {item?.ticket_price > 0 ? formatCurrency(item?.ticket_price) : "Free"}
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
            <p className="text-xs text-slate-400 mb-1">Total Winners</p>
            <p className="text-2xl font-bold text-green-400">
              {winners.length}
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
            <p className="text-xs text-slate-400 mb-1">Draw Status</p>
            <p className="text-2xl font-bold text-purple-400">
              {item?.winners_selected ? "Completed" : "Pending"}
            </p>
          </div>
        </div>

        {/* Winners List */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Winning Tickets
            </h3>
            <div className="w-full sm:w-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by ticket, name, or email..."
                className="w-full sm:w-64 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm"
              />
            </div>
          </div>

          {winners.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              {item?.winners_selected
                ? "No winning tickets found"
                : "Draw has not been conducted yet"}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWinners.map((winner, index) => (
                <div
                  key={winner.id || index}
                  className="bg-gradient-to-br from-green-600/20 to-green-700/20 border border-green-600/30 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-green-300 mb-1">
                        Winner #{index + 1}
                      </p>
                      <p className="text-lg font-bold text-white">
                        {winner.ticket_number}
                      </p>
                      <p className="text-lg mt-1">{winner.icon_name}</p>
                    </div>
                    <div className="text-2xl">🏆</div>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-green-600/30">
                    <div>
                      <span className="text-xs text-green-300">Winner</span>
                      <p className="text-sm text-white">
                        {winner.user?.first_name} {winner.user?.last_name}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-green-300">Email</span>
                      <p className="text-sm text-slate-300 truncate">
                        {winner.user?.email}
                      </p>
                    </div>
                    {winner.claim && (
                      <div>
                        <span className="text-xs text-green-300">Claim Status</span>
                        <p className="text-sm text-white capitalize">
                          {winner.claim.status?.replace(/_/g, " ")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchTerm && filteredWinners.length === 0 && winners.length > 0 && (
            <div className="text-center py-8 text-slate-400">
              No winners found matching "{searchTerm}"
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 flex flex-wrap gap-3">
          <button
            onClick={() => navigate(`/rafflemanager/items/${itemId}`)}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
          >
            Back to Item
          </button>
          <button
            onClick={() => navigate("/logistics/claims")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
          >
            View Claims (Logistics)
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default RaffleDrawResults;
