import React, { useState, useEffect } from "react";

import AnalyticsPage from './pages/Analytics';  // renamed your analytics page
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

import Layout from './components/Layout';
import Notification from './components/Notification';
import Mascot from './components/Mascot';
import Home from './pages/Home';
import Notes from './pages/Notes';
import Pomodoro from './pages/Pomodoro';
import Flashcards from './pages/Flashcards';
import Scheduler from './pages/Scheduler';

import { load, save } from './utils/storage';

export default function App(){
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState(load('theme','light'));
  const [notes, setNotes] = useState(load('notes', []));
  const [flashcards, setFlashcards] = useState(load('flashcards', []));
  const [scheduler, setScheduler] = useState(load('scheduler', []));
  const [analytics, setAnalytics] = useState(load('analytics', { totalStudyTime:0, sessions:0, streak:0, dailyData:[0,0,0,0,0,0,0] }));
  const [notif, setNotif] = useState('');

  useEffect(()=>{ 
    document.documentElement.classList.toggle('dark', theme==='dark'); 
    save('theme', theme); 
  }, [theme]);

  useEffect(()=>{ 
    save('notes', notes); 
    save('flashcards', flashcards); 
    save('scheduler', scheduler); 
    save('analytics', analytics); 
  }, [notes, flashcards, scheduler, analytics]);

  useEffect(()=>{
    if(!analytics.dailyData || analytics.dailyData.length!==7){ 
      const a={...analytics, dailyData:[0,0,0,0,0,0,0]}; 
      setAnalytics(a); 
      save('analytics', a); 
    }
  },[]);

  const notify = (msg)=>{ 
    setNotif(msg); 
    setTimeout(()=>setNotif(''), 2200); 
  };

  const onRefreshMotivation = ()=> notify('✨ Fresh motivation!');

  return (
    <Layout page={page} setPage={setPage} theme={theme} toggleTheme={()=>setTheme(t=> t==='dark'?'light':'dark')}>
      <div className='max-w-6xl mx-auto'>
        
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-bv-600'>FOR S — Siddhi's Study Space</h2>
        </div>

        <div className='page-container'>
          {page==='home' && <Home notes={notes} analytics={analytics} onRefresh={onRefreshMotivation} />}
          {page==='notes' && <Notes notes={notes} setNotes={setNotes} notify={notify} />}
          {page==='pomodoro' && <Pomodoro analytics={analytics} setAnalytics={setAnalytics} notify={notify} />}
          {page==='flashcards' && <Flashcards flashcards={flashcards} setFlashcards={setFlashcards} notify={notify} />}
          {page==='scheduler' && <Scheduler scheduler={scheduler} setScheduler={setScheduler} notify={notify} />}
          {page==='analytics' && <AnalyticsPage analytics={analytics} />}
        </div>

        {/* Vercel Analytics HERE */}
        <VercelAnalytics />

      </div>

      <Mascot onClick={()=> notify("🐰 Keep going — you've got this!")} />
      <Notification message={notif} />
    </Layout>
  );
}

