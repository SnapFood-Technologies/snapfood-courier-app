import axios from 'axios';
import Config from 'react-native-config';
import * as STORAGE from './storage';
const apiInstance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 10000,
});

console.log('Config.BASE_URL ', Config.BASE_URL);

const authInstance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 10000,
});
apiInstance.interceptors.request.use(async (config) => {
  let accessToken = await STORAGE.getData('api_token');
  let additionalHeaders = {
    authorization: `Bearer ${accessToken}`,
  };
  return {...config, headers: {...config.headers, ...additionalHeaders}};
});

class API {
  getLocation = (params) =>
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        ...params,
        key: Config.API_KEY,
      },
    });
  signIn = (params) => authInstance.post('/login', params);
  forgotPassword = (params) => authInstance.post('/forgot-password', params);
  updatePersonalInfo = (params) => apiInstance.post('/update', params);
  logout = () => apiInstance.post('/logout');
  changePassword = (params) => apiInstance.post('/change-password', params);
  updateLocation = (params) => apiInstance.post('/update-location', params);
  rememberMe = () => apiInstance.post('/remember-me');
  fetchRiders = (params) => apiInstance.post('/fetch-riders', params);
  sendFriendRequest = (params) =>
    apiInstance.post('/send-friend-request', params);
  fetchFriends = (params) => apiInstance.post('/fetch-friends', params);
  acceptFriendRequest = (params) => apiInstance.post('/accept-request', params);
  declineFriendRequest = (params) =>
    apiInstance.post('/decline-request', params);
  getNotifications = (params) => apiInstance.post('/notifications', params);
  getDeliveryRequest = () => apiInstance.get('/get-delivery-request');
  acceptOrderRequest = (params) =>
    apiInstance.post('/accept-order-request', params);
  rejectOrderRequest = (params) =>
    apiInstance.post('/reject-order-request', params);
  getOrderComments = (params) => apiInstance.post('/get-order-comment', params);
  addComment = (params) => apiInstance.post('/add-comment', params);
  pickUpOrder = (params) => apiInstance.post('/pickup-order', params);
  completeOrder = (params) => apiInstance.post('/complete-order', params);
  getPastOrders = (params) => apiInstance.post('/get-past-orders', params);
  getCurrentOrders = (params) =>
    apiInstance.post('/get-current-orders', params);
  getMyWalletTotal = () => apiInstance.get('/get-my-wallet');
  uploadChatImage = (params) => apiInstance.post('/upload-chat-image', params);
  getFriendProfileAndName = (params) =>
    apiInstance.post('/get-friend-profile-and-name', params);
  sendChatNotification = (params) =>
    apiInstance.post('/send-chat-notification', params);
  fetchRiderDetail = (params) =>
    apiInstance.post('/fetch-rider-detail', params);
  updateStatus = () => apiInstance.post('/toggle-status');
  getDashboardData = () => apiInstance.get('/getDashboardData');
  setFriendRequestNotificationSeen = (params) =>
    apiInstance.post('/setFriendRequestNotificationSeen', params);
  setChatNotificationSeen = (params) =>
    apiInstance.post('/setChatNotificationSeen', params);
  setDeliveryRequestSeen = (params) =>
    apiInstance.post('/setDeliveryRequestSeen', params);
  setAllDeliveryRequestSeen = () =>
    apiInstance.get('/setAllDeliveryRequestSeen');
  getReviewOverall = () => apiInstance.get('/get-review-overall');
  getReviews = (params) => apiInstance.post('/get-review', params);
  getServerTime = () => apiInstance.get('/server-time');
}
export default new API();
