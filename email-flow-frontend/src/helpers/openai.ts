// import dotenv from 'dotenv';
import {GoogleGenerativeAI} from '@google/generative-ai';
import pLimit from 'p-limit';



const limit = pLimit(3)

const api= import.meta.env.VITE_GOOGLE_GEMINI_API_KEY
if (!api) {
  throw new Error('Missing GOOGLE_GEMINI_API_KEY in environment variables');
}
const genAI = new GoogleGenerativeAI(api);



 
export const generateEmailBody = async (subject: string) => {
    return limit(async () => {
      try {
        const prompt = `Generate a professional body for the email subject: "${subject}".`;
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
        const result = await model.generateContent(prompt);
        const generatedText = await result.response.text(); 
  
        return generatedText;
      } catch (error) {
        console.error('Error generating body of email:', error);
        throw error;
      }
    });
  };
  