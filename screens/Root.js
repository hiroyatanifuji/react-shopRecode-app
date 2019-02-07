import React, { Component } from "react";
import firebase from "firebase";
import "firebase/firestore";
import ListScreen from "./List/ListScreen";


export default class Root extends Component {
  constructor() {
    super();
    firebase.initializeApp({
      apiKey: "API_KEY",
      authDomain: "AUTH_DOMAIN",
      databaseURL: "DATABASE_URL",
      projectId: "PROJECT_ID",
      storageBucket: "STORAGE_BUKET",
      messagingSenderId: "MESSAGING_SEND_ID"
    });
    firebase.firestore().settings({ timestampsInSnapshots: true });
  }

  render() {
    return (
      <ListScreen navifunc={this.props.navigation} />
    );
  }
}