"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import mockData from "@/data/mockData";
import DetailsPopup from "./DetailsPopup";

const DataTable = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  // const [sortedField, setSortedField] = useState<string | null>(null);
  // const [ascending, setAscending] = useState(true);
  const [filters, setFilters] = useState({
    country: "",
    adNetwork: "",
    os: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // const handleSort = (field: string) => {
  //   setAscending(sortedField === field ? !ascending : true);
  //   setSortedField(field);
  // };

  const handleFilterChange = (field: string, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  const clearFilters = () => {
    setFilters({ country: "", adNetwork: "", os: "" });
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
    .filter((item) => (filters.os ? item.os === filters.os : true));
  // .sort((a, b) => {
  //   if (!sortedField) return 0;
  //   const field = sortedField as keyof typeof a;
  //   return ascending
  //     ? a[field] > b[field]
  //       ? 1
  //       : -1
  //     : a[field] < b[field]
  //     ? 1
  //     : -1;
  // });
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
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="mb-4 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <Select onValueChange={(value) => handleFilterChange("country", value)}>
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
        </Select>
        <Select
          onValueChange={(value) => handleFilterChange("adNetwork", value)}
        >
          <SelectTrigger className="w-40">Ad Network</SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {[...new Set(mockData.map((item) => item.adNetwork))].map(
              (network) => (
                <SelectItem key={network} value={network}>
                  {network}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange("os", value)}>
          <SelectTrigger className="w-40">OS</SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {[...new Set(mockData.map((item) => item.os))].map((os) => (
              <SelectItem key={os} value={os}>
                {os}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={clearFilters} variant="outline">
          Reset Filters
        </Button>
      </div>
      <div className="overflow-hidden" suppressHydrationWarning>
      <table className="min-w-full text-sm">
          <thead>
          <tr>
            <th
            // onClick={() => handleSort("creativeId")}
            // className="cursor-pointer flex items-center gap-1"
            >
              ID
              {/* ID{" "}
              {sortedField === "creativeId" &&
                (ascending ? <ChevronUp /> : <ChevronDown />)} */}
            </th>
            <th
            // onClick={() => handleSort("creativeName")}
            // className="cursor-pointer flex items-center gap-1"
            >
              Name
              {/* {sortedField === "creativeName" &&
                (ascending ? <ChevronUp /> : <ChevronDown />)} */}
            </th>
            {/* <th>Tags</th> */}
            <th>Country</th>
            <th>Ad Network</th>
            <th>OS</th>
            <th>Campaign</th>
            <th>Ad Group</th>
            <th>IPM</th>
            <th>CTR</th>,<th>Spend</th>
            <th>Impressions</th>
            <th>Clicks</th>
            <th>CPM</th>
            <th>Cost Per Click</th>
            <th>Cost Per Install</th>
            <th>Installs</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {displayedData.map((item) => (
            <tr
              key={item.creativeId}
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => handleTextClick(item)}
            >
              <td>{item.creativeId}</td>
              <td>{item.creativeName}</td>
              {/* <td>{item.tags.join(", ")}</td> */}
              <td>{item.country}</td>
              <td>{item.adNetwork}</td>
              <td>{item.os}</td>
              <td>{item.campaign}</td>
              <td>{item.adGroup}</td>
              <td>{item.metrics.ipm}</td>
              <td>{item.metrics.ctr}</td>
              <td>{item.metrics.spend}</td>
              <td>{item.metrics.impressions}</td>
              <td>{item.metrics.clicks}</td>
              <td>{item.metrics.cpm}</td>
              <td>{item.metrics.costPerClick}</td>
              <td>{item.metrics.costPerInstall}</td>
              <td>{item.metrics.installs}</td>
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
