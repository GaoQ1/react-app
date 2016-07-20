import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
import AddTodo from '../components/demo/AddTodo'
import TodoList from '../components/demo/TodoList'
import Footer from '../components/demo/Footer'

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

function matchStateToProps(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    addTodo: addTodo,
    completeTodo: completeTodo,
    setVisibilityFilter: setVisibilityFilter
  }, dispatch)
}

@connect(matchStateToProps, matchDispatchToProps)

export default  class App extends Component {

    static propTypes = {
      visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
      }).isRequired),
      visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
      ])
    }

    render() {
    const { addTodo, completeTodo, setVisibilityFilter, visibleTodos, visibilityFilter } = this.props;
    return (
      <div>
        <AddTodo
          onAddClick={text =>
            addTodo(text)
          } />
        <TodoList
          todos={visibleTodos}
          onTodoClick={index =>
            completeTodo(index)
          } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            setVisibilityFilter(nextFilter)
          } />
      </div>
    )
  }
}
