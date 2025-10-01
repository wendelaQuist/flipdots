import { NextResponse } from "next/server";
import { createCanvas } from "canvas";
import { WIDTH, HEIGHT, FPS} from "../../lib/settings"    
    
    let frame = 0;

    export async function GET() {
        const canvas = createCanvas(WIDTH, HEIGHT); //creating canvas
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "black";                
        ctx.fillRect(0, 0, WIDTH, HEIGHT); //filling background color

        ctx.fillStyle = "white";
        ctx.font = "12px monospace";
        ctx.fillText("HELLO WORLD!", (frame * 2) % (WIDTH - 40), 20);

        frame++;

        const buffer = canvas.toBuffer("image/png"); //convert canvas to image
        return new NextResponse(new Uint8Array(buffer), {
        headers: {"Content-Type": "image/png"},
    });
    }
