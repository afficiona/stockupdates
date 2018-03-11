import { SOCKET_SERVER_URL } from './../utils/constants';
import openSocket from 'socket.io-client';

/**
 * Fetch ticker updates from the WebSocket server
 */
const fetchTickerUpdates = () => dispatch => {

  dispatch({ type: 'FETCH_TICKER_UPDATE_INIT' });
  const  socket = openSocket(`${SOCKET_SERVER_URL}/watch`);
  socket.on('data', (data, ackCb) => {
    dispatch({
      type: 'FETCH_TICKER_UPDATE_FINISHED',
      data
    });
    //delaying the next fetch for 1second
    setTimeout(() => {
      ackCb(1);
    }, 5000);
  });
  socket.on('error', message => {

  });
  socket.emit('sub', {state: true});
};

export default {
  fetchTickerUpdates
};
