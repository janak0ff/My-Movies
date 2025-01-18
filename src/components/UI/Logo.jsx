// Import the React library for building user interfaces
import React from "react";

// Define a functional component named Logo
// Functional components are a simpler way to create components that only contain a render method and don't have their own state
function Logo() {
  // Return the JSX to render the Logo component
  // JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript
  return (
    <div className="logo">
      {/* Render an emoji as an image with a role attribute for accessibility */}
      <span role="img">🍿</span>
      {/* Render the title of the application */}
      <h1>My Movies</h1>
    </div>
  );
}

// Export the Logo component as the default export of the module
// The default export allows importing this component without using curly braces in the import statement
export default Logo;
