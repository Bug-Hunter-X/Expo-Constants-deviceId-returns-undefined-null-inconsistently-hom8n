// bugSolution.js
import * as Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const getDeviceId = async () => {
  try {
    const storedId = await AsyncStorage.getItem('deviceId');
    if (storedId) {
      return storedId;
    }

    const expoDeviceId = Constants.deviceId;
    if (expoDeviceId) {
      await AsyncStorage.setItem('deviceId', expoDeviceId);
      return expoDeviceId;
    }

    // Fallback to generating a UUID if other methods fail.
    const uuid = uuidv4();
    await AsyncStorage.setItem('deviceId', uuid);
    return uuid;
  } catch (error) {
    console.error('Error getting device ID:', error);
    return null; // Or handle the error appropriately
  }
};

export default getDeviceId; 

//Example usage:
async function showId(){
  const id = await getDeviceId();
  console.log("Device ID:", id);
}

showId();