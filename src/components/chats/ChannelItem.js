import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import { isEmpty, isFullURL, getImageFullURL, convertTimestamp2Date } from '../../utils/common';
import { Spacing, Colors, Typography, Globals } from '_styles';
import { CHANNEL_TYPE } from 'service/constants';


const ChannelItem = ({ item , navigation, rider_id}) => {
    const getPhoto = () => {
        if (item.channel_type == CHANNEL_TYPE.single) {
            if (rider_id == item.creator.id) {
                return getImageFullURL(item.partner.photo);
            }
            else if (rider_id == item.partner.id) {
                return getImageFullURL(item.creator.photo);
            }
        }
        return Config.USER_PROFILE_IMG_BASE_URL + 'default';
    }
    const getName = () => {
        if (item.channel_type == CHANNEL_TYPE.single) {
            if (rider_id == item.creator.id) {
                return item.partner.full_name
            }
            else if (rider_id == item.partner.id) {
                return item.creator.full_name
            }
        }
        return ''
    }
    const getLastMsg = () => {
        if (item.last_msg == null) { return ''; }

        if (item.last_msg.map != null) {
            return 'Shared a location'
        }
        else if (item.last_msg.emoji != null) {
            return item.last_msg.emoji.code != null ? item.last_msg.emoji.code : item.last_msg.emoji.name
        }
        else if (item.last_msg.images != null) {
            return 'Shared a photo'
        }
        else if (item.last_msg.audio != null) {
            return 'Shared a audio'
        }
        else if (item.last_msg.text != null) {
            return item.last_msg.text;
        }
        return ''
    }
    const getTime = () => {
        if (item.last_msg != null && item.last_msg.createdAt != null) {
            return moment(convertTimestamp2Date(item.last_msg.createdAt)).format('DD/MM/YYYY')
        }
        else {
            return ''
        }
    }
    const getUnreadCnt = () => {
        if (item.unread_cnt != null) {
            return item.unread_cnt[rider_id] || 0
        }
        return 0
    }
    return (
        <TouchableOpacity style={styles.chatContainer} onPress={() => {
            navigation.navigate('ChatMessage', { channelId: item.id, channel : CHANNEL_TYPE.single })
        }}>
            <FastImage
                style={styles.avatar}
                source={{ uri: getPhoto() }}
                resizeMode={FastImage.resizeMode.cover} />
            <View style={styles.inner_container}>
                <View style={styles.nametime_container}>
                    <Text style={Typography.MONSERRAT_BOLD_DARKBLACK_14}>
                        {getName()}
                    </Text>
                    <Text style={Typography.MONSERRAT_MEDIUM_LIGHTGRAY_10}>
                        {getTime()}
                    </Text>
                </View>
                <View style={styles.nametime_container}>
                    <Text
                        style={Typography.MONSERRAT_MEDIUM_LIGHTGRAY_12}>
                        {getLastMsg()}
                    </Text>
                    {
                        getUnreadCnt() > 0 &&
                        <View style={styles.unreadContainer}>
                            <Text style={styles.unread}>{getUnreadCnt()}</Text>
                        </View>
                    }
                </View>
            </View>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    chatContainer: {
        flexDirection: 'row',
        paddingVertical: Spacing.SCALE_12,
        paddingHorizontal: Spacing.SCALE_16,
        backgroundColor: 'white'
    },
    inner_container: {
        flex: 1,
        justifyContent: 'center',
    },
    nametime_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.SCALE_4,
    },
    avatar: {
        width: Spacing.SCALE_48,
        height: Spacing.SCALE_48,
        borderRadius: Spacing.SCALE_24,
        marginRight: Spacing.SCALE_12,
    },
    unreadContainer: {
        marginLeft: 20,
        width: 15,
        height: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F55A00',
    },
    unread: {
        textAlign: 'center',
        color: 'white',
        fontSize: 12,
        lineHeight: 14,
    },
});

const mapStateToProps = (state) => {
    const { unique_id } = state.personalInfo;
    return { rider_id: unique_id };
};
export default connect(mapStateToProps, null)(ChannelItem);
