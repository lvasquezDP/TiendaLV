import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

export const host='192.168.100.220:3000';
// export const host=Platform.OS=='ios'?'127.0.0.1:3000':'10.0.2.2:3000';
// export const host='10.0.2.2:3000';
const baseURL=`http://${host}/api`;

const api=axios.create({baseURL});

api.interceptors.request.use(async (config)=>{
    const token =await AsyncStorage.getItem('token');
    if(token)config.headers.Authorization=`Bearer ${token}`;
    return config;
})

export default api;