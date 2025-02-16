"use client";
import {
  BarChart,
  Line,
  LineChart,
  LineProps,
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
} from "recharts";
import mockData from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const processData = () => {
  const countryData = mockData.reduce((acc: Record<string, number>, item) => {
    acc[item.country] = (acc[item.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const adNetworkData = mockData.reduce((acc: Record<string, number>, item) => {
    acc[item.adNetwork] = (acc[item.adNetwork] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    countryChart: Object.keys(countryData).map((key) => ({
      name: key,
      value: countryData[key],
    })),
    adNetworkChart: Object.keys(adNetworkData).map((key) => ({
      name: key,
      value: adNetworkData[key],
    })),
  };
};

const ChartSection = () => {
  const { countryChart, adNetworkChart } = processData();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {/* Pie Chart for Country Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Country Distribution</CardTitle>
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

      {/* Bar Chart for Ad Network Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Ad Network Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={adNetworkChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart for Ad Network Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Ad Network Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={adNetworkChart}>
              <XAxis dataKey="name" />
              <YAxis dataKey="value" />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartSection;
