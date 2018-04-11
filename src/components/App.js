import React from 'react';
import '../assets/stylesheets/components/App.css';

class App extends React.Component {
  render() {
    return (
      <div className="fluid-container">
        {this.props.children}
      </div>
    );
  }
}

export default App;
