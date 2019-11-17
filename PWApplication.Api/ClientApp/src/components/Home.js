import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Hi!</h1>
        <p>Here must be some content for unauthenticated users....</p>
      </div>
    );
  }
}
