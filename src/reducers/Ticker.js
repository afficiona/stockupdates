import { fromJS } from 'immutable';

import { normalizeTickerData, normalizeTabsData } from './../utils/normalizer';

const initialState = fromJS({
  isFetching: true,
  isFetchingError: false,
  isFetchedOnce: false,
  error: {},
  data: {},
  tabs: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TICKER_UPDATE_INIT':
      return state.merge({
        isFetching: true,
        isFetchingError: false
      });

    case 'FETCH_TICKER_UPDATE_FINISHED':
      return state.merge({
        isFetching: false,
        isFetchingError: false,
        data: normalizeTickerData(action.data)
      });

    case 'SET_TABS_DATA':
      return state.mergeIn(['data'], {
        categorized: normalizeTabsData(state.get('data'))
      });

    case 'FETCH_TICKER_UPDATE_ERROR':
      return state.merge({
        isFetching: false,
        isFetchingError: true,
        error: action.error
      });

    default:
      return state;
  }
};
