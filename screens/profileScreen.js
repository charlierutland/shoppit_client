import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import moment from 'moment';

import { connect } from 'react-redux';
import { getLikedItems } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.didFocusListener = props.navigation.addListener('didFocus', () => {
      props.getLikedItems(props.currentUserId);
    });
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { currentUser, currentUserId, likedItems } = this.props;

    if (!currentUser) return <Text>Loading...</Text>;

    return (
      <View style={styles.container}>
        <View styles={styles.profileInfo}>
          <Text style={styles.text}>Me</Text>
          <Image
            source={{ uri: currentUser[currentUserId].avatar_url }}
            style={styles.profile_pic}
          />

          <Text style={styles.text}>
            {moment(currentUser[currentUserId].birthday).format('Do MMMM')}
          </Text>
        </View>

        <ScrollView
          alwaysBounceVertical={'false'}
          contentContainerStyle={styles.itemsList}
        >
          {likedItems.map((currentItem, i) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigate('ItemDetailScreen', {
                    currentItem
                  })
                }
                style={styles.item_image_shadow}
                key={i}
              >
                <Image
                  source={{ uri: currentItem.img_url }}
                  style={styles.item_images}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFA',
    flex: 1
  },

  profileInfo: {
    margin: 20,
    flexDirection: 'row'
  },

  text: {
    margin: 10,
    color: '#6F6E6C',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Walsheim'
  },

  profile_pic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 10,
    alignSelf: 'center'
  },

  itemsList: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  item_images: {
    resizeMode: 'contain',
    height: 250,
    width: SCREEN_WIDTH / 2 - 30,
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 10
  },
  item_image_shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5
  }
});

const mapStateToProps = state => ({
  currentUserId: state.pages.currentUserPage.currentUser,
  currentUser: state.entities.currentUser,

  likedItems: state.pages.profilePage.items.map(
    item_id => state.entities.likedItems[item_id]
  )
});

const mapDispatchToProps = dispatch => ({
  getLikedItems: id => dispatch(getLikedItems(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
