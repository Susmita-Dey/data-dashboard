import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import mockData from "@/data/mockData";

interface FilterComponentProps {
  onFilter: (filteredData: typeof mockData) => void;
}

interface MetricFilter {
  field: string;
  condition: string;
  value: string;
}

const FilterComponent = ({ onFilter }: FilterComponentProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [metricFilter, setMetricFilter] = useState<MetricFilter>({
    field: "",
    condition: "",
    value: "",
  });

  const tags = Array.from(new Set(mockData.flatMap((item) => item.tags)));
  const metrics = [
    "ctr",
    "spend",
    "impressions",
    "clicks",
    "cpm",
    "cost_per_click",
    "cost_per_install",
    "installs",
  ];

  const handleApply = () => {
    let filteredData = [...mockData];

    if (selectedTags.length > 0) {
      filteredData = filteredData.filter((item) =>
        selectedTags.some((tag) => item.tags.includes(tag))
      );
    }

    if (metricFilter.field && metricFilter.value) {
      filteredData = filteredData.filter((item) => {
        const itemValue = parseFloat(item[metricFilter.field]);
        const filterValue = parseFloat(metricFilter.value);

        switch (metricFilter.condition) {
          case "greater":
            return itemValue > filterValue;
          case "less":
            return itemValue < filterValue;
          case "equal":
            return itemValue === filterValue;
          default:
            return true;
        }
      });
    }

    onFilter(filteredData);
  };

  return (
    <div className="flex gap-4 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Tags</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {tags.map((tag) => (
            <DropdownMenuCheckboxItem
              key={tag}
              checked={selectedTags.includes(tag)}
              onCheckedChange={() =>
                setSelectedTags((prev) =>
                  prev.includes(tag)
                    ? prev.filter((t) => t !== tag)
                    : [...prev, tag]
                )
              }
            >
              {tag}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Metrics</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {metrics.map((metric) => (
            <div key={metric} className="p-2 border-b">
              <span className="block font-medium">{metric}</span>
              <select
                className="w-full p-1 mt-1 border rounded"
                onChange={(e) =>
                  setMetricFilter((prev) => ({
                    ...prev,
                    field: metric,
                    condition: e.target.value,
                  }))
                }
              >
                <option value="">Select Condition</option>
                <option value="greater">Greater than</option>
                <option value="less">Less than</option>
                <option value="equal">Equals</option>
              </select>
              <Input
                type="number"
                className="mt-2"
                placeholder="Enter value"
                onChange={(e) =>
                  setMetricFilter((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
              />
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button onClick={handleApply}>Apply</Button>
    </div>
  );
};

export default FilterComponent;
