import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Modal from 'react-native-modal'; 
import { Typography, Colors } from '_styles'; 

const ConfirmModal = ({ showModal, title, yes, no, onYes, onClose }) => {
    const [visible, SetVisible] = useState(showModal)
    useEffect(()=>{ 
        SetVisible(showModal)
    }, [showModal])

    return <Modal
        isVisible={visible}
        backdropOpacity={0.33}
        onSwipeComplete={() => onClose()}
        onBackdropPress={() => onClose()}  >
        <View style={[styles.col_center, styles.modalContent]}>
            <Text style={styles.modalTitle}>{title}</Text>
            <View style={[styles.row_center, {marginTop: 30,}]}> 
                <TouchableOpacity onPress={() => onClose()} style={[styles.row_center, {flex:1, }]}>
                    <Text style={styles.noTxt}>{no}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onYes()} style={[styles.row_center, {flex:1, }]}>
                    <Text style={styles.yesTxt}>{yes}</Text>
                </TouchableOpacity>
            </View> 
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    col_center: {flexDirection: 'column', justifyContent: 'center', alignItems: 'center'},
    row_center: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
    modalContent: { width: '100%', paddingHorizontal: 40, paddingBottom: 30, paddingTop: 30, backgroundColor: '#fff', borderRadius: 15, },
    modalTitle: { textAlign: 'center', paddingHorizontal: 40, fontSize: 16, fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD, color:  Colors.LIGHTBLACK, },
    yesTxt: { fontSize: 14, fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD, color: Colors.PRIMARY},
    noTxt: { fontSize: 14, fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD, color: Colors.GRAY_600  },
});

export default ConfirmModal;