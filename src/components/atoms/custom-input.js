import React from 'react';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Typography, Spacing} from '_styles';

class CustomInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    return (
      <>
        <Input
          value={this.props.value}
          style={Typography.POPPINS_MEDIUM_LIGHTBLACK_16}
          keyboardType={this.props.keyboardType}
          label={this.props.label}
          editable={this.props.editable === true}
          labelStyle={Typography.POPPINS_MEDIUM_LIGHTGRAY_12}
          onChangeText={this.props.onChangeText}
          autoCorrect={false}
          autoCapitalize="none"
          leftIcon={
            this.props.icon !== undefined &&
            (React.isValidElement(this.props.icon) ? (
              this.props.icon
            ) : (
              <Icon
                name={this.props.icon}
                size={Spacing.SCALE_24}
                color={Colors.PRIMARY}
              />
            ))
          } 
        />
      </>
    );
  };
}
export default CustomInput;
