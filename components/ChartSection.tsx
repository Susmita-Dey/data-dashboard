"use client";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import mockData from "@/data/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const processData = () => {
  const countryData = mockData.reduce((acc: Record<string, number>, item) => {
    acc[item.country] = (acc[item.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const clicksData = mockData.reduce((acc: Record<string, number>, item) => {
    acc[item.metrics.clicks] = (acc[item.metrics.clicks] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const impressionsData = mockData.reduce(
    (acc: Record<string, number>, item) => {
      acc[item.metrics.impressions] = (acc[item.metrics.impressions] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    countryChart: Object.keys(countryData).map((key) => ({
      name: key,
      value: countryData[key],
    })),
    clicksChart: Object.keys(clicksData).map((key) => ({
      name: key,
      value: clicksData[key],
    })),
    impressionsChart: Object.keys(impressionsData).map((key) => ({
      name: key,
      value: impressionsData[key],
    })),
  };
};

const ChartSection = () => {
  const { countryChart, clicksChart, impressionsChart } = processData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 container mx-auto mt-10">
      {/* Pie Chart for Country Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Country Distribution</CardTitle>
          <CardDescription>
            Showing Country Distribution from the dataset
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={countryChart}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {countryChart.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Area Chart for Ad Network Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Clicks</CardTitle>
          <CardDescription>
            Showing total visitor clicks from the dataset
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={clicksChart}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="value"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Bar Chart for Impressions Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Impressions</CardTitle>
          <CardDescription>
            Showing total impressions from the dataset
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impressionsChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartSection;
