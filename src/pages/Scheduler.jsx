import React, { useState } from 'react';
import { save } from '../utils/storage';

const plan=[1,3,7,14,30];

export default function Scheduler({ scheduler, setScheduler, notify }){
  const [topic,setTopic]=useState(''); const [subject,setSubject]=useState('');

  const add = ()=>{
    if(!topic||!subject) return;
    const obj={ id:Date.now(), topic, subject, dates: plan.map(d=>{ const dt=new Date(); dt.setDate(dt.getDate()+d); return {day:d, date:dt.toLocaleDateString(), done:false}; }) };
    const next=[obj, ...scheduler]; setScheduler(next); save('scheduler', next); setTopic(''); setSubject(''); notify('📅 Added');
  };

  const toggle = (id, day)=>{
    const next = scheduler.map(s=> s.id===id? {...s, dates: s.dates.map(d=> d.day===day? {...d, done:!d.done}: d)}: s );
    setScheduler(next); save('scheduler', next);
  };

  const remove = id => { const next = scheduler.filter(s=>s.id!==id); setScheduler(next); save('scheduler', next); notify('🗑 Removed'); };

  return (
    <div className="space-y-4">
      <div className="p-4 card-bg rounded-xl shadow grid md:grid-cols-3 gap-2">
        <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Topic" className="p-2 rounded"/>
        <input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Subject" className="p-2 rounded"/>
        <button onClick={add} className="btn-primary text-white px-3 py-2 rounded-xl">Add</button>
      </div>

      <div className="grid gap-3">
        {scheduler.length===0 && <div className='text-gray-500'>No schedule yet.</div>}
        {scheduler.map(s=>(
          <div key={s.id} className='p-3 card-bg rounded-xl'>
            <div className='flex justify-between items-start'>
              <div><div className='font-semibold text-bv-600'>{s.topic}</div><div className='text-sm text-gray-500'>{s.subject}</div></div>
              <div><button onClick={()=>remove(s.id)} className='text-sm text-red-500'>Delete</button></div>
            </div>
            <div className='mt-3 flex gap-2 flex-wrap'>{s.dates.map(d=>(<button key={d.day} onClick={()=>toggle(s.id,d.day)} className={`px-2 py-1 rounded-lg text-sm ${d.done? 'bg-green-100':'bg-gray-100'}`}>Day {d.day}: {d.date}</button>))}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
