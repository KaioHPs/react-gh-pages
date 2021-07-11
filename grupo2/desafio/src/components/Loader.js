import React from 'react';
import './Loader.css';

class Loader extends React.Component {
  render() {
    return (
      <div className="load_cont">
        {/* <div className="loader"></div> */}
        <div className="balls">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <span>CARREGANDO</span>
      </div>
    )
  }
}

export default Loader;