var r = document.querySelector(':root');

const enc = document.getElementById("enc");
const dnc = document.getElementById('dnc');

const enc_box = document.getElementsByClassName('first')[0];
const dnc_box = document.getElementsByClassName('second')[0];

// let username = prompt("Enter your name");
// document.getElementById('user').innerText = username === '' ? "Login User: Guest" : ("Login User: " + username);

switchs(true);

function switchs(sw) {
    if (sw) {
        enc.style.background = "rgb(65, 162, 218)";
        enc.style.color = "white";

        dnc.style.background = "none";
        dnc.style.color = "rgb(65, 162, 218)";

        enc_box.style = "display: block";
        dnc_box.style = "display: none";
    } else {
        dnc.style.background = "rgb(65, 162, 218)";
        dnc.style.color = "white";

        enc.style.background = "none";
        enc.style.color = "rgb(65, 162, 218)";

        enc_box.style = "display: none";
        dnc_box.style = "display: block";
    }
}

enc.addEventListener('click', (e) => {
    switchs(true);
});


dnc.addEventListener('click', (e) => {
    switchs(false);
});

document.getElementById('btn_enc').addEventListener('click', () => {
    myFunction("decryption");
});
document.getElementById('btn_dnc').addEventListener('click', () => {
    myFunction("decryption_dec");
});

document.getElementById('paste').addEventListener('click', () => {
    navigator.clipboard.readText().then(data => {
        if (data === '') {
            popUp("Please enter encrypt hash first!", false);
        } else {
            document.getElementById('decryption_dec_input').innerText = data;
            popUp("Pasted!");
        }
    }).catch(err => {
        popUp(err.msg, false);
    });
});

function myFunction(idx) {
    var copyText = document.getElementById(idx);
    copyText.select();
    if (copyText.value === '') {
        popUp("Please encrypt first!", false);
    } else {
        navigator.clipboard.writeText(copyText.value);
        popUp("Copied!");
    }
}

function popUp(msg, success = true) {
    let popId = document.getElementById('popup');
    popId.style.display = "block";
    popId.innerText = msg;
    popId.style.background = success ? "rgb(107 189 44)" : "red";
    setTimeout(() => {
        popId.style.display = "none";
    }, 3000);
}

function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

///////////////// Main Code Base ///////////////////

class encryptOwn {
    constructor(data) {
        this.data = data;
        this.hash = "";
    }

    encryption() {
        let encArr = [];
        let i = 10;
        for (let char of this.data) {
            if (i % 2 === 0) encArr.push("#&");
            if (i % 3 === 0) encArr.push("!");
            encArr.push(char);
            encArr.push(i);
            i += 1;
        }
        let encText = encArr.join("");
        encText = encText.split("").reverse().join("");
        this.hash = "*%" + encText + "@*";
        return this.hash;
    }

    static decryption(hash) {
        let dncArr = [];
        let i = 0;
        for(let s of hash) {
            if(!(s == '*' || s == '%' || s == '@' || s == '#' || s == '&' || s == '!')) {
                dncArr.push(s);
            }
        }
        dncArr.reverse();
        for(let j = 0; j < dncArr.length * 2; j++) {
            if(dncArr.includes(`${i}`)) {
                dncArr = arrayRemove(dncArr, `${i}`);
                if(!(dncArr.includes(`${i}`))) {
                    i += 1;
                }
            }
        }
        return dncArr.join("");
    }
}

let encrypt_button = document.getElementById('encrypt');
encrypt_button.addEventListener('click', () => {
    let dataForEnc = document.getElementById("encryption");
    let encObj;
    if(dataForEnc.value  !== '') {
        encObj = new encryptOwn(dataForEnc.value);
    }else {
        popUp("Please enter some text!", false);
    }
    document.getElementById('decryption').value = encObj.encryption();
});

let decrypt_button = document.getElementById("dnc_btn");
decrypt_button.addEventListener('click', () => {
    let dataForDnc = document.getElementById("decryption_dec_input");
    let dncObj;
    if(dataForDnc.value !== '') {
        dncObj = encryptOwn.decryption(dataForDnc.value);
    }else {
        popUp("Please enter some hash!", false);
    }
    document.getElementById("decryption_dec").value = dncObj;
});