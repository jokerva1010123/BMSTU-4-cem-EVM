"use strict";


const post = async (url, body) => {
    //return new Promise((resolve, _) => {
        //let r = new XMLHttpRequest();
        //r.open("POST", url, true);
        //r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        //r.send(body);

        //r.onload = function() {
            //resolve(JSON.parse(r.response));
        //}
    //});

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body
    })
        .then(response => response.json())
}


const convert_result = (result) => {
    let content = "";
    for (const field in result) {
        content += `${field}: ${result[field]}\r\n`;
    }

    return content;
}


const send_data = () => {
    let email = document.querySelector("#email-input");
    let lastname = document.querySelector("#lastname-input");
    let phone = document.querySelector("#phone-input");
    const label = document.querySelector("#result-holder");

    if (email && lastname && phone && label) {
        email = email.value;
        lastname = lastname.value;
        phone = phone.value;

        const body_string = JSON.stringify({ email, lastname, phone });
        post("/user", body_string)
            .then(result => {
                label.textContent = convert_result(result);
            });


    } else {
        alert("Can't read input");
    }

}

const send_button = document.querySelector("button");
send_button.addEventListener('click', send_data);
