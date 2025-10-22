export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createCanvas } from "canvas";
import { WIDTH, HEIGHT, FPS} from "../../lib/settings"    
    
    let frame = 0;

    let cachedWeather: any = null;
    let cachedAt = 0;
    const weather_TTL = 60_000; // data remains for 60s

    export async function GET() {
        const now = Date.now();

        if (!cachedWeather || now - cachedAt > weather_TTL) {
            const apiKey = process.env.OPENWEATHER_API_KEY; // fetching weather
            const city = "Arnhem";

            if (!apiKey) {
                console.error("Missing OPENWEATHER_API_KEY env var");
                cachedWeather = {error: true};
                cachedAt = Date.now();
            } else {
                try{
                    const r = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
                    );
                    if (r.ok) {
                        cachedWeather = await r.json();
                        console.log("Fetched weather RAW:", JSON.stringify(cachedWeather, null, 2))
                    } else {
                        console.error("OpenWeather returned error status:", r.status);
                        cachedWeather = { error: true};
                    }
                } catch (err) {
                    console.error("Error fetching weather:", err);
                    cachedWeather = {error:true};
                }
                cachedAt = Date.now();
            }
        }

        console.log("[renderer] cachedAt:", cachedAt, "cachedWeater:", !!cachedWeather, cachedWeather?.name || null);

        const canvas = createCanvas(WIDTH, HEIGHT); //creating canvas
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "black";                
        ctx.fillRect(0, 0, WIDTH, HEIGHT); //filling background color

        ctx.fillStyle = "white";
        ctx.font = "8px monospace"

        if (cachedWeather && !cachedWeather.error && cachedWeather.main) {
            const name = String(cachedWeather.name || "");
            const temp = Math.round(cachedWeather.main.temp || 0);
            const cond = (cachedWeather.weather && cachedWeather.weather[0] && cachedWeather.weather[0].main) || "";

            ctx.fillText(name, 2, 8);
            ctx.fillText(`${temp}°C`, 2, 18);
            ctx.fillText(String(cond), 2, 26);
        } else {
            ctx.fillText("No data", 2, 14);
        }

        const x = (frame * 2) % Math.max(1, WIDTH);
        ctx.fillRect(x, HEIGHT - 3, 2, 2);
        frame = (frame + 1) >>> 0;

        const buffer = canvas.toBuffer("image/png")

        return new NextResponse(buffer as unknown as BodyInit, {
            headers: { "Content-type": "image/png"},
        });
    }


