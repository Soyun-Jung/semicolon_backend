import axios from 'axios';
const recommendKey = process.env.RECOMMEND_KEY;

export const getRecommendation = async () => { 
        try {
            const { data } = await axios.get(`http://218.156.65.175:5000/recommendation/key=${recommendKey}`);
            return data;
        } catch (e) { 
            console.log("데이터가 존재 하지 않습니다.");
            return [];
        }
}