/**
 * The Movie component is a React functional component that displays a single movie.
 * It expects the following props:
 * - movie: An object with information about the movie, including its title, year, and poster.
 * - onSelectMovie: A function that is called when the user clicks on the movie. It is passed the ID of the movie as an argument.
 */
function Movie({ movie, onSelectMovie }) {
  return (
    // The Movie component is a list item, so we use the <li> element.
    // We attach an event handler to the onClick event to call the onSelectMovie function when the user clicks on the movie.
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      {/* // The poster for the movie is displayed as an image. */}
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      {/* // The title of the movie is displayed as a heading. */}
      <h3>{movie.Title}</h3>
      {/* // The year of the movie is displayed as a paragraph. */}
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

// The Movie component is exported as the default export of the module.
export default Movie;
