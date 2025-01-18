/**
 * Calculate the average of an array of numbers.
 * @param {Array<number>} arr - an array of numbers
 * @returns {number} the average of the array
 */
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

/**
 * A React component that displays a summary of watched movies.
 * @param {Object} watched - an object with properties containing arrays of watched movies
 */
function WatchedSummary({ watched }) {
  /**
   * Calculate the average IMDB rating of the watched movies
   */
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));

  /**
   * Calculate the average user rating of the watched movies
   */
  const avgUserRating = average(watched.map((movie) => movie.userRating));

  /**
   * Calculate the average runtime of the watched movies
   */
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          {/* Display the number of watched movies */}
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          {/* Display the average IMDB rating */}
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          {/* Display the average user rating */}
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          {/* Display the average runtime */}
          <span>⏳</span>
          <span>{avgRuntime.toFixed(1)} min</span>
        </p>
      </div>
    </div>
  );
}

export default WatchedSummary;
