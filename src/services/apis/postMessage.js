/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import api from './axios';

const postMessage = async (data = {}) => {
  try {
    // const { to, message, messageType = "normal" } = data;
    // console.log(messageType)
    // const body = { to, message,messageType };
    console.log("message ******",data)
    const res = await api.post('/messages', data);
    console.log('✅ Message sent successfully');
    return res?.data;
  } catch (err) {
    console.error('❌ Could not send the message:', err.response?.data || err.message);
    throw err;
  }
};

export default postMessage;