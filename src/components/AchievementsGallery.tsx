import React from "react";
import { Calendar, Award } from "lucide-react";
import { ACHIEVEMENTS } from "../data";

export default function AchievementsGallery() {
  return (
    <div className="space-y-8">
      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((ach) => {
          return (
            <div
              key={ach.id}
              className="group p-6 rounded-2xl bg-white dark:bg-[#121214] border-[3px] border-slate-950 dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Organization */}
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
                  <Award className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>{ach.organization}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-slate-950 dark:text-white mt-3 leading-snug uppercase group-hover:text-[#38BDF8] transition-colors font-display">
                  {ach.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-2.5 leading-relaxed font-semibold">
                  {ach.description}
                </p>
              </div>

              {/* Card Footer with date */}
              <div className="mt-6 pt-3.5 border-t-2 border-slate-950 dark:border-white flex items-center justify-between text-slate-800 dark:text-slate-300 text-[10px] font-black tracking-wider font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                  {ach.date}
                </span>
                
                <span className="px-2.5 py-1 rounded bg-[#FFE24A] text-slate-950 border border-slate-950 text-[9px] font-black uppercase tracking-wider shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  Verified Honor
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
