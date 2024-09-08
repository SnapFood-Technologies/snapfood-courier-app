import {StyleSheet} from 'react-native'; 
import {Globals, Spacing, Colors, Typography} from '_styles';

export const EarningSummaryStyles = StyleSheet.create({
  container: {
    paddingTop: Spacing.SCALE_18, 
    flex: 1,
    backgroundColor: '#F6F7F9',
  },
  inner_container: { 
    flexDirection: 'row',
    justifyContent: 'space-between',  
  },
  weekly_container: {
    marginTop: Spacing.SCALE_32,
    paddingHorizontal: Spacing.SCALE_16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F6F7F9',
    marginBottom: Spacing.SCALE_12,
  },
  divider_4: {
    height: Spacing.SCALE_8,
    backgroundColor: '#F6F7F9',
    marginBottom: Spacing.SCALE_12,
  },
  chart: {
    alignSelf: 'center', 
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#F6F7F9',
    marginLeft: -40,
  },
  center_container: {
    alignItems: 'center',
  },
  day_start: {
    borderRadius: Spacing.SCALE_20,
    aspectRatio: 1,
    backgroundColor: Colors.PRIMARY,
  },
  day_range: {
    borderRadius: Spacing.SCALE_20,
    aspectRatio: 1,
    backgroundColor: '#50B7ED32',
  },
  chevron_container: {
    backgroundColor: '#EFEFF4',
    borderRadius: 100,
    width: Spacing.SCALE_32,
    height: Spacing.SCALE_32,
    justifyContent: 'center',
    alignContent: 'center',
  },
  summary_container : {
    backgroundColor : Colors.WHITE,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summary_title : {
    fontSize: 16, 
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    color: Colors.LIGHTBLACK,
  },
  summary_key : {
    fontSize: 14, 
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    color: Colors.GRAY_600,
  },
  summary_total : {
    fontSize: 14, 
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    color: Colors.PRIMARY,
  },
  sheetContainer : {
    marginTop: -40,
    paddingTop: 40,
    borderTopLeftRadius: Spacing.SCALE_20,
    borderTopRightRadius: Spacing.SCALE_20,
  },
  sheetCloseBtn : {  
    zIndex: 100
  },
});
