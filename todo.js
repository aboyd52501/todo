/**
 * Deletes all children of an element
 * @param {HTMLElement} element
 */
function clearChildren(element) {
    while (element.firstChild)
        element.removeChild(element.firstChild);
}


class PersistentArray {
        
    constructor (key) {
        this.key = key;

        this.array = this.getArray();

        this.callbacks = [];
    }

    getArray() {
        return JSON.parse(localStorage.getItem(this.key) || '[]');
    }

    /**
     * @callback setArrayCallback
     * @param {Array} array The updated array
     * @returns {void}
     * @description A callback that is called when the array is updated
     */

    /**
     * @param {setArrayCallback} fn The function callback to add
     * @returns {void}
     * @description Adds a callback to be called when the array is updated
     */
    addCallback(fn) {
        this.callbacks.push(fn);
        this.setArray(this.array);
    }

    setArray(array) {
        if (this.array !== array) this.array = array;
        this.callbacks.forEach(fn => fn(array));
        localStorage.setItem(this.key, JSON.stringify(array));
    }
    
    get(index) {
        return this.array[index];
    }
    
    push(value) {
        this.array.push(value);
        this.setArray(this.array);
    }

    /**
     * Delete elements in this PersistentArray according to a filter function
     * @param {Function} fn The filter function
     */
    filterDelete(fn) {
        this.array = this.array.filter(fn);
        this.setArray(this.array);
    }
}

class ToDoItem {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}

function todoItemButtonCallback(pArray, todoItem) {
    return () => {
        pArray.filterDelete(x => x.id !== todoItem.id);
    }
}


// Initialize the todo list
const STORAGE_KEY = 'todo-list-aboyd52501';
let itemList = new PersistentArray(STORAGE_KEY);

const UL = document.querySelector('.todo-list');

const input = document.querySelector('.todo-input');
const inputButton = document.querySelector('.todo-input-add');

console.log(itemList);

// Callback to populate the list when the array is updated
itemList.addCallback(array => {
    clearChildren(UL);
    array.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        const text = document.createElement('p');
        text.textContent = todo.text;
        li.appendChild(text);

        const button = document.createElement('button');
        button.innerText = 'Delete';
        button.addEventListener('click', todoItemButtonCallback(itemList, todo));
        li.appendChild(button);

        UL.appendChild(li);
    });
});

inputButton.addEventListener('click', () => {
    const text = input.value;
    if (!text) return;
    
    // Ensure each todo has a unique ID for easy deletion
    const todo = new ToDoItem(crypto.randomUUID(), text);
    
    input.value = '';
    
    itemList.push(todo); 
});
    