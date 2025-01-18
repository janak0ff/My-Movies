import { useEffect, useState } from "react"; // Import React hooks for managing side effects and component state

const KEY = "a6c26c0c"; // API key used to authenticate requests to the OMDB API

// Custom React hook for fetching movies based on a search query
export function useMovies(query) {
  // State variables to store movies, loading status, and any errors
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect hook to perform side effects like data fetching
  useEffect(
    function () {
      const controller = new AbortController(); // Allows the fetch request to be canceled

      // Asynchronous function to fetch movies from the API
      async function fetchMovies() {
        try {
          setIsLoading(true); // Set loading state to true before the fetch starts
          setError(""); // Clear any previous errors

          // Fetch movies from the OMDB API using the provided query
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal } // Attach abort signal to the fetch request
          );

          if (!res.ok)
            // Check if the response is not okay (e.g., network error)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json(); // Parse the response as JSON
          if (data.Response === "False") throw new Error("Movie not found"); // Handle case where no movies are found

          setMovies(data.Search); // Update state with the list of movies found
          setError(""); // Clear any errors since the fetch was successful
        } catch (err) {
          if (err.name !== "AbortError") {
            // Ignore errors caused by the request being aborted
            console.log(err.message); // Log error message to the console
            setError(err.message); // Update state with the error message
          }
        } finally {
          setIsLoading(false); // Set loading state to false after the fetch completes
        }
      }

      if (query.length < 3) {
        // Only fetch movies if the query is at least 3 characters long
        setMovies([]); // Clear the movies list
        setError(""); // Clear any errors
        return; // Exit the effect early if the query is too short
      }

      fetchMovies(); // Call the function to fetch movies

      return function () {
        controller.abort(); // Cleanup function to cancel the fetch request if the component unmounts or query changes
      };
    },
    [query] // Dependency array: re-run the effect when the query changes
  );

  // Return the state variables so they can be used in the component
  return { movies, isLoading, error };
}
