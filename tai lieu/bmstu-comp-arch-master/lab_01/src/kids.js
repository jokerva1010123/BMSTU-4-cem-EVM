"use strict";

const VOWELS = ['A', 'E', 'I', 'O', 'U', 'Y'];

class kidsVault {
    constructor() {
        this.arr = [];
    }

    add(surname, age) {
        let new_kid = { surname, age };
        if (!this.arr.find(elem => elem.surname === new_kid.surname)) {
            this.arr.push(new_kid);
        }
    }

    read(surname) {
        return this.arr.find(elem => elem.surname === surname);
    }

    update(surname, age) {
        let kid = this.read(surname);
        if (kid) {
            kid.age = age;
        }
    }

    del(surname) {
        this.arr = this.arr.filter(elem => elem.surname !== surname);
    }

    get_average() {
        let sum = 0;
        for (let { age } of this.arr) {
            sum += age;
        }
        return this.arr.length ? sum / this.arr.length : 0;
    }

    get_eldest() {
        if (this.arr.length) {
            return this.arr.reduce((prev, cur) => (prev.age > cur.age) ? prev : cur, this.arr[0]);
        }
    }

    filter_by_age(from, to) {
        return this.arr.filter(kid => from <= kid.age && kid.age <= to);
    }

    filter_by_fb(start_str) {
        return this.arr.filter(kid => kid.surname.startsWith(start_str));
    }

    filter_by_surlen(min_len) {
        return this.arr.filter(kid => kid.surname.length >= min_len);
    }

    filter_vowel() {
        return this.arr.filter(kid => VOWELS.find(char => char === kid.surname[0]));
    }

    log() {
        console.log(this.arr);
    }
};

 function run_kids() {
    const kids = new kidsVault();

    kids.add("Perestoronin", 12);
    kids.add("Nitenko", 132);
    kids.add("Romanov", 19);
    kids.add("Kononenko", 33);
    kids.add("Yacuba", 21);

    console.log("\nAfter add:");
    kids.log();

    console.log("\nAverage is", kids.get_average());
    console.log("\nEldest kid\n", kids.get_eldest());
    console.log("\nAge from 20 to 40\n", kids.filter_by_age(20, 40));
    console.log("\nFilter by first book (K)\n", kids.filter_by_fb('K'));
    console.log("\nFilter by surname len (min len = 7)\n", kids.filter_by_surlen(7));
    console.log("\nFilter (start with vowels)\n", kids.filter_vowel());
    console.log("\n\n");

    kids.update("Perestoronin", 13)
    kids.update("Nitenko", 111);

    console.log("\nAfter update:");
    kids.log();

    kids.del("Perestoronin");

    console.log("\nAfter remove:");
    kids.log();

    let found_kid = kids.read("Nitenko");
    console.log("\nNitenko found? - ", found_kid);
}

module.exports.run_kids = run_kids;
