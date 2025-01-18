/**
 * A React component that renders the main content area of the application.
 * @param {object} props - Component props.
 * @param {ReactNode} props.children - The content to be rendered within the main element.
 * @returns {ReactElement} The Main component.
 */
function Main({ children }) {
  // The main element is used to define the main content area of the page.
  // The children prop is used to pass the content that will be rendered within the main element.
  return <main className="main">{children}</main>;
}

// Export the Main component by default, so it can be easily imported and used in other parts of the application.
export default Main;
