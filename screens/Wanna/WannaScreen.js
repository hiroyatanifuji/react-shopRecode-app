import React from "react";
import firebase from "firebase";
import "firebase/firestore";
import { connect } from "react-redux";
import { View, Text, Button, ScrollView, ActivityIndicator　} from "react-native";


class WannaScreen extends React.Component {

  async componentWillMount() {
    await this.renderData();
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.add !== nextProps.add) {
      this.renderData();
    }
  }

  async renderData() {
    let willDatas = [];
    this.uid = (firebase.auth().currentUser || {}).uid;
    const collection = firebase.firestore().collection("users").doc(`${this.uid}`).collection("willStores");
    const querySnapshot = await collection.get();
    if (querySnapshot) {
      await querySnapshot.forEach(doc => {
        willDatas.push(doc.data());
      });
      this.props.addWillDatas(willDatas);
    }
  };

  renderList = () => {
    const { willDatas } = this.props;
    if (willDatas.length !== 0) {
      return willDatas.map((Item, index) => {
        return (
          <View key={index}>
            <View style={{ flexDirection: "row" }}>
              <Text>{Item.storeName}</Text>
              <Text>{Item.place}</Text>
            </View>
            <Text>{Item.txt}</Text>
          </View>
        );
      });
    }
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 100 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        {this.renderList()}
        <View>
          <Button title="ADD" onPress={() => this.props.navigation.navigate("AddWill")} />
        </View>
      </ScrollView>

    );
  }
}

const mapDispatchToProps = dispatch => ({
  addWillDatas: (willDatas) => dispatch({ type: "ADD_WILL_DATA", payload: willDatas }),
});

const mapStateToProps = state => ({
  willDatas: state.willDatas,
  add: state.add,
});

export default connect(mapStateToProps, mapDispatchToProps)(WannaScreen);
