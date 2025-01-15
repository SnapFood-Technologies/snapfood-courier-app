import {StyleSheet} from 'react-native';
import {Spacing, Colors, Typography, Globals} from '_styles';
export const OrderSummaryStyles = StyleSheet.create({
  group_container: {
    height: 40,
    marginTop: Spacing.SCALE_16,
    borderRadius: 8,
    backgroundColor: '#f6f7f9',
  },
  group_btn : {
    backgroundColor: '#f6f7f9',
  },
  group_btn_selected: {
    backgroundColor: Colors.PRIMARY,
  },
  group_btn_txt : {
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    fontSize: 14,
    lineHeight: 19
  },
  date_select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Spacing.SCALE_4,
    borderWidth: 1,
    borderColor: Colors.GRAY_200,
    paddingVertical: Spacing.SCALE_8,
    paddingHorizontal: Spacing.SCALE_8,
    backgroundColor: 'white',
    marginBottom: Spacing.SCALE_8,
  },
  list_content: {
    backgroundColor: 'white',
    padding: Spacing.SCALE_12,
    flex: 1,
  },
  chevron_container: {
    backgroundColor: '#EFEFF4',
    width: Spacing.SCALE_36,
    height: Spacing.SCALE_36,
    borderRadius: Spacing.SCALE_18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  day_start: {
    borderRadius: Spacing.SCALE_2,
    backgroundColor: Colors.PRIMARY,
  },
  day_selected: {
    backgroundColor: Colors.RED_100,
    opacity: 0.2,
  },
  btn_container: {
    marginTop: Spacing.SCALE_32,
  },
});
export const OrderDetailStyles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map_container: {
    height: Spacing.SCALE_300,
  },
  scroll_view: {
    backgroundColor: 'white',
    paddingHorizontal: Spacing.SCALE_10, 
  },
  divider: {
    height: Spacing.SCALE_6,
    backgroundColor: '#F2F2F2',
  },
  detail_container: {
    marginTop: Spacing.SCALE_6,
    marginBottom: Spacing.SCALE_12,
  },
  item_container: {
    marginTop: Spacing.SCALE_12,
  },
  btn_outline: {
    borderColor: Colors.PRIMARY,
    marginRight: Spacing.SCALE_4,
  },
  btn_title_outline: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_13,
    fontFamily: Typography.FONT_FAMILY_MONTSERRAT_MEDIUM,
  },
  comment_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fullscreen_view: {
    backgroundColor: 'white',
    width: Spacing.SCALE_36,
    height: Spacing.SCALE_36,
    marginTop: -Spacing.SCALE_60,
    marginBottom: Spacing.SCALE_12,
    marginRight: Spacing.SCALE_16,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Spacing.SCALE_24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.62,

    elevation: 4,
  },
  info_container : {
    backgroundColor: 'white',  
    padding: 20,
    marginBottom: Spacing.SCALE_10,   
    borderRadius: Spacing.SCALE_16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.62, 
    elevation: 2,
  },
  subject_title : {
    fontSize: 16,
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    color: Colors.LIGHTBLACK
  },
  support_title : {
    marginLeft: 3,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    color: Colors.PRIMARY
  },
});
export const OrderStyles = StyleSheet.create({
  footer: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Spacing.SCALE_20, 
    paddingTop: 20,
    paddingBottom: 35,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius : 40,
    borderTopRightRadius : 40,
  },
  list_content: {
    backgroundColor: '#f6f7f9',
    padding: Spacing.SCALE_12,
  },
  text_input: {
    ...Globals.flex_1,
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    marginRight: Spacing.SCALE_8,
    borderBottomColor: Colors.GRAY_700,
    borderBottomWidth: 1,
    paddingBottom: 6, 
  },
  calenderIcon: {
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
