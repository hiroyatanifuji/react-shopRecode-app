import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Root from '../screens/Root';
import ListScreen from '../screens/List/ListScreen';
import WannaScreen from '../screens/Wanna/WannaScreen';
import DetailStoreScreen from "../screens/List/DetailStoreScreen";
import AddWillStore from "../screens/Wanna/AddWillStore";
import AddScreen from "../screens/Add/AddScreen";
import photoScreen from "../screens/photoScreen";

const AddStack = createStackNavigator({
  Add: {
    screen: AddScreen,
    navigationOptions: {
      headerTitle: "お店追加"
    },
  },
  photo: {
    screen: photoScreen,
    navigationOptions: {
      headerTitle: "Add Photo",
    }
  }
});

AddStack.navigationOptions = {
  tabBarLabel: 'Add',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ListStack = createStackNavigator({
  List: {
    screen: Root,
    navigationOptions: {
      headerTitle: "行ったお店"
    },
  },
  DetailStore: {
    screen: DetailStoreScreen,
    navigationOptions: {
      headerTitle: "詳細"
    },
  },
});

ListStack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const WannaStack = createStackNavigator({
  Wanna: {
    screen: WannaScreen,
    navigationOptions: {
      headerTitle: "行きたいお店"
    },
  },
  AddWill: {
    screen: AddWillStore,
    navigationOptions: {
      headerTitle: "追加"
    }
  }
});

WannaStack.navigationOptions = {
  tabBarLabel: 'Wanna',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};


export default createBottomTabNavigator({
  ListStack,
  AddStack,
  WannaStack,
});
