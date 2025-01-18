import { useState } from "react";

// Styles for the container that holds the star rating component
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

// Styles for the container that holds the star icons
const starContainerStyle = { display: "flex" };

// The StarRating component
export default function StarRating({
  // The maximum rating (default: 10)
  maxRating = 10,
  // The color of the stars (default: #fcc419)
  color = "#fcc419",
  // The size of the stars (default: 48)
  size = 48,
  // The class name for the container (default: "")
  className = "",
  // The message to display when no rating is selected (default: [])
  message = [],
  // The default rating (default: 1)
  defaultRating = 1,
  // The function to call when the rating changes
  onSetRating,
}) {
  // The style for the text that displays the rating
  const textStyle = {
    lineHeight: 1,
    padding: `${0}px  ${6}px`,
    color: color,
    fontSize: `${size}px`,
  };

  // The state for the rating
  const [rating, setRating] = useState(defaultRating);
  // The state for the temporary rating (used when hovering over the stars)
  const [tempRating, setTempRating] = useState(0);

  // Handle the rating change
  function handleRating(e) {
    // Update the rating
    setRating(e);
    // Call the onSetRating function
    onSetRating(e);
  }

  // Return the StarRating component
  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {/* Render the stars */}
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            // Call the handleRating function when the star is clicked
            onRate={() => handleRating(i + 1)}
            // Whether the star is full or not
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            // Call the onHoverIn function when the mouse hovers over the star
            onHoverIn={() => setTempRating(i + 1)}
            // Call the onHoverOut function when the mouse leaves the star
            onHoverOut={() => setTempRating(0)}
            // The color of the star
            color={color}
            // The size of the star
            size={size}
          />
        ))}
        {/* Display the rating message */}
        <p style={textStyle}>
          {message.length === maxRating
            ? message[tempRating ? tempRating - 1 : rating - 1]
            : tempRating || rating || ""}
        </p>
      </div>
    </div>
  );
}

// The Star component
function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  // The style for the star
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  // Return the Star component
  return (
    <span
      // The role of the span (button)
      role="button"
      // The style for the span
      style={starStyle}
      // Call the onRate function when the star is clicked
      onClick={onRate}
      // Call the onHoverIn function when the mouse hovers over the star
      onMouseEnter={onHoverIn}
      // Call the onHoverOut function when the mouse leaves the star
      onMouseLeave={onHoverOut}
    >
      {/* If the star is full, display the full star icon */}
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
