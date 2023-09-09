import Swal from 'sweetalert2';
const getById = (string) => document.getElementById(string);

const inputText = getById('text-currency');
const formSend = getById('submit-currency');
const boxAll = getById('result');


function changeCurrency(event) {
    event.preventDefault();
    boxAll.innerHTML = '';
    const moeda = inputText.value;
    fetch(`https://api.exchangerate.host/latest?base=${moeda}`)
        .then((response) => response.json())
        .then((data) => {
            const actualCurrency = data.rates;
            const keys = Object.keys(actualCurrency);

            keys.forEach((key) => {
                const value = actualCurrency[key];
                const newP = document.createElement('p');
                boxAll.appendChild(newP);
                newP.innerText = `${key}: ${value}`;
            });

        }).catch(() =>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            });
        });
}

formSend.addEventListener('click', changeCurrency);