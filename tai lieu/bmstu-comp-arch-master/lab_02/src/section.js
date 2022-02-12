"use strict";

class Point {
    constructor(x, y) {
        this.set_data(x, y);
    }

    set_data(x, y) {
        this.x = x;
        this.y = y;
    }

    log() {
        console.log(`Point: { x: ${this.x}, y: ${this.y} }`);
    }
}

class Section {
    constructor(p1, p2) {
        this.set_data(p1, p2);
    }

    set_data(p1, p2) {
        this.pts = [p1, p2];
    }

    len() {
        const dx = this.pts[1].x - this.pts[0].x;
        const dy = this.pts[1].y - this.pts[0].y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    log() {
        console.log("Section {");
        for (const p of this.pts) {
            p.log();
        }
        console.log("}");
    }
}

function run() {
    console.log("\n\n\nSECTION!")

    console.log("Section 1: { (1, 2), (0, 0) }")
    const sec = new Section(new Point(1, 2), new Point(0, 0));
    console.log(`Len: ${sec.len()}`);
    console.log("Log:");
    sec.log();
    console.log();

    console.log("Section 2: { (0, 7), (0, 0) }")
    sec.set_data(new Point(0, 7), new Point(0, 0))
    console.log(`Len: ${sec.len()}`);
    console.log("Log:");
    sec.log();
    console.log();
}

module.exports.run = run;
