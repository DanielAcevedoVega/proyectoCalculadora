let inputBox = document.getElementById('inputBox');
let history = document.getElementById('history');
let buttons = document.querySelectorAll('button');
let deleteBtn = document.getElementById('deleteBtn');
let plusMinus = document.getElementById('plusMinus');

let string = '0';
let result = '';

function updateDisplay() {
    if (string.includes('.')) {
        inputBox.value = formatNumber(string);
    } else {
        inputBox.value = string;
    }
}


function formatNumber(numString) {
    if (numString === '' || numString === '-') return numString;

    let parts = numString.split('.');
    parts[0] = parseFloat(parts[0].replace(/,/g, '')).toLocaleString('en');
    return parts.join('.');
}

buttons.forEach(element => {
    element.addEventListener('click', (b) => {
        let value = b.target.innerText;
        let lastChar = string.slice(-1);
        if (value === '=') {
            try {
                result = String(eval(string.replace(/,/g, '')));
                history.value = string;
                string = result;
            } catch {
                string = 'Error';
            }
            updateDisplay();
        } else if (value == 'C') {
            string = '0';
            result = '';
            updateDisplay();
            history.value = '';
        } else if (element === deleteBtn) {
            string = string.slice(0, -1);
            if (string === '' || string === '-') {
                string = '0';
            }
            updateDisplay();
        } else if (element === plusMinus) {
            if (string !== '0' && string !== '') {
                string = String(-parseFloat(string.replace(/,/g, '')));
                updateDisplay();
            }
        } else if (value === '÷') {
            if (string.slice(-1).match(/[\d.]/)) {
                string += '/';
                updateDisplay();
            }
        } else if (value === 'x') {
            if (string.slice(-1).match(/[\d.]/)) {
                string += '*';
                updateDisplay();
            }
        } else if (value === '%') {
            if (lastChar.match(/[\d.]/)) {
                let parts = string.split(/[\+\-\*\/]/);
                let lastNumber = parts.pop();
                let percentage = parseFloat(lastNumber) / 100;
                string = parts.join('') + value + percentage;
            }
        } else if (value == '.') {
            let lastNumber = string.split(/[\+\-\*\/]/).pop();
            if (!lastNumber.includes('.')) {
                if (string === '0') {
                    string = '0.';
                } else if (lastChar.match(/[\+\-\*\/]/)) {
                    string += '0.';
                } else {
                    string += value;
                }
                updateDisplay();
            }
        }
        else if (lastChar.match(/[\+\-\*\/]/) && value.match(/[\+\-\*\/]/)){
            return;
        }
        else if (value === '+' && string === '0') {
            return;
        } else {
            if (string === '0') {
                string = value;
            } else {
                string += value;
            }
            updateDisplay();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.querySelector('#switch input[type="checkbox"]');

    themeSwitch.addEventListener('change', function() {
        const img = document.querySelector('.row button img');
        const img2 = document.querySelector('#deleteBtn img');
        if (themeSwitch.checked) {
            enableLightMode();
            img.classList.add('inverted');
            img2.classList.add('inverted');
        } else {
            enableDarkMode();
            img.classList.remove('inverted');
            img2.classList.remove('inverted');
        }
    });

    function enableDarkMode() {
        document.body.style.backgroundColor = '#17171C';
        document.getElementById('inputBox').style.color = '#fff';
        document.getElementById('history').style.opacity = '#.4';
        document.getElementById('history').style.color = '#fff';
        const buttons = document.querySelectorAll('.color2');
        buttons.forEach(button => {
            button.style.background = '#2E2F38';
            button.style.color = '#fff';
            
        })
        const buttons1 = document.querySelectorAll('.color1');
        buttons1.forEach(button => {
            button.style.color = '#fff';
        })
    }

    // Función para cambiar al modo claro
    function enableLightMode() {
        document.body.style.backgroundColor = '#fff';
        document.getElementById('inputBox').style.color = '#000';
        document.getElementById('history').style.opacity = '#.4';
        document.getElementById('history').style.color = '#000';
        const buttons = document.querySelectorAll('.color2');
        buttons.forEach(button => {
            button.style.backgroundColor = '#fff';
            button.style.color = '#000';
            
        })
        const buttons1 = document.querySelectorAll('.color1');
        buttons1.forEach(button => {
            button.style.color = '#000';
        })
    }

    enableDarkMode();
});

