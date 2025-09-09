"use client"; //use browser instead of server

import { useEffect, useState } from "react";

export default function PreviewPage() {
  const [imgUrl, setImgUrl] = useState<string | null>(null); //create empty storage to save image

  useEffect(() => {
    fetch("/api/renderer") //call API
    .then((res) => res.blob()) //convert response into binary blob
    .then((blob) => {
      setImgUrl(URL.createObjectURL(blob)); //Convert blob into readable image
    });
  }, []);

  return(
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#14121A] text-[#F4DAE2]">
      <h1 className="mb-4 text-xl">OWOW x Fontys Flip dots Project</h1>
      {imgUrl ? (
        <img 
        src={imgUrl}
        alt="Flipdots"
        className="border border-[#F4DAE2]"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}