import { createCanvas } from "canvas";
import fs from "node:fs";
import path from "node:path";
import { Ticker } from "./ticker";
import { FPS } from "./settings";

//board specifications
const width = 84;
const height = 28;

//create canvas
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

const outputDir = path.join(process.cwd(), "output");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true});

let textX = width; // start offscreen

const ticker = new Ticker({ fps:FPS});
ticker.start(() => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "white";
    ctx.font = "12px monospace";
    ctx.fillText("HELLO WORLD", textX, 20);

    textX -=1;
    if(textX < -100) {
        textX = width;
    }


    //save image
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(path.join(outputDir, "frame.png"), buffer);
});



// export class Ticker {
// 	constructor(options = {}) {
// 		this.fps = options.fps || 60;
// 		this.callback = null;
// 		this.isRunning = false;
// 		this.lastFrameTime = 0;
// 		this.frameInterval = 1000 / this.fps;
// 	}

// 	start(callback) {
// 		if (this.isRunning) return;

// 		this.callback = callback;
// 		this.isRunning = true;
// 		this.lastFrameTime = performance.now();

// 		this._tick();

// 		return this;
// 	}

// 	stop() {
// 		this.isRunning = false;
// 		return this;
// 	}

// 	_tick() {
// 		if (!this.isRunning) return;

// 		const now = performance.now();
// 		const timeDelta = now - this.lastFrameTime;

// 		if (timeDelta >= this.frameInterval) {
// 			// Adjust for drifting
// 			this.lastFrameTime = now - (timeDelta % this.frameInterval);

// 			// Calculate normalized delta (1.0 = exact frame rate)
// 			const normalizedDelta = timeDelta / this.frameInterval;

// 			if (this.callback) {
// 				this.callback({
// 					deltaTime: normalizedDelta,
// 					elapsedTime: now,
// 				});
// 			}
// 		}

// 		// Use setImmediate for better performance in Node.js
// 		setImmediate(() => this._tick());
// 	}
// }

// import http from "node:http";

// http
// 	.createServer((req, res) => {
// 		if (req.url === "/view") {
// 			res.writeHead(200, { "Content-Type": "text/html" });
// 			res.end(`
//       <html><body style="margin:0;background:#fff;display:flex;justify-content:center;align-items:center">
//         <img id="frame" src="/frame.png" style="image-rendering:pixelated;">
//         <script>
//           function updateFrame(time) {
//             document.getElementById('frame').src = '/frame.png?t=' + time;
//             requestAnimationFrame(updateFrame);
//           }
//           requestAnimationFrame(updateFrame);
//         </script>
//       </body></html>
//     `);
// 		} else if (req.url.startsWith("/frame.png")) {
// 			res.writeHead(200, { "Content-Type": "image/png" });
// 			res.end(fs.readFileSync("./output/frame.png"));
// 		}
// 	})
// 	.listen(3000);
