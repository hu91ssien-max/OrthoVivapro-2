import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

export const getGeminiAPI = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. AI features will be disabled.");
      return null;
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const generateAppSummary = async (prompt: string) => {
  const ai = getGeminiAPI();
  if (!ai) return "AI service unavailable.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text ?? "No response generated.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Failed to generate AI response.";
  }
};
