import React, { useState } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import { useLocalGovernmentTickets } from "../../hooks/queries/useRaffleQueries";
import { useDebounce } from "../../hooks/useDebounce";
import { FilterInputs } from "../../components/raffle/LocalGovernmentStats/FilterInputs";
import { ActiveFilters } from "../../components/raffle/LocalGovernmentStats/ActiveFilters";
import { SummaryCards } from "../../components/raffle/LocalGovernmentStats/SummaryCards";
import { TicketsBarChart } from "../../components/raffle/LocalGovernmentStats/charts/TicketsBarChart";
import { DistributionPieChart } from "../../components/raffle/LocalGovernmentStats/charts/DistributionPieChart";
import { StatisticsTable } from "../../components/raffle/LocalGovernmentStats/charts/StatisticsTable";
import { DetailedView } from "../../components/raffle/LocalGovernmentStats/DetailedView";

const LocalGovernmentStats = () => {
  // Filter states
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [detailViewLGA, setDetailViewLGA] = useState(null);
  const [view, setView] = useState("overview");

  // Debounced values for API calls
  const debouncedItemId = useDebounce(selectedItemId, 500);
  const debouncedLGA = useDebounce(selectedLGA, 500);
  const debouncedState = useDebounce(selectedState, 500);
  const debouncedCountry = useDebounce(selectedCountry, 500);

  // Fetch data with debounced filters
  const filterParams = {
    itemId: debouncedItemId || undefined,
    localGovernment:
      view === "details" ? detailViewLGA : debouncedLGA || undefined,
    state: debouncedState || undefined,
    country: debouncedCountry || undefined,
  };

  const {
    data: ticketsData,
    isLoading,
    refetch,
  } = useLocalGovernmentTickets(filterParams);

  const localGovernments = ticketsData?.data?.local_governments || [];
  const summary = ticketsData?.data?.summary || {};

  // Prepare chart data
  const chartData = localGovernments.map((item) => ({
    name:
      item.local_government === "Not Specified"
        ? "Not Specified"
        : item.local_government,
    tickets: item.total_tickets,
    users: item.total_users,
    items: item.total_items,
    fullData: item,
  }));

  const handleLGAClick = (data) => {
    setDetailViewLGA(data.name);
    setView("details");
  };

  const handleClearFilters = () => {
    setSelectedItemId("");
    setSelectedLGA("");
    setSelectedState("");
    setSelectedCountry("");
    setDetailViewLGA(null);
    setView("overview");
  };

  const hasActiveFilters =
    debouncedItemId || debouncedLGA || debouncedState || debouncedCountry;

  // Show loading indicator when typing (before debounce completes)
  const isTyping =
    selectedItemId !== debouncedItemId ||
    selectedLGA !== debouncedLGA ||
    selectedState !== debouncedState ||
    selectedCountry !== debouncedCountry;

  return (
    <Layout title="Local Government Analytics">
      <div className="space-y-6">
        {/* Header with Filters - Always renders immediately */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Local Government Analytics
                  {isTyping && (
                    <span className="ml-3 text-sm text-slate-400 animate-pulse">
                      Typing...
                    </span>
                  )}
                  {isLoading && (
                    <span className="ml-3 text-sm text-blue-400">
                      <span className="inline-block animate-spin mr-1">⟳</span>
                      Loading...
                    </span>
                  )}
                </h2>
                <p className="text-sm text-slate-400">
                  Analyze ticket distribution across local government areas
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {view === "details" && (
                  <button
                    onClick={() => {
                      setView("overview");
                      setDetailViewLGA(null);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
                  >
                    ← Back to Overview
                  </button>
                )}

                <button
                  onClick={() => refetch()}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
                >
                  🔄 Refresh
                </button>
              </div>
            </div>

            <FilterInputs
              selectedItemId={selectedItemId}
              setSelectedItemId={setSelectedItemId}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              selectedLGA={selectedLGA}
              setSelectedLGA={setSelectedLGA}
              hasActiveFilters={hasActiveFilters}
              handleClearFilters={handleClearFilters}
              isDetailView={view === "details"}
            />

            {hasActiveFilters && (
              <ActiveFilters
                selectedItemId={debouncedItemId}
                selectedCountry={debouncedCountry}
                selectedState={debouncedState}
                selectedLGA={debouncedLGA}
              />
            )}
          </div>
        </div>

        {/* Data Section - Shows loading state */}
        {isLoading && !isTyping ? (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-12">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-slate-300">Loading analytics...</span>
            </div>
          </div>
        ) : view === "overview" ? (
          <>
            <SummaryCards summary={summary} />

            {localGovernments.length === 0 && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-12 text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Data Available
                </h3>
                <p className="text-slate-400 mb-4">
                  No tickets found matching the selected filters
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}

            {localGovernments.length > 0 && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <TicketsBarChart
                    chartData={chartData}
                    onLGAClick={handleLGAClick}
                  />
                  <DistributionPieChart chartData={chartData} />
                </div>

                <StatisticsTable
                  localGovernments={localGovernments}
                  onViewDetails={(lgaName) => {
                    setDetailViewLGA(lgaName);
                    setView("details");
                  }}
                />
              </>
            )}
          </>
        ) : (
          <DetailedView
            lgaName={detailViewLGA}
            lgaData={localGovernments.find(
              (lga) => lga.local_government === detailViewLGA
            )}
          />
        )}
      </div>
    </Layout>
  );
};

export default LocalGovernmentStats;
