/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ProjectionMap from './src/ProjectionMap'
import cities from './cities'
export default class App extends Component<{}> {

  constructor(props) {
    super(props)
    this.state = {
      points: cities
    }

  }


  render() {
    return (
      <View style={styles.container}>
        <ProjectionMap 
          mapImageSource={require('./src/images/map1.png')}
          points={this.state.points}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  projectionMap: {
    flex: 1,
  }
});
