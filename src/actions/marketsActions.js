import { SET_COMPONENTS } from './types';
import axios from 'axios';

export function setComponents(payload) {
  return {
    type: SET_COMPONENTS,
    payload
  };
}

export function fetchMarkets() {
  return dispatch => {
    return axios.get(process.env.API_URL + '/api/markets').then(res => {
      if (res.status !== 200) {
        console.log(`There was a problem: ${res.status}`);
        return;
      }
      //dispatch(setMarkets(res.data.markets));
    }, err => {

    });
  }
}

export function fetchCompanies() {
  return dispatch => {
    return axios.get(process.env.REACT_APP_API_URL).then(res => {
      if (res.status !== 200) {
        console.log(`There was a problem: ${res.status}`);
        return;
      }
      //dispatch(setComponents(res.data));
    }, err => {

    });
  }
}

export function fetchComponents() {
  return dispatch => {
    return axios.get(process.env.REACT_APP_API_URL + '/buckets').then(res => {
      if (res.status !== 200) {
        console.log(`There was a problem: ${res.status}`);
        return;
      }
      dispatch(setComponents(res.data));
    }, err => {

    });
  }
}

export function updateComponents(data) {
  const headers = {"Content-Type": "application/json"}
  return axios.put(process.env.REACT_APP_API_URL + '/Items/', JSON.stringify(data),  {headers}).then(res => {
    if (res.status !== 200) {
      console.log(`There was a problem: ${res.status}`);
      return;
    }
  }, err => {

  });
}