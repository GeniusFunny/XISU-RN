import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, DatePickerIOS, Picker} from "react-native"
import { Button } from 'react-native-material-ui'

export default class ModalExample extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22, padding: 10 }}>
            <View>
              <Text style={{fontSize: 18}}>选择日期</Text>
              <DatePickerIOS
                date={new Date()}
                mode={'date'}
              />
              <Text style={{fontSize: 18}}>选择时间区间</Text>
              <Picker>
                <Picker.Item label="8:00~10:00" value="1" />
                <Picker.Item label="10:00~12:00" value="2" />
                <Picker.Item label="14:00~16:00" value="3" />
                <Picker.Item label="16:00~18:00" value="4" />
                <Picker.Item label="19:00~22:00" value="5" />
              </Picker>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                style={{justifyContent: 'center', alignItems: 'center', marginTop: 22}}
              >
                <Text style={{fontSize: 20}}>确认</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
