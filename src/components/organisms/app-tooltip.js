import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StatusBar, View, Text, StyleSheet, Platform } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import Foundation from 'react-native-vector-icons/Foundation';
import { FONT_FAMILY_POPPINS_BOLD, FONT_FAMILY_POPPINS_MEDIUM, POPPINS_SEMIBOLD_LIGHTBLACK_14 } from 'styles/typography';
import { Colors, Globals } from '_styles';
import { isEmpty } from 'utils/common';

const AppTooltip = ({ anchor, title, description }) => {
    const [showTooltip, setToolTip] = useState(false);
    return (
        <Tooltip
            isVisible={showTooltip}
            backgroundColor={'transparent'}
            content={
                <View style={styles.tooltip}>
                    {!isEmpty(title) && <Text style={styles.title}>{title}</Text>}
                    <Text style={styles.description}> {description} </Text>
                </View>
            }
            placement="top"
            tooltipStyle={{ backgroundColor: 'transparent' }}
            topAdjustment={ 0}
            contentStyle={{ elevation: 7, borderRadius: 16, }}
            arrowStyle={{ elevation: 7, marginTop: 0, }}
            showChildInTooltip={false}
            disableShadow={false}
            onClose={() => setToolTip(false)}
        >
            <TouchableOpacity style={[Globals.h_center, {paddingBottom: 3}]} onPress={() => setToolTip(true)}>
                {anchor ? anchor : <Foundation name='info' size={20} color={Colors.GRAY_600} />}
            </TouchableOpacity>
        </Tooltip>
    )
};

const styles = StyleSheet.create({
    title: { fontSize: 16, fontFamily: FONT_FAMILY_POPPINS_BOLD, color: Colors.LIGHTBLACK },
    description: { textAlign: 'center', fontSize: 15, fontFamily: FONT_FAMILY_POPPINS_MEDIUM, color: Colors.LIGHTBLACK, marginTop: 8 },
    tooltip: { backgroundColor: '#fff', borderRadius: 20, padding: 8, },
})

function arePropsEqual(prevProps, nextProps) {
    return prevProps.title == nextProps.title && prevProps.description == nextProps.description;
}

export default React.memo(AppTooltip, arePropsEqual);
