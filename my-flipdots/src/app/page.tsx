"use client"; //use browser instead of server

import { useEffect, useState } from "react";

export default function PreviewPage() {
  const [imgSrc, setImgSrc] = useState("/api/renderer");
  const [weather, setWeather] = useState<any>(null)

  useEffect(() => { //flipdots update
    const interval = setInterval(() => {
      setImgSrc(`/api/renderer?ts=${Date.now()}`); //add timestamp to prevent using cached image
    }, 1000); //refresh every second
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function getWeather() {
      try {
        const res = await fetch("/api/weather");
        const data = await res.json();
        console.log("weather data:", data);
        setWeather(data);
      } catch (err) {
        console.error("Error fetching weather:", err);
      }
    }
    getWeather();
  }, []);

  return(
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#14121A] text-[#F4DAE2]">
      <img src={imgSrc} alt="Flipdots preview" width={84} height={28}/>

      {weather ? (
        <div className="text-center">
          <p className="text-lg font-bold">{weather.name}</p>
          <p>{weather.main.temp} °C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}