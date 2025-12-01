import React, { useState } from 'react';
import { save } from '../utils/storage';

export default function Notes({ notes, setNotes, notify }){
  const [text, setText] = useState('');
  const saveNote = ()=>{
    if(!text.trim()) return;
    const note={id:Date.now(), text:text.trim(), date:new Date().toLocaleDateString()};
    const next=[note, ...notes];
    setNotes(next); save('notes', next); setText(''); notify('💾 Note saved');
  };
  return (
    <div className="space-y-4">
      <div className="p-4 card-bg rounded-xl shadow">
        <textarea value={text} onChange={e=>setText(e.target.value)} rows={5} className="w-full p-3 rounded" placeholder="Write a sweet note..."></textarea>
        <div className="mt-2 flex gap-2">
          <button onClick={saveNote} className="px-4 py-2 btn-primary rounded-xl">Save</button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Saved Notes</h3>
        <div className="grid gap-3">
          {notes.length===0 && <div className='text-gray-500'>No notes yet.</div>}
          {notes.map(n=>(
            <div key={n.id} className='p-3 card-bg rounded-xl flex justify-between items-start'>
              <div>
                <div className='text-sm text-bv-600 font-semibold'>{n.date}</div>
                <div className='mt-1'>{n.text}</div>
              </div>
              <button onClick={()=>{ const filtered = notes.filter(x=>x.id!==n.id); setNotes(filtered); save('notes', filtered); notify('🗑 Note deleted'); }} className='text-sm text-red-500'>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
