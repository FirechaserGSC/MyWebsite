import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlogs } from '../actions';
import BlogListItem from './BlogListItem';

class BlogList extends Component {
  componentDidMount() {
    this.props.fetchBlogs();
  }

  render() {
    return <div>Blogs</div>;
  }
}

function mapStateToProps({ blogs }) {
  return { blogs };
}

export default connect(mapStateToProps, { fetchBlogs })(BlogList);
