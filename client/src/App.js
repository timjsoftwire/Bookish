import React, { Component } from 'react';
import logo from './logo.svg';
import Books from './Books';
import './App.css';
import SearchForm from './searchForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Books</h1>
        <SearchForm />
        <Books />
      </div>
    );
  }
}

export default App;
