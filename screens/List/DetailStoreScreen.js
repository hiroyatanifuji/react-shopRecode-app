import React from "react";
import { View, Text, Button, TouchableOpacity, Image, Modal,Dimensions } from "react-native";
import { connect } from "react-redux";

const SCREEN_WIDTH = Dimensions.get("window").width;

class DetailStoreScreen extends React.Component {

  state = {
    modalVisible: false,
    image: null,
  };

  componentWillMount() {
    const name = this.props.dataItem;
    const datas = this.props.datas;
    for (i = 0; i < datas.length; i++) {
      if (name === datas[i].storeName) {
        const data = datas[i];
        this.props.addData(data);
      }
    }
  };

  goScreen = () => {
    this.props.navigation.navigate("List");
  }

  renderImage = () => {
    const image = this.props.data.image;
    if (image) {
      return image.map((im, index) => {
        return (
          <View key={index} style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => this.setState({ image: im, modalVisible: true })}>
              <Image source={{ uri: im }} style={{ width: 100, height: 100 }} />
            </TouchableOpacity>
          </View>
        )
      })
    }
  }

  render() {
    const { data } = this.props;
    if (!data) {
      return <View />;
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: 20, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ padding: 10 }}>{data.storeName}</Text>
          <Text style={{ padding: 10 }}>{data.place}</Text>
          <Text style={{ padding: 10 }}>{data.txt}</Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
          {this.renderImage()}
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => this.goScreen()}
          >
            <Text style={{ paddingTop: 30 }}>戻る</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={this.state.modalVisible} animationType={"slide"} transparent={false} onRequestClose={() => console.log("hoge")}>
          <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "black" }} onPress={() => this.setState({ modalVisible: false })}>
            <Image source={{ uri: this.state.image }} style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }} />
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  dataItem: state.dataItem,
  datas: state.datas,
  data: state.data,
});

const mapDispatchToProps = dispatch => ({
  addData: (data) => dispatch({ type: "ADD_DATA", payload: data }),
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailStoreScreen);