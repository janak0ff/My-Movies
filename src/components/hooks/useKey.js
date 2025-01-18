import { useEffect } from "react";

/**
 * A custom hook to listen for a specific key press event.
 * @param {string} key - the key to listen for (e.g. "Backspace")
 * @param {function} action - the function to call when the key is pressed
 */
export function useKey(key, action) {
  // This useEffect hook is used to listen for a specific key press event.
  // When the key is pressed, the action function is called.
  // This hook is dependent on the action function, meaning it will be re-run whenever action changes.
  useEffect(
    // This callback function is called whenever the key is pressed.
    // It checks if the key pressed matches the key we're listening for,
    // and if so, calls the action function.
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      // Add an event listener to the document to listen for keydown events.
      document.addEventListener("keydown", callback);

      // This function is called when the component is unmounted or the action changes.
      // It removes the event listener so we don't have a memory leak.
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    // We only want to re-run this effect if the action function changes.
    [action, key]
  );
}
