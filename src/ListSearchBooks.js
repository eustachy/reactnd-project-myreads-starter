import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

import * as BooksAPI from './BooksAPI'
import Book from './Book'

class ListSearchBooks extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  state = {
    query: '',
    result: []
  };

  onShelfChange = (book, shelf) => {
    this.setState(state => {
      return {
        searchBooks: state.searchBooks.map(b => {
          if ( b.id === book.id )
            b['shelf'] = shelf;
          return b;
        })
      };
    });
    this.props.onShelfChange(book, shelf);
  };

  updateQuery = (query) => {

    if ( query ) {
      this.setState({ query: query.trim() });
      BooksAPI.search(query).then(res => {

        let result = [];
        if ( Array.isArray(res) ) {
          result = res.map(newBook => {
            this.props.books.forEach(oldBook => {
              if ( newBook.id === oldBook.id ) {
                newBook = oldBook;
              }
            });
            return newBook;
          });
        }
        this.setState({ result });
      });
    } else {
      this.setState({ query: '', result: [] });
    }
  };


  render() {

    const { query, result } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
             NOTES: The search from BooksAPI is limited to a particular set of search terms.
             You can find these search terms here:
             https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

             However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
             you don't find a specific author or title. Every search is limited by search terms.
             */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {result.map((book, id) => (
              <li key={id}>
                <Book
                  book={book}
                  onShelfChange={this.onShelfChange}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default ListSearchBooks