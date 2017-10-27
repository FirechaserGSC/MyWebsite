import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">LOGIN</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">LOGOUT</a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">
            SG
          </a>

          <ul className="right">
            <li>
              <a href="sass.html">BLOGS</a>
            </li>
            <li>
              <a href="badges.html">ABOUT</a>
            </li>
            <li>
              <a href="collapsible.html">{this.renderContent()}</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
