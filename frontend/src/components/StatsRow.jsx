import React, { useEffect, useRef } from 'react';
import { ThumbsUp, Clock, TrendingUp } from 'lucide-react';
import gsap from 'gsap';

export default function StatsRow() {
  const finishedRef = useRef(null);
  const trackedRef = useRef(null);
  const efficiencyRef = useRef(null);

  useEffect(() => {
    const obj = { finished: 0, tracked: 0, efficiency: 0 };
    gsap.to(obj, {
      finished: 18,
      tracked: 31,
      efficiency: 93,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => {
        if (finishedRef.current) finishedRef.current.innerText = Math.round(obj.finished);
        if (trackedRef.current) trackedRef.current.innerText = `${Math.round(obj.tracked)}h`;
        if (efficiencyRef.current) efficiencyRef.current.innerText = `${Math.round(obj.efficiency)}%`;
      }
    });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 items-center py-4 px-2 sm:px-6 my-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100/80 gap-4 sm:gap-0">
      {/* 1. Finished */}
      <div className="flex items-center gap-3.5 pr-4 group cursor-pointer transition-transform duration-200 hover:-translate-y-0.5">
        <div className="w-10 h-10 rounded-full border border-slate-200/90 flex items-center justify-center text-slate-800 flex-shrink-0 group-hover:border-slate-400 group-hover:bg-slate-50 transition-colors">
          <ThumbsUp className="w-[18px] h-[18px] stroke-[1.8]" />
        </div>
        <div>
          <span className="text-[13px] text-slate-400 block font-normal leading-tight">
            Finished
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span ref={finishedRef} className="text-[25px] font-bold text-slate-900 tracking-tight leading-none">
              18
            </span>
            <span className="inline-flex items-center text-[12px] font-semibold text-emerald-500 whitespace-nowrap">
              <span className="text-[8px] mr-1">▼</span> +8 tasks
            </span>
          </div>
        </div>
      </div>

      {/* 2. Tracked */}
      <div className="flex items-center gap-3.5 sm:px-8 pt-3 sm:pt-0 group cursor-pointer transition-transform duration-200 hover:-translate-y-0.5">
        <div className="w-10 h-10 rounded-full border border-slate-200/90 flex items-center justify-center text-slate-800 flex-shrink-0 group-hover:border-slate-400 group-hover:bg-slate-50 transition-colors">
          <Clock className="w-[18px] h-[18px] stroke-[1.8]" />
        </div>
        <div>
          <span className="text-[13px] text-slate-400 block font-normal leading-tight">
            Tracked
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span ref={trackedRef} className="text-[25px] font-bold text-slate-900 tracking-tight leading-none">
              31h
            </span>
            <span className="inline-flex items-center text-[12px] font-semibold text-rose-500 whitespace-nowrap">
              <span className="text-[8px] mr-1">▲</span> -6 hours
            </span>
          </div>
        </div>
      </div>

      {/* 3. Efficiency */}
      <div className="flex items-center gap-3.5 sm:pl-8 pt-3 sm:pt-0 group cursor-pointer transition-transform duration-200 hover:-translate-y-0.5">
        <div className="w-10 h-10 rounded-xl border border-slate-200/90 flex items-center justify-center text-slate-800 flex-shrink-0 group-hover:border-slate-400 group-hover:bg-slate-50 transition-colors">
          <TrendingUp className="w-[18px] h-[18px] stroke-[1.8]" />
        </div>
        <div>
          <span className="text-[13px] text-slate-400 block font-normal leading-tight">
            Efficiency
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span ref={efficiencyRef} className="text-[25px] font-bold text-slate-900 tracking-tight leading-none">
              93%
            </span>
            <span className="inline-flex items-center text-[12px] font-semibold text-emerald-500 whitespace-nowrap">
              <span className="text-[8px] mr-1">▲</span> +12%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
