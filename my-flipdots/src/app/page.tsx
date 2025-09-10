"use client"; //use browser instead of server

import { useEffect, useState } from "react";

export default function PreviewPage() {
  const [imgSrc, setImgSrc] = useState("/api/renderer");

  useEffect(() => {
    const interval = setInterval(() => {
      setImgSrc(`/api/renderer?ts=${Date.now()}`); //add timestamp to prevent using cached image
    }, 1000); //refresh every second

    return () => clearInterval(interval);
  }, []);

  return(
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#14121A] text-[#F4DAE2]">
      <img src={imgSrc} alt="Flipdots preview" width={84} height={28}/>
    </div>
  )
}