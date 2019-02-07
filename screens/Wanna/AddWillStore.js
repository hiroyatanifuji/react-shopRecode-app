import React, { Component } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { Container, Header, Content, Item, Input, Form, Left, Right, Body, Title, Label } from "native-base";
import { TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";


class addWillStore extends Component {

  state = {
    storeName: "",
    place: "",
    txt: ""
  };

  createWillStore() {
    const { storeName, place, txt } = this.state;
    const createAt = Date.now();

    this.uid = (firebase.auth().currentUser || {}).uid;
    firebase.firestore().collection("users").doc(`${this.uid}`).collection("willStores").add({
      storeName,
      place,
      txt,
      createAt,
    });
    this.setState({
      storeName: "",
      place: "",
      txt: ""
    });
    this.props.reload2();
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Store Name</Label>
              <Input
                onChangeText={storeName => this.setState({ storeName })}
                value={this.state.storeName}
               />
            </Item>
            <Item stackedLabel>
              <Label>Place</Label>
              <Input
                onChangeText={place => this.setState({ place })}
                value={this.state.place}
              />
            </Item>
            <Item stackedLabel>
              <Label>Note</Label>
              <Input
                onChangeText={txt => this.setState({ txt })}
                value={this.state.txt}
              />
            </Item>
          </Form>
          <Form style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 20 }}>
            <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", backgroundColor: "red", width: 200, height: 50 }} onPress={() => this.createWillStore()}>
              <Text style={{ fontSize: 30 }}>Add</Text>
            </TouchableOpacity>
          </Form>
        </Content>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  reload2: () => dispatch({ type: "RELOAD-2", payload: 1 }),
});

export default connect(null, mapDispatchToProps)(addWillStore);
