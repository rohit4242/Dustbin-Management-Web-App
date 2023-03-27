import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DustbinBox = ({ data, name }) => {
  const [color, setColor] = useState("#22c55e");
  useEffect(() => {
    if (data?.level >= 90 && data?.level <= 100) {
      setColor("#dc2626");
      console.log("full");
      console.log(data?.level)
      console.log(name?.key)
    } else if (data?.level >= 80 && data?.level <= 90) {
      setColor("#f87171");
    } else if (data?.level >= 70 && data?.level <= 80) {
      setColor("##facc15");
    } else if (data?.level >= 60 && data?.level <= 70) {
      setColor("#06b6d4");
    } else if (data?.level >= 50 && data?.level <= 60) {
      setColor("#22d3ee");
    } else if (data?.level >= 40 && data?.level <= 50) {
      setColor("#14b8a6");
    } else if (data?.level >= 30 && data?.level <= 40) {
      setColor("#5eead4");
    } else if (data?.level >= 20 && data?.level <= 30) {
      setColor("#047857");
    } else if (data?.level >= 10 && data?.level <= 20) {
      setColor("#22c55e");
    } else {
      setColor("#86efac");
    }
  }, [data?.level]);

  return (
    <Link to={`/dustbinDetail/${name?.key}`}>
      {" "}
      <div className="flex flex-col items-center justify-center cursor-pointer">
        <div className="flex flex-col justify-end w-32 h-48 p-1 m-4 border-2 border-gray-400 rounded-md cursor-pointer bg-slate-200/50">
          <div
            className={`py-4 text-xs font-bold leading-none text-center text-white cursor-pointer rounded-tl-xl rounded-tr-xl`}
            style={{
              height: `${data?.level}%`,
              width: "100%",
              backgroundColor: `${color}`,
            }}
          >
            <div className="mx-8 text-2xl leading-6 tracking-wide text-gray-800 cursor-pointer">
              {parseInt(data?.level) + "%"}
            </div>
          </div>
        </div>
        <p>{data?.address}</p>
      </div>
    </Link>
  );
};

export default DustbinBox;
