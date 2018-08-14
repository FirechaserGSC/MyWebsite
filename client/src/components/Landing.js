import React from 'react';
import Slogan from './Slogan';

const Landing = () => {
  return (
    <div>
      <img style={{width: "100%", marginTop: "-64px"}}src="https://source.unsplash.com/uCzBVrIbdvQ"/> 
      <div style={
        {
          display: "flex", 
          justifyContent: "center",
          position: "absolute",
          top: "300px",
          width: "100%",
        }}>
        <Slogan />
      </div>
    </div>
  );
};

export default Landing;
