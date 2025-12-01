import React from 'react';
export default function Mascot({ onClick }){
  return (
    <div onClick={onClick} className="fixed bottom-6 left-6 w-14 h-14 rounded-full bg-white/90 dark:bg-lav-700 flex items-center justify-center text-3xl shadow-xl cursor-pointer animate-bounce">
      🐰
    </div>
  );
}
