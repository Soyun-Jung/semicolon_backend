import axios from 'axios';

export const getRecommendation = async () => { 
        try {
            const { data } = await axios.get(`http://127.0.0.1:5000/recommendation`);
            return data;
        } catch (e) { 
            console.log("데이터가 존재 하지 않습니다.");
        }
}