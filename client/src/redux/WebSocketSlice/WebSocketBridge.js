import { actions, sendWsMessage } from './index';
import exponentialBackoff from '../../utils/exponentialBackoff';

export default ({ url, connectionCondition }) => {
  let ws;
  const messageQueue = [];

  return ({ dispatch, getState }) => (next) => (action) => {
    const sendMessage = (message) => ws.send(JSON.stringify(message));
    const connect = () => new Promise((resolve, reject) => {
      ws = new WebSocket(url);

      ws.onopen = () => {
        dispatch(actions.statusChange(true));
        messageQueue.forEach((message) => dispatch(sendWsMessage(message)));
      };
      ws.onclose = (e) => {
        dispatch(actions.statusChange(false));
        if (e.wasClean) return;
        reject(e);
      };
      ws.onmessage = (e) => {
        const message = JSON.parse(e.data);
        dispatch(actions.messageReceived(message));
      };
    });
    if (!connectionCondition || connectionCondition(action, getState())) {
      exponentialBackoff(connect, { maxRetries: 100, jitter: true });
    }
    if (action.type === actions.messageSent.toString()) {
      if (ws?.readyState !== 1) return messageQueue.push(action.payload);
      sendMessage(action.payload);
    }
    return next(action);
  };
};
