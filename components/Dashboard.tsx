"use client";
import React from "react";
import ChartSection from "./ChartSection";
import DataTable from "./DataTable";

const Dashboard = () => {
  return (
    <div
      className="container mx-auto my-8 max-w-7xl w-full flex flex-col justify-center items-center px-4"
      suppressHydrationWarning
    >
      <ChartSection />
      <DataTable />
    </div>
  );
};

export default Dashboard;
