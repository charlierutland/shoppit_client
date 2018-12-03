import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  WebView,
  TouchableOpacity
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { setItemAffinity } from '../actions';

class ItemDetailScreen extends React.Component {
  state = {
    showWebView: false
  };

  renderAmazon() {
    return (
      <WebView
        source={{
          uri: this.props.navigation.getParam('link')
        }}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled
        style={{ flex: 1 }}
      />
    );
  }
  render() {
    const item_id = this.props.navigation.getParam('item_id');

    if (this.state.showWebView) {
      return this.renderAmazon();
    } else

      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Text style={styles.baseText}>
            <Text style={styles.titleText}>
              {this.props.navigation.getParam('title')}
            </Text>
          </Text>
          <Image
            style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: 'contain'
            }}
            source={{ uri: this.props.navigation.getParam('image') }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={styles.titleText}>
              {this.props.navigation.getParam('price')}
            </Text>
            <View style={styles.container}>
              <Button
                title="BUY NOW"
                onPress={() => this.setState({ showWebView: true })}
              />
            </View>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
            >
              <Ionicons
                name="ios-close-circle-outline"
                size={50}
                color="#6F6E6C"
                onPress={() => {
                  this.props.setItemAffinity(item_id, false);
                  this.props.navigation.goBack();
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
            >
              <Ionicons
                name="ios-heart-empty"
                size={50}
                color="#6F6E6C"
                onPress={() => {
                  this.props.setItemAffinity(item_id, true);
                  this.props.navigation.goBack();
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    position: 'absolute',
    bottom: 10
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  baseText: {
    fontFamily: 'Arial',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    textAlign: 'center',
    zIndex: 1000,
    color: '#6F6E6C'
  },
  titleText: {
    fontSize: 20,
    color: '#6F6E6C'
  }
});

const mapStateToProps = state => ({
  likedItems: state.entities.likedItems
});

const mapDispatchToProps = dispatch => ({
  setItemAffinity: (id, affinity) => dispatch(setItemAffinity(id, affinity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetailScreen);
