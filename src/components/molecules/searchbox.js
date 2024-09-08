import React, { memo } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import { default as EvilIcon } from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors, Typography } from '_styles';

const SearchBox = memo(({ hint = 'Search', onChangeText, onClose  }) => {
    return (
        <View style={styles.container}>
            <EvilIcon name="search" size={24} color={Colors.GRAY_500} />
            <TextInput
                placeholder={hint}
                placeholderTextColor={Colors.GRAY_500}
                onChangeText={(val) => onChangeText(val)}
                style={styles.input} />
            <TouchableOpacity onPress={onClose ? onClose : ()=>{}}>
                <AntDesign name="close" size={16} color={Colors.GRAY_500} />
            </TouchableOpacity> 
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D4D4D4',
        backgroundColor: '#F6F7F9',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    input: {
        margin: 0,
        marginLeft: 4,
        flex: 1,
        color: Colors.DARKBLACK,
        fontSize: 12,
        fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
        height: 40, 
        padding: 0,
    }
});

export default SearchBox;
