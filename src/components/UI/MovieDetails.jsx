import { useEffect, useRef, useState } from "react";
import { useKey } from "../hooks/useKey";
import Loader from "./Loader";
import StarRating from "../features/StarRating";
import ErrorMessage from "../features/ErrorMessage";

const KEY = "a6c26c0c";

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  // countRef is a reference to a mutable value that is initialized to 0.
  // It is used to keep track of how many times the user has rated the movie.
  // This value is used to conditionally render the "You have already rated this movie" message.
  const countRef = useRef(0);

  useEffect(
    function () {
      // If the user has rated the movie (i.e. userRating is truthy), increment the count.
      // This effect is run whenever the userRating state changes.
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  // Create an array of just the IDs of the watched movies
  // then use the includes() method to check if the selected ID is in the array
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  // Find the movie in the watched list that has the same ID as the selected ID
  // and get its userRating property. If the movie is not found, this will be undefined.
  // The optional chaining operator (?.) is used to avoid an error if the movie is not found.
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useKey("Backspace", onCloseMovie);

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

  useEffect(
    function () {
      if (!title) return;
      document.title = title;

      return function () {
        document.title = "My Movies";
        // console.log(`Clean up effect for movie ${title}`);
      };
    },
    [title]
  );

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
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
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
                  You rated this movie | <span>⭐</span> {watchedUserRating}{" "}
                  rating.
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default MovieDetails;
