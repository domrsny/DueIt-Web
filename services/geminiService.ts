import { GoogleGenAI } from "@google/genai";
import { Homework } from '../types';

// FIX: Aligned with Gemini API guidelines by removing the explicit API key check and non-null assertion. The key is assumed to be provided in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStudyTips = async (homeworks: Homework[]): Promise<string> => {
  const incompleteHomeworks = homeworks.filter(h => h.status !== 'Completed');

  if (incompleteHomeworks.length === 0) {
    return "Great job! You've completed all your homework. Take a well-deserved break!";
  }

  const formattedList = incompleteHomeworks.map(h => ({
    course: h.courseName,
    assignment: h.assignmentTitle,
    due: h.dueDate,
    status: h.status,
    importance: h.importance,
  }));

  // FIX: Modified the prompt to request markdown. This will be rendered by the UI component which now supports basic markdown.
  const prompt = `
    You are an expert academic advisor for a college student. 
    Based on the following homework list, which includes an importance level, provide a prioritized study plan and actionable tips to help me stay on track.
    Factor in due dates and importance levels to create the most effective plan.
    Organize your response clearly using Markdown for structure. Use headings for sections, bullet points for lists, and bold text for emphasis. For each assignment, suggest a concrete first step to overcome procrastination.
    Keep the advice concise, encouraging, and easy to read.

    Today's date is ${new Date().toLocaleDateString()}.

    Here is my homework list:
    ${JSON.stringify(formattedList, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I couldn't generate study tips at the moment. Please check your API key and try again.";
  }
};