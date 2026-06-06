import React from "react";
import { DetailHeader } from "./DetailHeader";
import { IconDistributionChart } from "./IconDistributionChart";
import { UsersTicketsTable } from "./UsersTicketsTable";

export const DetailedView = ({ lgaName, lgaData }) => {
  if (!lgaData) {
    return (
      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 text-center">
        <p className="text-slate-400">No data found for {lgaName}</p>
      </div>
    );
  }

  const iconData = Object.entries(lgaData.icon_distribution || {}).map(
    ([name, count]) => ({ name, count })
  );

  return (
    <div className="space-y-6">
      <DetailHeader lgaName={lgaName} lgaData={lgaData} />
      {iconData.length > 0 && <IconDistributionChart iconData={iconData} />}
      <UsersTicketsTable users={lgaData.users} />
    </div>
  );
};
