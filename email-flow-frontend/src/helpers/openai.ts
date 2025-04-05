// import dotenv from 'dotenv';
import {GoogleGenerativeAI} from '@google/generative-ai';
import pLimit from 'p-limit';

// dotenv.config();

console.log('openai')

const limit = pLimit(3)

const GOOGLE_GEMINI_API_KEY: string = 'AIzaSyBNd0mXSDLl-NicOoQ9kfzI_2Rdc9XA2V4';
const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);



 
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
  