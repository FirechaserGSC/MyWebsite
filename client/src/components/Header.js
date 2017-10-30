import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a href="/auth/google">LOGIN</a>;
      default:
        return <a href="/api/logout">LOGOUT</a>;
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            SG
          </a>

          <ul className="right">
            <li>
              <a href="/blogs">BLOGS</a>
            </li>
            <li>
              <a href="badges.html">ABOUT</a>
            </li>
            <li>{this.renderContent()}</li>
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
