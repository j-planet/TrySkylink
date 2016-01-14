import React, { Component } from 'react';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('Component (App) will mount.')

        // -------- set up how skylink handles events ---------
    }

    componentDidMount() {
        console.log('Component (App) did mount.')

    }

    render() {
        return <h1>Hello from App.</h1>;
    }
}

export default App;