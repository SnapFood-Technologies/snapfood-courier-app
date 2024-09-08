import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import Config from 'react-native-config';
import { isEmpty, getImageFullURL } from '../../utils/common';
import { Globals } from '_styles';
import { HeaderBackBtn, ChatItem } from '_molecules';
import { CHANNEL_TYPE } from 'service/constants';

const MessagesHeader = memo(({ channel, data, user_id, style, onPressName, onBack }) => {

    const getName = () => {
        if (data == null) { return '' }
        if (data.channel_type == CHANNEL_TYPE.order_support) {
            return 'Order Conversation'
        }
        if (data.channel_type == CHANNEL_TYPE.single) {
            if (user_id == data.creator.id) {
                return data.partner.full_name
            }
            else if (user_id == data.partner.id) {
                return data.creator.full_name
            }
        }
        else if (data.channel_type == CHANNEL_TYPE.admin_support) {
            return 'Admin Support'
        }
        else {
            return data.full_name
        }
        return ''
    }
    const getPhoto = () => {
        if (data == null) { return null }
        
        if (data.channel_type == CHANNEL_TYPE.order_support) {
            let photo = '';
            if (data.creator) {
                photo = data.creator.photo
            }
            return (
                <FastImage
                    source={{ uri: getImageFullURL(photo) }}
                    style={{ width: 28, height: 28, borderRadius: 14, }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            );
        }
        else if (data.channel_type == CHANNEL_TYPE.single) {
            let photo = '';
            if (user_id == data.creator.id) {
                photo = data.partner.photo
            }
            else if (user_id == data.partner.id) {
                photo = data.creator.photo
            }

            return (
                <FastImage
                    source={{ uri: getImageFullURL(photo) }}
                    style={{ width: 28, height: 28, borderRadius: 14, }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            );
        }
        return null
    }


    return (
        <View style={[Globals.header, styles.container]}>
            <HeaderBackBtn
                title={getName()}
                onPress={onBack ? onBack : () => { }}
                rightBtn={getPhoto()}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
    },
});

export default MessagesHeader;
