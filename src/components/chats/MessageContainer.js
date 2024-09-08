import React from 'react';
import { View, Text, Clipboard } from 'react-native';
import { Avatar, Bubble, utils, SystemMessage, Message, MessageText } from 'react-native-gifted-chat'; 
import FastImage from 'react-native-fast-image';
import Config from 'react-native-config';
import MessageBubble from './MessageBubble';
import { Typography } from '_styles'; 
import { isEmpty, isFullURL, getImageFullURL } from 'utils/common';
 
export const renderMessage = (props) => (
  <Message
    {...props}
    containerStyle={{
      left: { backgroundColor: '#F6F7F9' },
      right: { backgroundColor: '#F6F7F9' },
    }}
  />
);

export const renderBubble = (props, isGroup, onLongPress, onPressMsg ) => { 
 
  return <MessageBubble
    {...props}
    isGroup={isGroup}
    // renderTime={() => <Text>Time</Text>}
    // renderTicks={() => <Text>Ticks</Text>} 
    containerStyle={{
      left: { paddingLeft: 0, },
      right: { paddingRight: 8, },
    }}
    bottomContainerStyle={{
      left: { display: 'none' },
      right: { display: 'none' },
    }}
    tickStyle={{}}
    // usernameStyle={{ color: 'tomato', fontWeight: '100' }}
    containerToNextStyle={{
      left: {
        
      },
      right: {

      },
    }}
    containerToPreviousStyle={{
      left: {},
      right: {

      },
    }}
    onPressMsg={onPressMsg}
    onLongPress={onLongPress}  
  /> 
};

export const renderSystemMessage = (props) => (
  <SystemMessage
    {...props}
    containerStyle={{ backgroundColor: 'transparent' }}
    wrapperStyle={{ borderWidth: 10, borderColor: 'white' }}
    textStyle={{ color: '#aaa', fontFamily: Typography.FONT_FAMILY_MONTSERRAT_MEDIUM, }}
  />
);

export const renderCustomView = (props) => {
  return <View></View>
}

export const renderAvatar = (props) => {
  const { currentMessage, position, } = props; 
  if (position == 'right') { return null }
  
  let photo = currentMessage.user.photo;
  if (isFullURL(photo) == false) {
    photo = Config.USER_PROFILE_IMG_BASE_URL + (isEmpty(photo) ? 'default' : photo)
  } 

  return <FastImage 
    source={{ uri: photo }} 
    style={{width: 36, height : 36, borderRadius: 18,}} 
    resizeMode={FastImage.resizeMode.cover}
    />
}