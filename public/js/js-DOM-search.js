const form = document.querySelector('form');
const input = form.querySelector('input');
const listsContainer = document.querySelector('.lists')
const validCompleted = document.querySelector('.num');
const listLength = document.querySelector('.length');
const clearCompleted = document.querySelector('.clearCompleted');

let data = [];
let num;

fetch('/data').then(result => result.json()).then(strigify => {
    data = strigify;
    num = 3;
    validCompleted.innerText =  data.filter(val => val.chackedValid === true).length;
    render();
})


function sendTodos() {
    fetch('/data', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}


function render() {
    drowLists(data);
    listLength.innerText = data.length;
}
form.addEventListener('submit', (evn) => {
    evn.preventDefault();

    if (input.value !== '') {
        num++;
        pushData(input.value, num);
        input.value = '';
        listLength.innerText = data.length;
        sendTodos();
        console.log(data)
        drowLists(data);
    }
})

function pushData(text, num) {
    data.push({
        text: text,
        chackedValid: false,
        key: num
    },)
}

function drowLists(data) {
    listsContainer.innerHTML = '';
    data.forEach((list, index) => {
        listsContainer.innerHTML += `
            <div class="list" id=${list.key}>
                <label>
                    <input type="checkbox" class="chack" onclick="onChange(data[${index}])"  ${list.chackedValid ? 'checked' : ''}>
                    <span class="elemText">${list.text}</span>
                </label>
                <i class="fa-solid fa-trash" onclick="deleteCard(data[${index}])"></i>
            </div>
        `
    })
}

function onChange(list) {
    list.chackedValid = !list.chackedValid;
    validCompleted.innerText = data.filter(val => val.chackedValid === true).length;
    sendTodos();
    drowLists(data);
}

function deleteCard(list) {
    data = data.filter(val => list.key !== val.key);
    listLength.innerText = data.length;
    validCompleted.innerText = data.filter(val => val.chackedValid === true).length;
    sendTodos();
    drowLists(data)
}


clearCompleted.addEventListener('click', () => {
    data = data.filter(val => val.chackedValid === false);
    listLength.innerText = data.length;
    validCompleted.innerText = data.filter(val => val.chackedValid === true).length;
    sendTodos();
    drowLists(data)
})

drowLists(data);







