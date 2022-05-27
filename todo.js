const UL = document.querySelector('.todo-list');

// console.log(UL);

function addItem(text, ul) {
    const li = document.createElement('li');
    li.innerText = text;
    ul.appendChild(li);
}

function clearChildren(element) {
    while (element.firstChild)
        element.removeChild(element.firstChild);
}



// [...Array(100)].map((x,i) => i).forEach(i => {
//     const LI = document.createElement('li');
//     LI.innerHTML = `Item ${i}`;
//     UL.appendChild(LI);
// });