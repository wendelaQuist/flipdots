import { NextResponse } from "next/server";
import { createCanvas } from "canvas";

export async function GET() {   
    const width = 84;
    const height = 28;           
    const canvas = createCanvas(width, height); //creating canvas
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";                
    ctx.fillRect(0, 0, width, height); //filling background color

    ctx.fillStyle = "white"; //create dot
    ctx.fillRect(10, 1, 1, 1);

    const buffer = canvas.toBuffer("image/png"); //convert canvas to image

    return new NextResponse(new Uint8Array(buffer), {
        headers: {
            "Content-Type": "image/png",
        },
    });
}