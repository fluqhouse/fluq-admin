import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/dashboard/layouts/Layout";
import {
  useItemById,
  useItemStatistics,
  useCategories,
  useUpdateItem,
  useSubmitDrawResults,
  useWinningTickets,
} from "../../hooks/queries/useRaffleQueries";
import { formatCurrency, formatDate } from "../../utils/format";
import { EditItemModal } from "../../components/raffle/EditItemModal";
import toast from "react-hot-toast";

const RaffleItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSubmittingDraw, setIsSubmittingDraw] = useState(false);

  const {
    data: itemData,
    isLoading: isLoadingItem,
    error: itemError,
    refetch: refetchItem,
  } = useItemById(id);

  const { data: statsData, isLoading: isLoadingStats } = useItemStatistics(id);
  const { data: categoriesData } = useCategories();
  const updateItemMutation = useUpdateItem();
  const submitDrawMutation = useSubmitDrawResults();

  const item = itemData?.data;
  const stats = statsData?.data;
  const categories = categoriesData?.data || [];

  // Draw state
  const [winningTickets, setWinningTickets] = useState([]);
  const [winnerCount, setWinnerCount] = useState(item?.expected_winners || 1);

  React.useEffect(() => {
    if (item?.expected_winners) {
      setWinnerCount(item.expected_winners);
      setWinningTickets(Array(item.expected_winners).fill(""));
    }
  }, [item?.expected_winners]);

  const handleUpdate = async (formData) => {
    try {
      await updateItemMutation.mutateAsync({ id, formData });
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const handleWinningTicketChange = (index, value) => {
    setWinningTickets((prev) =>
      prev.map((ticket, i) => (i === index ? value : ticket)),
    );
  };

  const handleSubmitDraw = async (e) => {
    e.preventDefault();

    // Validate all tickets are filled
    const allFilled = winningTickets.every((ticket) => ticket.trim() !== "");
    if (!allFilled) {
      toast.error("Please enter all winning ticket numbers");
      return;
    }

    // Check for duplicates
    const uniqueTickets = new Set(winningTickets);
    if (uniqueTickets.size !== winningTickets.length) {
      toast.error("Duplicate ticket numbers found. Please check your entries.");
      return;
    }

    try {
      const payload = {
        itemId: id,
        winningTickets: winningTickets,
      };

      await submitDrawMutation.mutateAsync(payload);
      setIsSubmittingDraw(false);
      setWinningTickets(Array(winnerCount).fill(""));
      refetchItem();
    } catch (error) {
      console.error("Failed to submit draw results:", error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: "bg-gray-600/20 text-gray-400 border-gray-600/30",
      open: "bg-green-600/20 text-green-400 border-green-600/30",
      closed: "bg-red-600/20 text-red-400 border-red-600/30",
      archived: "bg-slate-600/20 text-slate-400 border-slate-600/30",
      completed: "bg-purple-600/20 text-purple-400 border-purple-600/30",
    };
    return colors[status] || colors.draft;
  };

  const getTimeStatus = () => {
    if (!item) return null;
    const now = new Date();
    const start = new Date(item.start_time);
    const end = new Date(item.end_time);

    if (now < start) return { status: "upcoming", text: "Starts Soon" };
    if (now > end) return { status: "ended", text: "Ended" };
    return { status: "active", text: "Active" };
  };

  const calculateProgress = () => {
    if (!stats?.timeStatistics) return 0;
    return Math.round(stats.timeStatistics.progress || 0);
  };

  if (itemError) {
    return (
      <Layout title="Item Details">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-2">
              Error loading item details
            </div>
            <button
              onClick={() => refetchItem()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoadingItem) {
    return (
      <Layout title="Item Details">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-slate-300">Loading item details...</span>
        </div>
      </Layout>
    );
  }

  const frontImage = item?.media?.find((m) => m.view === "front");
  const sideImage = item?.media?.find((m) => m.view === "side");
  const video = item?.media?.find((m) => m.type === "video");
  const timeStatus = getTimeStatus();

  return (
    <Layout title={item?.title || "Item Details"}>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
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
                  {item?.category?.title} | Created{" "}
                  {formatDate(item?.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  item?.status,
                )}`}
              >
                {item?.status?.toUpperCase()}
              </span>
              {timeStatus && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    timeStatus.status === "active"
                      ? "bg-green-600/20 text-green-400 border-green-600/30"
                      : timeStatus.status === "upcoming"
                        ? "bg-blue-600/20 text-blue-400 border-blue-600/30"
                        : "bg-red-600/20 text-red-400 border-red-600/30"
                  }`}
                >
                  {timeStatus.text}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            {item?.status === "closed" && !item?.winners_selected && (
              <button
                onClick={() => setIsSubmittingDraw(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg transition-colors"
              >
                Conduct Draw
              </button>
            )}

            {item?.winners_selected && (
              <button
                onClick={() => navigate(`/logistics/claims`)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition-colors"
              >
                View Claims (Logistics)
              </button>
            )}

            {(item?.status === "draft" || item?.status === "open") && (
              <button
                onClick={() => setShowEditModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
              >
                Edit Item
              </button>
            )}
          </div>
        </div>

        {/* Draw Submission Form */}
        {isSubmittingDraw && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              Conduct Draw - Select Winners
            </h3>
            <form onSubmit={handleSubmitDraw} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Enter Winning Ticket Numbers ({winnerCount} winners expected)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {winningTickets.map((ticket, index) => (
                    <div key={index}>
                      <label className="block text-xs text-slate-400 mb-2">
                        Winner #{index + 1}
                      </label>
                      <input
                        type="text"
                        value={ticket}
                        onChange={(e) =>
                          handleWinningTicketChange(index, e.target.value)
                        }
                        placeholder="e.g., TKT001, 🎯-001"
                        className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-sm text-yellow-300">
                  ⚠️ Please verify all ticket numbers before submitting. This
                  action cannot be undone and will determine the winners.
                </p>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-2 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmittingDraw(false);
                    setWinningTickets(Array(winnerCount).fill(""));
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
          </div>
        )}

        {/* Tabs */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="flex border-b border-slate-700/50 overflow-x-auto">
            {["overview", "statistics", "media", "participants"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "text-blue-400 border-b-2 border-blue-400 bg-blue-600/10"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-white mb-3">
                        Item Details
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-slate-400">Description</p>
                          <p className="text-sm text-white mt-1">
                            {item?.description}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-slate-400">
                              Ticket Price
                            </p>
                            <p className="text-lg font-bold text-blue-400 mt-1">
                              {item?.ticket_price > 0
                                ? formatCurrency(item?.ticket_price)
                                : "Free"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">
                              Expected Winners
                            </p>
                            <p className="text-lg font-bold text-purple-400 mt-1">
                              {item?.expected_winners}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">
                            Tickets Per Icon
                          </p>
                          <p className="text-sm text-white mt-1">
                            {item?.tickets_per_icon}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-white mb-3">
                        Timeline
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-slate-400">Start Time</p>
                          <p className="text-sm text-white mt-1">
                            {formatDate(item?.start_time)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">End Time</p>
                          <p className="text-sm text-white mt-1">
                            {formatDate(item?.end_time)}
                          </p>
                        </div>
                        {stats?.timeStatistics && (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-xs text-slate-400">Progress</p>
                              <p className="text-xs text-white">
                                {calculateProgress()}%
                              </p>
                            </div>
                            <div className="w-full bg-slate-600 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all"
                                style={{ width: `${calculateProgress()}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {frontImage && (
                      <div className="bg-slate-700/30 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-white mb-3">
                          Preview
                        </h3>
                        <img
                          src={frontImage.url}
                          alt={item?.title}
                          className="w-full rounded-lg"
                        />
                      </div>
                    )}

                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-white mb-3">
                        Creator Info
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-slate-400">Name</p>
                          <p className="text-sm text-white mt-1">
                            {item?.creator?.first_name}{" "}
                            {item?.creator?.last_name}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Email</p>
                          <p className="text-sm text-white mt-1">
                            {item?.creator?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === "statistics" && (
              <div className="space-y-6">
                {isLoadingStats ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <>
                    {/* Ticket Stats */}
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-4">
                        Ticket Statistics
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-slate-700/30 rounded-lg p-4">
                          <p className="text-xs text-slate-400 mb-1">
                            Total Tickets
                          </p>
                          <p className="text-2xl font-bold text-white">
                            {stats?.ticketStatistics?.totalTickets || 0}
                          </p>
                        </div>
                        <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
                          <p className="text-xs text-green-300 mb-1">Booked</p>
                          <p className="text-2xl font-bold text-green-400">
                            {stats?.ticketStatistics?.bookedTickets || 0}
                          </p>
                        </div>
                        <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                          <p className="text-xs text-blue-300 mb-1">
                            Available
                          </p>
                          <p className="text-2xl font-bold text-blue-400">
                            {stats?.ticketStatistics?.availableTickets || 0}
                          </p>
                        </div>
                        <div className="bg-purple-600/10 border border-purple-600/30 rounded-lg p-4">
                          <p className="text-xs text-purple-300 mb-1">
                            Booking Rate
                          </p>
                          <p className="text-2xl font-bold text-purple-400">
                            {stats?.ticketStatistics?.bookingRate || 0}%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Participant Stats */}
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-4">
                        Participants
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="bg-slate-700/30 rounded-lg p-4">
                          <p className="text-xs text-slate-400 mb-1">
                            Total Participants
                          </p>
                          <p className="text-2xl font-bold text-white">
                            {stats?.participantStatistics?.totalParticipants ||
                              0}
                          </p>
                        </div>
                        <div className="bg-slate-700/30 rounded-lg p-4">
                          <p className="text-xs text-slate-400 mb-1">
                            Avg Tickets Per Person
                          </p>
                          <p className="text-2xl font-bold text-white">
                            {stats?.participantStatistics?.totalParticipants > 0
                              ? (
                                  (stats?.ticketStatistics?.bookedTickets ||
                                    0) /
                                  stats?.participantStatistics
                                    ?.totalParticipants
                                ).toFixed(1)
                              : 0}
                          </p>
                        </div>
                      </div>

                      {/* Top Participants */}
                      {stats?.participantStatistics?.topParticipants?.length >
                        0 && (
                        <div className="bg-slate-700/30 rounded-lg p-4">
                          <h4 className="text-xs font-semibold text-white mb-3">
                            Top Participants
                          </h4>
                          <div className="space-y-2">
                            {stats.participantStatistics.topParticipants.map(
                              (p, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between py-2 border-b border-slate-600/50 last:border-0"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-slate-400 text-sm">
                                      #{idx + 1}
                                    </span>
                                    <div>
                                      <p className="text-sm text-white">
                                        {p?.user?.user_id}
                                      </p>
                                      <p className="text-xs text-slate-400">
                                        {p?.user?.email}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="text-blue-400 font-semibold text-sm">
                                    {p.ticketCount} tickets
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Icon Breakdown */}
                    {stats?.iconBreakdown?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-4">
                          Icon Breakdown
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {stats.iconBreakdown.map((icon, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-700/30 rounded-lg p-4"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-2xl">
                                  {icon.iconName}
                                </span>
                                <span className="text-xs text-slate-400">
                                  {icon.bookingRate}%
                                </span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-400">Booked</span>
                                  <span className="text-green-400">
                                    {icon.bookedTickets}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-400">
                                    Available
                                  </span>
                                  <span className="text-blue-400">
                                    {icon.availableTickets}
                                  </span>
                                </div>
                                <div className="w-full bg-slate-600 rounded-full h-1.5">
                                  <div
                                    className="bg-green-500 h-1.5 rounded-full"
                                    style={{ width: `${icon.bookingRate}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Media Tab */}
            {activeTab === "media" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {frontImage && (
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-3">
                        Front View
                      </h3>
                      <img
                        src={frontImage.url}
                        alt="Front view"
                        className="w-full rounded-lg border border-slate-700"
                      />
                    </div>
                  )}
                  {sideImage && (
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-3">
                        Side View
                      </h3>
                      <img
                        src={sideImage.url}
                        alt="Side view"
                        className="w-full rounded-lg border border-slate-700"
                      />
                    </div>
                  )}
                </div>
                {video && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">
                      Video
                    </h3>
                    <video
                      src={video.url}
                      controls
                      className="w-full rounded-lg border border-slate-700"
                    />
                  </div>
                )}
                {!frontImage && !sideImage && !video && (
                  <div className="text-center py-12 text-slate-400">
                    No media available
                  </div>
                )}
              </div>
            )}

            {/* Participants Tab */}
            {activeTab === "participants" && (
              <div className="space-y-4">
                {stats?.recentActivity?.length > 0 ? (
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
                              User
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">
                              Booked At
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-700/50">
                          {stats.recentActivity.map((activity) => (
                            <tr
                              key={activity.id}
                              className="hover:bg-slate-700/20"
                            >
                              {/* Ticket Number */}
                              <td className="px-4 py-3 text-sm text-white">
                                {activity.ticket_number}
                              </td>

                              {/* Icon */}
                              <td className="px-4 py-3 text-sm text-blue-300 font-semibold">
                                {activity.icon_name}
                              </td>

                              {/* User */}
                              <td className="px-4 py-3">
                                <div className="text-sm text-white">
                                  {activity.user?.user_id}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {activity.user?.email}
                                </div>
                              </td>

                              {/* Booking Time */}
                              <td className="px-4 py-3 text-sm text-slate-400">
                                {formatDate(activity.booked_at)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    No participant activity yet
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/rafflemanager/items")}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
          >
            Back to List
          </button>
        </div>

        {/* Edit Modal */}
        <EditItemModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          item={item}
          categories={categories}
          onSubmit={handleUpdate}
          isUpdating={updateItemMutation.isPending}
        />
      </div>
    </Layout>
  );
};

export default RaffleItemDetails;
