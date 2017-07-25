import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

import * as BooksAPI from './BooksAPI'
import Book from './Book'

class ListSearchBooks extends React.Component {

  static propTypes = {
    onShelfChange: PropTypes.func.isRequired
  };

  state = {
    query: '',
    searchBooks: []
  };

  updateQuery = (query) => {
    if ( query ) {
      BooksAPI.search(query, 20).then(books => {
        console.log(books);
        console.log(query);
        this.setState({
          query: query.trim(),
          searchBooks: books.sort(sortBy('title'))
        })
      });
    }
  };

  render() {

    const { onShelfChange } = this.props;
    const { query, searchBooks } = this.state;

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
            {searchBooks.map(book => (
              <li>
                <Book
                  book={book}
                  onShelfChange={onShelfChange}
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