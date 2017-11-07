import React, { Component } from 'react';
import Typist from 'react-typist';
import TypistLoop from 'react-typist-loop';

const slogans = [
  'System.out.print("Hello, world!")',
  'print("Hello, world!")',
  'console.log("Hello, world!")',
  '你好，世界！'
];

//Typist.setProps({});

class Slogan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      slogan: 'System.out.print("Hello, world!")'
    };
  }

  componentDidMount() {
    setInterval(() => this.increaseCount(), 3000);
  }

  increaseCount() {
    this.setState({ elapsed: new Date() - this.props.start });

    if (this.state.count == slogans.length - 1) {
      this.setState({ count: 0 });
    } else {
      this.setState({ count: this.state.count + 1 });
    }
    this.setState({ slogan: slogans[this.state.count] });
  }

  render() {
    return (
      // <Typist>
      //   <span>{this.state.slogan}</span>
      //   <Typist.Backspace count={8} delay={200} />
      // </Typist>
      <TypistLoop interval={1000}>
        {slogans.map(text => (
          <Typist key={text}>
            {text}
            <Typist.Backspace count={text.length} delay={1000} />
          </Typist>
        ))}
      </TypistLoop>
    );
  }
}

export default Slogan;
