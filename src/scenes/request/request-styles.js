import {StyleSheet} from 'react-native';
import {Globals, Spacing, Colors, Typography} from '_styles';
export const RequestSummaryStyles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map_container: {
    flex: 1,  
    justifyContent: 'flex-end',
  },
  statusToggle: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  thumb: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export const RequestDetailStyles = StyleSheet.create({
  container: {
    ...Globals.flex_1,
    backgroundColor: 'white',
  },
  map: {
    height: Spacing.SCALE_200,
    marginBottom: Spacing.SCALE_16,
  },
  item_container: {
    marginTop: Spacing.SCALE_12,
  },
  sub_container: {
    ...Globals.flex_1,
    padding: Spacing.SCALE_16,
  },
  divider_container: {
    marginVertical: Spacing.SCALE_6,
  },
  divider: {
    height: 0.7,
    backgroundColor: Colors.GRAY_200,
  },
  fullscreen_view: {
    backgroundColor: 'white',
    width: Spacing.SCALE_36,
    height: Spacing.SCALE_36,
    marginTop: -Spacing.SCALE_80,
    marginBottom: Spacing.SCALE_24,
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
  btn_container: {
    flexDirection: 'row',
  },
  btn_green: {
    marginHorizontal: Spacing.SCALE_6,
    backgroundColor: Colors.GREEN_200,
    borderRadius: Spacing.SCALE_6,
  },
  btn_red: {
    marginHorizontal: Spacing.SCALE_6,
    backgroundColor: Colors.RED_200,
    borderRadius: Spacing.SCALE_6,
  },
  btn_title: {
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    lineHeight: 24,
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
