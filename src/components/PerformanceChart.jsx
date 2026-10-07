import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';

const chartDataByRange = {
  '01-07 May': {
    days: ['01', '02', '03', '04', '05', '06', '07'],
    dates: [
      '01 May 2023',
      '02 May 2023',
      '03 May 2023',
      '04 May 2023',
      '05 May 2023',
      '06 May 2023',
      '07 May 2023',
    ],
    thisMonth: [5.0, 5.5, 7.0, 6.7, 8.6, 6.0, 7.7],
    lastMonth: [7.3, 6.2, 6.0, 7.2, 5.2, 4.2, 6.8],
  },
  '08-14 May': {
    days: ['08', '09', '10', '11', '12', '13', '14'],
    dates: [
      '08 May 2023',
      '09 May 2023',
      '10 May 2023',
      '11 May 2023',
      '12 May 2023',
      '13 May 2023',
      '14 May 2023',
    ],
    thisMonth: [6.2, 7.4, 8.0, 7.1, 9.2, 6.8, 8.3],
    lastMonth: [5.5, 6.2, 6.8, 5.9, 6.3, 5.0, 5.8],
  },
};

// Convert value in hours (0 to 12) to Y coordinate
const getY = (val, height = 190, padding = 15) => {
  const maxHours = 12;
  const usableHeight = height - padding * 2;
  return height - padding - (val / maxHours) * usableHeight;
};

// Smooth Catmull-Rom spline converter to cubic bezier SVG path
function getSmoothSpline(points, tension = 0.35) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 >= points.length ? points.length - 1 : i + 2];

    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export default function PerformanceChart() {
  const [selectedRange, setSelectedRange] = useState('01-07 May');
  const [activeIndex, setActiveIndex] = useState(2); // '03' May
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const bluePathRef = useRef(null);
  const orangePathRef = useRef(null);
  const tooltipRef = useRef(null);
  const guideLineRef = useRef(null);
  const activeDotRef = useRef(null);

  const data = chartDataByRange[selectedRange];

  const svgWidth = 640;
  const svgHeight = 190;
  const xStart = 35;
  const xEnd = svgWidth - 20;
  const stepX = (xEnd - xStart) / (data.days.length - 1);

  const bluePoints = data.thisMonth.map((val, idx) => ({
    x: xStart + idx * stepX,
    y: getY(val, svgHeight),
  }));

  const orangePoints = data.lastMonth.map((val, idx) => ({
    x: xStart + idx * stepX,
    y: getY(val, svgHeight),
  }));

  const bluePath = getSmoothSpline(bluePoints);
  const orangePath = getSmoothSpline(orangePoints);

  const areaPath = `${bluePath} L ${bluePoints[bluePoints.length - 1].x} ${svgHeight - 12} L ${bluePoints[0].x} ${svgHeight - 12} Z`;

  const currentActivePoint = bluePoints[activeIndex];
  const activeDate = data.dates[activeIndex];
  const activeThisMonth = data.thisMonth[activeIndex];
  const activeLastMonth = data.lastMonth[activeIndex];

  // GSAP initial animation
  useEffect(() => {
    if (bluePathRef.current && orangePathRef.current) {
      const blueLen = bluePathRef.current.getTotalLength();
      const orangeLen = orangePathRef.current.getTotalLength();

      gsap.fromTo(
        bluePathRef.current,
        { strokeDasharray: blueLen, strokeDashoffset: blueLen },
        { strokeDashoffset: 0, duration: 1.4, ease: 'power2.out' }
      );

      gsap.fromTo(
        orangePathRef.current,
        { strokeDasharray: orangeLen, strokeDashoffset: orangeLen },
        { strokeDashoffset: 0, duration: 1.4, ease: 'power2.out', delay: 0.1 }
      );
    }
  }, [selectedRange]);

  const handlePointSelect = (idx) => {
    setActiveIndex(idx);
    const targetPoint = bluePoints[idx];
    const clampedX = Math.min(Math.max(targetPoint.x - 72, 10), svgWidth - 170);

    if (tooltipRef.current) {
      gsap.to(tooltipRef.current, {
        x: clampedX,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (guideLineRef.current) {
      gsap.to(guideLineRef.current, {
        attr: { x1: targetPoint.x, x2: targetPoint.x },
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (activeDotRef.current) {
      gsap.to(activeDotRef.current, {
        attr: { cx: targetPoint.x, cy: targetPoint.y },
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div className="mt-4 px-2 sm:px-6 relative select-none">
      {/* Header & Filter */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">
          Performance
        </h3>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-100/90 hover:bg-slate-200/80 rounded-full text-[12px] font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            <span>{selectedRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-8 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-30 min-w-[120px]">
              {Object.keys(chartDataByRange).map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedRange(range);
                    setDropdownOpen(false);
                    setActiveIndex(2);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-slate-50 transition-colors ${
                    selectedRange === range ? 'font-bold text-blue-600' : 'text-slate-600'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Chart Canvas */}
      <div className="relative w-full overflow-visible">
        {/* Y-Axis values */}
        <div className="absolute left-0 top-1 bottom-7 flex flex-col justify-between text-[11px] text-slate-400 font-medium z-10 pointer-events-none">
          <span>12h</span>
          <span>8h</span>
          <span>6h</span>
          <span>2h</span>
          <span>0h</span>
        </div>

        {/* SVG Visualization */}
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-[185px] sm:h-[205px] overflow-visible pl-4"
        >
          <defs>
            <linearGradient id="chartBlueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.14" />
              <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path d={areaPath} fill="url(#chartBlueGradient)" />

          {/* Dashed guide line */}
          <line
            ref={guideLineRef}
            x1={currentActivePoint.x}
            y1={currentActivePoint.y}
            x2={currentActivePoint.x}
            y2={svgHeight - 12}
            stroke="#94A3B8"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            strokeOpacity="0.5"
          />

          {/* Orange curve (Last month) */}
          <path
            ref={orangePathRef}
            d={orangePath}
            fill="none"
            stroke="#F97316"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Blue curve (This month) */}
          <path
            ref={bluePathRef}
            d={bluePath}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Active dot */}
          <circle
            ref={activeDotRef}
            cx={currentActivePoint.x}
            cy={currentActivePoint.y}
            r="4.5"
            fill="#3B82F6"
            stroke="#FFFFFF"
            strokeWidth="2"
            className="cursor-pointer"
          />

          {/* Transparent click targets */}
          {bluePoints.map((pt, idx) => (
            <circle
              key={idx}
              cx={pt.x}
              cy={pt.y}
              r="16"
              fill="transparent"
              className="cursor-pointer"
              onClick={() => handlePointSelect(idx)}
              onMouseEnter={() => handlePointSelect(idx)}
            />
          ))}
        </svg>

        {/* Floating Tooltip Card */}
        <div
          ref={tooltipRef}
          style={{
            left: 0,
            transform: `translateX(${Math.min(Math.max(currentActivePoint.x - 72, 10), svgWidth - 170)}px)`,
            top: `${Math.max(4, currentActivePoint.y - 78)}px`,
          }}
          className="absolute bg-[#0E1322] text-white rounded-[14px] shadow-2xl p-2.5 px-3.5 w-[145px] z-30 pointer-events-none border border-slate-800"
        >
          <div className="text-[11px] font-semibold text-slate-300 pb-1.5 mb-1.5 border-b border-slate-800/80">
            {activeDate}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1 h-2.5 rounded-full bg-blue-500 inline-block" />
                <span>This month</span>
              </div>
              <span className="font-bold text-white text-[12px]">{activeThisMonth}h</span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1 h-2.5 rounded-full bg-orange-400 inline-block" />
                <span>Last month</span>
              </div>
              <span className="font-bold text-white text-[12px]">{activeLastMonth}h</span>
            </div>
          </div>
        </div>

        {/* X-Axis labels */}
        <div className="flex justify-between pl-9 pr-2 pt-1 text-[12px] font-semibold text-slate-400">
          {data.days.map((day, idx) => (
            <button
              key={day}
              onClick={() => handlePointSelect(idx)}
              className={`hover:text-slate-800 transition-colors cursor-pointer py-1 ${
                idx === activeIndex ? 'text-slate-900 font-bold' : ''
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
