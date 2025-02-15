"use client";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ChevronUp, ChevronDown } from "lucide-react";
import mockData from "@/data/mockData";

const DataTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedField, setSortedField] = useState(null);
  const [ascending, setAscending] = useState(true);
  const [filters, setFilters] = useState({
    country: "",
    ad_network: "",
    os: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field) => {
    setAscending(sortedField === field ? !ascending : true);
    setSortedField(field);
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const clearFilters = () => {
    setFilters({ country: "", ad_network: "", os: "" });
  };

  const filteredData = mockData
    .filter((item) =>
      item.creative_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) =>
      filters.country ? item.country === filters.country : true
    )
    .filter((item) =>
      filters.ad_network ? item.ad_network === filters.ad_network : true
    )
    .filter((item) => (filters.os ? item.os === filters.os : true))
    .sort((a, b) => {
      if (!sortedField) return 0;
      return ascending
        ? a[sortedField] > b[sortedField]
          ? 1
          : -1
        : a[sortedField] < b[sortedField]
        ? 1
        : -1;
    });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            <SelectItem value="">All</SelectItem>
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
          onValueChange={(value) => handleFilterChange("ad_network", value)}
        >
          <SelectTrigger className="w-40">Ad Network</SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            {[...new Set(mockData.map((item) => item.ad_network))].map(
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
            <SelectItem value="">All</SelectItem>
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("creative_id")}
              className="cursor-pointer flex items-center gap-1"
            >
              ID{" "}
              {sortedField === "creative_id" &&
                (ascending ? <ChevronUp /> : <ChevronDown />)}
            </TableHead>
            <TableHead
              onClick={() => handleSort("creative_name")}
              className="cursor-pointer flex items-center gap-1"
            >
              Name{" "}
              {sortedField === "creative_name" &&
                (ascending ? <ChevronUp /> : <ChevronDown />)}
            </TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Ad Network</TableHead>
            <TableHead>OS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedData.map((item) => (
            <TableRow
              key={item.creative_id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedRow(item)}
            >
              <TableCell>{item.creative_id}</TableCell>
              <TableCell>{item.creative_name}</TableCell>
              <TableCell>{item.tags.join(", ")}</TableCell>
              <TableCell>{item.country}</TableCell>
              <TableCell>{item.ad_network}</TableCell>
              <TableCell>{item.os}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
      <Dialog open={!!selectedRow} onOpenChange={() => setSelectedRow(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedRow?.creative_name}</DialogTitle>
            <DialogDescription>
              <p>
                <strong>ID:</strong> {selectedRow?.creative_id}
              </p>
              <p>
                <strong>Country:</strong> {selectedRow?.country}
              </p>
              <p>
                <strong>Ad Network:</strong> {selectedRow?.ad_network}
              </p>
              <p>
                <strong>OS:</strong> {selectedRow?.os}
              </p>
              <p>
                <strong>Tags:</strong> {selectedRow?.tags.join(", ")}
              </p>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setSelectedRow(null)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataTable;
