import * as React from 'react'
import { BottomNavigation, Text, Colors} from 'react-native-paper'
import School from './containers/School'
import Home from './containers/Home'
import Explore from './containers/Explore'
import Person from './containers/Person'

const AlbumsRoute = () => <Text>Albums</Text>;


const PurchasedRoute = () => <Text>Purchased</Text>;
export default class App extends React.Component {
  state = {
    index: 1,
    routes: [
      { key: 'home', title: 'Home', icon: 'home', color: '#3F51B5' },
      { key: 'explore', title: 'Explore', icon: 'explore', color: '#009688' },
      { key: 'school', title: 'School', icon: 'school', color: Colors.deepPurple500 },
      { key: 'person', title: 'Person', icon: 'person', color: '#607D8B' },
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: Home,
    explore: Explore,
    school: School,
    person: Person
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        activeColor={'#fff'}
      />
    );
  }
}
