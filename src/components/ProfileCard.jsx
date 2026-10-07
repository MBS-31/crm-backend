import React, { useRef } from 'react';
import { Phone, Video, MoreVertical } from 'lucide-react';
import gsap from 'gsap';

export default function ProfileCard() {
  const phoneBtnRef = useRef(null);
  const videoBtnRef = useRef(null);
  const moreBtnRef = useRef(null);

  const handleBtnHover = (el, enter) => {
    gsap.to(el, {
      scale: enter ? 1.1 : 1,
      duration: 0.2,
      ease: 'back.out(2)',
    });
  };

  const handleBtnClick = (el) => {
    gsap.fromTo(el, { scale: 0.88 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
  };

  return (
    <div className="bg-[#F4F5F7] rounded-[28px] p-5 pt-6 text-center select-none">
      {/* Avatar Container with warm creamy yellow halo */}
      <div className="relative inline-block mx-auto">
        <div className="w-[72px] h-[72px] rounded-full p-[3px] bg-[#FED7AA] flex items-center justify-center">
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-200">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80"
              alt="Megan Norton"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80";
              }}
            />
          </div>
        </div>

        {/* Coral/red notification badge on bottom right */}
        <span className="absolute bottom-0.5 right-1 w-3 h-3 rounded-full bg-[#FB7185] border-2 border-white" />
      </div>

      {/* Name and Handle */}
      <div className="mt-2.5">
        <h3 className="text-[15px] font-bold text-slate-900 tracking-tight leading-tight">
          Megan Norton
        </h3>
        <p className="text-[12px] text-slate-400 font-normal mt-0.5">
          @megnorton
        </p>
      </div>

      {/* Quick Action Circular Buttons */}
      <div className="flex items-center justify-center gap-3.5 mt-3.5">
        <button
          ref={phoneBtnRef}
          onMouseEnter={() => handleBtnHover(phoneBtnRef.current, true)}
          onMouseLeave={() => handleBtnHover(phoneBtnRef.current, false)}
          onClick={() => handleBtnClick(phoneBtnRef.current)}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-800 shadow-2xs hover:text-slate-950 transition-colors cursor-pointer"
          title="Call"
        >
          <Phone className="w-4 h-4 stroke-[1.9]" />
        </button>

        <button
          ref={videoBtnRef}
          onMouseEnter={() => handleBtnHover(videoBtnRef.current, true)}
          onMouseLeave={() => handleBtnHover(videoBtnRef.current, false)}
          onClick={() => handleBtnClick(videoBtnRef.current)}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-800 shadow-2xs hover:text-slate-950 transition-colors cursor-pointer"
          title="Video call"
        >
          <Video className="w-4 h-4 stroke-[1.9]" />
        </button>

        <button
          ref={moreBtnRef}
          onMouseEnter={() => handleBtnHover(moreBtnRef.current, true)}
          onMouseLeave={() => handleBtnHover(moreBtnRef.current, false)}
          onClick={() => handleBtnClick(moreBtnRef.current)}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-800 shadow-2xs hover:text-slate-950 transition-colors cursor-pointer"
          title="More options"
        >
          <MoreVertical className="w-4 h-4 stroke-[1.9]" />
        </button>
      </div>
    </div>
  );
}
