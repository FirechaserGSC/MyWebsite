import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlogs } from '../actions';

class BlogList extends Component {
  componentDidMount() {
    this.props.fetchBlogs();
  }

  renderBlogs() {
    return this.props.blogs.map(blog => {
      return (
        <div className="card">
          <div className="card-image">
            <img src="http://materializecss.com/images/sample-1.jpg" />
            <span className="card-title">Card Title</span>
          </div>
          <div className="card-content">
            <p>{blog.title}</p>
          </div>
          <div className="card-action">
            <a href="#">This is a link</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderBlogs()}</div>;
  }
}

function mapStateToProps({ blogs }) {
  return { blogs };
}

export default connect(mapStateToProps, { fetchBlogs })(BlogList);
