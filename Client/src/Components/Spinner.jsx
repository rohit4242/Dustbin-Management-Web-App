import React, { useEffect } from "react";
import { Circles } from "react-loader-spinner";

const Spinner = ({ message, progress }) => {
  useEffect(() => {}, [progress]);
  return (
    <div className="flex flex-col items-center justify-center h-full px-2">
      <Circles color="#02b7cc" height={80} width={80} />
      <span className="mb-2 block text-xl font-semibold text-[#07074D]">
        {message}
      </span>
      {progress && (
        <>
          <div className="flex items-center justify-between">
            <span className="px-2 py-1 bg-teal-50 rounded-lg text-xs text-teal-400 font-medium min-w-[46px] text-center">
              {Number.parseInt(progress) + "%"}
            </span>
          </div>
          <div className="w-full h-1 mt-2 mb-6 bg-slate-100">
            <div
              className="h-1 bg-teal-400 rounded"
              style={{ width: `${Number.parseInt(progress)}%` }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Spinner;
