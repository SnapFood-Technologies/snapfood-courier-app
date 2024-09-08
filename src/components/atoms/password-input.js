import React from 'react';
import {Input} from 'react-native-elements';
import {TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Typography, Spacing} from '_styles';
import {PASSWORD_ICON, BLUE_EYE_ICON, GREY_EYE_ICON} from '_assets/images';
// svg
import Svg_pass from '../../assets/svgs/profile/pass_icon.svg';

class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  render = () => {
    return (
      <Input
        value={this.props.value}
        onChangeText={this.props.onChangeText}
        style={Typography.POPPINS_MEDIUM_LIGHTBLACK_16}
        secureTextEntry={!this.state.visible}
        label={this.props.label}
        autoCapitalize="none"
        leftIcon={
          this.props.left ? (
            this.props.left
          ) : (
            <Svg_pass width={28} height={28} />
          )
        }
        labelStyle={Typography.POPPINS_MEDIUM_LIGHTGRAY_12}
        rightIcon={
          <TouchableOpacity
            onPress={() =>
              this.setState((prevState) => ({
                visible: !prevState.visible,
              }))
            }>
            {this.state.visible ? (
              <Image source={BLUE_EYE_ICON} />
            ) : (
              <Image source={GREY_EYE_ICON} />
            )}
          </TouchableOpacity>
        }
      />
    );
  };
}
export default PasswordInput;
