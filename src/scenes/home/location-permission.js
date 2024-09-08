import React from 'react';
import { View, Text, StyleSheet, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux'
import { CONSTANTS, LOCATION, STORAGE } from '_service';
import { PrimaryBtn } from '_atoms';
import { HeaderBackBtn } from '_molecules';
import Svg_img from '../../assets/svgs/location_illustration.svg'
import { Colors, Globals } from '_styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FONT_FAMILY_POPPINS_BOLD, FONT_FAMILY_POPPINS_MEDIUM } from 'styles/typography';
import { setPermitLocation } from 'redux/slices/locationInfo';

class LocationPermissionScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.props = props

        this.state = {
            loading: false,
        };
    }

    async componentDidMount() {
    }

    openLocationPerm = async () => {
        const status = await LOCATION.requestLocationPermission()
        await STORAGE.storeData(STORAGE.KEYS.LOCATION_PERM_ANSWERED, true);

        if (status) {
            this.props.setPermitLocation(true);
            if (this.props.homeTabNav) {
                this.props.homeTabNav.navigate('Requests');
            }
        }
        else {
            this.props.navigation.goBack()
        }
    };

    onDeny = async () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={[styles.container]}>
                <View style={styles.header}>
                    <HeaderBackBtn
                        title=""
                        onPress={() => this.props.navigation.goBack()}
                    />
                </View>
                <View style={[styles.formview]}>
                    <Svg_img />
                    <Text style={[styles.title]}>Location Permission</Text>
                    <Text style={[styles.description]}>
                        {`Turn on Location Services to allow "${CONSTANTS.APP_NAME}" to determine your location.`}
                    </Text>
                </View>
                <PrimaryBtn
                    title={'Allow'}
                    onPress={() => this.openLocationPerm()}
                />
                <TouchableOpacity
                    style={[Globals.v_center, styles.deny]}
                    onPress={() => {
                        this.onDeny()
                    }}
                >
                    <Text style={[styles.denyTxt]}>Deny</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { backgroundColor: '#fff', flex: 1, width: '100%', paddingHorizontal: 20 },
    header: { height: 80, justifyContent: 'center' },
    formview: { flex: 1, width: '100%', paddingTop: 40, alignItems: 'center' },
    title: { fontFamily: FONT_FAMILY_POPPINS_BOLD, fontSize: 18, color: Colors.LIGHTBLACK, marginTop: 25, },
    description: { fontFamily: FONT_FAMILY_POPPINS_MEDIUM, fontSize: 14, color: Colors.LIGHTBLACK, marginTop: 12, marginBottom: 25, textAlign: 'center' },
    deny: { marginTop: 20, marginBottom: 40 },
    denyTxt: { fontFamily: FONT_FAMILY_POPPINS_MEDIUM, fontSize: 16, color: Colors.PRIMARY, }
})

const mapStateToProps = ({ app }) => ({
    homeTabNav: app.homeTabNav
});

export default connect(mapStateToProps, {
    setPermitLocation
})(LocationPermissionScreen);
