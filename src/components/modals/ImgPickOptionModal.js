import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { Spacing, Colors, Typography } from '_styles';
// svgs
import Svg_image from '../../assets/svgs/chat/ic_photo.svg'
import Svg_camera from '../../assets/svgs/chat/ic_camera.svg'
import Svg_file from '../../assets/svgs/chat/ic_file.svg'


const ImgPickOptionModal = ({ title, showModal, onCapture, onImageUpload, onClose, onFilePick }) => {
    const [visible, SetVisible] = useState(showModal)

    useEffect(() => {
        SetVisible(showModal)
    }, [showModal])

    return <Modal
        isVisible={visible}
        backdropOpacity={0.33}
        onSwipeComplete={onClose}
        onBackdropPress={onClose}
        swipeDirection={['down']}
        style={{ justifyContent: 'flex-end', margin: 20 }}>
        <View style={[styles.modalContent]}>
            <View style={styles.titleRow}>
                <Text style={styles.modalTitle}>{title ? title : 'Select Option'}</Text>
                <TouchableOpacity onPress={onClose} >
                    <Text style={[styles.closeBtnTxt]}>Close</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onCapture} style={[styles.row_center, { width: '100%', height: 50 }]}>
                <View style={styles.imageIcon}><Svg_camera /></View>
                <Text style={styles.modalBtnTxt}>Camera</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={onImageUpload} style={[styles.row_center, { width: '100%', height: 50 }]}>
                <View style={styles.imageIcon}><Svg_image /></View>
                <Text style={styles.modalBtnTxt}>Gallery</Text>
            </TouchableOpacity>
            { onFilePick && <View style={styles.divider} />}
            {
                onFilePick &&
                <TouchableOpacity onPress={onFilePick} style={[styles.row_center, { width: '100%', height: 50 }]}>
                    <View style={styles.imageIcon}><Svg_file /></View>
                    <Text style={styles.modalBtnTxt}>File</Text>
                </TouchableOpacity>
            }
        </View>
    </Modal>
};

const styles = StyleSheet.create({
    row_center: { flexDirection: 'row', alignItems: 'center' },
    modalContent: { flexDirection: 'column', width: '100%', paddingHorizontal: 30, paddingVertical: 20, backgroundColor: 'white', borderRadius: 20, },
    modalTitle: { textAlign: 'center', fontSize: 20, fontFamily: Typography.FONT_FAMILY_MONTSERRAT_BOLD, color: '#000000', },
    titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
    modalBtnTxt: { flex: 1, marginLeft: 8, fontSize: 14, fontFamily: Typography.FONT_FAMILY_MONTSERRAT_SEMIBOLD, color: '#000000' },
    imageIcon: { height: 24, width: 24, marginRight: 10 },
    divider: {
        width: '100%', height: 0, borderRadius: 12, borderWidth: 1, borderColor: '#D4D4D4', borderStyle: 'dashed',
    },
    closeBtnTxt: { fontSize: 12, color: '#000', fontFamily: Typography.FONT_FAMILY_MONTSERRAT_SEMIBOLD },
})
export default ImgPickOptionModal;

