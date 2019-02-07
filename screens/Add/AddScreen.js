import React from "react";
import { StyleSheet, View, TextInput, Button, TouchableOpacity, Text, Image } from "react-native";
import { Container, Header, Content, Item, Input, Form, Left, Right, Body, Title, Label } from "native-base";
import firebase from "firebase";
import { connect } from "react-redux";


class AddScreen extends React.Component {

  state = {
    storeName: "",
    place: "",
    value: 0,
    year: 0,
    month: 0,
    date: 0,
    txt: ""
  };

  createStore() {
    const { storeName, place, value, year, month, date, txt } = this.state;
    const { image } = this.props;
    const createAt = Date.now();
    const uid = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection("users").doc(uid);
    userRef.collection("stores").add({
      storeName,
      place,
      value,
      year,
      month,
      date,
      txt,
      image,
      createAt,
    });
    this.setState({
      storeName: "",
      place: "",
      value: 0,
      year: 0,
      month: 0,
      date: 0,
      txt: ""
    });
    this.props.reload();
    this.props.navigation.navigate("ListStack");
  }

  renderImage = () => {
    const { image } = this.props;
    if (image) {
      return image.map((im, index) => {
        return (
          <View key={index} style={{ padding: 10 }}>
            <Image source={{ uri: im }} style={{ width: 100, height: 100 }} />
          </View>
        )
      })
    }
  }

  render() {
    return (
      <Container>
        <Content style={{ flex: 1 }}>
          <Form style={{ flex: 3 }}>
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
              <Label>Value(0 ~ 5.0)</Label>
              <Input
                onChangeText={value => this.setState({ value })}
                value={this.state.value.toString()}
               />
            </Item>

            <Item style={{ flex: 3, flexDirection: "row" }}>
              <Form style={{ flex: 1 }}>
                <Item stackedLabel>
                  <Label>Year</Label>
                  <Input
                    style={{ flex: 1 }}
                    onChangeText={year => this.setState({ year })}
                    value={this.state.year.toString()}
                  />
                </Item>
              </Form>
              <Form style={{ flex: 1 }}>
                <Item stackedLabel>
                  <Label>Month</Label>
                  <Input
                    style={{ flex: 1 }}
                    onChangeText={month => this.setState({ month })}
                    value={this.state.month.toString()}
                  />
                </Item>
              </Form>
              <Form style={{ flex: 1 }}>
                <Item stackedLabel>
                  <Label>Date</Label>
                  <Input
                    style={{ flex: 1 }}
                    onChangeText={date => this.setState({ date })}
                    value={this.state.date.toString()}
                  />
                </Item>
              </Form>
            </Item>

            <Item stackedLabel>
              <Label>Note</Label>
              <Input
                onChangeText={txt => this.setState({ txt })}
                value={this.state.txt}
              />
            </Item>
          </Form>
          <Form style={{ flex: 2, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
            {this.renderImage()}
          </Form>
          <Form style={{ flex: 1 }}>
            <Button title="Photo" onPress={() => this.props.navigation.navigate("photo")} />
          </Form>

          <Form style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", backgroundColor: "red", width: 200, height: 50 }} onPress={() => this.createStore()}>
              <Text style={{ fontSize: 30 }}>Add</Text>
            </TouchableOpacity>
          </Form>
        </Content>
      </Container>

    );
  }
}

const mapStateToProps = state => ({
  image: state.image,
});

const mapDispatchToProps = dispatch => ({
  reload: () => dispatch({ type: "RELOAD", payload: 1 }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
