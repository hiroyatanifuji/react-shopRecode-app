import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Button, Platform, ActivityIndicator } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import firebase from "firebase";
import "firebase/firestore";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";
import registerForPushNotificationAsync from "./function";

class ListScreen extends React.Component {

  state = {
    txt: "",
  };

  async componentWillMount() {
    //現在のユーザー取得
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
        this.uid = (firebase.auth().currentUser || {}).uid;
        firebase.firestore().collection("users").doc(`${this.uid}`).set({
          uid: this.uid,
        });
      } else {
        //初回起動以外ここが呼ばれてる
        this.uid = user.uid;
      }
    });
    let token = await registerForPushNotificationAsync();
    firebase.firestore().collection("users").doc(`${this.uid}`).update({
      token
    });
    this.renderUpdate();
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.re !== nextProps.re) {
      this.renderUpdate();
    };
  };


  async renderUpdate() {
    const datas = [];
    const collection = firebase.firestore().collection("users").doc(`${this.uid}`).collection("stores");
    const querySnapshot = await collection.get();
    await querySnapshot.forEach(doc => {
      datas.push(doc.data());
    });
    //actionは時間がかかる、先にすすんでる。
    this.props.addAllDatas(datas);
  };

  renderList = () => {
    const { datas } = this.props;
    const filterDatas = datas.concat();
    let searchTxt = this.state.txt;
    if (datas.length !== 0) {
      if (searchTxt == "") {
        return datas.map((Item, index) => {
          const name = Item.storeName;
          return (
            <View key={index} style={{ paddingTop: 10 }}>
              <Button title={name} onPress={() =>this.renderData(name)} />
            </View>
          );
        });
      } else {
        const newDatas = filterDatas.filter(this.renderFilter);
        return newDatas.map((Item, index) => {
          const name = Item.storeName;
          return (
            <View key={index} style={{ paddingTop: 10 }}>
              <Button title={name} onPress={() =>this.renderData(name)} />
            </View>
          );
         });
        }
      }
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 100 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  renderFilter = (Item) => {
    let searchTxt = this.state.txt;
    if (!Item.storeName.includes(searchTxt)) {
      if (Item.place.includes(searchTxt)) {
        return true;
      }
      return false;
    }
    return true;
  };

  renderData = (name) => {
    this.props.addName(name);
    this.props.navifunc.navigate("DetailStore");
  }

  renderSearchBar = (platform) => (
    <SearchBar
      platform={platform}
      cancelButtonTitle="Cancel"
      onChangeText={(txt) => this.setState({ txt: txt })}
      onClear={() => this.setState({ txt: "" })}
      value={this.state.Txt}
      placeholder="Store Name / Place"
    />
  );

  render() {
    const platform = Platform.OS == "ios" ? "ios" : "android";
    return (
      <View>
        {this.renderSearchBar(platform)}
        <ScrollView>
          {this.renderList()}
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addAllDatas: (datas) => dispatch({ type: "ADD_ALL_DATAS", payload: datas }),
  addName: (name) => dispatch({ type: "ADD_NAME", payload: name }),
  addToken: (token) => dispatch({ type: "ADD_TOKEN", payload: token }),
});

const mapStateToProps = (state) => ({
  datas: state.datas,
  re: state.re,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
