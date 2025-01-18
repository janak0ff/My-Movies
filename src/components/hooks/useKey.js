import { useEffect } from "react";

export function useKey(key, action) {
  // This useEffect hook is used to listen for the "Backspace" key press event.
  // When the "Backspace" key is pressed, the onCloseMovie function is called.
  // This hook is dependent on the onCloseMovie function, meaning it will be re-run whenever onCloseMovie changes.
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
