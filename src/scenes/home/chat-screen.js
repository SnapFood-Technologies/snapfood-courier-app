import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'; 
import { connect } from 'react-redux';
import { Globals } from '_styles';
import { HeaderBackBtn, ChatItem } from '_molecules';
import ChannelItem from '../../components/chats/ChannelItem';
import { API, CHAT } from '_service'; 
import { LoadingSpinner } from '_atoms';
import { CHANNEL_TYPE } from 'service/constants';


const ChatScreen = (props) => {
  const [spinner, setSpinner] = useState(false);
  const { navigation, rider_id } = props;
  const [chatList, setChatList] = useState([]);

  useEffect(() => { 
    if (rider_id == null) { return }
    console.log('rider_id', rider_id) 
    var chatchannel_listener = CHAT.channel_collection().where('channel_type', '==', CHANNEL_TYPE.single) .orderBy('last_msg.createdAt', 'desc')
      .onSnapshot((snapshots) => {
        var tmp_channels = [];
        snapshots.forEach((doc) => {
          if (doc.data() != null) {
            if (doc.data().channel_type != 'admin_support' && doc.data().users != null && doc.data().users.includes(rider_id)) {
              tmp_channels.push(doc.data());
            }
          } 
        });
        setChatList(tmp_channels)
      },
        (error) => {
          console.log('chat channel listener error', error)
        });

    return () => {
      chatchannel_listener();
    }
  }, [rider_id])
 
  return (
    <View style={Globals.flex_1}>
      <LoadingSpinner visible={spinner} />
      <View style={Globals.header}>
        <HeaderBackBtn title="Chat" onPress={() => navigation.goBack()} />
      </View>
      <View style={Globals.container}> 
        <FlatList
          style={styles.listContainer}
          data={chatList}
          numColumns={1}
          keyExtractor={item => item.id.toString()}
          renderItem={(item, index) => <ChannelItem item = {item.item} navigation={navigation}/>} 
          ListFooterComponent={() => <View style={styles.spaceCol} />}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ffffff'
  },   
  spaceCol: {
      height: 15
  },   
  listContainer: {
      flex: 1,
      width: '100%',  
  }, 
});

const mapStateToProps = (state) => {
  const { unique_id } = state.personalInfo;
  return { rider_id: unique_id };
};
export default connect(mapStateToProps, null)(ChatScreen);
