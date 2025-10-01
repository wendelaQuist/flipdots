import { performance } from "perf_hooks"; 

export interface TickerFrame {
    deltaTime: number;
    elapsedTime: number;
}

export class Ticker{
    fps: number;
    callback: ((frame: TickerFrame) => void) | null;
    isRunning: boolean;
    lastFrameTime: number;
    frameInterval: number;

    constructor(options: { fps?: number } = {}) {
        this.fps = options.fps ?? 15;
        this.callback = null;
        this.isRunning = false;
        this.lastFrameTime = 0;
        this.frameInterval = 1000 / this.fps; 
    }

    start(callback: (frame: TickerFrame) => void) {
        if (this.isRunning) return this;
        this.callback = callback;
        this.isRunning = true;
        this.lastFrameTime = performance.now();
        this._tick();
        return this;
    }

    stop() {
        this.isRunning = false;
        return this;
    }

    private _tick() {
        if (!this.isRunning) return;
        const now = performance.now();
        const timeDelta = now - this.lastFrameTime;

        if (timeDelta >= this.frameInterval) {
            this.lastFrameTime = now - (timeDelta % this.frameInterval);
            const normalizedDelta = timeDelta / this.frameInterval;
            if (this.callback) {
                this.callback({
                    deltaTime: normalizedDelta,
                    elapsedTime: now,
                });
            }
        }

        setImmediate(() => this._tick());
    }

}
