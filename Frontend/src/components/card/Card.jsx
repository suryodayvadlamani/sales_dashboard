import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";
import { IoClose } from "react-icons/io5";
import "./Card.css";
import { cn } from "../../lib/util";
import DynamicIcon from "../DynamicIcon";
import formatCash from "../../lib/formatCash";
// parent Card

const Card = (props) => {

  const [expanded, setExpanded] = useState(false);
  return (
    <>
      {expanded ? (
        <ExpandedCard params={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <TitleCard params={props} setExpanded={() => setExpanded(true)} />
      )}
    </>
  );
};
function TitleCard({ params, setExpanded }) {
  const param = params.data;
  const isLoading = params.isLoading;
  return <div
    onClick={setExpanded}
    style={{
      background: param?.color.backGround,
      boxShadow: param?.color.boxShadow,
    }}
    className={`flex flex-col h-44 p-4 rounded-xl gap-4 w-44 cursor-pointer`}>
    <DynamicIcon iconName={isLoading?'FaTruckLoading':param.png} />
    <span className="text-2xl font-bold flex-1">
      
      {isLoading?formatCash(0):param.value}
    </span>
    <div className="flex flex-col">
      <span className="text-sm"> {isLoading? 'Men at work': param.title}</span>
      <span className="text-xs text-[#4079ed]">{isLoading? '...............': '+8 from yesterday'}</span>
    </div>
  </div>
}
// Compact Card
function CompactCard({ params, setExpanded }) {
  const param = params.data;
  return (
    <motion.div
      className={cn(
        "CompactCard",
        params.className
      )}
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
        color:'black'
      }}
      layoutId="compactCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <DynamicIcon iconName={param.png} />

        <span>{param.value}</span>
        <span>Last 24 hours</span>
      </div>
    </motion.div>
  );
}

// Expanded Card
function ExpandedCard({ params, setExpanded }) {
  const param = params.data;
  return (
    <motion.div
      className="ExpandedCard"
      style={{
        zIndex: 20,
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer" }}>
        <IoClose onClick={setExpanded} />
      </div>
      <span className="text-black">{param.title}</span>
      <div className="chartContainer">
        <Chart options={param.options} series={param.series} type={param.type} />
      </div>
      <span className="text-black">Last 24 hours</span>
    </motion.div>
  );
}

export default Card;