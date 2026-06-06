import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/dashboard/layouts/Layout";
import {
  useDrawResults,
  useTicketDrawResult,
} from "../../hooks/queries/useRaffleQueries";
import { formatCurrency, formatDate } from "../../utils/format";

const RaffleDrawResults = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [ticketNumber, setTicketNumber] = useState("");
  const [searchTicketId, setSearchTicketId] = useState(null);

  const {
    data: drawData,
    isLoading: isLoadingDraw,
    error: drawError,
    refetch: refetchDraw,
  } = useDrawResults(itemId);

  const {
    data: ticketData,
    isLoading: isLoadingTicket,
    error: ticketError,
  } = useTicketDrawResult(searchTicketId, {
    enabled: !!searchTicketId,
  });

  const drawResults = drawData?.data;
  const ticketResult = ticketData?.data;

  const handleSearchTicket = (e) => {
    e.preventDefault();
    if (ticketNumber.trim()) {
      setSearchTicketId(ticketNumber.trim());
    }
  };

  const clearTicketSearch = () => {
    setTicketNumber("");
    setSearchTicketId(null);
  };

  if (drawError) {
    return (
      <Layout title="Draw Results">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-2">
              {drawError.response?.status === 404
                ? "Draw results not found for this raffle"
                : "Error loading draw results"}
            </div>
            <button
              onClick={() => refetchDraw()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoadingDraw) {
    return (
      <Layout title="Draw Results">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-slate-300">Loading draw results...</span>
        </div>
      </Layout>
    );
  }

  if (!drawResults) {
    return (
      <Layout title="Draw Results">
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-slate-400">
            No draw results available
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
                {drawResults.itemTitle}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Item ID: {itemId} | Draw Date:{" "}
                {formatDate(drawResults.drawDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Winning Tickets */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
            🎉 Winning Tickets
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {drawResults.winners?.map((winner, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-600/20 to-green-700/20 border border-green-600/30 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-green-300 mb-1">
                      Winner #{index + 1}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {winner.ticket_number}
                    </p>
                    <p className="text-xl mt-1">{winner.icon_name}</p>
                  </div>
                  <div className="text-3xl">🏆</div>
                </div>
                <div className="space-y-1 pt-3 border-t border-green-600/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-300">Winner</span>
                    <span className="text-sm text-white">
                      {winner.user?.first_name} {winner.user?.last_name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-300">Prize</span>
                    <span className="text-sm font-bold text-green-400">
                      {formatCurrency(drawResults.prizeAmount)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Draw Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
            <p className="text-xs text-slate-400 mb-1">Total Tickets Sold</p>
            <p className="text-2xl font-bold text-white">
              {drawResults.statistics?.totalTickets || 0}
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
            <p className="text-xs text-slate-400 mb-1">Winners</p>
            <p className="text-2xl font-bold text-green-400">
              {drawResults.winners?.length || 0}
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
            <p className="text-xs text-slate-400 mb-1">Total Prize Pool</p>
            <p className="text-2xl font-bold text-purple-400">
              {formatCurrency(
                (drawResults.prizeAmount || 0) *
                  (drawResults.winners?.length || 0)
              )}
            </p>
          </div>
        </div>

        {/* Ticket Search */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
            Check Your Ticket
          </h3>

          <form onSubmit={handleSearchTicket} className="flex gap-2 mb-6">
            <input
              type="text"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              placeholder="Enter Ticket Number (e.g., TKT001, 🎯-001)"
              className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!ticketNumber.trim() || isLoadingTicket}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingTicket ? "Checking..." : "Check"}
            </button>
            {searchTicketId && (
              <button
                type="button"
                onClick={clearTicketSearch}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </form>

          {/* Ticket Error */}
          {ticketError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
              <p className="text-red-400 text-sm">
                {ticketError.response?.status === 404
                  ? "Ticket not found"
                  : "Error loading ticket results. Please try again."}
              </p>
            </div>
          )}

          {/* Ticket Result */}
          {ticketResult && (
            <div className="space-y-4">
              {/* Ticket Info */}
              <div
                className={`rounded-lg p-4 border ${
                  ticketResult.isWinner
                    ? "bg-green-600/10 border-green-600/30"
                    : "bg-slate-700/30 border-slate-600"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {ticketResult.ticket_number}
                    </h4>
                    <p className="text-2xl mb-2">{ticketResult.icon_name}</p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          ticketResult.isWinner
                            ? "bg-green-600/20 text-green-400 border border-green-600/30"
                            : "bg-slate-600/20 text-slate-400 border border-slate-600/30"
                        }`}
                      >
                        {ticketResult.isWinner ? "🎉 WINNER!" : "Not a Winner"}
                      </span>
                    </div>
                  </div>
                  {ticketResult.isWinner && (
                    <div className="text-right">
                      <p className="text-xs text-green-300 mb-1">Prize</p>
                      <p className="text-2xl font-bold text-green-400">
                        {formatCurrency(ticketResult.prizeAmount)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-600">
                  <div>
                    <p className="text-xs text-slate-400">Ticket Holder</p>
                    <p className="text-sm text-white font-medium mt-1">
                      {ticketResult.user?.first_name}{" "}
                      {ticketResult.user?.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Email</p>
                    <p className="text-sm text-white font-medium mt-1">
                      {ticketResult.user?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Booked On</p>
                    <p className="text-sm text-white font-medium mt-1">
                      {formatDate(ticketResult.booked_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Status</p>
                    <p className="text-sm text-white font-medium mt-1 capitalize">
                      {ticketResult.status}
                    </p>
                  </div>
                </div>
              </div>

              {!ticketResult.isWinner && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-sm text-blue-300">
                    Thank you for participating! Better luck next time. 🍀
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* All Participants */}
        {drawResults.allParticipants?.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              All Participants
            </h3>
            <div className="bg-slate-700/30 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">
                        Ticket
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">
                        Icon
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">
                        Participant
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {drawResults.allParticipants.map((participant, idx) => (
                      <tr
                        key={idx}
                        className={`hover:bg-slate-700/20 ${
                          participant.isWinner ? "bg-green-600/5" : ""
                        }`}
                      >
                        <td className="px-4 py-3 text-sm text-white font-medium">
                          {participant.ticket_number}
                        </td>
                        <td className="px-4 py-3 text-xl">
                          {participant.icon_name}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-white">
                            {participant.user?.first_name}{" "}
                            {participant.user?.last_name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {participant.user?.email}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {participant.isWinner ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full font-medium">
                              🏆 Winner
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-600/20 text-slate-400 text-xs rounded-full">
                              Participant
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RaffleDrawResults;
