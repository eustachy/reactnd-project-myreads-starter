import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import * as BooksAPI from './BooksAPI'
import BookList from './BookList'

class Search extends React.Component {

  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  state = {
    query: '',
    isSearching: false,
    result: []
  };

  onShelfChange = (book, shelf) => {
    // update selected book in the search view
    this.setState(state => {
      return {
        result: state.result.filter(b => {
          return b.id === book.id ? b.shelf = shelf : b
        })
      };
    });

    // propagate state changes to the parent
    this.props.onShelfChange(book, shelf);
  };

  updateQuery = (query) => {

    if ( query ) {
      query = query.trim();
      this.setState({ query: query, isSearching: true });

      BooksAPI.search(query).then(res => {
        let result = [];
        // check if the result from AJAX call is valid
        if ( Array.isArray(res) ) {
          // compare books from search results and MyReads list
          // to update shelf property of books that are already in MyReads list
          result = res.map(newBook => {
            let id = this.props.booksOnShelf.findIndex((b) => {
              return b.id === newBook.id
            });
            if ( id >= 0 ) {
              newBook.shelf = this.props.booksOnShelf[id].shelf;
            }
            return newBook;
          });
        }
        this.setState({ result, isSearching: false });
      });
    } else {
      this.setState({ query: '', result: [] });
    }
  };


  render() {

    const { query, result, isSearching } = this.state;

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
        {!result.length && query.length && !isSearching && (
          <div className="search-alert">
            <h3>No results! Try again</h3>
          </div>
        )}
        {!result.length && isSearching && (
          <div className="search-alert">
            <h3>Searching...</h3>
          </div>
        )}
        <div className="search-books-results">
          <BookList
            books={result}
            onShelfChange={this.onShelfChange}
          />
        </div>
      </div>
    )
  }
}

export default Search