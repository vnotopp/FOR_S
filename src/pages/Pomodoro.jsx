import React, { useState, useRef, useEffect } from 'react';
import { save } from '../utils/storage';

export default function Pomodoro({ analytics, setAnalytics, notify }){
  const presets=[25,50,60,120];
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(25*60);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(()=> setSeconds(minutes*60), [minutes]);
  useEffect(()=>{ return ()=> clearInterval(ref.current); },[]);

  const start = ()=>{
    if(running) return;
    setRunning(true);
    ref.current = setInterval(()=>{
      setSeconds(s=>{
        if(s<=1){ clearInterval(ref.current); setRunning(false);
          const next={...analytics, sessions:(analytics.sessions||0)+1, totalStudyTime:(analytics.totalStudyTime||0)+minutes, streak:(analytics.streak||0)+1};
          setAnalytics(next); save('analytics', next); notify('⏰ Session complete'); return minutes*60;
        }
        return s-1;
      });
    },1000);
  };
  const pause = ()=>{ clearInterval(ref.current); setRunning(false); };
  const reset = ()=>{ pause(); setSeconds(minutes*60); };

  const mins = Math.floor(seconds/60), secs = seconds%60;
  const progress = 1 - seconds/(minutes*60);

  return (
    <div className="space-y-4">
      <div className="p-6 rounded-2xl card-bg shadow text-center">
        <div className="mx-auto w-56 h-56 rounded-full flex items-center justify-center relative" style={{background: 'linear-gradient(135deg, rgba(155,126,248,0.08), rgba(91,79,198,0.06))'}}>
          <svg viewBox="0 0 120 120" className="absolute" width="220" height="220">
            <circle cx="60" cy="60" r="52" stroke="rgba(0,0,0,0.06)" strokeWidth="12" fill="none"/>
            <circle cx="60" cy="60" r="52" stroke="#9b7ef8" strokeWidth="8" fill="none" strokeDasharray={Math.PI*2*52} strokeDashoffset={Math.PI*2*52*(1-progress)} strokeLinecap="round" transform="rotate(-90 60 60)" />
          </svg>
          <div className="relative text-center">
            <div className="timer-large">{String(mins).padStart(2,'0')}<span className="timer-small">:{String(secs).padStart(2,'0')}</span></div>
            <div className="text-sm text-gray-500 mt-1">Focus Session</div>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {presets.map(p=>(<button key={p} onClick={()=>{ setMinutes(p); setSeconds(p*60); }} className={`px-3 py-1 rounded ${minutes===p?'btn-primary text-white':'bg-gray-100'}`}>{p}m</button>))}
          <input type="number" placeholder="Custom" onBlur={e=>{ const v=parseInt(e.target.value); if(v>0){ setMinutes(v); setSeconds(v*60);} }} className="w-24 px-2 py-1 rounded" />
        </div>

        <div className="mt-4 flex justify-center gap-2">
          <button onClick={start} className="px-4 py-2 btn-primary rounded-xl">Start</button>
          <button onClick={pause} className="px-4 py-2 bg-gray-100 rounded-xl">Pause</button>
          <button onClick={reset} className="px-4 py-2 bg-gray-100 rounded-xl">Reset</button>
        </div>
      </div>
    </div>
  );
}
