// Import necessary hooks and components from React and local files
import { useState } from "react"; // useState is a React hook for managing state in functional components
import { useMovies } from "./components/hooks/useMovies"; // Custom hook for fetching movies data
import { useLocalStorageState } from "./components/hooks/useLocalStorageState"; // Custom hook for persisting state in local storage
import NavBar from "./components/UI/NavBar"; // Component for navigation bar
import Search from "./components/features/Search"; // Component for movie search input
import NumResults from "./components/features/NumResults"; // Component to display number of search results
import Main from "./components/UI/Main"; // Main content wrapper component
import Box from "./components/UI/Box"; // Component used as a container for layout
import MovieList from "./components/features/MovieList"; // Component to display list of movies
import MovieDetails from "./components/UI/MovieDetails"; // Component to display details of a selected movie
import WatchedSummary from "./components/features/WatchedSummary"; // Component to summarize watched movies
import WatchedMoviesList from "./components/features/WatchedMoviesList"; // Component to list watched movies
import Loader from "./components/UI/Loader"; // Component to show loading state
import ErrorMessage from "./components/features/ErrorMessage"; // Component to display error messages

// Default export of the main App component
export default function App() {
  // useState hook to manage the search query state
  const [query, setQuery] = useState("Thor"); // Initial query set to 'Thor'
  // useState hook to manage the ID of the selected movie
  const [selectedId, setSelectedId] = useState(null); // No movie selected initially

  // useMovies custom hook to fetch movies based on the query
  const { movies, isLoading, error } = useMovies(query); // Destructuring response to get movies, loading state, and error state

  // useLocalStorageState custom hook to persist 'watched' movies list in local storage
  const [watched, setWatched] = useLocalStorageState([], "watched"); // Initialize with an empty array and key 'watched'

  // Function to handle the selection of a movie
  function handleSelectMovie(id) {
    // Toggle the selected state of a movie
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  // Function to handle closing the movie details view
  function handleCloseMovie() {
    setSelectedId(null); // Deselect the current movie
  }

  // Function to add a movie to the watched list
  function handleAddWatched(movie) {
    // Update the watched state by adding the new movie
    setWatched((watched) => [...watched, movie]);
  }

  // Function to delete a movie from the watched list
  function handleDeleteWatched(id) {
    // Filter out the movie with the given id from the watched list
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // JSX to render the App component UI
  return (
    <>
      {/* Render NavBar with Search and NumResults as children */}
      <NavBar>
        <Search query={query} setQuery={setQuery} />{" "}
        {/* Search bar component */}
        <NumResults movies={movies} /> {/* Display number of search results */}
      </NavBar>

      {/* Main content area */}
      <Main>
        <Box>
          {/* Conditional rendering based on loading and error state */}
          {isLoading && <Loader />} {/* Show loader while loading */}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} /> // Show movie list if no errors and not loading
          )}
          {error && <ErrorMessage message={error} />}{" "}
          {/* Show error message if there's an error */}
        </Box>

        <Box>
          {/* Conditional rendering based on selectedId */}
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            /> // Show movie details if a movie is selected
          ) : (
            <>
              <WatchedSummary watched={watched} />{" "}
              {/* Show summary of watched movies */}
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />{" "}
              {/* Show list of watched movies */}
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
