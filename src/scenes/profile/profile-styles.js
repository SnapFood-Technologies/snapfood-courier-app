import { StyleSheet } from 'react-native';
import { Spacing, Typography, Colors } from '_styles';
export const ProfileStyles = StyleSheet.create({
  list: {
    backgroundColor: 'transparent',
  },
  list_content: {
    height: Spacing.SCALE_32,
  },
  list_content_title: {
    color: Colors.DARK_V1,
  },
  list_image: {
    marginLeft: Spacing.SCALE_12,
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export const RiderFriendStyles = StyleSheet.create({
  label: {
    ...Typography.MONSERRAT_BOLD_DARKBLACK_13,
    paddingTop: Spacing.SCALE_12,
    marginBottom: Spacing.SCALE_8,
  }, 
});
export const ChangePasswordStyles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    paddingTop: 30,
  },
});
export const PersonalInfoStyles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    paddingTop: Spacing.SCALE_16,
  },
});
export const EditInfoStyels = StyleSheet.create({
  innerContainer: {
    flex: 1,
    paddingTop: Spacing.SCALE_16,
  },
  chevron_container: {
    backgroundColor: '#EFEFF4',
    borderRadius: 100,
    width: Spacing.SCALE_32,
    height: Spacing.SCALE_32,
    justifyContent: 'center',
    alignContent: 'center',
  },
  imgContainer: {
    alignSelf: 'center',
  },
  editBtn: {
    width: Spacing.SCALE_24,
    height: Spacing.SCALE_24,
    borderRadius: Spacing.SCALE_12,
  },
  editBtn_container: {
    position: 'absolute',
    right: Spacing.SCALE_12,
    bottom: 0,
    backgroundColor: Colors.PRIMARY,
    width: Spacing.SCALE_36,
    height: Spacing.SCALE_36,
    borderRadius: Spacing.SCALE_18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
export const RiderDetailStyles = StyleSheet.create({
  avatar: {
    width: Spacing.SCALE_120,
    height: Spacing.SCALE_120,
    borderRadius: Spacing.SCALE_60,
  },
  avatar_container: {
    marginTop: Spacing.SCALE_32,
    marginBottom: Spacing.SCALE_48,
    alignSelf: 'center',
  },
  badge_container: {
    position: 'absolute',
    right: Spacing.SCALE_16,
    bottom: 0,
  },
  badge: {
    width: Spacing.SCALE_24,
    height: Spacing.SCALE_24,
    borderRadius: Spacing.SCALE_12,
  },
  detail_container: { 
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_container: { 
    paddingHorizontal: 20,
  },
  btn_outline: {
    height: 50, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  btn: {
    height: 50,  
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: '#1ED7AA',
  },
  btn_title: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD, 
  },
  btn_title_outline: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
  },
  name: {
    fontSize: 24,
    fontFamily: Typography.FONT_FAMILY_POPPINS_SEMIBOLD,
    color: Colors.LIGHTBLACK,
    marginTop: Spacing.SCALE_8, 
  },
  age: {
    fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
    fontSize: 14, 
    color: '#989898', 
  }
});
export const MyWalletStyles = StyleSheet.create({
  tip: {
    ...Typography.MONSERRAT_SEMIBOLD_MEDIUMGRAY_12,
    marginBottom: Spacing.SCALE_16,
    textAlign: 'center',
  },
});
export const BankAccountStyles = StyleSheet.create({});

export const SearchRiderStyles = StyleSheet.create({
  header_container: {
    flexDirection: 'row',
    flex: 1,
  },
  search_container: {
    backgroundColor: 'transparent',
    padding: 0,
    flex: 1,
  },
  search_input_container: {
    backgroundColor: '#F8F8F8',
  },
});
