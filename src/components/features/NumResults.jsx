/**
 * A React component that displays the number of search results.
 * @param {object} props Component props.
 * @param {array} props.movies An array of movie objects.
 * @returns {ReactElement} A React element representing the number of results.
 */
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

/**
 * Exports the NumResults component as the default export.
 */
export default NumResults;
