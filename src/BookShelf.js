import React from 'react'
import PropTypes from 'prop-types'

import BookList from './BookList'

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
            <BookList
              books={books}
              onShelfChange={onShelfChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelf