// MovieList is a React component that displays a list of movies.
// It takes two props: 'movies' which is an array of movie objects,
// and 'onSelectMovie' which is a function that will be called when

import Movie from "../UI/Movie";

// a movie is selected.
function MovieList({ movies, onSelectMovie }) {
  // The component returns a JSX element: an unordered list with
  // a class of 'list-movies'. The list will contain a Movie component
  // for each movie in the 'movies' array.
  return (
    <ul className="list list-movies">
      {/* // The map() method is used to create a new array with the same
      // number of elements as the 'movies' array. Each element in the
      // new array is a Movie component. */}
      {movies?.map((movie) => (
        // The Movie component is passed three props: 'movie' which is
        // the current movie object, 'key' which is set to the movie's
        // IMDb ID (so that React can keep track of the component),
        // and 'onSelectMovie' which is the function that will be called
        // when the movie is selected.
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

// The MovieList component is exported as the default export of
// the module. This means that when the module is imported, the
// MovieList component will be the value of the default import.
export default MovieList;
