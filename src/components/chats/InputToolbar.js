/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { TextInput, Text, Image, View, TouchableOpacity, } from 'react-native';
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';  
import MessageInputToolbar from './MessageInputToolbar';
import MessageSend from './MessageSend';
import { Typography } from '_styles';
// svgs 
import Svg_emoji from '../../assets/svgs/chat/ic_emoji.svg';
import Svg_img from '../../assets/svgs/chat/ic_img.svg';
import Svg_send from '../../assets/svgs/chat/ic_sender.svg' 

export const renderInputToolbar = (props) => (
    <MessageInputToolbar
        {...props}
        containerStyle={{
            backgroundColor: '#fff',
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 18,
            borderTopWidth: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
        }}
        primaryStyle={{ alignItems: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30, }} 
    >
    </MessageInputToolbar>
);

export const renderActions = (props) => (
    <Actions
        {...props}
        containerStyle={{
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 4,
            marginRight: 4,
            marginBottom: 0,
        }}
        icon={() => (
            <Image
                style={{ width: 32, height: 32 }}
                source={{
                    uri: 'https://placeimg.com/32/32/any',
                }}
            />
        )}
        options={{
            'Choose From Library': () => {
                console.log('Choose From Library');
            },
            Cancel: () => {
                console.log('Cancel');
            },
        }}
        optionTintColor="#222B45"
    />
);

const CustomComposer = ({ props, onPressEmoji, onPressImg }) => {
    
    return <View style={[,
    {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff', 
        paddingVertical: 8, 
        flex: 1,
    }
    ]}>
        <TouchableOpacity style={{marginRight: 10}} onPress={onPressImg}>
            <Svg_img />
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 10}} onPress={onPressEmoji}>
            <Svg_emoji />
        </TouchableOpacity> 
        <Composer
            {...props}
            placeholder={'Type something'}
            placeholderTextColor={'#989898'}
            textInputStyle={{
                flex: 1,
                color: '#000',
                fontSize: 14,
                fontFamily: Typography.FONT_FAMILY_MONTSERRAT_MEDIUM,
                backgroundColor: '#fff',
                paddingHorizontal: 8,
                marginLeft: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#D4D4D4',
            }}
        />
    </View>
}
export const renderComposer = (props, onPressEmoji, onPressImg) => (
    <CustomComposer props={props} onPressEmoji={onPressEmoji} onPressImg={onPressImg} />
);

export const renderSend = (props) =>
    <MessageSend
        {...props}
        containerStyle={{
            alignItems: 'center',
            justifyContent: 'center', 
        }}
    >
        <Svg_send width={40} height={40} />
    </MessageSend>

