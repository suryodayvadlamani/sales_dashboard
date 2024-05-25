import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";
import { IoClose } from "react-icons/io5";
import "./Card.css";
import { cn } from "../../lib/util";
import DynamicIcon from "../DynamicIcon";
// parent Card

const Card = (props) => {
  
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      {expanded ? (
        <ExpandedCard params={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard params={props} setExpanded={() => setExpanded(true)} />
      )}
    </>
  );
};

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
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <IoClose onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">
        <Chart options={param.options} series={param.series} type={param.type} />
      </div>
      <span>Last 24 hours</span>
    </motion.div>
  );
}

export default Card;