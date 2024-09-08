import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Typography } from '_styles';
// svgs
import Svg_done from 'assets/svgs/order/confirm.svg';

const OrderDeliveredModal = ({ showModal, onOk, onClose }) => {
    const [visible, SetVisible] = useState(showModal)
    useEffect(() => {
        SetVisible(showModal)
    }, [showModal])

    return <Modal
        isVisible={visible}
        backdropOpacity={0.33}
        onSwipeComplete={() => onClose()}
        onBackdropPress={() => onClose()}  >
        <View style={[styles.col_center, styles.modalContent]}>
            <Text style={styles.modalTitle}>Confirmation</Text>
            <Svg_done />
            <Text style={styles.modalDesc}>Your order has been successfully delivered</Text>
            <View style={[styles.row_center, { marginTop: 30, }]}>
                <TouchableOpacity onPress={() => onClose()} style={[styles.row_center, { flex: 1, }]}>
                    <Text style={styles.noTxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onOk()} style={[styles.row_center, { flex: 1, }]}>
                    <Text style={styles.yesTxt}>Okay</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    col_center: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    row_center: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '100%', paddingHorizontal: 40, paddingBottom: 30, paddingTop: 30, backgroundColor: '#fff', borderRadius: 15, },
    modalTitle: { marginBottom: 8, textAlign: 'center', fontSize: 24, fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD, color: Colors.LIGHTBLACK, },
    modalDesc: { marginTop: 20, width: '100%', textAlign: 'center', fontSize: 16, fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM, color: Colors.LIGHTBLACK, },
    yesTxt: { fontSize: 18, fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD, color: Colors.PRIMARY },
    noTxt: { fontSize: 18, fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD, color: Colors.GRAY_600 },
});

export default OrderDeliveredModal;