import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'; 
import StarRating from 'react-native-star-rating';
import { Colors, Spacing, Typography } from '_styles';
import FastImage from 'react-native-fast-image';
import Moment from 'react-moment';
import moment from 'moment-timezone';
import Config from 'react-native-config';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    padding: Spacing.SCALE_16,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 1,
  },
  inner_container: {
    flex: 1,
    marginLeft: Spacing.SCALE_12,
  },
  nametime_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar_img: {
    borderRadius: Spacing.SCALE_24,
    width: Spacing.SCALE_48,
    height: Spacing.SCALE_48,
  },
  rating: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.SCALE_8,
  },
  description : {
    fontSize: 12, 
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    color: Colors.GRAY_600,
    marginTop: 10,
    lineHeight: 18,
  },
  readmore : {
    fontSize: 12, 
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    color: Colors.PRIMARY,
    marginTop: 10,
    lineHeight: 18,
  },
});
const ReviewItem = (props) => {
  const { avatar, name, time, rating, description } = props;
  console.log(avatar);

  const [showLen, setShowLen] = useState(60)
 
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.avatar_img}
        source={{
          uri: avatar,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.inner_container}>
        <View style={styles.nametime_container}>
          <Text style={Typography.MONSERRAT_BOLD_DARKBLACK_15}>{name}</Text>
          <Moment
            tz="Europe/Tirane"
            element={Text}
            // fromNow
            format="DD-MM-YYYY"
            style={Typography.MONSERRAT_MEDIUM_LIGHTGRAY_11}>
            {moment.tz(time, Config.TIME_ZONE)}
          </Moment>
        </View> 
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <StarRating
            disabled={true}
            halfStarEnabled={true}
            maxStars={5}
            starSize={16}
            rating={rating}
            // containerStyle={{ width: '100%', }}  
            starStyle={{ marginRight: 6 }}
            fullStarColor={Colors.RED_800}
            // emptyStar={'star'}
            emptyStarColor={Colors.GRAY_700}
          // starStyle = {{color : '#FFBF13'}} 
          />
        </View> 
        <Text style={styles.description} >
          {description.slice(0, showLen)}{description.length > showLen && '...'}
        </Text>
        {
          description.length > showLen &&
          <TouchableOpacity onPress={()=>setShowLen(description.length)}>
            <Text style={styles.readmore}>Read More</Text>
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};
export default ReviewItem;
