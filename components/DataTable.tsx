"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
import mockData from "@/data/mockData";
import DetailsPopup from "./DetailsPopup";
import { SortAsc, SortDesc } from "lucide-react";
import FilterComponent from "./FilterComponent";

const DataTable = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortedField, setSortedField] = useState<string | null>(null);
  const [ascending, setAscending] = useState(true);

  const [filters, setFilters] = useState({
    country: "",
    adNetwork: "",
    os: "",
    tags: [] as string[],
    metrics: {
      ipm: null as number | null,
      ctr: null as number | null,
      spend: null as number | null,
      impressions: null as number | null,
      clicks: null as number | null,
      cpm: null as number | null,
      costPerClick: null as number | null,
      costPerInstall: null as number | null,
      installs: null as number | null,
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field: string) => {
    setAscending(sortedField === field ? !ascending : true);
    setSortedField(field);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  const clearFilters = () => {
    setFilters({
      country: "",
      adNetwork: "",
      os: "",
      tags: [],
      metrics: {
        ipm: null,
        ctr: null,
        spend: null,
        impressions: null,
        clicks: null,
        cpm: null,
        costPerClick: null,
        costPerInstall: null,
        installs: null,
      },
    });
  };

  const filteredData = mockData
    .filter((item) =>
      item.creativeName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) =>
      filters.country ? item.country === filters.country : true
    )
    .filter((item) =>
      filters.adNetwork ? item.adNetwork === filters.adNetwork : true
    )
    .filter((item) => (filters.os ? item.os === filters.os : true))
    .filter((item) =>
      filters.tags.length > 0
        ? filters.tags.every((tag) => item.tags.includes(tag))
        : true
    )
    .filter((item) =>
      filters.metrics.ipm !== null
        ? item.metrics.ipm >= filters.metrics.ipm
        : true
    )
    .filter((item) =>
      filters.metrics.ctr !== null
        ? item.metrics.ctr >= filters.metrics.ctr
        : true
    )
    .filter((item) =>
      filters.metrics.spend !== null
        ? item.metrics.spend >= filters.metrics.spend
        : true
    )
    .filter((item) =>
      filters.metrics.impressions !== null
        ? item.metrics.impressions >= filters.metrics.impressions
        : true
    )
    .filter((item) =>
      filters.metrics.clicks !== null
        ? item.metrics.clicks >= filters.metrics.clicks
        : true
    )
    .filter((item) =>
      filters.metrics.cpm !== null
        ? item.metrics.cpm >= filters.metrics.cpm
        : true
    )
    .filter((item) =>
      filters.metrics.costPerClick !== null
        ? item.metrics.costPerClick >= filters.metrics.costPerClick
        : true
    )
    .filter((item) =>
      filters.metrics.costPerInstall !== null
        ? item.metrics.costPerInstall >= filters.metrics.costPerInstall
        : true
    )
    .filter((item) =>
      filters.metrics.installs !== null
        ? item.metrics.installs >= filters.metrics.installs
        : true
    )
    .sort((a, b) => {
      if (!sortedField) return 0;
      const field = sortedField as keyof typeof a;
      return ascending
        ? a[field] > b[field]
          ? 1
          : -1
        : a[field] < b[field]
        ? 1
        : -1;
    });

  const [selectedRow, setSelectedRow] = useState<null | (typeof mockData)[0]>(
    null
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTextClick = (item: (typeof mockData)[0]) => {
    setPopupOpen(true);
    setSelectedRow(item);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="container mx-auto max-w-7xl w-full p-6 bg-gray-50 dark:bg-background/75 rounded-lg shadow-md">
      <div className="mb-4 flex md:flex-row flex-col gap-4 items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border-2 rounded w-full"
        />
        <div className="flex gap-4">
          {/* <Select
            onValueChange={(value) => handleFilterChange("country", value)}
          >
            <SelectTrigger className="w-40">Country</SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {[...new Set(mockData.map((item) => item.country))].map(
                (country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select> */}
          <FilterComponent
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
          />
          <Button onClick={clearFilters} variant="outline">
            Reset Filters
          </Button>
        </div>
      </div>
      <div
        className="md:overflow-hidden overflow-x-auto"
        suppressHydrationWarning
      >
        <table className="min-w-full text-sm px-4">
          <thead className="bg-slate-300 dark:bg-slate-900 space-y-1">
            <tr className="divide-x-2 divide-slate-200 dark:divide-inherit space-x-2">
              <th>
                <span
                  onClick={() => handleSort("creativeId")}
                  className="flex justify-center items-center gap-1 text-center"
                >
                  <p>ID</p>
                  <span>
                    {sortedField === "creativeId" &&
                      (ascending ? (
                        <SortAsc className="cursor-pointer" />
                      ) : (
                        <SortDesc className="cursor-pointer" />
                      ))}
                  </span>
                </span>
              </th>
              <th>
                <span
                  onClick={() => handleSort("creativeName")}
                  className="flex justify-center items-center gap-1 text-center"
                >
                  <p>Name</p>
                  <span>
                    {sortedField === "creativeName" &&
                      (ascending ? (
                        <SortAsc className="cursor-pointer" />
                      ) : (
                        <SortDesc className="cursor-pointer" />
                      ))}
                  </span>
                </span>
              </th>
              {/* <th>Tags</th> */}
              <th className="p-2">Country</th>
              <th className="p-2">Ad Network</th>
              <th className="p-2">OS</th>
              <th className="p-2">Campaign</th>
              <th className="p-2">Ad Group</th>
              <th className="p-2">IPM</th>
              <th className="p-2">CTR</th>
              <th className="p-2">Spend</th>
              <th className="p-2">Impressions</th>
              <th className="p-2">Clicks</th>
              <th className="p-2">CPM</th>
              <th className="p-2">Cost Per Click</th>
              <th className="p-2">Cost Per Install</th>
              <th className="p-2">Installs</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 text-xs space-y-1">
            {displayedData.map((item) => (
              <tr
                key={item.creativeId}
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-950 divide-x-2 space-x-2"
                onClick={() => handleTextClick(item)}
              >
                <td className="px-2 text-center">{item.creativeId}</td>
                <td className="px-2 text-center">{item.creativeName}</td>
                {/* <td>{item.tags.join(", ")}</td> */}
                <td className="px-2 text-center">{item.country}</td>
                <td className="px-2 text-center">{item.adNetwork}</td>
                <td className="px-2 text-center">{item.os}</td>
                <td className="px-2 text-center">{item.campaign}</td>
                <td className="px-2 text-center">{item.adGroup}</td>
                <td className="px-2 text-center">
                  {item.metrics.ipm.toFixed(2)}
                </td>
                <td className="px-2 text-center">
                  {item.metrics.ctr.toFixed(2)}
                </td>
                <td className="px-2 text-center">
                  {item.metrics.spend.toFixed(2)}
                </td>
                <td className="px-2 text-center">
                  {item.metrics.impressions.toFixed(2)}
                </td>
                <td className="px-2 text-center">
                  {item.metrics.clicks.toFixed(2)}
                </td>
                <td className="px-2 text-center">
                  {item.metrics.cpm.toFixed(2)}
                </td>
                <td className="px-2 text-center">
                  {item.metrics.costPerClick.toFixed(2)}
                </td>
                <td className="px-2 text-center">
                  {item.metrics.costPerInstall.toFixed(2)}
                </td>
                <td className="px-2 text-center">
                  {item.metrics.installs.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      {popupOpen && (
        <DetailsPopup data={selectedRow} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default DataTable;
