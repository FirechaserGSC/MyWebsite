import React, { Component } from 'react';
import Typist from 'react-typist';
import TypistLoop from 'react-typist-loop';

const slogans = [
  'System.out.print("Hello, world!")',
  'print("Hello, world!")',
  'console.log("Hello, world!")',
  '你好，世界！'
];


class Slogan extends Component {
  render() {
    return (
      <TypistLoop id="slogan" interval={1000}>
        {slogans.map(text => (
          <Typist cursor={{show: false}} key={text}>
            <h1 style={{color: "white"}}>{text}</h1>
            <Typist.Backspace count={text.length} delay={1000} />
          </Typist>
        ))}
      </TypistLoop>
    );
  }
}

export default Slogan;
