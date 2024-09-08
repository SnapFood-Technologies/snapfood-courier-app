import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, PermissionsAndroid, SafeAreaView, TouchableOpacity, Platform, } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux'
import { isEmpty, convertTimestamp2Date, getImageFullURL } from '../../utils/common';
import EmojiBoard from '../../components/react-native-emoji-board'
import MessagesHeader from '../../components/chats/MessagesHeader';
import ImgPickOptionModal from '../../components/modals/ImgPickOptionModal';
import { renderInputToolbar, renderActions, renderComposer, renderSend } from '../../components/chats/InputToolbar';
import { renderAvatar, renderBubble, renderSystemMessage, renderMessage, renderCustomView, } from '../../components/chats/MessageContainer';
import { Globals, Spacing, Colors, Typography } from '_styles';
import { LoadingSpinner } from '_atoms';
import { API, CHAT, CONSTANTS } from '_service';
import { CHANNEL_TYPE } from 'service/constants';


const MessagesScreen = (props) => {
    const channel_type = props.route.params.channel;
    const channel_name = channel_type == CHANNEL_TYPE.order_support ? 'order_support' : 'channels';
    const [loading, setLoading] = useState(false)

    const [showEmoji, setShowEMoji] = useState(false);
    const [channelData, setChannelData] = useState(null)
    const [text, setText] = useState('')
    const [isShowImgPickModal, ShowImgPickModal] = useState(false)
    const [messages, setMessages] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        loadData();
        const messages_coll = CHAT.channel_collection(channel_name).doc(props.route.params.channelId)
            .collection('messages')
            .limit(80)
            .orderBy('created_time', 'desc');
        const messages_listener = messages_coll.onSnapshot((querySnapshot) => {
            let msgs = []
            querySnapshot.docs.forEach(doc => {
                if (doc.exists) {
                    msgs.push({ ...doc.data(), createdAt: convertTimestamp2Date(doc.data().createdAt) })
                }
            })
            setMessages(msgs);
        });

        return () => {
            messages_listener();
        }
    }, [])

    console.log('chanel ', props.route.params.channelId)

    const getUserInfoForMsg=()=>{
        return {
            _id: props.user.unique_id,
            full_name: props.user.name,
            photo: props.user.profile_img,
            avatar: channel_type == CHANNEL_TYPE.order_support ? getImageFullURL(props.user.profile_img) : null,
            phone: props.user.phone_number,
            email: props.user.email,
            role: CONSTANTS.ROLE_RIDER
        };
    }

    const loadData = async () => {
        try { 
            let channelData = await CHAT.getChannelData(channel_name, props.route.params.channelId)
            setChannelData(channelData)
            await CHAT.seenUnreadCntChannel(channel_name, channelData, props.user.unique_id)
        }
        catch (error) {
            console.log('loadData error', error)
        }
    }

    const onSend = async (newMessages = []) => {
        for (var i = 0; i < newMessages.length; i++) {
            await CHAT.sendMessage(channel_name, channelData.id, props.user.unique_id, newMessages[i])
        }
    };

    const onSelectEmoji = emoji => {
        setShowEMoji(false)
        let newMsg = {
            user: getUserInfoForMsg(),
            emoji: emoji
        }
        onSend([newMsg])
    };

    const onSendImg = async (image) => {
        try {
            let res = await API.uploadChatImage({ image: image.data });
            if (res != null && res.data != null && res.data.url != null) {
                let newMsg = {
                    user: getUserInfoForMsg(),
                    images: [res.data.url]
                }
                onSend([newMsg])
            }
        }
        catch (error) {
            console.log('uploadChatImage error', error)
        }
    };

    const onPressEmoji = () => {
        setShowEMoji(true)
    }
    const onPressImg = () => {
        ShowImgPickModal(true)
    }

    const onImageUpload = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
            cropping: true,
            includeBase64: true,
        }).then(image => {
            ShowImgPickModal(false)
            onSendImg(image);
        });
    }
    const onCapture = () => {
        ImagePicker.openCamera({
            cropping: true,
            includeBase64: true,
        }).then(image => {
            ShowImgPickModal(false)
            onSendImg(image);
        });
    }

    const onLongPressMessage = (currentMessage) => {
        if (currentMessage && currentMessage.text) {
            // setQuoteMsg(currentMessage)
        }
    }
    const onPressMsg = (currentMessage) => {
    }

    const renderEmptyInputToolbar = () => (
        <Text style={styles.noMemberTxt}></Text>
    )

    const renderBottomInputbar = (giftchat_props) => {
        if (channelData != null && channelData.users.findIndex(i => i == props.user.unique_id) == -1) {
            return renderEmptyInputToolbar()
        }
        return renderInputToolbar(giftchat_props)
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar hidden={true} translucent backgroundColor="transparent" barStyle="light-content" /> */}
            <GiftedChat
                messages={messages}
                text={text}
                onInputTextChanged={setText}
                onSend={onSend}
                user={getUserInfoForMsg()}
                minInputToolbarHeight={100}
                alwaysShowSend={true}
                showUserAvatar={false}
                showAvatarForEveryMessage={true}
                renderUsernameOnMessage={true}
                listViewProps={{
                    style: { backgroundColor: '#F6F7F9' },
                    ListFooterComponent: <View style={{ height: 100, }} />,
                    keyboardShouldPersistTaps: 'handled'
                }}
                renderInputToolbar={renderBottomInputbar}
                renderSend={(props) => renderSend(props)}
                renderComposer={(props) => renderComposer(props, onPressEmoji, onPressImg)}
                renderMessage={renderMessage}
                renderBubble={(props) => renderBubble(props, (channelData != null && channelData.channel_type != 'single'), onLongPressMessage, onPressMsg)}
                renderAvatar={renderAvatar}
                renderFooter={() => <View  >
                    <Text></Text>
                </View>}
                parsePatterns={(linkStyle) => [
                    {
                        pattern: /#(\w+)/,
                        style: linkStyle,
                        onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
                    },
                ]}
            />
            <MessagesHeader
                channel={channel_type}
                data={channelData}
                user_id={props.user.unique_id}
                onBack={() => { props.navigation.pop() }}
                onPressName={() => {
                    // if (channelData == null) { return; }
                    // let user_id = props.user.unique_id;
                    // if (channelData.channel_type == 'single') {
                    //     if (user_id == channelData.creator.id) {
                    //     }
                    //     else if (user_id == channelData.partner.id) {
                    //     }
                    // }
                }}
            />
            <EmojiBoard showBoard={showEmoji} tabBarPosition='top' tabBarStyle={{ height: 50, paddingTop: 12 }}
                onRemove={() => setShowEMoji(false)}
                onClick={onSelectEmoji} />
            <ImgPickOptionModal showModal={isShowImgPickModal}
                onCapture={onCapture}
                onImageUpload={onImageUpload}
                onClose={() => ShowImgPickModal(false)} />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1, width: '100%',
    },
    formView: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%',
    },
    noMemberTxt: { marginHorizontal: 30, marginTop: 30, textAlign: 'center', fontSize: 16, fontFamily: Typography.FONT_FAMILY_MONTSERRAT_SEMIBOLD, color: '#aaa' },
});


const mapStateToProps = (state) => {
    return { user: state.personalInfo };
};
export default connect(mapStateToProps, null)(MessagesScreen);