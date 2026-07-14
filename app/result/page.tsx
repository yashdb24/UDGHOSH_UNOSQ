"use client";

import React, { useState, useEffect } from "react";
import resultData from "@/data/Net.json";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";

type ResultItem = {
  "S.I no.": number;
  "Name": string;
  "Mobile Number"?: string | number;
  "School name": string;
  "State": string;
  "Percentage Obtained (%)": number;
};

export default function ResultPage() {
  const [pool, setPool] = useState<string>("Pool Little Champs");
  const [data, setData] = useState<ResultItem[]>([]);
  const [currentPageData, setCurrentPageData] = useState<ResultItem[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    // Check if the pool exists in the imported JSON, otherwise fallback to empty array
    const poolData = (resultData as unknown as Record<string, ResultItem[]>)[pool] || [];
    requestAnimationFrame(() => setData(poolData));
    setCurrentPage(0);
  }, [pool]);

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    requestAnimationFrame(() => setCurrentPageData(data.slice(startIndex, startIndex + itemsPerPage)));
  }, [data, currentPage, itemsPerPage]);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const changePageLeft = () => {
    if (currentPage > 0) {
      changePage(currentPage - 1);
    }
  };

  const changePageRight = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage) - 1) {
      changePage(currentPage + 1);
    }
  };

  const changeItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0);
  };

  const changePool = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(10);
    setPool(e.target.value);
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-orange/5 to-transparent pointer-events-none" />
      <div className="absolute top-40 -right-40 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-brand-orange/10 p-4">
            <Trophy className="h-8 w-8 text-brand-orange" />
          </div>
          <TextReveal as="h1" text="UNOSQ Results" className="font-space-grotesk text-4xl font-extrabold text-text-primary mb-3" />
          <p className="text-text-secondary font-inter max-w-xl">
            Check the scores and rankings for all pools from the previous UNOSQ examinations.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-[#ECEAF5] shadow-xl shadow-brand-purple/5 overflow-hidden">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-gray-100 bg-white/40 gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label className="text-sm font-semibold text-text-secondary">Select Pool:</label>
              <select
                className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-text-primary font-inter text-sm focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all flex-1 sm:flex-none cursor-pointer"
                value={pool}
                onChange={changePool}
              >
                {Object.keys(resultData).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label className="text-sm font-semibold text-text-secondary">Show entries:</label>
              <select
                className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-text-primary font-inter text-sm focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all cursor-pointer"
                value={itemsPerPage}
                onChange={changeItemsPerPage}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value={data.length}>All</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="py-4 px-6 font-inter font-semibold text-sm text-text-secondary border-b border-gray-100 whitespace-nowrap">S.I no.</th>
                  <th className="py-4 px-6 font-inter font-semibold text-sm text-text-secondary border-b border-gray-100 whitespace-nowrap">Name</th>
                  <th className="py-4 px-6 font-inter font-semibold text-sm text-text-secondary border-b border-gray-100 whitespace-nowrap">School Name</th>
                  <th className="py-4 px-6 font-inter font-semibold text-sm text-text-secondary border-b border-gray-100 whitespace-nowrap">State</th>
                  <th className="py-4 px-6 font-inter font-semibold text-sm text-brand-orange border-b border-gray-100 whitespace-nowrap">Percentage (%)</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.length > 0 ? (
                  currentPageData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 font-mono text-sm text-text-secondary border-b border-gray-50">{item["S.I no."]}</td>
                      <td className="py-4 px-6 font-inter font-medium text-text-primary border-b border-gray-50">{item["Name"]}</td>
                      <td className="py-4 px-6 font-inter text-sm text-text-secondary border-b border-gray-50 max-w-[200px] truncate" title={item["School name"]}>{item["School name"]}</td>
                      <td className="py-4 px-6 font-inter text-sm text-text-secondary border-b border-gray-50">{item["State"]}</td>
                      <td className="py-4 px-6 font-space-grotesk font-bold text-brand-orange border-b border-gray-50">{item["Percentage Obtained (%)"]}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-text-secondary font-inter">
                      No results found for this pool.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-gray-100 bg-white/40 gap-4">
            <p className="text-sm text-text-secondary font-inter">
              Showing <span className="font-semibold text-text-primary">{currentPageData.length}</span> of <span className="font-semibold text-text-primary">{data.length}</span> entries
            </p>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={changePageLeft}
                disabled={currentPage === 0}
                className="p-2 rounded-lg border border-gray-200 text-text-secondary hover:bg-gray-50 hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              
              <div className="px-4 py-2 rounded-lg bg-brand-orange/10 text-brand-orange font-semibold text-sm">
                Page {currentPage + 1}
              </div>

              <button 
                onClick={changePageRight}
                disabled={currentPage >= Math.ceil(data.length / itemsPerPage) - 1 || data.length === 0}
                className="p-2 rounded-lg border border-gray-200 text-text-secondary hover:bg-gray-50 hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
