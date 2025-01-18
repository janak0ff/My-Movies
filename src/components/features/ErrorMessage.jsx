/**
 * ErrorMessage component
 *
 * Displays an error message to the user
 *
 * @param {string} message - The error message to display
 * @returns {JSX.Element} The ErrorMessage component
 */
function ErrorMessage({ message }) {
  // Return a JSX element containing the error message
  return (
    <p className="error">
      {/* // Include a warning symbol (⛔️) before the error message */}
      <span>⛔️</span> {message}
    </p>
  );
}

// Export the ErrorMessage component by default
export default ErrorMessage;
