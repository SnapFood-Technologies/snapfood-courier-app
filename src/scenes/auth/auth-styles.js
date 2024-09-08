import {StyleSheet} from 'react-native';
import {Spacing, Typography, Globals, Colors} from '_styles';

export const LoginStyles = StyleSheet.create({
  container: {
    ...Globals.container,
    paddingTop: Spacing.SCALE_64,
    backgroundColor: Colors.WHITE,
  },
  logo_img: {
    alignSelf: 'center',
    marginBottom: Spacing.SCALE_28,
    height : 28,
    resizeMode: 'contain',
  },
  login_img: {
    marginVertical: Spacing.SCALE_28,
    alignSelf: 'center',
    maxWidth: 200,
    maxHeight: 200,
  },
  keyboard_view: {
    flex: 1,
  },
  scroll_container: {
    paddingBottom: Spacing.SCALE_32,
    paddingHorizontal: Spacing.SCALE_16,
  },
  remember_container: {
    backgroundColor: 'transparent',
    padding: 0,
    marginBottom: Spacing.SCALE_32,
    alignSelf: 'flex-start',
    borderWidth: 0,
  },
  forgot_container: {
    marginTop: Spacing.SCALE_32,
    alignSelf: 'center',
  },
});
export const ForgotPasswordStyles = StyleSheet.create({
  forgot_img: {
    marginVertical: Spacing.SCALE_32,
    alignSelf: 'center',
  },
  description: {
    ...Typography.POPPINS_REGULAR_GRAY_600_14,
    textAlign: 'center',
    paddingHorizontal: Spacing.SCALE_45,
    marginBottom: Spacing.SCALE_60,
  },
  topSpacing: {
    marginTop: Spacing.SCALE_24,
  },
});
