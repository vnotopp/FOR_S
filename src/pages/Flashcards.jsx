import React, { useState } from 'react';
import { save } from '../utils/storage';

export default function Flashcards({ flashcards, setFlashcards, notify }){
  const [q,setQ]=useState(''); const [a,setA]=useState('');
  const [studyMode, setStudyMode] = useState(false); const [idx,setIdx]=useState(0);

  const add = ()=>{ if(!q||!a) return; const next=[{id:Date.now(), q, a}, ...flashcards]; setFlashcards(next); save('flashcards', next); setQ(''); setA(''); notify('🧠 Card created'); };
  const remove = id => { const next = flashcards.filter(f=>f.id!==id); setFlashcards(next); save('flashcards', next); notify('🗑 Card deleted'); };

  return (
    <div className="space-y-4">
      <div className="p-4 card-bg rounded-xl shadow grid md:grid-cols-3 gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Question" className="p-2 rounded"/>
        <input value={a} onChange={e=>setA(e.target.value)} placeholder="Answer" className="p-2 rounded"/>
        <button onClick={add} className="btn-primary px-3 py-2 rounded-xl">Create</button>
      </div>

      {!studyMode && <div className="grid md:grid-cols-3 gap-4">{flashcards.map(card=>(
        <div key={card.id} className="p-4 card-bg rounded-xl">
          <div className="font-semibold">{card.q}</div>
          <div className="text-sm text-gray-600 mt-2">{card.a.slice(0,80)}{card.a.length>80?'...':''}</div>
          <div className="mt-3 flex gap-2"><button onClick={()=>remove(card.id)} className="text-sm text-red-500">Delete</button></div>
        </div>
      ))}</div>}

      {studyMode && (
        <div className="p-4 card-bg rounded-xl">
          <div className="text-sm text-gray-500">Card {idx+1} of {flashcards.length}</div>
          <div className="mt-3 p-6 bg-bv-100 rounded-xl">
            <div className="font-semibold">{flashcards[idx].q}</div>
            <details className="mt-2"><summary>Show answer</summary><div className="mt-2">{flashcards[idx].a}</div></details>
          </div>
          <div className="mt-3 flex gap-2"><button onClick={()=>setIdx(i=>Math.max(0,i-1))} className="px-3 py-2 rounded-xl bg-gray-200">Prev</button><button onClick={()=>setIdx(i=>Math.min(flashcards.length-1,i+1))} className="px-3 py-2 rounded-xl bg-gray-200">Next</button><button onClick={()=>setStudyMode(false)} className="px-3 py-2 rounded-xl bg-red-100">Exit</button></div>
        </div>
      )}

      <div className="mt-4">
        <button onClick={()=>{ if(flashcards.length) setStudyMode(true); else notify('No cards'); }} className="px-4 py-2 btn-primary text-white rounded-xl">Study Mode</button>
      </div>
    </div>
  );
}
