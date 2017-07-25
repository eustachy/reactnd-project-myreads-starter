import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

class BookShelf extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  render() {

    const { title, books, onShelfChange } = this.props;

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book, id) => (
                <li key={id}>
                  <Book
                    book={book}
                    onShelfChange={onShelfChange}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelf