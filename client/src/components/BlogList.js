import React from 'react';
import BlogListItem from './BlogListItem';

const BlogList = () => {
  componentDidMount() {
    this.props.fetchBlogs();
  }
  
  const blogItems = this.props.items.map(blog => {
    return <BlogListItem blog={blog} />;
  });

  return <ul>{blogItems}</ul>;
};

export default BlogList;
