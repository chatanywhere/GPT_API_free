/*
Dependency install:
npm install openai

Run:
set OPENAI_API_KEY=your_key
set OPENAI_BASE_URL=https://api.chatanywhere.tech/v1
node demo/demo_nodejs.js
*/

import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const baseURL = process.env.OPENAI_BASE_URL || "https://api.chatanywhere.tech/v1";
const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

if (!apiKey) {
  throw new Error("Please set OPENAI_API_KEY before running this demo.");
}

const client = new OpenAI({
  apiKey,
  baseURL,
  timeout: 60_000,
});

// Normal response
async function chatApi(messages) {
  const completion = await client.chat.completions.create({
    model,
    messages,
  });

  console.log(completion.choices[0]?.message?.content || "");
}

// Stream response
async function chatApiStream(messages) {
  const stream = await client.chat.completions.create({
    model,
    messages,
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices?.[0]?.delta?.content;
    if (delta) {
      process.stdout.write(delta);
    }
  }
  process.stdout.write("\n");
}

(async () => {
  const messages = [
    { role: "user", content: "What is the relationship between Lu Xun and Zhou Shuren?" },
  ];

  try {
    console.log(`Using ${baseURL} with model ${model}`);

    // Normal call
    // await chatApi(messages);

    // Stream call
    await chatApiStream(messages);
  } catch (error) {
    console.error(error);
    console.error(
      "\nIf this is an APIConnectionError or ECONNRESET, verify that your runtime can access the selected ChatAnywhere host. Try switching OPENAI_BASE_URL between https://api.chatanywhere.tech/v1 and https://api.chatanywhere.org/v1, then check https://status.chatanywhere.tech/."
    );
    process.exitCode = 1;
  }
})();
