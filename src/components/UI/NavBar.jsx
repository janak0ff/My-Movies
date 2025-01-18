import Logo from "./Logo";

/**
 * A React component that renders a navigation bar.
 * @param {object} props - Component props.
 * @param {ReactNode} props.children - The content to be rendered within the navigation bar.
 * @returns {ReactElement} The NavBar component.
 */
function NavBar({ children }) {
  // The navigation bar is rendered as a nav element with the class name 'nav-bar'.
  return (
    <nav className="nav-bar">
      {/* // The Logo component is rendered as a child of the navigation bar. */}
      <Logo />
      {/* // The children prop is rendered as a child of the navigation bar. */}
      {children}
    </nav>
  );
}

// The NavBar component is exported as the default export of the module.
export default NavBar;
