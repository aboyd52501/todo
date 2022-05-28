/**
 * Deletes all children of an element
 * @param {HTMLElement} element
 */
function clearChildren(element) {
    while (element.firstChild)
        element.removeChild(element.firstChild);
}

const STORAGE_KEY = 'todo-list-aboyd52501';

/**
 * Loads the todo list from local storage.
 * @returns {Array} The items
 */
function getStoredItems() {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
}

/**
 * Writes the todo list to local storage.
 * @param {Array} items
 */
function storeItems(items) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

class ToDoItem {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}


/**
 * Populates the to-do list with the items in the given array
 * @param {Array} items
 * @param {HTMLElement} ul
 */
function repopulateList(items, ul) {
    clearChildren(ul);
    items.forEach(x => {
        const div = document.createElement('div');
        div.classList.add('todo-item');
        
        const text = document.createElement('p');
        text.innerText = x.text;
        div.appendChild(text);

        const deleteButton = document.createElement('button');
        deleteButton.addEventListener('click', () => {
            removeToDo(items, ul, x);
        });
        deleteButton.innerText = 'Delete';
        div.appendChild(deleteButton);
        
        const li = document.createElement('li');
        li.appendChild(div);
        
        ul.appendChild(li);
    });
}

function addToDo(list, ul, todo) {
    list.push(todo);
    update(list, ul);
}

function removeToDo(list, ul, todo) {
    const index = list.findIndex(x => x.id === todo.id);
    list.splice(index, 1);
    update(list, ul);
}

function update(list, ul) {
    storeItems(list);
    repopulateList(list, ul);
}

// Initialize the todo list
let items = getStoredItems();

const UL = document.querySelector('.todo-list');
repopulateList(items, UL);


const input = document.querySelector('.todo-input');
const inputButton = document.querySelector('.todo-input-add');

console.log(items);

inputButton.addEventListener('click', () => {
    const text = input.value;
    if (!text) return;

    const todo = new ToDoItem(crypto.randomUUID(), text);

    input.value = '';
    addToDo(items, UL, todo);
});
