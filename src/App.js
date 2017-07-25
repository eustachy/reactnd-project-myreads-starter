import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css'
import ShelfContainer from './components/ShelfContainer'
import Search from './components/Search'

class BooksApp extends React.Component {

  state = {
    // keep all books in one array
    books: []
  };

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  };

  shelfChange = (book, shelf) => {
    // shelf change triggered by a book in BookList component

    this.setState(state => {
      // remove a book from the list
      if ( shelf === 'none' )
        return { books: state.books.filter((b) => b.id !== book.id) };

      // add a new book to the list
      if ( book.shelf === 'none' ) {
        book.shelf = shelf;
        return { books: state.books.concat([book]) };
      }

      // otherwise update shelf property of the given book
      return {
        books: state.books.filter(b => {
          return b.id === book.id ? b.shelf = shelf : b
        })
      };
    });

    BooksAPI.update(book, shelf);
  };

  render() {

    const { books } = this.state;

    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <ShelfContainer
            books={books}
            onShelfChange={this.shelfChange}
          />
        )}/>

        <Route exact path="/search" render={() => (
          <Search
            booksOnShelf={books}
            onShelfChange={this.shelfChange}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
