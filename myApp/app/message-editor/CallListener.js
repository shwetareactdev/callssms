import { useEffect, useState, useRef } from 'react';
import { ToastAndroid } from 'react-native';
import axios from 'axios';
import SmsAndroid from 'react-native-get-sms-android';
import CallDetectorManager from 'react-native-call-detection';

export default function useCallListener(baseUrl, setCallNumber) {
  const [callDetector, setCallDetector] = useState(null);
  const callAnswered = useRef(false);  // To track if call was picked up

  useEffect(() => {
    const detector = new CallDetectorManager((event, number) => {
      console.log('Call event:', event, number);
      setCallNumber(number);

      if (event === 'Incoming') {
        callAnswered.current = false; // Reset when incoming call arrives
      } 
      else if (event === 'Offhook') {
        callAnswered.current = true;  // Call answered
      } 
      else if (event === 'Disconnected') {
        if (!callAnswered.current) {
          handleSendSMS(baseUrl, 'missed', number); // Only if not answered
        }
      } 
      else if (event === 'Dialing') {
        handleSendSMS(baseUrl, 'outgoing', number);  // Outgoing call
      }
    }, true);

    setCallDetector(detector);

    return () => {
      if (detector && typeof detector.dispose === 'function') {
        detector.dispose();
      }
    };
  }, [baseUrl]); // added baseUrl to dependencies

  const handleSendSMS = async (url, callType, number) => {
    try {
      const { data } = await axios.get(`${url}/api/messages/${callType}`);
      const msg = data.defaultMessage || `Sorry I missed your call.`;

      if (number) {
        SmsAndroid.autoSend(
          number,
          msg,
          (fail) => ToastAndroid.show('Failed: ' + fail, ToastAndroid.SHORT),
          (success) => ToastAndroid.show('SMS sent!', ToastAndroid.SHORT)
        );
      }
    } catch (e) {
      console.error('Error sending SMS:', e);
      ToastAndroid.show('Error sending SMS', ToastAndroid.SHORT);
    }
  };

  return callDetector;
}
