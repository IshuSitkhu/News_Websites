import React from "react";
import PropTypes from "prop-types";
 
//The Navbar component receives setCategory as a prop from App.js. This function allows the Navbar to update the category state in App.js when a user selects a news category.
const Navbar = ({ setCategory }) => {
  const categories = ["general", "business", "entertainment", "health", "science", "sports", "technology"];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo-container">
          <img
            src="/logo.png"
            alt="Logo"
            className="logo"
          />
          {/* <h1 className="navbar-title">Latest NEWS</h1> */}
        </div>
        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="category-btn"
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  setCategory: PropTypes.func.isRequired,
};

export default Navbar;
