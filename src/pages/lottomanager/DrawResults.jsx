import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/dashboard/layouts/Layout";
import {
  useDrawResults,
  useTicketResults,
} from "../../hooks/queries/useLottoQueries";
import { formatCurrency, formatDate } from "../../utils/format";

const DrawResults = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [ticketId, setTicketId] = useState("");
  const [searchTicketId, setSearchTicketId] = useState(null);

  const {
    data: drawData,
    isLoading: isLoadingDraw,
    error: drawError,
    refetch: refetchDraw,
  } = useDrawResults(gameId);

  const {
    data: ticketData,
    isLoading: isLoadingTicket,
    error: ticketError,
  } = useTicketResults(searchTicketId, {
    enabled: !!searchTicketId,
  });

  // Process the draw results from the API
  const processDrawResults = () => {
    if (!drawData?.data) return null;

    const draws = Array.isArray(drawData.data) ? drawData.data : [];

    // Group draws by type
    const results = {
      machineMain: [],
      machineSuper: [],
      peopleMain: [],
      peopleSuper: [],
    };

    let gameTitle = "";
    let drawDate = null;
    let gameIdValue = gameId;

    draws.forEach((draw) => {
      const drawType = draw.draw_type;
      const numbers = draw.numbers;

      if (!gameTitle && draw.lottoGame?.title) {
        gameTitle = draw.lottoGame.title;
      }
      if (!drawDate && draw.draw_timestamp) {
        drawDate = draw.draw_timestamp;
      }

      // Handle nested arrays for super numbers
      if (drawType === "machineSuper" || drawType === "peopleSuper") {
        results[drawType] = Array.isArray(numbers[0]) ? numbers[0] : numbers;
      } else {
        results[drawType] = numbers;
      }
    });

    return {
      gameTitle: gameTitle || "Unknown Game",
      gameId: gameIdValue,
      drawDate: drawDate || new Date().toISOString(),
      results,
      statistics: {
        totalTickets: 0,
        winnersCount: 0,
        totalPayouts: 0,
      },
    };
  };

  const gameResults = processDrawResults();
  const ticketResults = ticketData?.data;

  const handleSearchTicket = (e) => {
    e.preventDefault();
    if (ticketId.trim()) {
      setSearchTicketId(ticketId.trim());
    }
  };

  const clearTicketSearch = () => {
    setTicketId("");
    setSearchTicketId(null);
  };

  const renderNumberBall = (number, isMatched = false) => {
    return (
      <div
        key={number}
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
          isMatched
            ? "bg-green-500 text-white ring-2 ring-green-300"
            : "bg-slate-700 text-white"
        }`}
      >
        {number}
      </div>
    );
  };

  const getDrawTypeLabel = (type) => {
    const labels = {
      machineMain: "Machine Main",
      machineSuper: "Machine Super",
      peopleMain: "People Main",
      peopleSuper: "People Super",
    };
    return labels[type] || type;
  };

  if (drawError) {
    return (
      <Layout title="Draw Results">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-2">
              {drawError.response?.status === 404
                ? "Draw results not found for this game"
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

  if (!gameResults) {
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
    <Layout title="Draw Results">
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
                {gameResults.gameTitle}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Game ID: {gameResults.gameId} | Draw Date:{" "}
                {formatDate(gameResults.drawDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Winning Numbers */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
            Winning Numbers
          </h3>

          <div className="space-y-6">
            {/* Machine Main */}
            {gameResults.results.machineMain?.length > 0 && (
              <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-300 mb-3">
                  Machine Main Numbers
                </h4>
                <div className="flex flex-wrap gap-2">
                  {gameResults.results.machineMain.map((num) =>
                    renderNumberBall(num)
                  )}
                </div>
              </div>
            )}

            {/* Machine Super */}
            {gameResults.results.machineSuper?.length > 0 && (
              <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-300 mb-3">
                  Machine Super Number
                </h4>
                <div className="flex flex-wrap gap-2">
                  {gameResults.results.machineSuper.map((num) =>
                    renderNumberBall(num)
                  )}
                </div>
              </div>
            )}

            {/* People Main */}
            {gameResults.results.peopleMain?.length > 0 && (
              <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-green-300 mb-3">
                  People Main Numbers
                </h4>
                <div className="flex flex-wrap gap-2">
                  {gameResults.results.peopleMain.map((num) =>
                    renderNumberBall(num)
                  )}
                </div>
              </div>
            )}

            {/* People Super */}
            {gameResults.results.peopleSuper?.length > 0 && (
              <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-green-300 mb-3">
                  People Super Number
                </h4>
                <div className="flex flex-wrap gap-2">
                  {gameResults.results.peopleSuper.map((num) =>
                    renderNumberBall(num)
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Draw Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
            <p className="text-xs text-slate-400 mb-1">Total Tickets</p>
            <p className="text-2xl font-bold text-white">
              {gameResults.statistics.totalTickets}
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
            <p className="text-xs text-slate-400 mb-1">Winners</p>
            <p className="text-2xl font-bold text-green-400">
              {gameResults.statistics.winnersCount}
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
            <p className="text-xs text-slate-400 mb-1">Total Payouts</p>
            <p className="text-2xl font-bold text-purple-400">
              {formatCurrency(gameResults.statistics.totalPayouts)}
            </p>
          </div>
        </div>

        {/* Ticket Search */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
            Check Ticket Results
          </h3>

          <form onSubmit={handleSearchTicket} className="flex gap-2 mb-6">
            <input
              type="text"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              placeholder="Enter Ticket ID (e.g., TKT_123456789)"
              className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!ticketId.trim() || isLoadingTicket}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingTicket ? "Searching..." : "Search"}
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

          {/* Ticket Results */}
          {ticketResults && (
            <div className="space-y-4">
              {/* Ticket Info */}
              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Ticket ID</p>
                    <p className="text-sm text-white font-medium mt-1">
                      {ticketResults.ticket?.tkt_id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">User ID</p>
                    <p className="text-sm text-white font-medium mt-1">
                      {ticketResults.ticket?.user_id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Game</p>
                    <p className="text-sm text-white font-medium mt-1">
                      {ticketResults.ticket?.gameTitle}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Draw Date</p>
                    <p className="text-sm text-white font-medium mt-1">
                      {new Date(
                        ticketResults.ticket?.drawDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-purple-600/10 border border-purple-600/30 rounded-lg p-4">
                  <p className="text-xs text-purple-300 mb-1">Total Winnings</p>
                  <p className="text-xl font-bold text-purple-400">
                    {formatCurrency(ticketResults.summary?.totalWinnings || 0)}
                  </p>
                </div>
                <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
                  <p className="text-xs text-green-300 mb-1">
                    Winning Selections
                  </p>
                  <p className="text-xl font-bold text-green-400">
                    {ticketResults.summary?.winningSelections || 0}
                  </p>
                </div>
                <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                  <p className="text-xs text-blue-300 mb-1">Total Selections</p>
                  <p className="text-xl font-bold text-blue-400">
                    {ticketResults.summary?.totalSelections || 0}
                  </p>
                </div>
              </div>

              {/* Individual Results */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white">
                  Selection Results
                </h4>
                {ticketResults.results?.map((result, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-4 border ${
                      result.status === "win"
                        ? "bg-green-600/10 border-green-600/30"
                        : "bg-slate-700/30 border-slate-600"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h5 className="text-sm font-medium text-white">
                          {getDrawTypeLabel(result.draw_type)}
                        </h5>
                        <p className="text-xs text-slate-400 mt-1">
                          {result.matches} match
                          {result.matches !== 1 ? "es" : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            result.status === "win"
                              ? "bg-green-600/20 text-green-400"
                              : "bg-slate-600/20 text-slate-400"
                          }`}
                        >
                          {result.status === "win" ? "WIN" : "LOSE"}
                        </span>
                        {result.status === "win" && (
                          <p className="text-lg font-bold text-green-400 mt-1">
                            {formatCurrency(result.payout)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-slate-400 mb-2">
                          Your Numbers
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {result.user_numbers?.map((num) => {
                            const isMatched =
                              result.matched_numbers?.includes(num);
                            return renderNumberBall(num, isMatched);
                          })}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-2">
                          Winning Numbers
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {result.winning_numbers?.map((num) =>
                            renderNumberBall(num)
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DrawResults;
