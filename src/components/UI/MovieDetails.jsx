import { useEffect, useRef, useState } from "react";
import { useKey } from "../hooks/useKey";
import Loader from "./Loader";
import StarRating from "../features/StarRating";
import ErrorMessage from "../features/ErrorMessage";

const KEY = "a6c26c0c";

// A React component that displays the details of a selected movie
function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  // State variables to store the movie details, error messages, and loading state
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  // A mutable value that is initialized to 0 and is used to keep track of how many times the user has rated the movie.
  const countRef = useRef(0);

  // An effect hook that increments the count whenever the userRating state changes.
  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  // A function that adds the selected movie to the watched list
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  // A hook that listens for the Backspace key and calls onCloseMovie when pressed
  useKey("Backspace", onCloseMovie);

  // An effect hook that fetches the movie details from the OMDB API when the selected ID changes
  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          if (!res.ok) throw new Error("Something went wrong while fetching");

          const data = await res.json();
          setMovie(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );

  // An effect hook that updates the page title when the movie title changes
  useEffect(
    function () {
      if (!movie.Title) return;
      document.title = movie.Title;

      return function () {
        document.title = "My Movies";
        // console.log(`Clean up effect for movie ${movie.Title}`);
      };
    },
    [movie.Title]
  );

  // Render the movie details component
  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button
              className="btn-back"
              onClick={onCloseMovie}
              title="Press Backspace"
            >
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!watched.includes(selectedId) ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie | <span>⭐</span> {userRating} rating.
                </p>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default MovieDetails;
