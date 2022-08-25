import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import root from './root';
import WebSocketBridge from '../WebSocketSlice/WebSocketBridge';
import getWebSocketUrl from '../../utils/WebSocket/getUrl';
import { checkLogin } from '../actions/api';

const shouldWSConnect = ({ type, payload }) => {
  const connectActionType = checkLogin.fulfilled.toString();
  return type === connectActionType && payload.isLoggedIn;
};
const webSocketBridge = WebSocketBridge({
  url: getWebSocketUrl(),
  connectionCondition: shouldWSConnect,
});
const store = configureStore({
  reducer: root,
  middleware: [...getDefaultMiddleware(), webSocketBridge],
});

export default store;
