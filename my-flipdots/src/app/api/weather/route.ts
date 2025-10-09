import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

    if (!apiKey) {
        console.error("Missing OpenWeather API key");
        return NextResponse.json({ error: "API key missing"}, { status: 500});
    }

    const city = "Arnhem";

    try {
        const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) {
        const error = await res.json();
        console.error("OpenWeather error:", error);
        return NextResponse.json({ error: error.message }, {status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
} catch (err) {
    console.error("Weather API fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500});
}
}