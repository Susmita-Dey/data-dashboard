"use client";
// import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import mockData from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

interface FilterComponentProps {
  filters: {
    country: string;
    adNetwork: string;
    os: string;
    tags: string[];
    metrics: {
      ipm: number | null;
      ctr: number | null;
      spend: number | null;
      impressions: number | null;
      clicks: number | null;
      cpm: number | null;
      costPerClick: number | null;
      costPerInstall: number | null;
      installs: number | null;
    };
  };
  setFilters: (filters: FilterComponentProps["filters"]) => void;
  clearFilters: () => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  filters,
  setFilters,
  clearFilters,
}) => {
  const handleFilterChange = (field: string, value: string | number | null) => {
    setFilters({ ...filters, [field]: value === "All" ? "" : value });
  };

  const handleMetricChange = (
    metric: keyof FilterComponentProps["filters"]["metrics"],
    value: number | null
  ) => {
    setFilters({
      ...filters,
      metrics: { ...filters.metrics, [metric]: value },
    });
  };

  return (
    <div className="w-full flex gap-1" suppressHydrationWarning>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Filters</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto">
          <Tabs defaultValue="dimensions">
            <TabsList>
              <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
              <TabsTrigger value="tags">Tags</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
            </TabsList>
            <Separator className="my-2" />
            <TabsContent value="dimensions">
              <div className="flex flex-col gap-4 justify-center items-center">
                <Select
                  onValueChange={(value) =>
                    handleFilterChange("country", value)
                  }
                >
                  <SelectTrigger className="w-full">Country</SelectTrigger>
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
                  onValueChange={(value) =>
                    handleFilterChange("adNetwork", value)
                  }
                >
                  <SelectTrigger className="w-full">Ad Network</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {[...new Set(mockData.map((item) => item.adNetwork))].map(
                      (adNetwork) => (
                        <SelectItem key={adNetwork} value={adNetwork}>
                          {adNetwork}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) => handleFilterChange("os", value)}
                >
                  <SelectTrigger className="w-full">OS</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {[...new Set(mockData.map((item) => item.os))].map((os) => (
                      <SelectItem key={os} value={os}>
                        {os}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            <TabsContent value="tags">
              <div className="flex w-96 overflow-auto overflow-y-scroll flex-wrap gap-2" style={{ maxHeight: "calc(100vh - 200px)" }}>
                {[...new Set(mockData.flatMap((item) => item.tags))].map(
                  (tag) => (
                    <Button
                      key={tag}
                      variant={
                        filters.tags.includes(tag) ? "default" : "outline"
                      }
                      onClick={() =>
                        setFilters({
                          ...filters,
                          tags: filters.tags.includes(tag)
                            ? filters.tags.filter((t) => t !== tag)
                            : [...filters.tags, tag],
                        })
                      }
                    >
                      {tag}
                    </Button>
                  )
                )}
              </div>
            </TabsContent>
            <TabsContent value="metrics">
              <div className="flex flex-col gap-4" style={{ maxHeight: "calc(100vh - 200px)" }}>
                <input
                  type="number"
                  placeholder="IPM"
                  value={filters.metrics.ipm ?? ""}
                  onChange={(e) =>
                    handleMetricChange(
                      "ipm",
                      e.target.value ? parseFloat(e.target.value) : null
                    )
                  }
                  className="px-2 py-0.5 border-2 rounded w-full"
                />
                <input
                  type="number"
                  placeholder="CTR"
                  value={filters.metrics.ctr ?? ""}
                  onChange={(e) =>
                    handleMetricChange(
                      "ctr",
                      e.target.value ? parseFloat(e.target.value) : null
                    )
                  }
                  className="px-2 py-0.5 border-2 rounded w-full"
                />
                <input
                  type="number"
                  placeholder="Spend"
                  value={filters.metrics.spend ?? ""}
                  onChange={(e) =>
                    handleMetricChange(
                      "spend",
                      e.target.value ? parseFloat(e.target.value) : null
                    )
                  }
                  className="px-2 py-0.5 border-2 rounded w-full"
                />
                <input
                  type="number"
                  placeholder="Impressions"
                  value={filters.metrics.impressions ?? ""}
                  onChange={(e) =>
                    handleMetricChange(
                      "impressions",
                      e.target.value ? parseFloat(e.target.value) : null
                    )
                  }
                  className="px-2 py-0.5 border-2 rounded w-full"
                />
                <input
                  type="number"
                  placeholder="Clicks"
                  value={filters.metrics.clicks ?? ""}
                  onChange={(e) =>
                    handleMetricChange(
                      "clicks",
                      e.target.value ? parseFloat(e.target.value) : null
                    )
                  }
                  className="px-2 py-0.5 border-2 rounded w-full"
                />
                <input
                  type="number"
                  placeholder="CPM"
                  value={filters.metrics.cpm ?? ""}
                  onChange={(e) =>
                    handleMetricChange(
                      "cpm",
                      e.target.value ? parseFloat(e.target.value) : null
                    )
                  }
                  className="px-2 py-0.5 border-2 rounded w-full"
                />
                <input
                  type="number"
                  placeholder="Cost Per Click"
                  value={filters.metrics.costPerClick ?? ""}
                  onChange={(e) =>
                    handleMetricChange(
                      "costPerClick",
                      e.target.value ? parseFloat(e.target.value) : null
                    )
                  }
                  className="px-2 py-0.5 border-2 rounded w-full"
                />
                <input
                  type="number"
                  placeholder="Cost Per Install"
                  value={filters.metrics.costPerInstall ?? ""}
                  onChange={(e) =>
                    handleMetricChange(
                      "costPerInstall",
                      e.target.value ? parseFloat(e.target.value) : null
                    )
                  }
                  className="px-2 py-0.5 border-2 rounded w-full"
                />
                <input
                  type="number"
                  placeholder="Installs"
                  value={filters.metrics.installs ?? ""}
                  onChange={(e) =>
                    handleMetricChange(
                      "installs",
                      e.target.value ? parseFloat(e.target.value) : null
                    )
                  }
                  className="px-2 py-0.5 border-2 rounded w-full"
                />
              </div>
            </TabsContent>
          </Tabs>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button onClick={clearFilters} variant="outline">
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterComponent;
