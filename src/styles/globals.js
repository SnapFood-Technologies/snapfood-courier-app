import * as Spacing from './spacing';
import * as Typography from './typography';
export const container = {  
  paddingBottom: Spacing.SCALE_24,
  flex: 1,
  backgroundColor: '#f6f7f9',
};
export const v_center = { 
  flexDirection: 'column',
  justifyContent : 'center',
  alignItems: 'center',
};
export const h_center = { 
  flexDirection: 'row',
  justifyContent : 'center',
  alignItems: 'center',
};
export const profileImg = {
  width: Spacing.SCALE_120,
  height: Spacing.SCALE_120,
  borderRadius: Spacing.SCALE_60,
  alignSelf: 'center',
};
export const header = {
  // shadowColor: '#000',
  paddingTop: Spacing.SCALE_40,
  paddingHorizontal: Spacing.SCALE_16,
  paddingBottom: Spacing.SCALE_12,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
  backgroundColor: 'white',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'center',
  // marginBottom: Spacing.SCALE_8,
};
export const padding_horiz_10 = {
  paddingHorizontal: 10,
};
export const padding_horiz_20 = {
  paddingHorizontal: 20,
};
export const padding_vert_20 = {
  paddingVertical: 20,
};
export const flex_1 = {
  flex: 1,
};
export const hearder_title = {
  ...Typography.MONSERRAT_MEDIUM_LIGHTBLACK_17,
  textAlign: 'center',
  alignSelf: 'center',
};
export const flex_row = {
  flexDirection: 'row',
  alignItems: 'center',
};
export const flex_row_space_between = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};
export const flex_grow_1 = {
  flexGrow: 1,
};
export const silver_map = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
];
