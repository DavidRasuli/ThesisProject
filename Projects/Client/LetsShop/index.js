import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import { Tabs } from './config/router';

class LetsShop extends Component {
    render() {
        return <Tabs />;
    }
}

export default LetsShop;

AppRegistry.registerComponent('LetsShop', () => LetsShop);
