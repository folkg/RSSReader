export async function generateText(
  prompt: string,
  maxTokens: number = 50
): Promise<string> {
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_LLM_API_KEY}`,
    "Content-Type": "application/json",
  };

  const requestBody = JSON.stringify({
    model: "meta-llama/Llama-2-13b-chat-hf",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: maxTokens,
  });

  try {
    const response = await fetch(import.meta.env.VITE_LLM_API_URL, {
      method: "POST",
      headers: headers,
      body: requestBody,
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.choices?.length > 0) {
        return responseData.choices[0].message.content;
      }
    }

    console.error(
      "Error generating text:",
      response.status,
      response.statusText
    );
    return `Error generating text: ${response.status} ${response.statusText}`;
  } catch (error) {
    console.error("Error generating text:", error);
    return `Error generating text: ${error}`;
  }
}
