import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateCreativeIntro = async (name: string, expertise: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short, extremely sophisticated, and poetic 2-sentence bio for a ${expertise} designer named ${name}. Keep it minimal and atmospheric, suitable for a premium dark-themed portfolio. Do not include quotes.`,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });
    return response.text || "Crafting digital silence into resonant experiences.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Where precision meets the intangible. Sculpting future-forward interfaces.";
  }
};

export const generateProjectConcept = async (keyword: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a unique, high-end creative project concept based on the keyword: "${keyword}". Return a title, a short conceptual description, and a set of 3 technical or artistic tags.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            concept: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "concept", "tags"]
        }
      }
    });
    const text = response.text;
    if (!text) {
        throw new Error("No response text generated");
    }
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Concept Error:", error);
    return {
      title: "Synthesized Voids",
      concept: "An exploration of negative space in digital architecture.",
      tags: ["WebGL", "Aesthetics", "Minimalism"]
    };
  }
};
