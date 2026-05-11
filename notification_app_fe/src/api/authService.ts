import axios from 'axios';
import { API_BASE_URL, PRE_AUTH_CREDENTIALS } from '../utils/config';
import { logFrontend } from '../utils/logger';

let tokenPromise: Promise<string | null> | null = null;

export const getAuthToken = async (): Promise<string | null> => {
  try {
    const existingToken = localStorage.getItem('access_token');
    const expiresAt = localStorage.getItem('expires_at');

    if (existingToken && expiresAt && Date.now() < parseInt(expiresAt)) {
      logFrontend('debug', 'auth', 'Using cached auth token');
      return existingToken;
    }

    if (tokenPromise) {
      logFrontend('debug', 'auth', 'Waiting for existing auth request');
      return tokenPromise;
    }

    logFrontend('info', 'auth', 'Fetching new auth token');
    tokenPromise = axios.post(`${API_BASE_URL}/evaluation-service/auth`, PRE_AUTH_CREDENTIALS)
      .then(response => {
        console.log("AUTH RESPONSE DATA:", response.data);
        console.log("AUTH RESPONSE STATUS:", response.status);

        if (response.status === 200 && response.data.access_token) {
          const token = response.data.access_token;
          let expirationTime = response.data.expires_in;
          if (expirationTime > 1000000000) {
             expirationTime = expirationTime * 1000;
          } else {
             expirationTime = Date.now() + (expirationTime * 1000);
          }

          localStorage.setItem('access_token', token);
          localStorage.setItem('expires_at', expirationTime.toString());
          logFrontend('info', 'auth', 'Successfully obtained auth token');
          tokenPromise = null;
          return token;
        }
        tokenPromise = null;
        return null;
      })
      .catch(error => {
        tokenPromise = null;
        console.error('AUTH CATCH ERROR:', error);
        logFrontend('error', 'auth', `Failed to get auth token: ${error.message}`);
        console.error('Auth Error:', error);
        return null;
      });
      
    return tokenPromise;
  } catch (error: any) {
    console.error('AUTH CATCH ERROR:', error);
    logFrontend('error', 'auth', `Failed to get auth token: ${error.message}`);
    console.error('Auth Error:', error);
    return null;
  }
};
