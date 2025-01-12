import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export class Assistant {
  #model;

  constructor(model = "gpt-4o-mini") {
    this.#model = model;
  }

  async chat(content, history) {
    const result = await openai.chat.completions.create({
      model: this.#model,
      messages: [...history, { content, role: "user" }],
    });

    if (result && result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content) {
      return result.choices[0].message.content;
    } else {
      return "Sorry, I couldn't process your request. Please try again.";
    }
  }
}
