const readline = require("readline-sync");
const fs = require("fs");
const path = require("path");

const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y'];
const T4_EXTENSION = ".txt";

function t1() {
    const filename = readline.question("Enter name of file to write data: ");
    const N = readline.questionInt("Enter number of strings: ");

    const strings = [];

    for (let i = 0; i < N; i++) {
        const str = readline.question(`Enter ${i + 1} string: `);
        if (str.length % 2 === 0)
            strings.push(str);
    }

    fs.writeFileSync(filename, JSON.stringify(strings, null, 4));
}

function only_vowels(string) {
    for (const char of string)
        if (!VOWELS.includes(char.toLowerCase())) 
            return false;

    return true;
}

function t2() {
    const filename = readline.question("Enter name of file with data: ");
    const file_content = fs.readFileSync(filename);
    const strings = JSON.parse(file_content);

    for (const string of strings)
        if (only_vowels(string))
            console.log(string);
}

function printFile(filename) {
    console.log(`File: ${filename}\nContent:\n${fs.readFileSync(filename)}`);
}

function t3() {
    let extension = readline.question("Enter extension of files: ");
    if (!extension.startsWith(".")) {
        extension = "." + extension;
    }

    const folderpath = readline.question("Enter path to folder: ");
    let filenames = fs.readdirSync(folderpath);
    //filenames = filenames.map(filename => path.join(folderpath, filename));

    for (const filename of filenames)
        if (filename.endsWith(extension))
            printFile(path.join(folderpath, filename));
}

function is_good_file(file) {
    return file.endsWith(T4_EXTENSION) && fs.readFileSync(file).length <= 10;
}

function recursive_walk_file(file, names) {
    if (is_good_file(file))
        names.push(file);
    else if (fs.lstatSync(file).isDirectory()) {
        const files = fs.readdirSync(file);
        for (const f of files)
            recursive_walk_file(path.join(file, f), names);
    }
}

function t4() {
    const file = readline.question("Enter path to folder/file: ");
    const names = [];

    recursive_walk_file(file, names);

    for (const name of names)
        console.log(name);
}

function t5() {
    const N = readline.questionInt("Enter number of files: ");
    const filename = readline.question("Enter name of file to write data: ");
    
    let content = "";
    for (let i = 0; i < N; i++) {
        const tmp_filename = readline.question(`Enter ${i + 1} file: `);
        content += fs.readFileSync(tmp_filename);
    }

    fs.writeFileSync(filename, content);
}

// Strings are also iterable, but in case of objects and fields that's not what we need
function check_iterable(object) {
    return typeof(object) === "object";
}

function recursive_walk_object(obj, depth) {
    let max_depth = depth;

    if (check_iterable(obj))
        for (const fieldname in obj)
            max_depth = Math.max(max_depth, recursive_walk_object(obj[fieldname], depth + 1));

    return max_depth;
}

//function t6() {
    //const filename = readline.question("Enter name of file with complicated object: ");
    //const content = fs.readFileSync(filename);
    //const object = JSON.parse(content);

    //const depth = recursive_walk_object(object, 0);
    //console.log("Object:\n", JSON.stringify(object, null, 4), "\nDepth:", depth);
//}

function t6() {
    let a = 1;
    let cnt = 0;
    try {
        while (JSON.stringify(a)) {
            cnt++;
            a = { a };
        }
    } catch(_) {
        console.log(cnt);
    }
}

function get_max_branch(object, metadata) {
    if (!check_iterable(object)) {
        if (metadata.depth > metadata.max_depth) {
            metadata.max_depth = metadata.depth;
            metadata.max_branch = [...metadata.cur_branch];
        }
    } else {
        metadata.depth++;

        for (const field in object) {
            metadata.cur_branch.push(field);
            get_max_branch(object[field], metadata);
            metadata.cur_branch.pop();
        }

        metadata.depth--;
    }
}

function t7() {
    const filename = readline.question("Enter name of file with complicated object: ");
    const content = fs.readFileSync(filename);
    const object = JSON.parse(content);

    const metadata = {
        depth: 0,
        max_depth: 0,
        cur_branch: ['root'],
        max_branch: []
    };

    get_max_branch(object, metadata);
    console.log("Object:\n", JSON.stringify(object, null, 4), "\nMax branch:", metadata.max_branch);
}

module.exports.runners = [t1, t2, t3, t4, t5, t6, t7];
