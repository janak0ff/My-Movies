/**
 * WatchedMovie is a React component that displays information about a watched movie.
 * It expects an object with the following properties: title, poster, imdbRating, userRating, runtime.
 * onDeleteWatched is a function that will be called when the user clicks the delete button.
 * It will receive the id of the movie to be deleted as an argument.
 */
function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      {/* Display the movie poster */}
      <img src={movie.poster} alt={`${movie.title} poster`} />

      {/* Display the movie title */}
      <h3>{movie.title}</h3>

      {/* Display the movie information */}
      <div>
        {/* Display the IMDB rating */}
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>

        {/* Display the user rating */}
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>

        {/* Display the runtime */}
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        {/* Display the delete button */}
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

// Export the WatchedMovie component by default.
export default WatchedMovie;
