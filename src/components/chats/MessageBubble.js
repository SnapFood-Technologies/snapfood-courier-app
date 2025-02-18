import PropTypes from 'prop-types';
import React from 'react';
import MapView, { Callout, PROVIDER_GOOGLE, Point } from "react-native-maps";
import { Text, Clipboard, StyleSheet, TouchableWithoutFeedback, View, ViewPropTypes, TouchableOpacity, } from 'react-native';
import { QuickReplies, Bubble, utils, Time, Color, MessageVideo, MessageImage, MessageText } from 'react-native-gifted-chat';
import { width, height } from 'react-native-dimension'
import Lightbox from 'react-native-lightbox';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { Spacing, Colors, Typography } from '_styles';

const { isSameDay, isSameUser } = utils
const DEFAULT_OPTION_TITLES = ['Copy Text', 'Cancel'];
const MAX_CONTENT_WIDTH = width(100) - 150
export default class MessageBubble extends React.Component {
    constructor() {
        super(...arguments);
        this.onLongPress = () => {
            const { currentMessage } = this.props;
            if (this.props.onLongPress) {
                this.props.onLongPress(currentMessage);
            }
        };
        this.onPressMsg = () => {
            const { currentMessage } = this.props;
            if (this.props.onPressMsg) {
                this.props.onPressMsg(currentMessage);
            }
        };
        this.onShowGalleryMsgs = (images) => {
            if (this.props.onShowGalleryMsgs) {
                this.props.onShowGalleryMsgs(images);
            }
        };
        this.state = {
            value: 0,
            isPlaying: false,
        }
    }

    isToNext() {
        const { currentMessage, nextMessage, position, } = this.props;
        return (currentMessage &&
            nextMessage &&
            position &&
            isSameUser(currentMessage, nextMessage) &&
            isSameDay(currentMessage, nextMessage))
    }

    isToPrevious() {
        const { currentMessage, previousMessage, position, } = this.props;
        return (currentMessage &&
            previousMessage &&
            position &&
            isSameUser(currentMessage, previousMessage) &&
            isSameDay(currentMessage, previousMessage))
    }

    styledBubbleToNext() {
        const { position, containerToNextStyle, } = this.props;
        if (!this.isToNext()) {
            return [
                styles[position].containerToNext,
                containerToNextStyle && containerToNextStyle[position],
            ];
        }
        return null;
    }
    styledBubbleToPrevious() {
        const { position, containerToPreviousStyle, } = this.props;
        if (!this.isToPrevious()) {
            return [
                styles[position].containerToPrevious,
                containerToPreviousStyle && containerToPreviousStyle[position],
            ];
        }
        return null;
    }

    renderReply() {
        const { currentMessage, nextMessage, } = this.props;
        if (currentMessage && currentMessage.reply && currentMessage.reply.user) {
            const { containerStyle, wrapperStyle, ...replyProps } = this.props;

            return <View style={[styles.col_center, styles.content.replyMsg]}>
                <Text style={styles.content.replyUserName}>{currentMessage.reply.user.full_name}</Text>
                <Text style={styles.content.replyText}>{currentMessage.reply.text}</Text>
            </View>;
        }
        return null;
    }

    renderMap(coords) {
        const { latitude, longitude } = coords;
        if (latitude == null || longitude == null) { return null }
        return (
            <View style={{ overflow: 'hidden', width: '100%', minWidth: 120, height: 77, borderRadius: 10, }}>
                <MapView
                    minZoomLevel={15}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={false}
                    showsMyLocationButton={false}
                    showsPointsOfInterest={false}
                    showsBuildings={false}
                    style={{ width: '100%', minWidth: 120, height: 77 }}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.025,
                    }}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.05,
                    }}>
                    <MapView.Marker
                        key={'marker_position'}
                        anchor={{ x: 0.5, y: 0.5 }}
                        coordinate={{ latitude: latitude, longitude: longitude }}>
                        <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#25DEE240', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#50B7ED' }} />
                        </View>
                    </MapView.Marker>
                </MapView>
            </View>
        );
    }

    renderMapLocation() {
        const { currentMessage, nextMessage, } = this.props;
        if (currentMessage && currentMessage.map && currentMessage.map.coords) {
            const { containerStyle, wrapperStyle, ...replyProps } = this.props;

            return <View style={[styles.col_center, { alignItems: 'flex-start', width: MAX_CONTENT_WIDTH }]}>
                <Text style={{ fontSize: 10, fontFamily: Typography.FONT_FAMILY_MONTSERRAT_MEDIUM, color: '#fff', marginBottom: 6 }}>
                    You shared {currentMessage.map.type == 0 ? 'your' : 'a'} location.
                </Text>
                {this.renderMap(currentMessage.map.coords)}
            </View>;
        }
        return null;
    }

    renderMessageText() {
        const { currentMessage } = this.props;
        if (currentMessage && currentMessage.text) {
            let marginTop = 0
            if (currentMessage.reply || (currentMessage.images && currentMessage.images.length > 0) || currentMessage.audio || currentMessage.video || currentMessage.map) {
                marginTop = 10
            }

            return <MessageText
                {...this.props}
                containerStyle={{
                    left: { marginTop: marginTop },
                    right: { marginTop: marginTop },
                }}
                textStyle={{
                    left: { color: '#000', lineHeight: 18, fontFamily: Typography.FONT_FAMILY_MONTSERRAT_MEDIUM, fontSize: 14, },
                    right: { color: '#fff', lineHeight: 18, fontFamily: Typography.FONT_FAMILY_MONTSERRAT_MEDIUM, fontSize: 14, },
                }}
                linkStyle={{
                    left: { color: 'orange' },
                    right: { color: 'orange' },
                }}
                customTextStyle={{ fontSize: 14, lineHeight: 14 }}
            />;
        }
        return null;
    }

    renderImageList(imgs = []) {
        const sizeItem = 45;
        const marginWidth = 5;
        var showCnt = parseInt(MAX_CONTENT_WIDTH / (sizeItem + marginWidth));
        var plusCnt = 0
        if (showCnt < imgs.length) {
            plusCnt = imgs.length - showCnt + 1
            showCnt = showCnt - 1
        }

        return <View style={[styles.row_center, { width: '100%' }]}>
            {
                imgs.slice(0, showCnt).map((img, index) => (
                    <Lightbox key={index} activeProps={{
                        style: { flex: 1, resizeMode: 'contain', },
                    }}  >
                        <FastImage
                            style={[{
                                width: sizeItem,
                                height: sizeItem,
                                marginRight: marginWidth,
                                borderRadius: 5,
                                resizeMode: 'cover',
                            }]}
                            resizeMode={FastImage.resizeMode.cover}
                            source={{ uri: img }}
                        />
                    </Lightbox>
                ))
            }
            {
                plusCnt > 0 && <TouchableOpacity
                    style={[styles.col_center, {
                        width: sizeItem,
                        height: sizeItem,
                        marginRight: marginWidth,
                    }]}
                    onPress={() => {
                        this.onShowGalleryMsgs(imgs.slice(showCnt, imgs.length));
                    }}
                >
                    <FastImage
                        style={[{
                            position: 'absolute', top: 0, left: 0,
                            width: sizeItem,
                            height: sizeItem,
                            borderRadius: 5,
                            resizeMode: 'cover',
                        }]}
                        resizeMode={FastImage.resizeMode.cover}
                        source={{ uri: (showCnt < imgs.length) ? imgs[showCnt] : '' }}
                    />
                    <View style={[{
                        position: 'absolute', top: 0, left: 0,
                        borderRadius: 5,
                        width: sizeItem,
                        height: sizeItem,
                        backgroundColor: '#00000099'
                    }]} />
                    <Text style={{ fontSize: 10, fontFamily: Typography.FONT_FAMILY_MONTSERRAT_MEDIUM, color: '#fff' }}>+{plusCnt}</Text>
                </TouchableOpacity>
            }
        </View>
    }
    renderMessageImage() {
        if (this.props.currentMessage && this.props.currentMessage.images && this.props.currentMessage.images.length > 0) {
            const { containerStyle, wrapperStyle, ...messageImageProps } = this.props;
            return <View style={[{}]}>
                {
                    this.props.currentMessage.images.length == 1 ?
                        <Lightbox 
                            underlayColor={'#fff'}
                            activeProps={{
                                style: { flex: 1, resizeMode: 'contain', backgroundColor: '#fff', },
                            }}  >
                            <FastImage
                                style={[{
                                    width: MAX_CONTENT_WIDTH,
                                    height: 130,
                                    borderRadius: 13,
                                    margin: 3,
                                    resizeMode: 'cover',
                                }]}
                                resizeMode={FastImage.resizeMode.cover}
                                source={{ uri: this.props.currentMessage.images[0] }}
                            />
                        </Lightbox>
                        :
                        this.renderImageList(this.props.currentMessage.images)
                }
            </View>;
        }
        return null;
    }
    renderMessageVideo() {
        if (this.props.currentMessage && this.props.currentMessage.video) {
            const { containerStyle, wrapperStyle, ...messageVideoProps } = this.props;
            if (this.props.renderMessageVideo) {
                return this.props.renderMessageVideo(messageVideoProps);
            }
            return <MessageVideo {...messageVideoProps} />;
        }
        return null;
    }
    renderTicks() {
        const { currentMessage, renderTicks, user } = this.props;
        if (renderTicks && currentMessage) {
            return renderTicks(currentMessage);
        }
        if (currentMessage && user && currentMessage.user && currentMessage.user._id !== user._id) {
            return null;
        }
        if (currentMessage &&
            (currentMessage.sent || currentMessage.received || currentMessage.pending)) {
            return (<View style={styles.content.tickView}>
                {!!currentMessage.sent && (<Text style={[styles.content.tick, this.props.tickStyle]}>✓</Text>)}
                {!!currentMessage.received && (<Text style={[styles.content.tick, this.props.tickStyle]}>✓</Text>)}
                {!!currentMessage.pending && (<Text style={[styles.content.tick, this.props.tickStyle]}>🕓</Text>)}
            </View>);
        }
        return null;
    }
    renderTime() {
        const { currentMessage, nextMessage, previousMessage, position, user, isGroup } = this.props;
        if (currentMessage && currentMessage.createdAt) {
            const { containerStyle, wrapperStyle, textStyle, ...timeProps } = this.props;
            // if (nextMessage && nextMessage.user && currentMessage.user._id == nextMessage.user._id) {
            //     return null;
            // }
            return (<View style={styles.content.usernameView}>
                <Text style={[{ fontSize: 10, fontFamily: Typography.FONT_FAMILY_MONTSERRAT_MEDIUM, color: '#989898' }]}>
                    {moment(currentMessage.createdAt).format("LT")}
                </Text>
            </View>);
        }
        return null;
    }
    renderUsername() {
        const { currentMessage, nextMessage, previousMessage, position, user, isGroup } = this.props;
        if (this.props.renderUsernameOnMessage && currentMessage) {
            if ((user && currentMessage.user._id === user._id) || !isGroup) {
                return null;
            }
            if (previousMessage && previousMessage.user && currentMessage.user._id == previousMessage.user._id) {
                return null;
            }
            return (<View style={styles.content.usernameView}>
                <Text style={[styles.content.username, this.props.usernameStyle]}>
                    {currentMessage.user.full_name || currentMessage.user.username}
                </Text>
            </View>);
        }
        return null;
    }
    renderCustomView() {
        if (this.props.renderCustomView) {
            return this.props.renderCustomView(this.props);
        }
        return null;
    }
    renderBubbleContent() {

        return <View style={[styles.col_center,]}>
            {this.renderReply()}
            {this.renderMapLocation()}
            {this.renderMessageImage()}
            {this.renderMessageVideo()}
            {this.renderMessageText()}
        </View>
    }

    getWrapperStyle() {
        const { currentMessage, nextMessage, position, wrapperStyle, } = this.props;
        if (currentMessage && currentMessage.reply && currentMessage.reply.user) {
            return {
                paddingTop: 14,
            }
        }
        if (currentMessage && !currentMessage.reply && !currentMessage.audio && (currentMessage.images && currentMessage.images.length > 0) && currentMessage.text) {
            return {
                paddingTop: 10,
            }
        } 
        return null
    }
    render() {
        const { currentMessage, position, containerStyle, wrapperStyle, bottomContainerStyle, } = this.props;
        return (<View style={[
            styles[position].container,
            containerStyle && containerStyle[position],
        ]}>
            {this.renderUsername()}
            {
                (currentMessage && currentMessage.emoji && currentMessage.emoji.code) ?
                    <Text style={styles.content.emoji}>{currentMessage.emoji.code}</Text>
                    :
                    (
                        this.renderMessageImage() != null ? this.renderMessageImage()
                            :
                            <View style={[styles.row_center, { alignItems: 'flex-end' }]}>
                                {
                                    position == 'left' && <View style={[styles.content.triangle, styles.content.arrowDownLeft]} />
                                }
                                <View style={[styles[position].wrapper, wrapperStyle && wrapperStyle[position],
                                this.styledBubbleToPrevious(),
                                this.styledBubbleToNext(),
                                this.getWrapperStyle(),
                                ]}>
                                    <TouchableWithoutFeedback onPress={this.onPressMsg} onLongPress={this.onLongPress} accessibilityTraits='text' {...this.props.touchableProps}>
                                        {this.renderBubbleContent()}
                                    </TouchableWithoutFeedback>
                                </View>
                                {
                                    position == 'right' && <View style={[styles.content.triangle, styles.content.arrowDownRight]} />
                                }
                            </View>
                    )
            }
            {this.renderTime()}
            {/* 
            {this.renderTicks()} */}
        </View>);
    }
}
Bubble.contextTypes = {
    actionSheet: PropTypes.func,
};
Bubble.defaultProps = {
    touchableProps: {},
    onLongPress: null,
    onPressMsg: null,
    onShowGalleryMsgs: null,
    renderMessageImage: null,
    renderMessageVideo: null,
    renderMessageText: null,
    renderCustomView: null,
    renderUsername: null,
    renderTicks: null,
    renderTime: null,
    renderQuickReplies: null,
    onQuickReply: null,
    position: 'left',
    optionTitles: DEFAULT_OPTION_TITLES,
    currentMessage: {
        text: null,
        createdAt: null,
        image: null,
    },
    nextMessage: {},
    previousMessage: {},
    containerStyle: {},
    wrapperStyle: {},
    bottomContainerStyle: {},
    tickStyle: {},
    usernameStyle: {},
    containerToNextStyle: {},
    containerToPreviousStyle: {},
};
Bubble.propTypes = {
    user: PropTypes.object.isRequired,
    touchableProps: PropTypes.object,
    onLongPress: PropTypes.func,
    onPressMsg: PropTypes.func,
    onShowGalleryMsgs: PropTypes.func,
    renderMessageImage: PropTypes.func,
    renderMessageVideo: PropTypes.func,
    renderMessageText: PropTypes.func,
    renderCustomView: PropTypes.func,
    isCustomViewBottom: PropTypes.bool,
    renderUsernameOnMessage: PropTypes.bool,
    renderUsername: PropTypes.func,
    renderTime: PropTypes.func,
    renderTicks: PropTypes.func,
    renderQuickReplies: PropTypes.func,
    onQuickReply: PropTypes.func,
    position: PropTypes.oneOf(['left', 'right']),
    optionTitles: PropTypes.arrayOf(PropTypes.string),
    currentMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    containerStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    wrapperStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    bottomContainerStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    tickStyle: PropTypes.any,
    usernameStyle: PropTypes.any,
    containerToNextStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    containerToPreviousStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
};

const styles = {
    left: StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'flex-start',
        },
        wrapper: { 
            borderBottomRightRadius: 12,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            backgroundColor: '#EAECF2',
            marginRight: 80,
            minHeight: 20,
            justifyContent: 'flex-end',
            padding: 20,
        },
        containerToNext: {
            borderBottomLeftRadius: 0,
        },
        containerToPrevious: {
            borderBottomLeftRadius: 0,
        },
        bottom: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
    }),
    right: StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'flex-end',
        },
        wrapper: { 
            borderBottomLeftRadius: 12,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            backgroundColor: '#50B7ED',
            marginLeft: 80,
            minHeight: 20,
            justifyContent: 'flex-end',
            padding: 20,
        },
        containerToNext: {
            borderBottomRightRadius: 0,
        },
        containerToPrevious: {
            borderBottomRightRadius: 0,
        },
        bottom: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
    }),
    content: StyleSheet.create({
        tick: {
            fontSize: 10,
            // backgroundColor: Color.backgroundTransparent,
            // color: Color.white,
        },
        tickView: {
            flexDirection: 'row',
            marginRight: 10,
        },
        username: {
            top: -3,
            left: 0,
            fontSize: 10,
            fontFamily: Typography.FONT_FAMILY_MONTSERRAT_MEDIUM,
            backgroundColor: 'transparent',
            color: '#50B7ED',
        },
        usernameView: {
            flexDirection: 'row',
            marginHorizontal: 10,
        },
        replyMsg: { alignItems: 'flex-start', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, backgroundColor: 'white' },
        replyUserName: { fontSize: 12, fontFamily: Typography.FONT_FAMILY_MONTSERRAT_BOLD, color: '#f00' },
        replyText: { marginTop: 6, fontSize: 12, fontFamily: Typography.FONT_FAMILY_MONTSERRAT_MEDIUM, color: '#000' },
        emoji: { fontSize: 40, },
        triangle: {
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
        },
        arrowDownRight: {
            marginLeft: -3,
            borderTopWidth: 15,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            borderLeftWidth: 15,
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: "#50B7ED",
        },
        arrowDownLeft: {
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 15,
            borderLeftWidth: 15,
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: "#EAECF2",
            borderLeftColor: 'transparent',
        },
    }),
    row_center: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    col_center: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
};