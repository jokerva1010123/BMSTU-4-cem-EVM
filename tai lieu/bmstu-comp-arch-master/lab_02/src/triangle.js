"use strict";

const PRECISION = 0.001;
// h = hypotenuse, l1 = leg1, l2 = leg2
function check_square(h, l1, l2) {
    return Math.abs(h * h - l1 * l1 - l2 * l2) < PRECISION;
}

class Triangle {
    constructor(a, b, c) {
        this.set_data(a, b, c);
    }

    set_data(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    get_data() {
        return { a: this.a, b: this.b, c: this.c };
    }

    check_existance() {
        const { a, b, c } = this.get_data();
        return a < b + c && b < a + c && c < a + b;
    }

    get_perimeter() {
        if (!this.check_existance()) {
            return -1;
        }
        return this.a + this.b + this.c;
    }

    get_area() {
        if (!this.check_existance()) {
            return -1;
        }
        const p = (this.get_perimeter()) / 2;
        return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
    }

    is_square() {
        const { a, b, c } = this.get_data();
        return check_square(a, b, c) || check_square(c, a, b) || check_square(b, c, a);
    }
}

function run_triangle(triangle) {
    console.log(`Exists? - ${triangle.check_existance() ? "Yes" : "No"}`);
    console.log(`Perimeter equals to ${triangle.get_perimeter()}`);
    console.log(`Area equals to ${triangle.get_area()}`);
    console.log(`Square? - ${triangle.is_square() ? "Yes" : "No"}`);
    console.log();
}

function run() {
    console.log("\n\n\nTRIANGLE!");

    console.log("Bad triangle (10, 1, 9), which doesn't exists!");
    const bad = new Triangle(10, 1, 9);
    run_triangle(bad);

    console.log("Square triangle (3, 4, 5)!");
    const square = new Triangle(3, 4, 5);
    run_triangle(square);

    console.log("Simple triangle (10, 12, 14)!");
    // square not square since this moment :)
    square.set_data(10, 12, 14);
    run_triangle(square);
}

module.exports.run = run;
