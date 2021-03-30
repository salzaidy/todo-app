import { getTodos, toggleTodo, removeTodo} from './todos'
import { getFilters } from './filters'


// renderTodos
// Arguments: none
// Return value: none
const renderTodos = () => {
    const todoEl = document.querySelector('#todos')
    const { hideCompleted, searchText} = getFilters()
    const filterTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const hideCompletedMatch = !hideCompleted || !todo.completed
        // debugger
        return searchTextMatch && hideCompletedMatch
    })

    // Checking how todos left
    const incompleteTodos = filterTodos.filter((todo) => !todo.completed)


    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    if (filterTodos.length > 0) {
        filterTodos.forEach((todo) => {
            const todoElement = generateTodoDOM(todo)
            todoEl.appendChild(todoElement)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No to-do to show'
        todoEl.appendChild(emptyMessage)
    }

}

// generateTodoDOM
// Arguments: todo
// Return value: the todo element
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkBox = document.createElement('input')
    const textEl = document.createElement('span')
    const removeButton = document.createElement('button')

    // setup todo checkbox
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = todo.completed
    containerEl.appendChild(checkBox)
    checkBox.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        renderTodos()
    })

    // setup the todo text
    textEl.textContent = todo.text
    containerEl.appendChild(textEl)

    // setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // setup the remove button
    removeButton.textContent = 'Remvoe'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', (e) => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoEl
}

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('p')
    const plural = incompleteTodos.length === 1 ? '' : 's'
    summary.classList.add('list-title')
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
    return summary
}


// Make sure to set up the exports
export { generateTodoDOM, renderTodos, generateSummaryDOM}