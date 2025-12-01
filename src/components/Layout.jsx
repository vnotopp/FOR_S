import React from 'react';

export default function Layout({ children, page, setPage, theme, toggleTheme }){
  return (
    <div className={"min-h-screen flex " + (theme==='dark'? 'bg-lav-900 text-gray-200':'bg-sakura-100 text-gray-800')}>
      <aside className={"w-20 md:w-64 " + (theme==='dark'? 'bg-[rgba(20,10,40,0.6)]':'bg-white/60') + " backdrop-blur-sm p-3 md:p-6 border-r"}>
        <div className="hidden md:block text-bv-500 font-bold text-xl">FOR S</div>
        <nav className="mt-6 flex md:flex-col gap-2 justify-center md:justify-start">
          {[['home','🏠'],['notes','💌'],['pomodoro','⏱'],['flashcards','🧠'],['scheduler','📅'],['analytics','📊']].map(([id,icon])=>(
            <button key={id} onClick={()=>setPage(id)} className={"w-full md:text-left p-3 rounded-xl hover:bg-bv-100 dark:hover:bg-lav-700 transition "+(page===id?"bg-bv-500 text-white":"text-gray-700")}>
              <div className='flex items-center gap-3 justify-center md:justify-start'><span className='text-lg'>{icon}</span><span className='hidden md:inline-block font-semibold'>{id}</span></div>
            </button>
          ))}
        </nav>
        <div className="mt-6 hidden md:block">
          <button onClick={toggleTheme} className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-accent to-bv-600 text-white">
            {theme==='dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        <div className='mt-4 text-xs text-gray-500 hidden md:block'>Made for babyy kamat</div>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}
