import { GoogleGenAI } from "@google/genai";


const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateLegalDocument = async (
  promptTemplate: string,
  data: {
    partyA: string;
    partyB: string;
    effectiveDate: string;
    jurisdictionState: string;
    additionalDetails: string;
  }
): Promise<string> => {
  const ai = getAiClient();
  if (!ai) {
    return "Error: API Key not configured. Please check your settings.";
  }

  // Interpolate the prompt
  const prompt = promptTemplate
    .replace('${partyA}', data.partyA || '[Party A]')
    .replace('${partyB}', data.partyB || '[Party B]')
    .replace('${effectiveDate}', data.effectiveDate || 'a date to be determined')
    .replace('${jurisdictionState}', data.jurisdictionState || 'USA')
    .replace('${additionalDetails}', data.additionalDetails || 'standard terms');

  const fullPrompt = `
    You are an expert US Legal Document Drafter. 
    Create a professional, well-formatted document based on the following request.
    Return ONLY the document text formatted in Markdown. Do not include conversational filler.
    
    Request: ${prompt}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    
    return response.text || "Error: No response generated.";
  } catch (error) {
    console.error("Gemini generation error:", error);
    return "Error generating document. Please try again later.";
  }
};
