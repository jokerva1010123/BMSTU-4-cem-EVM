"use strict";


const get = async (url, params) => {
    return new Promise((resolve, _) => {
        url += `?`;
        
        for (const param in params) {
            url += `${param}=${encodeURIComponent(params[param])}&`
        }

        let r = new XMLHttpRequest();
        r.open("GET", url, true);
        r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        r.send(null);

        r.onload = function() {
            resolve(r.response);
        }
    });
}

const get_by_email = (url, email) => get(url, { email });


const convert_result = (result) => {
    let content = "";
    for (const field in result) {
        content += `${field}: ${result[field]}\r\n`;
    }

    return content;
}


const get_data = () => {
    let email = document.querySelector("#email-input");
    const label = document.querySelector("#result-holder");

    if (email && label) {
        email = email.value;

        get_by_email("/search", email)
            .then(result => {
                result = JSON.parse(result);
                label.textContent = convert_result(result);
            });


    } else {
        alert("Can't read input");
    }

}

const send_button = document.querySelector("button");
send_button.addEventListener('click', get_data);
