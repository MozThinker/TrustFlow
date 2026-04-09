import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, TrustScoreResult } from "../types";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function generateAIInsights(profileName: string, result: TrustScoreResult, transactions: Transaction[]) {
  const ai = getAI();
  if (!ai) {
    console.warn("Gemini API Key not found or invalid. Falling back to deterministic insights.");
    return null;
  }

  try {
    // We send a summary of the data to Gemini to get personalized insights
    const summary = {
      name: profileName,
      score: result.score,
      riskLevel: result.riskLevel,
      metrics: result.metrics,
      topCategories: transactions
        .filter(t => t.type === 'outflow')
        .slice(0, 5)
        .map(t => ({ cat: t.category, amt: t.amount }))
    };

    const prompt = `
      You are TrustFlow AI, a financial inclusion expert. 
      Analyze this alternative credit score result for ${profileName}:
      ${JSON.stringify(summary)}

      Based on this data, generate:
      1. 3-4 concise, professional explanations for the score (max 15 words each).
      2. 3 actionable financial coaching tips (max 20 words each).

      Return the result in JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            coachingTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["explanations", "coachingTips"]
        }
      }
    });

    if (!response.text) return null;
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return null;
  }
}
