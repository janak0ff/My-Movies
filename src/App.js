import { useState } from "react";
import { useMovies } from "./components/hooks/useMovies";
import { useLocalStorageState } from "./components/hooks/useLocalStorageState";
import NavBar from "./components/UI/NavBar";
import Search from "./components/features/Search";
import NumResults from "./components/features/NumResults";
import Main from "./components/UI/Main";
import Box from "./components/UI/Box";
import MovieList from "./components/features/MovieList";
import MovieDetails from "./components/UI/MovieDetails";
import WatchedSummary from "./components/features/WatchedSummary";
import WatchedMoviesList from "./components/features/WatchedMoviesList";
import Loader from "./components/UI/Loader";
import ErrorMessage from "./components/features/ErrorMessage";

export default function App() {
  const [query, setQuery] = useState("Thor");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
