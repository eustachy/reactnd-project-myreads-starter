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

    this.setState(state => {
      if ( shelf === 'none' )
        return { books: state.books.filter((b) => b.id !== book.id) };

      if ( book.shelf === 'none' ) {
        book.shelf = shelf;
        return { books: state.books.concat([book]) };
      }

      let books = state.books.map(oldBook => {
        if ( book.id === oldBook.id ) {
          oldBook.shelf = shelf;
        }
        return oldBook;
      });

      return { books: books };
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
            books={books}
            onShelfChange={this.updateBook}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
