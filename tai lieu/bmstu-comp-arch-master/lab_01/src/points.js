"use strict";

class pointsVault {
    constructor() {
        this.arr = [];
    }

    add(point_name, x, y) {
        let new_point = { point_name, x, y };
        if (!this.arr.find(elem => elem.point_name === point_name)) {
            this.arr.push(new_point);
        }
    }

    read(point_name) {
        return this.arr.find(elem => elem.point_name === point_name);
    }

    update(point_name, x, y) {
        const point = this.read(point_name);
        if (point) {
            point.x = x;
            point.y = y;
        }
    }

    del(point_name) {
        this.arr = this.arr.filter(elem => elem.point_name !== point_name);
    }

    get_dist(p1, p2) {
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    get_max_dist_points() {
        if (this.arr.length <= 1) {
            return;
        }

        let m1 = this.arr[0];
        let m2 = this.arr[1];
        let max_dist = this.get_dist(m1, m2);

        for (const p1 of this.arr) {
            for (const p2 of this.arr) {
                const cur_dist = this.get_dist(p1, p2);
                if (cur_dist > max_dist) {
                    max_dist = cur_dist;
                    m1 = p1;
                    m2 = p2;
                }
            }
        }

        return {
            m1,
            m2
        };
    }

    filter_len_point(point, max_len) {
        return this.arr.filter(p => this.get_dist(p, point) <= max_len);
    }

    filter_quarter(is_more, is_x) {
        let pred;
        if (is_x)
            pred = p => (p.x >= 0) === is_more;
        else
            pred = p => (p.y >= 0) === is_more;

        return this.arr.filter(pred);
    }

    filter_square_zone(min_x, min_y, max_x, max_y) {
        return this.arr.filter(p => p.x >= min_x && p.x <= max_x && p.y >= min_y && p.y <= max_y);
    }

    log() {
        console.log(this.arr);
    }
};

function run_points() {
    const points = new pointsVault();

    points.add("center", 0, 0);
    points.add("p1", 10, 10);
    points.add("p2", -10, 10);
    points.add("p3", 10, -10);
    points.add("p4", -10, -10);
    points.add("p5", 5, 5);
    points.add("p6", 7, 5);

    console.log("\nAfter add:");
    points.log();

    console.log("\nMax dist between\n", points.get_max_dist_points());
    const center = points.read("center");
    console.log("\nPoints with dist to center less than 90\n", points.filter_len_point(center, 10));
    console.log("\nGet all points higher than X (y > 0)\n", points.filter_quarter(true, false));
    console.log("\nPoints in zone [(-8, -8), (8, 8)]\n", points.filter_square_zone(-8, -8, 8, 8));
    console.log("\n\n");

    points.update("center", 1, 1);

    console.log("\nAfter update:");
    points.log();

    points.del("center");

    console.log("\nAfter remove:");
    points.log();

    let found_point = points.read("p2");
    console.log("\np2 point found? - ", found_point);
}

module.exports.run_points = run_points;
