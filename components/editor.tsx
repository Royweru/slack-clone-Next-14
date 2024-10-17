import React, { useEffect } from 'react'


import Quill, { QuillOptions } from 'quill'
import "quill/dist/quill.snow.css"
import { useRef } from 'react'
const Editor = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if (!containerRef?.current) return;

    const container = containerRef.current;
    const editorContainer = document.createElement("div");
    
    container.appendChild(editorContainer);
    
    const options: QuillOptions = {
      theme: "snow",
    };
    
    new Quill(editorContainer, options);
    

    return ()=>{
      if(container){
        container.innerHTML=""
      }
    }

  },[])
  return (
    <div className=' flex flex-col'>
        <div className=' flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300
         focus-within:shadow-sm transition bg-white'>
              <div>
                Editor
              </div>
        </div>
    </div>
  )
}

export default Editor