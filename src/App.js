import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css'
import ListMyReads from './ListMyReads'
import ListSearchBooks from './ListSearchBooks'

class BooksApp extends React.Component {

  state = {
    books: []
  };

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  };

  updateBook = (book, shelf) => {

    this.setState((state) => {
      if ( shelf === 'none' )
        return { books: state.books.filter((b) => b.id !== book.id) };

      let bookId = state.books.indexOf(book);
      state.books[bookId].shelf = shelf;
      return { books: state.books };
    });

    BooksAPI.update(book, shelf);
  };

  render() {

    const { books } = this.state;

    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <ListMyReads
            books={books}
            onShelfChange={this.updateBook}
          />
        )}/>

        <Route exact path="/search" render={() => (
          <ListSearchBooks
            onShelfChange={this.updateBook}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
