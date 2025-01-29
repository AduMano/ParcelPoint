// Library
import AsyncStorage from '@react-native-async-storage/async-storage';

//#region Item Checker (T/F)
// Function to check if item exists in AsyncStorage
export const checkIfItemExists = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);

    // It Exists
    if (value !== null) {
      return true;
    } 
    // It doesnt Exists
    else {
      return false; 
    }
  } 
  catch (error) {
    console.error("Error checking item existence: ", error);
    return false;
  }
};