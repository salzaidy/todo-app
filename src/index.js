// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports

import { renderTodos } from './views'
import { createTodo, loadTodos } from './todos'
import { setFilters } from './filters'



// Render initial todos
renderTodos()

// Set up search text handler
document.querySelector('#search-todo').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

// Set up checkbox handler
document.querySelector('#check-box').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

// Set up form submission handler
document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()

    const text = e.target.elements.todoName.value.trim()
    if (text.length > 0) {
        createTodo(text)
        renderTodos()
        e.target.elements.todoName.value = ''   
    }
})


// Bonus: Add a watcher for local storage
window.addEventListener('storage', (event) => {
    if (event.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})
