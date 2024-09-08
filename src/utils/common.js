import Config from 'react-native-config';

export const isEmpty=(str)=>{
	if(str == null || str == '') {
		return true
	}
	return false
}
 
export const isFullURL=(str)=>{ 
	if (str == null) { return false; }
	return str.includes('http');
}

export const getImageFullURL=(photo)=>{
	if (isFullURL(photo)) {
		return photo;
	}
	if (photo == 'x') {
		return Config.USER_PROFILE_IMG_BASE_URL + 'default?';
	}
	if (photo == 'default') {
		return Config.USER_PROFILE_IMG_BASE_URL + 'default?';
	}
	return Config.USER_PROFILE_IMG_BASE_URL + (isEmpty(photo) ? 'default?' : photo);
}

export const seconds2Time=(seconds)=>{
	const h = parseInt(seconds / (60 * 60));
    const m = parseInt(seconds % (60 * 60) / 60);
    const s = parseInt(seconds % 60);

    return ( (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)); 
	// return ((h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)); 
}

export const convertTimestamp2Date=(timestamp)=>{
	if(timestamp == null) return new Date();
	return new Date(timestamp.seconds * 1000)
}

export const validateEmailAddress = (email) => {
	let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg.test(email);
};

export const validatePhoneNumber = (text) => {
	const PHONE_REGEXP = /^06[6-9][1-9]\d{6}$|04[3-9][1-9]\d{5}$/;
	return PHONE_REGEXP.test(text);
};
