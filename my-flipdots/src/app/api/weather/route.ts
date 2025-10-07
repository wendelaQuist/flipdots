import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const city = "Amsterdam";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch weather"}, {status: res.status});
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "Something went horribly wrong"})
    }
}