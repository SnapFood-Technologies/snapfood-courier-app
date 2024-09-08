import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Typography, Spacing} from '_styles';
import {ITEM_ICON} from '_assets/images';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item_icon: {
    marginTop: Spacing.SCALE_2,
    marginRight: Spacing.SCALE_8,
  },
});
const ItemDetail = (props) => {
  const {name, detail, quantity, options} = props;
  return (
    <View style={styles.container}>
      <Image source={ITEM_ICON} style={styles.item_icon} />
      <View>
        <Text style={Typography.POPPINS_SEMIBOLD_LIGHTBLACK_14}>
          {name + ` (${quantity})`}
        </Text>
        {/* {detail !== null && detail.length > 0 && (
          <Text style={Typography.POPPINS_REGULAR_GRAY_600_12}>{detail}</Text>
        )} */}
        {
          options != null && options.length > 0 && ( 
            <Text style={Typography.POPPINS_REGULAR_GRAY_600_12}>{ options.map(function(option) {
              return option.title;
            }).join(', ')}</Text>
          )
        }
      </View>
    </View>
  );
};
export default ItemDetail;
