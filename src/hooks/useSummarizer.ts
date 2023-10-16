import { useState } from "react";
import { RSSFeedItem } from "../models/RSSFeedItem";
import { generateText } from "../services/llm.service";

export default function useSummarizer() {
  const [summary, setSummary] = useState<string | null>(null);

  const generateSummary = async (
    item: RSSFeedItem,
    maxTokens: number = 500
  ) => {
    const strippedContent = item.content?.replace(/(<([^>]+)>)/gi, "");
    if (!strippedContent) {
      return;
    }
    let prompt = `Summarize the following article and return the summary only. Do not provide any additional conversation.\n${strippedContent}`;
    // trim to avoiding exceeding the token limit
    prompt = prompt.substring(0, 10000);
    const result = await generateText(prompt, maxTokens);
    setSummary(result);
  };
  return { summary, generateSummary };
}
