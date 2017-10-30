import React, { Component } from 'react';

class Slogan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      slogan: '1'
    };
  }

  componentDidMount() {
    setInterval(() => this.increaseCount(), 3000);
  }

  increaseCount() {
    //this.setState({elapsed: new Date() - this.props.start});
    const slogans = [
      'System.out.print("Hello, world!")',
      'print("Hello, world!")',
      'console.log("Hello, world!")',
      '你好，世界！'
    ];
    if (this.state.count == slogans.length - 1) {
      this.setState({ count: 0 });
    } else {
      this.setState({ count: this.state.count + 1 });
    }
    this.setState({ slogan: slogans[this.state.count] });
  }

  render() {
    return <h1>{this.state.slogan}</h1>;
  }
}

export default Slogan;
