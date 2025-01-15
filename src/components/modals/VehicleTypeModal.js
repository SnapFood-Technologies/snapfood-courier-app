import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { Spacing, Colors, Typography } from '_styles';
// svgs
import Svg_bike_active from '../../assets/svgs/profile/bike_active.svg'
import Svg_bike_inactive from '../../assets/svgs/profile/bike_inactive.svg'
import Svg_car_active from '../../assets/svgs/profile/car_active.svg'
import Svg_car_inactive from '../../assets/svgs/profile/car_inactive.svg'
import Svg_motobike_active from '../../assets/svgs/profile/motobike_active.svg'
import Svg_motobike_inactive from '../../assets/svgs/profile/motobike_inactive.svg' 
import Svg_checkmark from '../../assets/svgs/profile/checkmark.svg';

const VehicleTypeModal = ({ title, showModal, curValue, onSelect, onClose}) => {
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
            <TouchableOpacity activeOpacity={0.8} onPress={()=>onSelect('Car')} style={[styles.row_center, { width: '100%', height: 50 }]}>
                {curValue == 'Car' ? <View style={styles.optionIcon}><Svg_car_active /></View> : <View style={styles.optionIcon}><Svg_car_inactive /></View>}
                <Text style={[styles.modalBtnTxt, {color: (curValue == 'Car' ? Colors.LIGHTBLACK : Colors.GRAY_600) }]}>Car</Text>
                {curValue == 'Car' && <View style={styles.checkUnCheck}><Svg_checkmark /></View>} 
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity activeOpacity={0.8} onPress={()=>onSelect('Bike')} style={[styles.row_center, { width: '100%', height: 50 }]}>
                {curValue == 'Bike' ? <View style={styles.optionIcon}><Svg_bike_active /></View> : <View style={styles.optionIcon}><Svg_bike_inactive /></View>} 
                <Text style={[styles.modalBtnTxt, {color: (curValue == 'Bike' ? Colors.LIGHTBLACK : Colors.GRAY_600) }]}>Bike</Text>
                {curValue == 'Bike' && <View style={styles.checkUnCheck}><Svg_checkmark /></View>} 
            </TouchableOpacity> 
            <View style={styles.divider} />
            <TouchableOpacity activeOpacity={0.8} onPress={()=>onSelect('Motobike')} style={[styles.row_center, { width: '100%', height: 50 }]}>
                {curValue == 'Motobike' ? <View style={styles.optionIcon}><Svg_motobike_active /></View> : <View style={styles.optionIcon}><Svg_motobike_inactive /></View>} 
                <Text style={[styles.modalBtnTxt, {color: (curValue == 'Motobike' ? Colors.LIGHTBLACK : Colors.GRAY_600) }]}>Motobike</Text>
                {curValue == 'Motobike' && <View style={styles.checkUnCheck}><Svg_checkmark /></View>} 
            </TouchableOpacity> 
        </View>
    </Modal>
};

const styles = StyleSheet.create({
    row_center: { flexDirection: 'row', alignItems: 'center' },
    modalContent: { flexDirection: 'column', width: '100%', paddingHorizontal: 30, paddingVertical: 20, backgroundColor: 'white', borderRadius: 20, },
    modalTitle: { textAlign: 'center', fontSize: 20, fontFamily: Typography.FONT_FAMILY_MONTSERRAT_BOLD, color: '#000000', },
    titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
    modalBtnTxt: { flex: 1, marginLeft: 8, fontSize: 14, fontFamily: Typography.FONT_FAMILY_MONTSERRAT_SEMIBOLD, color: '#000000' },
    divider: {
        width: '100%', height: 0, borderRadius: 12, borderWidth: 1, borderColor: '#D4D4D4', borderStyle: 'dashed',
    },
    checkUnCheck: { height: 18, width: 18,},
    optionIcon: { height: 24, width: 24, marginRight: 10 },
    closeBtnTxt: { fontSize: 12, color: '#000', fontFamily: Typography.FONT_FAMILY_MONTSERRAT_SEMIBOLD },
})
export default VehicleTypeModal;

