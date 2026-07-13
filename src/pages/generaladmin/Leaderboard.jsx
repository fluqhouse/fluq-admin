import React, { useState } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import {
  useTopWinners,
  useMostActivePlayers,
  useBiggestJackpots,
  useRecentWinners,
} from "../../hooks/queries/useLeaderboardQueries";
import { formatCurrency, formatDate } from "../../utils/format";
import {
  RefreshCw,
  AlertCircle,
  Trophy,
  Users,
  Zap,
  Clock,
  Medal,
  Crown,
  Gift,
  Gamepad2,
} from "lucide-react";

const Leaderboard = () => {
  const [period, setPeriod] = useState("");
  const [gameType, setGameType] = useState("all");

  const {
    data: topWinnersData,
    isLoading: winnersLoading,
    refetch: refetchWinners,
  } = useTopWinners({ period: period || undefined });

  const {
    data: activePlayersData,
    isLoading: activeLoading,
    refetch: refetchActive,
  } = useMostActivePlayers({ period: period || undefined });

  const {
    data: jackpotsData,
    isLoading: jackpotsLoading,
    refetch: refetchJackpots,
  } = useBiggestJackpots();

  const {
    data: recentWinnersData,
    isLoading: recentLoading,
    refetch: refetchRecent,
  } = useRecentWinners({ limit: 20, gameType });

  const isLoading = winnersLoading || activeLoading || jackpotsLoading || recentLoading;

  const refetchAll = () => {
    refetchWinners();
    refetchActive();
    refetchJackpots();
    refetchRecent();
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-slate-300" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="text-slate-400 font-bold">#{rank}</span>;
    }
  };

  const getRankBg = (rank) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500/10 border-yellow-500/30";
      case 2:
        return "bg-slate-500/10 border-slate-500/30";
      case 3:
        return "bg-amber-500/10 border-amber-500/30";
      default:
        return "bg-slate-700/30 border-slate-600/30";
    }
  };

  return (
    <Layout title="Leaderboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Platform Leaderboard</h2>
              <p className="text-slate-300">
                Top performers, biggest winners, and recent activity across all games.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Time</option>
                <option value="7days">Last 7 Days</option>
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
              </select>
              <button
                onClick={refetchAll}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm">Top Winners</p>
                  <p className="text-white text-2xl font-bold">
                    {topWinnersData?.data?.totalRecords || 0}
                  </p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Active Players</p>
                  <p className="text-white text-2xl font-bold">
                    {activePlayersData?.data?.totalRecords || 0}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Biggest Jackpots</p>
                  <p className="text-white text-2xl font-bold">
                    {jackpotsData?.data?.totalRecords || 0}
                  </p>
                </div>
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Recent Winners</p>
                  <p className="text-white text-2xl font-bold">
                    {recentWinnersData?.data?.totalRecords || 0}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Top Winners & Most Active */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Winners */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Top Winners</h3>
              <span className="text-slate-400 text-sm">
                ({topWinnersData?.data?.period || "all-time"})
              </span>
            </div>
            {winnersLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-700/30 rounded h-16"></div>
                ))}
              </div>
            ) : topWinnersData?.data?.winners?.length > 0 ? (
              <div className="space-y-2">
                {topWinnersData.data.winners.slice(0, 10).map((winner) => (
                  <div
                    key={winner.rank}
                    className={`flex items-center justify-between p-3 rounded-lg border ${getRankBg(winner.rank)}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getRankIcon(winner.rank)}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {winner.userInfo.firstName} {winner.userInfo.lastName}
                        </p>
                        <p className="text-slate-400 text-sm">{winner.winCount} wins</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold">
                        {formatCurrency(winner.totalWinnings)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                No winners data available
              </div>
            )}
          </div>

          {/* Most Active Players */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Most Active Players</h3>
              <span className="text-slate-400 text-sm">
                ({activePlayersData?.data?.period || "all-time"})
              </span>
            </div>
            {activeLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-700/30 rounded h-16"></div>
                ))}
              </div>
            ) : activePlayersData?.data?.players?.length > 0 ? (
              <div className="space-y-2">
                {activePlayersData.data.players.slice(0, 10).map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center justify-between p-3 rounded-lg border ${getRankBg(player.rank)}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getRankIcon(player.rank)}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {player.userInfo.firstName} {player.userInfo.lastName}
                        </p>
                        <p className="text-slate-400 text-sm">{player.ticketCount} tickets</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-400 font-semibold">
                        {formatCurrency(player.totalSpent)}
                      </p>
                      <p className={`text-sm ${player.netResult >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {player.netResult >= 0 ? '+' : ''}{formatCurrency(player.netResult)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                No active players data available
              </div>
            )}
          </div>
        </div>

        {/* Biggest Jackpots */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Biggest Jackpots Ever</h3>
          </div>
          {jackpotsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse bg-slate-700/30 rounded-lg h-32"></div>
              ))}
            </div>
          ) : jackpotsData?.data?.jackpots?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {jackpotsData.data.jackpots.map((jackpot) => (
                <div
                  key={jackpot.rank}
                  className={`p-4 rounded-lg border text-center ${getRankBg(jackpot.rank)}`}
                >
                  <div className="flex justify-center mb-2">
                    {getRankIcon(jackpot.rank)}
                  </div>
                  <p className="text-2xl font-bold text-green-400 mb-1">
                    {formatCurrency(jackpot.amount)}
                  </p>
                  <p className="text-white text-sm font-medium">
                    {jackpot.winner.firstName} {jackpot.winner.lastName}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    {jackpot.game?.title}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {formatDate(jackpot.declaredAt)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              No jackpot data available
            </div>
          )}
        </div>

        {/* Recent Winners */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Recent Winners</h3>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={gameType}
                onChange={(e) => setGameType(e.target.value)}
                className="px-3 py-1.5 bg-slate-700/50 border border-slate-600 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Games</option>
                <option value="lotto">Lotto Only</option>
                <option value="raffle">Raffle Only</option>
              </select>
            </div>
          </div>

          {recentWinnersData?.data?.summary && (
            <div className="flex gap-4 mb-4">
              <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300">
                Total: {recentWinnersData.data.summary.totalWinners}
              </span>
              <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300">
                Lotto: {recentWinnersData.data.summary.lottoWinners}
              </span>
              <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300">
                Raffle: {recentWinnersData.data.summary.raffleWinners}
              </span>
            </div>
          )}

          {recentLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse bg-slate-700/30 rounded h-16"></div>
              ))}
            </div>
          ) : recentWinnersData?.data?.winners?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Winner</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Game/Item</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Prize</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {recentWinnersData.data.winners.map((winner, index) => (
                    <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${
                          winner.gameType === 'lotto'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {winner.gameType === 'lotto' ? (
                            <Gamepad2 className="w-3 h-3" />
                          ) : (
                            <Gift className="w-3 h-3" />
                          )}
                          {winner.gameType}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white font-medium">
                          {winner.winnerInfo.firstName} {winner.winnerInfo.lastName}
                        </p>
                        <p className="text-slate-400 text-sm">{winner.winnerInfo.email}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {winner.gameType === 'lotto'
                          ? winner.gameInfo.title
                          : winner.gameInfo.itemTitle}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-green-400 font-semibold">
                          {winner.gameType === 'lotto'
                            ? formatCurrency(winner.winningDetails.amount)
                            : formatCurrency(winner.gameInfo.itemValue)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-sm">
                        {formatDate(winner.wonAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              No recent winners available
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
