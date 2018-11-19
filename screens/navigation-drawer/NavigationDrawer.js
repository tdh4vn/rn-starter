import React, { Component } from 'react';
import { Drawer } from 'native-base';
import SideBar from './SideBar';
export default class NavigationDrawer extends Component {

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  render() {
    const { children } = this.props
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()} >
        {children}
      </Drawer>
    );
  }
}