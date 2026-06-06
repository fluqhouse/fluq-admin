import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/dashboard/layouts/Layout";
import ConfirmationModal from "../../components/dashboard/reuseables/ConfirmationModal";
import {
  useGameStatistics,
  useUpdateGame,
  useDeleteGame,
  useCancelGame,
  useForceCloseGame,
  useSubmitDrawResults,
} from "../../hooks/queries/useLottoQueries";
import {
  formatCurrency,
  formatDate,
  utcToLocalInput,
} from "../../utils/format";
import toast from "react-hot-toast";

// ─── Small reusable stat card ────────────────────────────────────────────────
const StatCard = ({ label, value, accent = "slate" }) => {
  const accents = {
    green: "bg-green-600/10 border-green-600/30 text-green-400",
    blue: "bg-blue-600/10 border-blue-600/30 text-blue-400",
    purple: "bg-purple-600/10 border-purple-600/30 text-purple-400",
    amber: "bg-amber-600/10 border-amber-600/30 text-amber-400",
    slate: "bg-slate-700/30 border-slate-600/40 text-white",
  };
  return (
    <div className={`rounded-xl border p-4 ${accents[accent]}`}>
      <p className="text-xs opacity-70 mb-1">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
};

// ─── Section wrapper ─────────────────────────────────────────────────────────
const Section = ({ title, children, icon }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 sm:p-6">
    <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
      {icon && <span className="text-lg">{icon}</span>}
      {title}
    </h3>
    {children}
  </div>
);

// ─── Row item (label / value pair) ───────────────────────────────────────────
const InfoRow = ({ label, value, valueClass = "text-white" }) => (
  <div className="flex justify-between items-center py-1.5 border-b border-slate-700/40 last:border-0">
    <span className="text-sm text-slate-400">{label}</span>
    <span className={`text-sm font-semibold ${valueClass}`}>{value}</span>
  </div>
);

// ─── Odds table for a draw type ───────────────────────────────────────────────
const OddsTable = ({ label, odds, accent }) => {
  if (!odds || typeof odds !== "object") return null;
  return (
    <div className="mb-4 last:mb-0">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="space-y-1">
        {Object.entries(odds).map(([matches, multiplier]) => (
          <div
            key={matches}
            className="flex justify-between items-center px-3 py-1.5 rounded-lg bg-slate-700/30"
          >
            <span className="text-sm text-slate-300">
              {matches} match{parseInt(matches) !== 1 ? "es" : ""}
            </span>
            <span className={`text-sm font-bold ${accent}`}>{multiplier}x</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const GameDetails = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmittingDraw, setIsSubmittingDraw] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    action: null,
  });

  const {
    data: statsData,
    isLoading,
    error,
    refetch,
  } = useGameStatistics(gameId);
  const updateGameMutation = useUpdateGame();
  const deleteGameMutation = useDeleteGame();
  const cancelGameMutation = useCancelGame();
  const forceCloseGameMutation = useForceCloseGame();
  const submitDrawMutation = useSubmitDrawResults();

  const stats = statsData?.data?.statistics;
  const gameInfo = stats?.gameInfo;
  const participation = stats?.participation;
  const revenue = stats?.revenue;
  const winnings = stats?.winnings;
  // amounts is the field returned by the API (not prizeAmounts)
  const amounts = gameInfo?.amounts;
  const odds = gameInfo?.odds;

  const [formData, setFormData] = useState({
    title: "",
    start_time: "",
    end_time: "",
    max_multiplier: 0,
    amount_people_main: 0,
    amount_people_super: 0,
    amount_machine_main: 0,
    amount_machine_super: 0,
    odds_people_main: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    odd_people_super: 0,
    odds_machine_main: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    odd_machine_super: 0,
  });

  const [drawData, setDrawData] = useState({
    machineMain: ["", "", "", "", ""],
    machineSuper: [""],
    peopleMain: ["", "", "", "", ""],
    peopleSuper: [""],
  });

  React.useEffect(() => {
    if (gameInfo) {
      setFormData({
        title: gameInfo.title || "",
        start_time: gameInfo.start_time
          ? utcToLocalInput(gameInfo.start_time)
          : "",
        end_time: gameInfo.end_time ? utcToLocalInput(gameInfo.end_time) : "",
        max_multiplier: gameInfo.max_multiplier || 0,
        amount_people_main: amounts?.people_main || 0,
        amount_people_super: amounts?.people_super || 0,
        amount_machine_main: amounts?.machine_main || 0,
        amount_machine_super: amounts?.machine_super || 0,
        odds_people_main: odds?.people_main || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        odd_people_super: odds?.people_super || 0,
        odds_machine_main: odds?.machine_main || {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
        odd_machine_super: odds?.machine_super || 0,
      });
    }
  }, [gameInfo]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateGameMutation.mutateAsync({ id: gameId, gameData: formData });
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error("Failed to update game:", error);
    }
  };

  const handleDrawNumberChange = (type, index, value) => {
    const numValue = value === "" ? "" : parseInt(value);
    if (numValue !== "" && (numValue < 1 || numValue > 90)) return;
    setDrawData((prev) => ({
      ...prev,
      [type]: prev[type].map((num, i) => (i === index ? numValue : num)),
    }));
  };

  const handleSubmitDraw = async (e) => {
    e.preventDefault();
    const allFilled = [
      ...drawData.machineMain,
      ...drawData.machineSuper,
      ...drawData.peopleMain,
      ...drawData.peopleSuper,
    ].every((num) => num !== "");

    if (!allFilled) {
      toast.error("Please fill in all winning numbers");
      return;
    }

    const checkDuplicates = (arr, name) => {
      const unique = new Set(arr);
      if (unique.size !== arr.length) {
        toast.error(`Duplicate numbers found in ${name}`);
        return false;
      }
      return true;
    };

    if (
      !checkDuplicates(drawData.machineMain, "Machine Main") ||
      !checkDuplicates(drawData.peopleMain, "People Main")
    )
      return;

    try {
      const payload = {
        lottoGameId: parseInt(gameId),
        machineMain: drawData.machineMain.map((n) => parseInt(n)),
        machineSuper: drawData.machineSuper.map((n) => parseInt(n)),
        peopleMain: drawData.peopleMain.map((n) => parseInt(n)),
        peopleSuper: drawData.peopleSuper.map((n) => parseInt(n)),
      };
      await submitDrawMutation.mutateAsync(payload);
      setIsSubmittingDraw(false);
      setDrawData({
        machineMain: ["", "", "", "", ""],
        machineSuper: [""],
        peopleMain: ["", "", "", "", ""],
        peopleSuper: [""],
      });
      refetch();
    } catch (error) {
      console.error("Failed to submit draw results:", error);
    }
  };

  const openConfirmModal = (action) =>
    setConfirmModal({ isOpen: true, action });
  const closeConfirmModal = () =>
    setConfirmModal({ isOpen: false, action: null });

  const handleConfirmAction = async () => {
    const { action } = confirmModal;
    try {
      switch (action) {
        case "delete":
          await deleteGameMutation.mutateAsync(gameId);
          navigate("/lottomanager/games");
          break;
        case "cancel":
          await cancelGameMutation.mutateAsync(gameId);
          refetch();
          break;
        case "forceClose":
          await forceCloseGameMutation.mutateAsync(gameId);
          refetch();
          break;
        default:
          return;
      }
      closeConfirmModal();
    } catch (error) {
      console.error(`Failed to ${action} game:`, error);
      closeConfirmModal();
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        bg: "bg-green-600/20",
        text: "text-green-400",
        label: "Active",
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
    const config = statusConfig[status] || statusConfig["active"];
    return (
      <span
        className={`px-3 py-1 ${config.bg} ${config.text} text-sm rounded-full font-medium`}
      >
        {config.label}
      </span>
    );
  };

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
      <Layout title="Game Details">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-2">
              Error loading game details
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

  if (isLoading) {
    return (
      <Layout title="Game Details">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-slate-300">Loading game details...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Game Details">
      <div className="space-y-4 sm:space-y-6">
        {/* ── Header ── */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => navigate("/lottomanager/games")}
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
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {gameInfo?.title}
                </h2>
              </div>
              <p className="text-sm text-slate-400 ml-8">ID: {gameInfo?.id}</p>
            </div>

            <div className="flex flex-wrap gap-2 ml-8 sm:ml-0">
              {getStatusBadge(gameInfo?.status)}

              {gameInfo?.status === "scheduled" && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
                >
                  Edit Game
                </button>
              )}

              {gameInfo?.status === "scheduled" && (
                <>
                  <button
                    onClick={() => openConfirmModal("cancel")}
                    className="px-4 py-2 bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 text-sm rounded-lg transition-colors"
                    disabled={cancelGameMutation.isPending}
                  >
                    Cancel Game
                  </button>
                  <button
                    onClick={() => openConfirmModal("delete")}
                    className="px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 text-sm rounded-lg transition-colors"
                    disabled={deleteGameMutation.isPending}
                  >
                    Delete
                  </button>
                </>
              )}

              {gameInfo?.status === "active" && (
                <>
                  <button
                    onClick={() => setIsSubmittingDraw(true)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg transition-colors"
                  >
                    Submit Results
                  </button>
                  <button
                    onClick={() => openConfirmModal("forceClose")}
                    className="px-4 py-2 bg-orange-600/20 text-orange-400 hover:bg-orange-600/30 text-sm rounded-lg transition-colors"
                    disabled={forceCloseGameMutation.isPending}
                  >
                    Force Close
                  </button>
                </>
              )}

              {gameInfo?.status === "closed" && (
                <button
                  onClick={() => setIsSubmittingDraw(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg transition-colors"
                >
                  Submit Results
                </button>
              )}

              {gameInfo?.status === "declared" && (
                <button
                  onClick={() =>
                    navigate(`/lottomanager/games/${gameId}/results`)
                  }
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition-colors"
                >
                  View Draw Results
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Edit Form ── */}
        {isEditing && (
          <Section title="Edit Game">
            <form onSubmit={handleUpdate} className="space-y-3 sm:space-y-4">
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
                    People Main Prize (₦)
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
                    People Super Prize (₦)
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
                    Machine Main Prize (₦)
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
                    Machine Super Prize (₦)
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

              {/* ── People Odds ── */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                  People Main Odds (by match count)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((match) => (
                    <div key={match}>
                      <label className="block text-xs text-slate-400 mb-1 text-center">
                        {match} match
                      </label>
                      <input
                        type="number"
                        value={formData.odds_people_main?.[match] ?? 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            odds_people_main: {
                              ...formData.odds_people_main,
                              [match]: parseInt(e.target.value),
                            },
                          })
                        }
                        className="w-full px-2 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-xs text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                  People Super Odd
                </label>
                <input
                  type="number"
                  value={formData.odd_people_super}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      odd_people_super: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  required
                />
              </div>

              {/* ── Machine Odds ── */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                  Machine Main Odds (by match count)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((match) => (
                    <div key={match}>
                      <label className="block text-xs text-slate-400 mb-1 text-center">
                        {match} match
                      </label>
                      <input
                        type="number"
                        value={formData.odds_machine_main?.[match] ?? 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            odds_machine_main: {
                              ...formData.odds_machine_main,
                              [match]: parseInt(e.target.value),
                            },
                          })
                        }
                        className="w-full px-2 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-xs text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                  Machine Super Odd
                </label>
                <input
                  type="number"
                  value={formData.odd_machine_super}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      odd_machine_super: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  required
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full sm:w-auto px-4 py-2 text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateGameMutation.isPending}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {updateGameMutation.isPending ? "Updating..." : "Update Game"}
                </button>
              </div>
            </form>
          </Section>
        )}

        {/* ── Submit Draw Results Form ── */}
        {isSubmittingDraw && (
          <Section title="Submit Draw Results">
            <form onSubmit={handleSubmitDraw} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Machine Main Numbers (5 numbers: 1–90)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {drawData.machineMain.map((num, index) => (
                    <input
                      key={`machine-main-${index}`}
                      type="number"
                      min="1"
                      max="90"
                      value={num}
                      onChange={(e) =>
                        handleDrawNumberChange(
                          "machineMain",
                          index,
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-center text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`#${index + 1}`}
                      required
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Machine Super Number (1 number: 1–90)
                </label>
                <div className="max-w-xs">
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={drawData.machineSuper[0]}
                    onChange={(e) =>
                      handleDrawNumberChange("machineSuper", 0, e.target.value)
                    }
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-center text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Super #"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  People Main Numbers (5 numbers: 1–90)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {drawData.peopleMain.map((num, index) => (
                    <input
                      key={`people-main-${index}`}
                      type="number"
                      min="1"
                      max="90"
                      value={num}
                      onChange={(e) =>
                        handleDrawNumberChange(
                          "peopleMain",
                          index,
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-center text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={`#${index + 1}`}
                      required
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  People Super Number (1 number: 1–90)
                </label>
                <div className="max-w-xs">
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={drawData.peopleSuper[0]}
                    onChange={(e) =>
                      handleDrawNumberChange("peopleSuper", 0, e.target.value)
                    }
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-center text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Super #"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-2 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmittingDraw(false);
                    setDrawData({
                      machineMain: ["", "", "", "", ""],
                      machineSuper: [""],
                      peopleMain: ["", "", "", "", ""],
                      peopleSuper: [""],
                    });
                  }}
                  className="w-full sm:w-auto px-4 py-2 text-slate-300 hover:text-white transition-colors text-sm"
                  disabled={submitDrawMutation.isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitDrawMutation.isPending}
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  {submitDrawMutation.isPending
                    ? "Submitting..."
                    : "Submit Draw Results"}
                </button>
              </div>
            </form>
          </Section>
        )}

        {/* ── Main Content (read-only) ── */}
        {!isEditing && (
          <>
            {/* ── Game Info ── */}
            <Section title="Game Information" icon="🎮">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-slate-400">Start Time</p>
                  <p className="text-sm text-white mt-1">
                    {formatDate(gameInfo?.start_time)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">End Time</p>
                  <p className="text-sm text-white mt-1">
                    {formatDate(gameInfo?.end_time)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Max Multiplier</p>
                  <p className="text-sm text-white mt-1">
                    {gameInfo?.max_multiplier}x
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Purchasable</p>
                  <p className="text-sm text-white mt-1">
                    {gameInfo?.isPurchasable ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Current Status</p>
                  <p className="text-sm text-white mt-1 capitalize">
                    {gameInfo?.currentStatus}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Creator</p>
                  <p className="text-sm text-white mt-1">
                    {gameInfo?.creator?.first_name ||
                      gameInfo?.creator?.email ||
                      "N/A"}{" "}
                    {gameInfo?.creator?.last_name || ""}
                  </p>
                  <p className="text-xs text-slate-400 capitalize">
                    {gameInfo?.creator?.role}
                  </p>
                </div>
              </div>
            </Section>

            {/* ── Ticket Amounts ── */}
            <Section title="Ticket Amounts" icon="🎟️">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  label="People Main"
                  value={formatCurrency(amounts?.people_main ?? 0)}
                  accent="green"
                />
                <StatCard
                  label="People Super"
                  value={formatCurrency(amounts?.people_super ?? 0)}
                  accent="green"
                />
                <StatCard
                  label="Machine Main"
                  value={formatCurrency(amounts?.machine_main ?? 0)}
                  accent="blue"
                />
                <StatCard
                  label="Machine Super"
                  value={formatCurrency(amounts?.machine_super ?? 0)}
                  accent="blue"
                />
              </div>
            </Section>

            {/* ── Participation ── */}
            <Section title="Participation" icon="👥">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                  label="Total Tickets"
                  value={participation?.totalTickets ?? 0}
                  accent="slate"
                />
                <StatCard
                  label="Unique Participants"
                  value={participation?.uniqueParticipants ?? 0}
                  accent="slate"
                />
                <StatCard
                  label="Total Selections"
                  value={participation?.totalSelections ?? 0}
                  accent="slate"
                />
                <StatCard
                  label="Max Multiplier"
                  value={`${gameInfo?.max_multiplier ?? 0}x`}
                  accent="amber"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Selections by draw type */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Selections by Draw Type
                  </p>
                  <div className="space-y-1">
                    <InfoRow
                      label="People Main"
                      value={
                        participation?.selectionsByDrawType?.peopleMain ?? 0
                      }
                    />
                    <InfoRow
                      label="People Super"
                      value={
                        participation?.selectionsByDrawType?.peopleSuper ?? 0
                      }
                    />
                    <InfoRow
                      label="Machine Main"
                      value={
                        participation?.selectionsByDrawType?.machineMain ?? 0
                      }
                    />
                    <InfoRow
                      label="Machine Super"
                      value={
                        participation?.selectionsByDrawType?.machineSuper ?? 0
                      }
                    />
                  </div>
                </div>

                {/* Tickets by status */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Tickets by Status
                  </p>
                  {participation?.ticketsByStatus &&
                  Object.keys(participation.ticketsByStatus).length > 0 ? (
                    <div className="space-y-1">
                      {Object.entries(participation.ticketsByStatus).map(
                        ([status, count]) => (
                          <InfoRow
                            key={status}
                            label={<span className="capitalize">{status}</span>}
                            value={count}
                          />
                        ),
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 italic">
                      No ticket data yet
                    </p>
                  )}
                </div>
              </div>

              {/* Tickets by multiplier */}
              {participation?.ticketsByMultiplier &&
                Object.keys(participation.ticketsByMultiplier).length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-700/40">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Tickets by Multiplier
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {Object.entries(participation.ticketsByMultiplier).map(
                        ([mult, count]) => (
                          <div
                            key={mult}
                            className="bg-slate-700/30 rounded-lg px-3 py-2 text-center"
                          >
                            <p className="text-xs text-slate-400">{mult}x</p>
                            <p className="text-sm font-bold text-white">
                              {count}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
            </Section>

            {/* ── Revenue ── */}
            <Section title="Revenue" icon="💰">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                  label="Total Revenue"
                  value={formatCurrency(revenue?.totalRevenue ?? 0)}
                  accent="green"
                />
                <StatCard
                  label="Avg Ticket Value"
                  value={formatCurrency(revenue?.averageTicketValue ?? 0)}
                  accent="slate"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Revenue by draw type */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Revenue by Draw Type
                  </p>
                  <div className="space-y-1">
                    <InfoRow
                      label="People Main"
                      value={formatCurrency(
                        revenue?.revenueByDrawType?.peopleMain ?? 0,
                      )}
                      valueClass="text-green-400"
                    />
                    <InfoRow
                      label="People Super"
                      value={formatCurrency(
                        revenue?.revenueByDrawType?.peopleSuper ?? 0,
                      )}
                      valueClass="text-green-400"
                    />
                    <InfoRow
                      label="Machine Main"
                      value={formatCurrency(
                        revenue?.revenueByDrawType?.machineMain ?? 0,
                      )}
                      valueClass="text-blue-400"
                    />
                    <InfoRow
                      label="Machine Super"
                      value={formatCurrency(
                        revenue?.revenueByDrawType?.machineSuper ?? 0,
                      )}
                      valueClass="text-blue-400"
                    />
                  </div>
                </div>

                {/* Revenue by multiplier */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Revenue by Multiplier
                  </p>
                  {revenue?.totalByMultiplier &&
                  Object.keys(revenue.totalByMultiplier).length > 0 ? (
                    <div className="space-y-1">
                      {Object.entries(revenue.totalByMultiplier).map(
                        ([multiplier, amount]) => (
                          <InfoRow
                            key={multiplier}
                            label={`${multiplier}x`}
                            value={formatCurrency(amount)}
                            valueClass="text-green-400"
                          />
                        ),
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 italic">
                      No multiplier revenue data yet
                    </p>
                  )}
                </div>
              </div>
            </Section>

            {/* ── Winnings ── */}
            <Section title="Winnings" icon="🏆">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                  label="Total Winnings"
                  value={formatCurrency(winnings?.totalWinnings ?? 0)}
                  accent="amber"
                />
                <StatCard
                  label="Tickets with Winnings"
                  value={winnings?.ticketsWithWinnings ?? 0}
                  accent="slate"
                />
                <StatCard
                  label="Average Winnings"
                  value={formatCurrency(winnings?.averageWinnings ?? 0)}
                  accent="slate"
                />
              </div>
            </Section>

            {/* ── Odds ── */}
            <Section title="Odds & Payout Multipliers" icon="📊">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* People draw type odds */}
                <div className="bg-green-600/5 border border-green-600/20 rounded-xl p-4">
                  <p className="text-sm font-bold text-green-400 mb-4 flex items-center gap-2">
                    <span>🧑</span> People Draw
                  </p>
                  <OddsTable
                    label="Main Numbers"
                    odds={odds?.people_main}
                    accent="text-green-400"
                  />
                  <div className="mt-3 pt-3 border-t border-slate-700/40">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">
                        Super Number Multiplier
                      </span>
                      <span className="text-sm font-bold text-green-400">
                        {odds?.people_super ?? 0}x
                      </span>
                    </div>
                  </div>
                </div>

                {/* Machine draw type odds */}
                <div className="bg-blue-600/5 border border-blue-600/20 rounded-xl p-4">
                  <p className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <span>🤖</span> Machine Draw
                  </p>
                  <OddsTable
                    label="Main Numbers"
                    odds={odds?.machine_main}
                    accent="text-blue-400"
                  />
                  <div className="mt-3 pt-3 border-t border-slate-700/40">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">
                        Super Number Multiplier
                      </span>
                      <span className="text-sm font-bold text-blue-400">
                        {odds?.machine_super ?? 0}x
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </>
        )}
      </div>

      {/* ── Confirmation Modal ── */}
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
    </Layout>
  );
};

export default GameDetails;
