import WatchedMovie from "./WatchedMovie";

/**
 * WatchedMoviesList is a React component that displays a list of watched movies.
 * It takes two props: 'watched' which is an array of movie objects, and
 * 'onDeleteWatched' which is a function that will be called when the user
 * clicks the delete button.
 *
 * @param {array} watched - An array of movie objects
 * @param {function} onDeleteWatched - A function that will be called when the
 * user clicks the delete button
 */
function WatchedMoviesList({ watched, onDeleteWatched }) {
  // Create an unordered list element and assign it the class 'list'
  return (
    <ul className="list">
      {/* // Use the map() method to iterate over the watched array and create a
      // WatchedMovie component for each movie. Pass the movie object and the
      // onDeleteWatched function as props to the WatchedMovie component. */}
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          // Assign a unique key to each WatchedMovie component
          key={movie.imdbID}
          // Pass the onDeleteWatched function as a prop to the WatchedMovie
          // component
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

// Export the WatchedMoviesList component by default
export default WatchedMoviesList;
