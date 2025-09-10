import { NextResponse } from "next/server";
import { createCanvas } from "canvas";

export async function GET() {   
    const width = 84;
    const height = 28;           
    const canvas = createCanvas(width, height); //creating canvas
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";                
    ctx.fillRect(0, 0, width, height); //filling background color

    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x + 0.5, y + 0.5, 0.5, 0, Math.PI * 2);
    ctx.fill();

    const buffer = canvas.toBuffer("image/png"); //convert canvas to image

    return new NextResponse(new Uint8Array(buffer), {
        headers: {
            "Content-Type": "image/png",
        },
    });
}