"use strict";

class studentsVault {
    constructor() {
        this.arr = [];
    }

    add(scard_id, group_name, marks) {
        let new_student = { scard_id, group_name, marks };
        if (!this.arr.find(elem => elem.scard_id === scard_id)) {
            this.arr.push(new_student);
        }
    }

    read(scard_id) {
        return this.arr.find(elem => elem.scard_id === scard_id);
    }

    update(scard_id, group_name, marks) {
        const student = this.read(scard_id);
        if (student) {
            student.group_name = group_name;
            student.marks = marks;
        }
    }

    del(scard_id) {
        this.arr = this.arr.filter(elem => elem.scard_id !== scard_id);
    }

    get_average(scard_id) {
        const student = this.read(scard_id);
        if (!student) {
            return;
        }

        let sum = 0;
        for (let mark of student.marks) {
            sum += mark;
        }

        return student.marks.length ? sum / student.marks.length : 0;
    }

    filter_by_group(group_name) {
        return this.arr.filter(student => student.group_name === group_name);
    }

    get_stud_with_max_marks() {
        if (this.arr.length) {
            return this.arr.reduce((prev, cur) => (prev.marks.length > cur.marks.length) ? prev : cur,
                this.arr[0]);
        }
    }

    filter_no_marks() {
        return this.arr.filter(student => student.marks.length === 0);
    }

    log() {
        console.log(this.arr);
    }
};

 function run_students() {
    const students = new studentsVault();

    students.add(1, "IU7-1", [1, 2, 5]);
    students.add(2, "IU7-1", [1, 4, 5]);
    students.add(3, "IU7-1", [1, 3, 4, 5]);
    students.add(4, "IU7-2", [1]);
    students.add(5, "IU7-2", []);

    console.log("\nAfter add:");
    students.log();

    console.log("\nGet average mark for student with 2 scard_id\n", students.get_average(2));
    console.log("\nGet all students from group IU7-1\n", students.filter_by_group("IU7-1"));
    console.log("\nGet student with max number of marks\n", students.get_stud_with_max_marks());
    console.log("\nGet students with no marks\n", students.filter_no_marks());
    console.log("\n\n");

    students.update(1, "IU7-2", [5, 5, 5]);
    students.update(2, "IU7-2", [3, 3, 3]);

    console.log("\nAfter update:");
    students.log();

    students.del(2);

    console.log("\nAfter remove:");
    students.log();

    let found_student = students.read(3);
    console.log("\n3 scard_id found? - ", found_student);
}

module.exports.run_students = run_students;
