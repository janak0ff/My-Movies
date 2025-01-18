import { useState } from "react";

// The Box component is a reusable UI component that can be used to
// wrap any content and provide a toggle button to show or hide the content.
function Box({ children }) {
  // The useState hook is used to store the state of the box in the component's
  // local state. The initial state is set to true, meaning the box is open by default.
  const [isOpen, setIsOpen] = useState(true);

  // The component returns a JSX element containing a toggle button and the content.
  return (
    <div className="box">
      {/* // The toggle button is used to change the state of the box from open to closed and vice versa. */}
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {/* // The button displays either a "+" or a "-" depending on the state of the box. */}
        {isOpen ? "–" : "+"}
      </button>

      {/* // The content is only rendered if the box is open. */}
      {isOpen && children}
    </div>
  );
}

// The Box component is exported as the default export.
export default Box;
