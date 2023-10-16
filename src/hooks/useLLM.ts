import { useState } from "react";
import { generateText } from "../services/llm.service";

export default function useLLM(defaultResponse: string | null = null) {
  const [response, setResponse] = useState<string | null>(defaultResponse);
  const generateResponse = async (prompt: string, maxTokens?: number) => {
    const result = await generateText(prompt, maxTokens);
    setResponse(result);
  };
  return { response, generateResponse };
}
