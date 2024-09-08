import {StyleSheet} from 'react-native';
import {Spacing, Colors, Typography} from '_styles';
export const DashboardStyles = StyleSheet.create({
  header: {
    paddingTop: Spacing.SCALE_48,
    paddingHorizontal: Spacing.SCALE_16,
    paddingBottom: Spacing.SCALE_12,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    shadowOpacity: 0.07,
    shadowRadius: 2.62,
    elevation: 4,
    shadowColor: '#656D74',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  header_btn_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge_container: {
    position: 'absolute',
    right: -Spacing.SCALE_8,
    top: -Spacing.SCALE_8,
  },
  badge: {
    backgroundColor: Colors.LIGHTBLACK,
  },
  header_btn: {
    marginLeft: Spacing.SCALE_12, 
  },
  earning_container: {
    width: '100%',
    borderRadius: Spacing.SCALE_10,
    backgroundColor: Colors.PRIMARY,
    display: 'flex',
    flexDirection: 'column',
    padding: Spacing.SCALE_24,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  center_row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  margin_bottom_24: {
    marginBottom: Spacing.SCALE_24,
  },
  flex_1: {
    flex: 1,
  },
  col_flex_2: {
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
  },
  earning_label: {
    ...Typography.POPPINS_MEDIUM_WHITE_12,
    textAlign: 'center',
  },
  earning_value: {
    ...Typography.POPPINS_SEMIBOLD_WHITE_24,
    textAlign: 'center',
  },
  border_right_white_1: {
    borderRightWidth: 1,
    borderRightColor: 'white',
  },
  label: {
    ...Typography.POPPINS_MEDIUM_LIGHTBLACK_16,
    marginBottom: Spacing.SCALE_8,
    marginTop: Spacing.SCALE_24,
  },
  summary_container: {
    flexDirection: 'row',
  },
  summary_image: {
    position: 'absolute',
    left: 24,
    top: 24,
  },
  delivered_container: {
    backgroundColor: '#1ED7AA',
    flex: 1,
    aspectRatio: 1,
    borderRadius: Spacing.SCALE_10,
    padding: Spacing.SCALE_20,
    alignItems: 'center',
  },
  rejected_container: {
    backgroundColor: Colors.PRIMARY,
    marginLeft: Spacing.SCALE_8,
    flex: 1,
    aspectRatio: 1,
    borderRadius: Spacing.SCALE_10,
    padding: Spacing.SCALE_20,
    alignItems: 'center',
  },
  rating_container: {
    width: '100%',
    borderRadius: Spacing.SCALE_10,
    backgroundColor: '#FFB300',
    padding: Spacing.SCALE_24,
    flexDirection: 'row',
  },
});
export const AvgRatingStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Spacing.SCALE_24,
  },
  top_container: {
    flexDirection: 'row',
    paddingVertical: Spacing.SCALE_16,
  },
  overall_container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detail_container: {
    flex: 4,
  },
  divider: {
    backgroundColor: Colors.LIGHTGRAY,
    marginHorizontal: Spacing.SCALE_16,
  },
  all_review: {
    ...Typography.MONSERRAT_BOLD_DARKBLACK_13,
    paddingTop: Spacing.SCALE_12,
    paddingLeft: Spacing.SCALE_16,
    marginBottom: Spacing.SCALE_8,
  },
});
export const ChatMessageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: Spacing.SCALE_40,
    height: Spacing.SCALE_40,
    borderRadius: Spacing.SCALE_24,
    marginRight: Spacing.SCALE_8,
  },
});
