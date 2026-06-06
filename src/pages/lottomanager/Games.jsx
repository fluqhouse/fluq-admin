import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/dashboard/layouts/Layout";
import ConfirmationModal from "../../components/dashboard/reuseables/ConfirmationModal";
import {
  useGames,
  useCreateGame,
  useDeleteGame,
  useCancelGame,
  useForceCloseGame,
} from "../../hooks/queries/useLottoQueries";
import { formatCurrency, formatDate, toUTC } from "../../utils/format";

const Games = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    action: null,
    gameId: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("DESC");

  const [formData, setFormData] = useState({
    title: "",
    start_time: "",
    end_time: "",
    max_multiplier: 1,
    amount_people_main: 0,
    amount_people_super: 0,
    amount_machine_main: 0,
    amount_machine_super: 0,
    odds_people_main: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    odd_people_super: 0,
    odds_machine_main: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    odd_machine_super: 0,
  });

  const {
    data: gamesData,
    isLoading,
    error,
    refetch,
  } = useGames({
    page: currentPage,
    limit: pageSize,
    status: statusFilter || undefined,
    sortBy,
    sortOrder,
  });

  const createGameMutation = useCreateGame();
  const deleteGameMutation = useDeleteGame();
  const cancelGameMutation = useCancelGame();
  const forceCloseGameMutation = useForceCloseGame();

  const handleCreateGame = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        start_time: toUTC(formData.start_time),
        end_time: toUTC(formData.end_time),
      };
      console.log(payload);

      await createGameMutation.mutateAsync(payload);

      setShowCreateModal(false);
      resetForm();
      refetch();
    } catch (error) {
      console.error("Failed to create game:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      start_time: "",
      end_time: "",
      max_multiplier: 10,
      amount_people_main: 0,
      amount_people_super: 0,
      amount_machine_main: 0,
      amount_machine_super: 0,
      odds_people_main: { 1: 0, 2: 40, 3: 240, 4: 1440, 5: 2540 },
      odd_people_super: 10,
      odds_machine_main: { 1: 0, 2: 40, 3: 240, 4: 1440, 5: 2540 },
      odd_machine_super: 10,
    });
  };

  const openConfirmModal = (action, gameId, title = "") => {
    setConfirmModal({
      isOpen: true,
      action,
      gameId,
      title,
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, action: null, gameId: null });
  };

  const handleConfirmAction = async () => {
    const { action, gameId } = confirmModal;

    try {
      switch (action) {
        case "delete":
          await deleteGameMutation.mutateAsync(gameId);
          break;

        case "cancel":
          await cancelGameMutation.mutateAsync(gameId);
          break;

        case "forceClose":
          await forceCloseGameMutation.mutateAsync(gameId);
          break;

        default:
          return;
      }

      closeConfirmModal();
      refetch();
    } catch (error) {
      const message = console.error(`Failed to ${action} game:`, error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: {
        bg: "bg-green-600/20",
        text: "text-green-400",
        label: "open",
      },
      scheduled: {
        bg: "bg-blue-600/20",
        text: "text-blue-400",
        label: "Scheduled",
      },
      closed: { bg: "bg-gray-600/20", text: "text-gray-400", label: "Closed" },
      declared: {
        bg: "bg-purple-600/20",
        text: "text-purple-400",
        label: "Declared",
      },
      cancelled: {
        bg: "bg-red-600/20",
        text: "text-red-400",
        label: "Cancelled",
      },
      paused: {
        bg: "bg-orange-600/20",
        text: "text-orange-400",
        label: "Paused",
      },
    };

    const config = statusConfig[status] || statusConfig["open"];
    return (
      <span
        className={`px-2 py-1 ${config.bg} ${config.text} text-xs rounded-full`}
      >
        {config.label}
      </span>
    );
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (newStatus) => {
    setStatusFilter(newStatus);
    setCurrentPage(1);
  };

  const games = gamesData?.data?.games || [];
  const pagination = gamesData?.data?.pagination || {};

  const getConfirmModalProps = () => {
    const { action } = confirmModal;
    switch (action) {
      case "delete":
        return {
          title: "Delete Game",
          message:
            "Are you sure you want to delete this game? This action cannot be undone.",
          confirmText: "Delete",
          type: "danger",
        };
      case "cancel":
        return {
          title: "Cancel Game",
          message:
            "Are you sure you want to cancel this game? This action may trigger refunds to players.",
          confirmText: "Cancel Game",
          type: "warning",
        };
      case "forceClose":
        return {
          title: "Force Close Game",
          message:
            "Are you sure you want to force close this game? This will immediately end the game.",
          confirmText: "Force Close",
          type: "danger",
        };
      default:
        return {};
    }
  };

  if (error) {
    return (
      <Layout title="Lotto Games">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-2">Error loading games</div>
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
    <Layout title="Lotto Games">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Lotto Games Management
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Create, manage, and monitor all lotto games and draws.
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
              disabled={createGameMutation.isPending}
            >
              {createGameMutation.isPending ? "Creating..." : "Create New Game"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Total Games</p>
                  <p className="text-white text-2xl font-bold">
                    {pagination.totalGames || 0}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Current Page</p>
                  <p className="text-white text-2xl font-bold">
                    {pagination.currentPage || 1}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm">Total Pages</p>
                  <p className="text-white text-2xl font-bold">
                    {pagination.totalPages || 1}
                  </p>
                </div>
                <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Games Per Page</p>
                  <p className="text-white text-2xl font-bold">
                    {pagination.gamesPerPage || pageSize}
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Status Filter
              </label>
              <select
                value={statusFilter}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">All Statuses</option>
                <option value="scheduled">Scheduled</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="declared">Declared</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Page Size
              </label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="createdAt">Created Date</option>
                <option value="title">Title</option>
                <option value="start_time">Start Time</option>
                <option value="end_time">End Time</option>
                <option value="updatedAt">Updated At</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Order
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="DESC">Descending</option>
                <option value="ASC">Ascending</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-2 sm:p-4">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 px-2 sm:px-0">
              Lotto Games
            </h3>

            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2 text-slate-300 text-sm sm:text-base">
                  Loading games...
                </span>
              </div>
            ) : games.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-slate-400 text-base sm:text-lg mb-2">
                  No games found
                </div>
                <p className="text-slate-500 text-xs sm:text-sm">
                  Try adjusting your filters or create a new game.
                </p>
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="block lg:hidden space-y-4">
                  {games.map((game) => (
                    <div
                      key={game.id}
                      className="bg-slate-800/50 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors cursor-pointer"
                      onClick={() => navigate(`/lottomanager/games/${game.id}`)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-base mb-1">
                            {game.title}
                          </h4>
                          <p className="text-slate-400 text-xs">
                            ID: {game.id}
                          </p>
                        </div>
                        {getStatusBadge(game.status)}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">
                            Max Multiplier:
                          </span>
                          <span className="text-white">
                            {game.max_multiplier}x
                          </span>
                        </div>

                        <div className="border-t border-slate-600 pt-2">
                          <p className="text-slate-400 text-xs mb-1">Times</p>
                          <p className="text-slate-300 text-xs">
                            Start: {formatDate(game.start_time)}
                          </p>
                          <p className="text-slate-300 text-xs">
                            End: {formatDate(game.end_time)}
                          </p>
                        </div>

                        <div className="border-t border-slate-600 pt-2">
                          <p className="text-slate-400 text-xs mb-1">
                            Prize Amounts
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <p className="text-green-400">
                                People Main:{" "}
                                {formatCurrency(game.amount_people_main)}
                              </p>
                              <p className="text-green-400">
                                People Super:{" "}
                                {formatCurrency(game.amount_people_super)}
                              </p>
                            </div>
                            <div>
                              <p className="text-blue-400">
                                Machine Main:{" "}
                                {formatCurrency(game.amount_machine_main)}
                              </p>
                              <p className="text-blue-400">
                                Machine Super:{" "}
                                {formatCurrency(game.amount_machine_super)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-slate-600 pt-2">
                          <p className="text-slate-400 text-xs mb-1">Creator</p>
                          <p className="text-slate-300 text-xs">
                            {game.creator?.first_name || "N/A"}{" "}
                            {game.creator?.last_name || ""}
                          </p>
                          <p className="text-slate-400 text-xs">
                            {game.creator?.role}
                          </p>
                        </div>

                        <div className="border-t border-slate-600 pt-2 flex flex-wrap gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/lottomanager/games/${game.id}`);
                            }}
                            className="flex-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-3 py-2 rounded text-xs font-medium transition-colors"
                          >
                            View Details
                          </button>
                          {game.status === "scheduled" && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openConfirmModal(
                                    "cancel",
                                    game.id,
                                    game.title,
                                  );
                                }}
                                className="flex-1 bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 px-3 py-2 rounded text-xs font-medium transition-colors"
                                disabled={cancelGameMutation.isPending}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openConfirmModal(
                                    "delete",
                                    game.id,
                                    game.title,
                                  );
                                }}
                                className="flex-1 bg-red-600/20 text-red-400 hover:bg-red-600/30 px-3 py-2 rounded text-xs font-medium transition-colors"
                                disabled={deleteGameMutation.isPending}
                              >
                                Delete
                              </button>
                            </>
                          )}

                          {game.status === "open" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openConfirmModal(
                                  "forceClose",
                                  game.id,
                                  game.title,
                                );
                              }}
                              className="flex-1 bg-orange-600/20 text-orange-400 hover:bg-orange-600/30 px-3 py-2 rounded text-xs font-medium transition-colors"
                              disabled={forceCloseGameMutation.isPending}
                            >
                              Force Close
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-slate-300 font-medium py-3 px-4 text-sm">
                          Game Details
                        </th>
                        <th className="text-slate-300 font-medium py-3 px-4 text-sm">
                          Times
                        </th>
                        <th className="text-slate-300 font-medium py-3 px-4 text-sm">
                          Prize Amounts
                        </th>
                        <th className="text-slate-300 font-medium py-3 px-4 text-sm">
                          Creator
                        </th>
                        <th className="text-slate-300 font-medium py-3 px-4 text-sm">
                          Status
                        </th>
                        <th className="text-slate-300 font-medium py-3 px-4 text-sm">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {games.map((game) => (
                        <tr
                          key={game.id}
                          className="border-b border-slate-600 hover:bg-slate-600/20 cursor-pointer"
                          onClick={() =>
                            navigate(`/lottomanager/games/${game.id}`)
                          }
                        >
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-white font-medium text-sm">
                                {game.title}
                              </p>
                              <p className="text-slate-400 text-xs">
                                ID: {game.id}
                              </p>
                              <p className="text-slate-400 text-xs">
                                Max Multiplier: {game.max_multiplier}x
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-xs">
                              <p className="text-slate-300">
                                Start: {formatDate(game.start_time)}
                              </p>
                              <p className="text-slate-300">
                                End: {formatDate(game.end_time)}
                              </p>
                              <p className="text-slate-400">
                                Created: {formatDate(game.createdAt)}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-xs">
                              <p className="text-green-400">
                                People Main:{" "}
                                {formatCurrency(game.amount_people_main)}
                              </p>
                              <p className="text-green-400">
                                People Super:{" "}
                                {formatCurrency(game.amount_people_super)}
                              </p>
                              <p className="text-blue-400">
                                Machine Main:{" "}
                                {formatCurrency(game.amount_machine_main)}
                              </p>
                              <p className="text-blue-400">
                                Machine Super:{" "}
                                {formatCurrency(game.amount_machine_super)}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-xs">
                              <p className="text-slate-300">
                                {game.creator?.first_name || "N/A"}{" "}
                                {game.creator?.last_name || ""}
                              </p>
                              <p className="text-slate-400">
                                {game.creator?.role}
                              </p>
                              <p className="text-slate-500 text-xs">
                                {game.creator?.user_id}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {getStatusBadge(game.status)}
                            <div className="text-xs text-slate-400 mt-1">
                              {game.isPurchasable
                                ? "Purchasable"
                                : "Not purchasable"}
                            </div>
                          </td>
                          <td
                            className="py-3 px-4"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex flex-col space-y-1">
                              <button
                                onClick={() =>
                                  navigate(`/lottomanager/games/${game.id}`)
                                }
                                className="text-blue-400 hover:text-blue-300 text-xs text-left"
                              >
                                View Details
                              </button>
                              {game.status === "scheduled" && (
                                <>
                                  <button
                                    onClick={() =>
                                      openConfirmModal(
                                        "cancel",
                                        game.id,
                                        game.title,
                                      )
                                    }
                                    className="text-yellow-400 hover:text-yellow-300 text-xs text-left"
                                    disabled={cancelGameMutation.isPending}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() =>
                                      openConfirmModal(
                                        "delete",
                                        game.id,
                                        game.title,
                                      )
                                    }
                                    className="text-red-400 hover:text-red-300 text-xs text-left"
                                    disabled={deleteGameMutation.isPending}
                                  >
                                    Delete
                                  </button>
                                </>
                              )}

                              {game.status === "open" && (
                                <button
                                  onClick={() =>
                                    openConfirmModal(
                                      "forceClose",
                                      game.id,
                                      game.title,
                                    )
                                  }
                                  className="text-orange-400 hover:text-orange-300 text-xs text-left"
                                  disabled={forceCloseGameMutation.isPending}
                                >
                                  Force Close
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-4 border-t border-slate-600">
                    <div className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">
                      Showing{" "}
                      {(pagination.currentPage - 1) * pagination.gamesPerPage +
                        1}{" "}
                      to{" "}
                      {Math.min(
                        pagination.currentPage * pagination.gamesPerPage,
                        pagination.totalGames,
                      )}{" "}
                      of {pagination.totalGames} games
                    </div>

                    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                      <button
                        onClick={() =>
                          handlePageChange(pagination.currentPage - 1)
                        }
                        disabled={!pagination.hasPreviousPage}
                        className="px-2 sm:px-3 py-1 bg-slate-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-500 transition-colors text-xs sm:text-sm"
                      >
                        Prev
                      </button>

                      <div className="flex items-center space-x-1">
                        {Array.from(
                          { length: Math.min(3, pagination.totalPages) },
                          (_, i) => {
                            const pageNumber = i + 1;
                            const isCurrentPage =
                              pageNumber === pagination.currentPage;

                            return (
                              <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`px-2 sm:px-3 py-1 rounded-lg transition-colors text-xs sm:text-sm ${
                                  isCurrentPage
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                                }`}
                              >
                                {pageNumber}
                              </button>
                            );
                          },
                        )}

                        {pagination.totalPages > 3 && (
                          <>
                            <span className="text-slate-400 text-xs sm:text-sm">
                              ...
                            </span>
                            <button
                              onClick={() =>
                                handlePageChange(pagination.totalPages)
                              }
                              className={`px-2 sm:px-3 py-1 rounded-lg transition-colors text-xs sm:text-sm ${
                                pagination.totalPages === pagination.currentPage
                                  ? "bg-blue-600 text-white"
                                  : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                              }`}
                            >
                              {pagination.totalPages}
                            </button>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          handlePageChange(pagination.currentPage + 1)
                        }
                        disabled={!pagination.hasNextPage}
                        className="px-2 sm:px-3 py-1 bg-slate-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-500 transition-colors text-xs sm:text-sm"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Create Game Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
            <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Create New Lotto Game
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-slate-400 hover:text-white transition-colors p-1"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
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

              <form
                onSubmit={handleCreateGame}
                className="space-y-3 sm:space-y-4"
              >
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                    Game Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter game title"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.start_time}
                      onChange={(e) =>
                        setFormData({ ...formData, start_time: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.end_time}
                      onChange={(e) =>
                        setFormData({ ...formData, end_time: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                    Max Multiplier
                  </label>
                  <input
                    type="number"
                    value={formData.max_multiplier}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        max_multiplier: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="100"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                      People Main Prize
                    </label>
                    <input
                      type="number"
                      value={formData.amount_people_main}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          amount_people_main: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                      People Super Prize
                    </label>
                    <input
                      type="number"
                      value={formData.amount_people_super}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          amount_people_super: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                      Machine Main Prize
                    </label>
                    <input
                      type="number"
                      value={formData.amount_machine_main}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          amount_machine_main: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                      Machine Super Prize
                    </label>
                    <input
                      type="number"
                      value={formData.amount_machine_super}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          amount_machine_super: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* People Odds */}
                <div className="border border-slate-600 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-semibold text-blue-300 mb-3">
                    People Draw Odds (per match count)
                  </p>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div key={n}>
                        <label className="block text-xs text-slate-400 mb-1 text-center">
                          {n} match{n > 1 ? "es" : ""}
                        </label>
                        <input
                          type="number"
                          value={formData.odds_people_main[n]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              odds_people_main: {
                                ...formData.odds_people_main,
                                [n]: parseFloat(e.target.value) || 0,
                              },
                            })
                          }
                          className="w-full px-2 py-1.5 bg-slate-700/50 border border-slate-600 rounded text-white text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent text-center"
                          min="0"
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Super Pick Multiplier (people)
                    </label>
                    <input
                      type="number"
                      value={formData.odd_people_super}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          odd_people_super: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Machine Odds */}
                <div className="border border-slate-600 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-semibold text-green-300 mb-3">
                    Machine Draw Odds (per match count)
                  </p>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div key={n}>
                        <label className="block text-xs text-slate-400 mb-1 text-center">
                          {n} match{n > 1 ? "es" : ""}
                        </label>
                        <input
                          type="number"
                          value={formData.odds_machine_main[n]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              odds_machine_main: {
                                ...formData.odds_machine_main,
                                [n]: parseFloat(e.target.value) || 0,
                              },
                            })
                          }
                          className="w-full px-2 py-1.5 bg-slate-700/50 border border-slate-600 rounded text-white text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent text-center"
                          min="0"
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Super Pick Multiplier (machine)
                    </label>
                    <input
                      type="number"
                      value={formData.odd_machine_super}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          odd_machine_super: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-2 sm:pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="w-full sm:w-auto px-4 py-2 text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createGameMutation.isPending}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {createGameMutation.isPending
                      ? "Creating..."
                      : "Create Game"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onClose={closeConfirmModal}
          onConfirm={handleConfirmAction}
          isLoading={
            deleteGameMutation.isPending ||
            cancelGameMutation.isPending ||
            forceCloseGameMutation.isPending
          }
          {...getConfirmModalProps()}
        />
      </div>
    </Layout>
  );
};

export default Games;
