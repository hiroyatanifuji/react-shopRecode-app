import React from 'react';
import { StyleSheet, View, Button, Image, Text } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { connect } from "react-redux";

class photoScreen extends React.Component {
  state = {
    hasCameraRollPermission: null,
    permission: null,
    image: [],
  };

  componentWillMount() {
    this.pickImage();
  };

  checker = (result) => {
    const { image } = this.state;
    const images = image.concat();
    images.push(result.uri);
    this.setState({ image : images });
  };

   // カメラロールから選択
   pickImage = async () => {
     if (this.state.image.length <= 3) {
       if (!this.state.permission) {
         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
         this.setState({ permission: status === 'granted' });
         if (this.state.permission) {
           let result = await ImagePicker.launchImageLibraryAsync({
               allowsEditing: true,
               aspect: [16, 9]
           });
           if (!result.cancelled) {
             this.checker(result);
           }
         }
       } else {
         let result = await ImagePicker.launchImageLibraryAsync({
             allowsEditing: true,
             aspect: [16, 9]
         });
         if (!result.cancelled) {
           this.checker(result);
         }
       }
     }
   };

  takePhoto = async () => {
    if (this.state.image.length <= 3) {
      if (!this.state.hasCameraRollPermission) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraRollPermission: status === 'granted' });
        if (this.state.hasCameraRollPermission) {
          let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
          });
          if (!result.cancelled) {
            this.checker(result);
          }
        }
      } else {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: false,
        });
        if (!result.cancelled) {
          this.checker(result);
        }
      }
    }
  };

  add = () => {
    const { addPhoto } = this.props;
    const { image } = this.state;
    if (image.length !== 0) {
      addPhoto(image);
      this.setState({
        permission: null,
        hasCameraRollPermission: null,
        image: null,
      });
      this.props.navigation.goBack();
    }
  }

  renderList = () => {
    const { image } = this.state;
    if (image) {
      return image.map((im, index) => {
        return (
          <View key={index} style={{ padding: 10 }}>
            <Image source={{ uri: im }} style={{ width: 100, height: 100 }} />
          </View>
        )
      })
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
          {this.renderList()}
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
          <Button
            title="ライブラリ"
            onPress={this.pickImage}
          />
          <Button
            title="撮る"
            onPress={this.takePhoto}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="追加"
            onPress={this.add}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addPhoto: (image) => dispatch({ type: "ADD_PHOTO", payload: image }),
});

export default connect(null, mapDispatchToProps)(photoScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});