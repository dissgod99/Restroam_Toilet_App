import AsyncStorage from "@react-native-async-storage/async-storage";

const getAsyncStorageItem = async (key) => {
    try {
        const jsonString = await AsyncStorage.getItem(key);
        return jsonString == null ? null : JSON.parse(jsonString);
    } catch (e) {
        console.log('reading (' + key + ') from Async Storage failed with error: ' + e);
    }
}

const setAsyncStorageItem = async (key, value) => {
    try {
        let stringifiedValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, stringifiedValue);
    } catch (e) {
        console.log('storing (' + key + ',' + value + ') in Async Storage failed with error: ' + e);
    }
}

module.exports = { getAsyncStorageItem, setAsyncStorageItem };