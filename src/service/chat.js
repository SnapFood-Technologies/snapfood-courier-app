import firestore from '@react-native-firebase/firestore';
import API from './api'
import * as CONSTANTS from './constants';
import { CHANNEL_TYPE } from './constants';
import { getImageFullURL } from 'utils/common';

export const channel_collection = (channel = 'channels') => firestore().collection(channel)

export const createSingleChannel = async (user, partner) => {
    try {
        let channelId = channel_collection().doc().id;
        await channel_collection().doc(channelId).set({
            id: channelId,
            active: true,
            channel_type: CHANNEL_TYPE.single,
            withRider: true,
            creator: {
                id: user.unique_id,
                full_name: user.name || null,
                photo: user.profile_img || null,
                phone: user.phone_number || null,
                email: user.email || null,
                role: CONSTANTS.ROLE_RIDER
            },
            partner: {
                id: partner.id,
                username: partner.username || null,
                full_name: partner.full_name || null,
                photo: partner.photo || null,
                phone: partner.phone || null,
                email: partner.email || null,
                role: partner.role || CONSTANTS.ROLE_CUSTOMER
            },
            users: [user.unique_id, partner.id],
            last_msg: {
                createdAt: firestore.FieldValue.serverTimestamp()
            },
            unread_cnt: {
            }
        });

        return channelId;
    }
    catch (error) {
        return null
    }
};

export const createAdminSupportChannel = async (user) => {
    try {
        let channelId = channel_collection().doc().id;
        await channel_collection().doc(channelId).set({
            id: channelId,
            active: true,
            channel_type: CHANNEL_TYPE.admin_support,
            withRider: true,
            creator: {
                id: user.unique_id,
                full_name: user.name,
                photo: user.profile_img,
                phone: user.phone_number,
                email: user.email,
                role: CONSTANTS.ROLE_RIDER
            },
            users: [user.unique_id, CONSTANTS.SNAP_FOOD_ADMIN],
            last_msg: {
                createdAt: firestore.FieldValue.serverTimestamp()
            },
            unread_cnt: {
            }
        });

        await sendMessage('channels', channelId, CONSTANTS.SNAP_FOOD_ADMIN, {
            text : "Përshëndetje, jam nga Suporti i Snapfood për të të ndihmuar me gjithçka lidhur me aplikacionin",
            user : {
                _id : CONSTANTS.SNAP_FOOD_ADMIN,
                id: CONSTANTS.SNAP_FOOD_ADMIN,
                username: 'Snapfood Support',
                full_name: 'Snapfood Support',
                photo: CONSTANTS.SNAPFOOD_AVATAR,
                avatar: CONSTANTS.SNAPFOOD_AVATAR,
                phone: '',
                email: 'snapfoodinternational@gmail.com',
                role: CONSTANTS.ROLE_ADMIN
            }
        });

        return channelId;
    }
    catch (error) {
        return null
    }
};

export const attendOrderSupportChannel = async (order_id, user) => {
    try {
        let channelId = `order_${order_id}`;
        let snap = await channel_collection('order_support').doc(channelId).get();
        let channelData = snap.data();
        if (channelData) {
            let members = channelData.members || [];
            if (members.findIndex(m => m.id == user.unique_id) == -1) {
                members.push({
                    id: user.unique_id,
                    full_name: user.name || null,
                    photo: user.profile_img || null,
                    avatar: getImageFullURL(user.profile_img),
                    phone: user.phone_number || null,
                    email: user.email || null,
                    role: CONSTANTS.ROLE_RIDER
                });
                let users = channelData.users || [];
                users.push(user.unique_id);
                let unread_cnt = channelData.unread_cnt || {};
                unread_cnt[user.unique_id] = 0;

                await channel_collection('order_support').doc(channelId).update({
                    members, users, unread_cnt
                });

                await sendMessage('order_support', channelId, user.unique_id, {
                    text : `Përshëndetje, jam ${user.name} dhe po shkoj të marr porosinë tënde. Ke ndonjë kërkesë për mua?`,
                    user : {
                        _id : user.unique_id,
                        id: user.unique_id,
                        full_name: user.name || null,
                        photo: user.profile_img || null,
                        avatar: getImageFullURL(user.profile_img),
                        phone: user.phone_number || null,
                        email: user.email || null,
                        role: CONSTANTS.ROLE_RIDER
                    }
                });
            }
        }
    }
    catch (error) {
        console.log('attendOrderSupportChannel ', error)
    }
};

export const getChannelData = async (channel = 'channels', channelId) => {
    try {
        let channel_ref = await channel_collection(channel).doc(channelId).get();
        return channel_ref.data()
    }
    catch (error) {
        return null
    }
}

export const findSingleChannel = async (user_id, partner_id) => {
    try {
        let channel_ref = await channel_collection().where('channel_type', '==', CHANNEL_TYPE.single).get();
        let found_channel = null
        channel_ref.docs.forEach(doc => {
            if (doc.data() != null && doc.data().users != null && doc.data().users.includes(user_id) && doc.data().users.includes(partner_id)) {
                found_channel = doc.data()
            }
        })
        return found_channel
    }
    catch (error) {
        console.log('findSingleChannel', error)
        return null
    }
}

export const findAdminSupportChannel = async (user_id) => {
    try {
        let channel_ref = await channel_collection().where('channel_type', '==', CHANNEL_TYPE.admin_support).get();
        let found_channel = null
        channel_ref.docs.forEach(doc => {
            if (doc.data() != null && doc.data().users != null && doc.data().users.includes(user_id)) {
                found_channel = doc.data()
            }
        })
        return found_channel
    }
    catch (error) {
        console.log('findAdminSupportChannel', error)
        return null
    }
}

export const seenUnreadCntChannel = async (channel = 'channels', channelData, user_id) => {
    try {
        if (channelData != null) {
            let users_in_channel = channelData.users || [];
            let cur_unread = channelData.unread_cnt || {};
            users_in_channel.map(item => {
                if (item == user_id) {
                    cur_unread[item] = 0;
                }
            })
            await channel_collection(channel).doc(channelData.id).update('unread_cnt', cur_unread)
        }
    }
    catch (error) {
        return null
    }
}

export const fetchUnreadChat = async (channel = 'channels', user_id) => {
    let channel_ref = await channel_collection(channel).where('users', 'array-contains', user_id).get();
    let channels = []
    channel_ref.docs.forEach(doc => {
        if (doc.data() != null) {
            channels.push(doc.data());
        }
    });

    let unreadCnt = 0;
    for (var i = 0; i < channels.length; i++) {
        if (channels[i].unread_cnt != null && isNaN(channels[i].unread_cnt[user_id]) == false) {
            unreadCnt = unreadCnt + channels[i].unread_cnt[user_id];
        }
    }
    return unreadCnt;
};

const getMsgDescription = (msg) => {
    if (msg == null) { return ''; }
    if (msg.map != null) {
        return 'Shpërndau vendndodhjen';
    }
    else if (msg.emoji != null) {
        return 'Dërgoi një emoji';
    }
    else if (msg.images != null) {
        return 'Shpërndau një foto'
    }
    else if (msg.audio != null) {
        return 'Dërgoi një voice'
    }
    else if (msg.text != null) {
        return msg.text;
    }
    return ''
}

export const sendMessage = async (channel = 'channels', channelId, user_id, message) => {
    try {
        let created_time = new Date().getTime();
        let serverTimeResponse = await API.getServerTime();

        if (serverTimeResponse != null && serverTimeResponse.data != null && serverTimeResponse.data.time != null) {
            console.log('serverTimeResponse.data.time: ', serverTimeResponse.data.time);
            created_time = serverTimeResponse.data.time;
        }

        if (message._id == null) {
            message._id = channel_collection(channel).doc(channelId).collection('messages').doc().id;
        }
        let new_msg = {
            ...message,
            created_time: created_time,
            createdAt: firestore.FieldValue.serverTimestamp()
        };
        await channel_collection(channel)
            .doc(channelId)
            .collection('messages').doc(message._id).set(new_msg);

        let channel_ref = await channel_collection(channel).doc(channelId).get()
        if (channel_ref.data() != null) {
            let unread_cnt = {}
            let member_ids = [];
            let users_in_channel = channel_ref.data().users || [];
            let cur_unread = channel_ref.data().unread_cnt || {};
            users_in_channel.map(item => {
                if (item != user_id) {
                    if (cur_unread[item] != null) {
                        unread_cnt[item] = (cur_unread[item] || 0) + 1
                    }
                    else {
                        unread_cnt[item] = 1
                    }
                    member_ids.push(item);
                }
            })
            await channel_collection(channel).doc(channelId).update('unread_cnt', unread_cnt, 'last_msg', new_msg);

            let member_users = [];
            let member_riders = [];

            for (let i = 0; i < member_ids.length; i++) {
                let memberId = member_ids[i];

                if (channel == 'order_support') {
                    let members = channel_ref.data().members || [];
                    let findMember = members.find(m => m.id == memberId);
                    if (findMember && findMember.role == CONSTANTS.ROLE_RIDER) {
                        member_riders.push(memberId);
                    }
                    else if (findMember && findMember.role == CONSTANTS.ROLE_CUSTOMER) {
                        member_users.push(memberId);
                    }
                }
                else {
                    if (channel_ref.data().channel_type == 'single') {
                        if (channel_ref.data().creator.id == memberId) {
                            if (channel_ref.data().creator.role == CONSTANTS.ROLE_RIDER) {
                                member_riders.push(memberId);
                            }
                            else {
                                member_users.push(memberId);
                            }
                        }
                        else if (channel_ref.data().partner.id == memberId) {
                            if (channel_ref.data().partner.role == CONSTANTS.ROLE_RIDER) {
                                member_riders.push(memberId);
                            }
                            else {
                                member_users.push(memberId);
                            }
                        }
                    }
                }
            }

            if (member_users.length > 0 || member_riders.length > 0) {
                // send notification
                sendChatNotification(
                    channelId,
                    channel_ref.data().channel_type,
                    channel_ref.data().channel_type == 'group' ? channel_ref.data().full_name : null,
                    user_id,
                    member_users,
                    member_riders,
                    getMsgDescription(new_msg)
                );
            }

        }

    } catch (err) {
        console.log(err);
    }
};

export const sendChatNotification = (conversation_id, channel_type, group_name, sender_id, member_users, member_riders, message) => {
    API.sendChatNotification({
        conversation_id: conversation_id,
        channel_type: channel_type,
        group_name: group_name,
        sender_id: sender_id,
        member_ids: member_users,
        member_riders: member_riders,
        message: message
    })
        .then(() => { })
        .catch((err) => { console.log('send chat notif err ', err, err.response) });
}

export const uploadImage = (base64Image) => {
    return API.uploadChatImage({ image: base64Image })
};


// export const updateChannelUserInfo = async (channel = 'channels', user) => {
//     try {
//         let channel_creator_ref = await channel_collection(channel).where('channel_type', '==', 'single')
//             .where('creator.id', '==', user.unique_id)
//             .get();

//         let channel_partner_ref = await channel_collection(channel).where('channel_type', '==', 'single')
//             .where('partner.id', '==', user.unique_id)
//             .get();


//         var batch = firestore().batch();
//         channel_creator_ref.docs.forEach(doc => {
//             if (doc.data() != null) {
//                 let new_creator = {
//                     ...doc.data().creator,
//                     full_name: user.full_name,
//                     email: user.email,
//                     phone: user.phone,
//                     photo: user.photo
//                 };
//                 let channel_item_ref =  channel_collection(channel).doc(doc.data().id);
//                 batch.update(channel_item_ref, { "creator": new_creator });
//             }
//         })
//         channel_partner_ref.docs.forEach(doc => {
//             if (doc.data() != null) {
//                 let new_partner = {
//                     ...doc.data().partner,
//                     full_name: user.full_name,
//                     email: user.email,
//                     phone: user.phone,
//                     photo: user.photo
//                 };
//                 let channel_item_ref =  channel_collection(channel).doc(doc.data().id);
//                 batch.update(channel_item_ref, { "partner": new_partner });
//             }
//         })

//         await batch.commit()
//     }
//     catch (error) {
//         console.log('updateChannelUserInfo', error)
//         return null
//     }
// }

