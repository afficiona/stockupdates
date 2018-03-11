import { SOCKET_SERVER_URL } from './../utils/constants';
import openSocket from 'socket.io-client';

/**
 * Fetch ticker updates from the WebSocket server
 */
const fetchTickerUpdates = () => dispatch => {
  const  socket = openSocket(`${SOCKET_SERVER_URL}/watch`);
  dispatch({ type: 'FETCH_TICKER_UPDATE_INIT' });

  socket.on('data', (data, ackCb) => {
    dispatch({
      type: 'FETCH_TICKER_UPDATE_FINISHED',
      data
    });
    dispatch({
      type: 'SET_TABS_DATA'
    });
    //delaying the next fetch for 5 seconds
    setTimeout(() => {
      ackCb(1);
    }, 5000);
  });

  socket.on('error', error => {
    dispatch({
      type: 'FETCH_TICKER_UPDATE_ERROR',
      error
    });
  });

  // Subscribing to the stock updates
  socket.emit('sub', {state: true});
};

/**
 * UnSubscribing from stock updates
 */
const unSubscribeStockUpdates = () => () => {
  const  socket = openSocket(`${SOCKET_SERVER_URL}/watch`);
  // Subscribing to the stock updates
  socket.emit('unsub', {state: false});
};

export default {
  fetchTickerUpdates,
  unSubscribeStockUpdates
};
