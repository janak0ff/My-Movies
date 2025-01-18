import { useRef } from "react";
import { useKey } from "../hooks/useKey";

// The Search component is a form input used to search for movies.
// It receives two props: the current query and a function to update the query.
function Search({ query, setQuery }) {
  // We use the useRef hook to create a reference to the input element.
  // This allows us to access the element in the DOM and focus it when the Enter key is pressed.
  const inputEl = useRef(null);

  // We use the useKey hook to listen for the Enter key press event.
  // When the Enter key is pressed, if the currently active element is not the input element,
  // we focus the input element and clear the query.
  useKey("Enter", function () {
    if (document.activeElement !== inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  // We return the JSX for the search input element.
  return (
    <input
      // The className is set to "search" so we can style it with CSS.
      className="search"
      // The type is set to "text" so the input element accepts text input.
      type="text"
      // The placeholder is set to "Search movies..." so the user knows what to type.
      placeholder="Search movies..."
      // The value is set to the current query.
      value={query}
      // When the user types something, we call the setQuery function to update the query.
      onChange={(e) => setQuery(e.target.value)}
      // We set the ref to the input element so we can focus it later.
      ref={inputEl}
      // We set the title to "Press Enter to clear text and start typing" so the user knows what to do.
      title="Press Enter to clear text and start typing"
    />
  );
}

// We export the Search component by default.
export default Search;
