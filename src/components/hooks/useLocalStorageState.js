import { useEffect, useState } from "react";

/**
 * A custom React hook that uses local storage to save and retrieve the state.
 * @param {any} initialState - The initial state value.
 * @param {string} key - The key to use when saving the state to local storage.
 * @returns {any[]} An array containing the current state value and a function to
 * update the state.
 */
export function useLocalStorageState(initialState, key) {
  // Initialize the state with a function that retrieves the stored value from
  // local storage if it exists, or uses the initial state value if it doesn't.
  const [value, setValue] = useState(function () {
    // Retrieve the stored value from local storage.
    const storedValue = localStorage.getItem(key);
    // If a stored value exists, parse it as JSON and return it. Otherwise, return
    // the initial state value.
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // Use the useEffect hook to save the state to local storage whenever the
  // state value changes.
  useEffect(
    // The function to run whenever the state value changes.
    function () {
      // Save the state value to local storage.
      localStorage.setItem(key, JSON.stringify(value));
    },
    // The dependency array. The useEffect hook will only run if any of the
    // values in this array change. In this case, we want to run the effect
    // whenever the state value changes or the key changes.
    [value, key]
  );

  // Return an array containing the current state value and a function to update
  // the state.
  return [value, setValue];
}
