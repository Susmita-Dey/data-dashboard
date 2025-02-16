"use client";
import React, { useEffect, useState } from "react";
import mockData from "@/data/mockData";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface DetailsPopupProps {
  data: (typeof mockData)[0] | null;
  onClose: () => void;
}

const DetailsPopup: React.FC<DetailsPopupProps> = ({ data, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match the duration of the transition
  };

  return (
    <div
      className={`fixed bottom-0 right-0 w-80 bg-white border border-gray-300 shadow-lg rounded-lg transition-transform duration-300 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <h2 className="text-lg font-medium">{data?.creativeName}</h2>
        <Button onClick={handleClose} className="bg-gray-900 hover:bg-gray-700">
          <X className="w-36 h-36" />
        </Button>
      </div>
      <div
        className="p-4 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="mb-4 space-y-2">
            <h3 className="text-xl font-semibold">{data?.creativeName}</h3>
            <p>
              <strong>ID:</strong> {data?.creativeId}
            </p>
            <p>
              <strong>Country:</strong> {data?.country}
            </p>
            <p>
              <strong>Ad Network:</strong> {data?.adNetwork}
            </p>
            <p>
              <strong>OS:</strong> {data?.os}
            </p>
            <p>
              <strong>Tags:</strong>
              <ul>
                {data?.tags.map((tag) => (
                  <li
                    key={tag}
                    className="list-item list-decimal text-sm font-medium ml-6"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </p>
            <p>
              <strong>Campaign:</strong> {data?.campaign}
            </p>
            <p>
              <strong>IPM:</strong> {data?.metrics.ipm}
            </p>
            <p>
              <strong>CTR:</strong> {data?.metrics.ctr}
            </p>
            <p>
              <strong>Spend:</strong> {data?.metrics.spend}
            </p>
            <p>
              <strong>Impressions:</strong> {data?.metrics.impressions}
            </p>
            <p>
              <strong>Clicks:</strong> {data?.metrics.clicks}
            </p>
            <p>
              <strong>CPM:</strong> {data?.metrics.cpm}
            </p>
            <p>
              <strong>Cost Per Click:</strong> {data?.metrics.costPerClick}
            </p>
            <p>
              <strong>Cost Per Install:</strong> {data?.metrics.costPerInstall}
            </p>
            <p>
              <strong>Installs:</strong> {data?.metrics.installs}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPopup;
