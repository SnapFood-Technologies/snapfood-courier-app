import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Modal from 'react-native-modal';  
import { Typography, Colors } from '_styles'; 

const AddTimeModal = ({ showModal, onYes, onClose }) => {
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
            <Text style={styles.modalTitle}>Add time</Text>
            <View style={[styles.row_center, {marginTop: 20,}]}> 
                <TouchableOpacity onPress={() => {}} style={[styles.col_center, styles.input, {flex:1, }]}>
                    <Text style={styles.timelabel}>Start time</Text>
                    <Text style={styles.timeTxt}>11:00</Text>
                </TouchableOpacity>
                <View style={{width: 15}}/>
                <TouchableOpacity onPress={() => {}} style={[styles.col_center, styles.input, {flex:1, }]}>
                    <Text style={styles.timelabel}>End time</Text>
                    <Text style={styles.timeTxt}>16:00</Text>
                </TouchableOpacity>
            </View> 
            <View style={[styles.row_center, {marginTop: 30,}]}> 
                <TouchableOpacity onPress={() => onClose()} style={[styles.row_center, {flex:1, }]}>
                    <Text style={styles.noTxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onYes()} style={[styles.row_center, {flex:1, }]}>
                    <Text style={styles.yesTxt}>Okay</Text>
                </TouchableOpacity>
            </View> 
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    col_center: {flexDirection: 'column', justifyContent: 'center', alignItems: 'center'},
    row_center: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
    modalContent: { width: '100%', paddingHorizontal: 40, paddingBottom: 30, paddingTop: 30, backgroundColor: '#fff', borderRadius: 15, },
    modalTitle: { textAlign: 'center', paddingHorizontal: 40, fontSize: 24, fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD, color: Colors.LIGHTBLACK, },
    yesTxt: { fontSize: 18, fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD, color: Colors.PRIMARY},
    noTxt: { fontSize: 18, fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD, color: Colors.GRAY_600  },
    timelabel: { fontSize: 14, fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM, color: Colors.GRAY_600  },
    timeTxt: { fontSize: 36, fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD, color: '#333'  },
    input : {backgroundColor : '#F6F7F9', borderRadius: 12, padding: 12,},
});

export default AddTimeModal;