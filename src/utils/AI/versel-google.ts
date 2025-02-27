import { google } from '@ai-sdk/google';
import { generateId, streamText } from 'ai';
import { v4 as uuidv4 } from 'uuid';

// Store user sessions TODO: It futer maintain by CORN job or implement LRU
const userSessions = new Map<
  string,
  { sessionId: string; refreshToken: string }
>();

const model = google('gemini-2.0-flash', {
  //   safetySettings: [
  //     { category: 'HARM_CATEGORY_UNSPECIFIED', threshold: 'BLOCK_LOW_AND_ABOVE' },
  //   ],
//   cachedContent: 'cachedContents/chatbot_knowledge_base',
  useSearchGrounding: true,
});

export async function genStream(userId: string, prompt: string) {
  let session = userSessions.get(userId);

  // Create a new session if one doesn't exist
  if (!session) {
    session = { sessionId: generateId(), refreshToken: uuidv4() };
    userSessions.set(userId, session);
  }
  try {
    const response = streamText({
      model,
      maxTokens: 1000,
      prompt,
      experimental_generateMessageId: () => session.sessionId, // Maintain context per user
      onError: (err) => {
        console.error(`AI Error for ${userId}:`, err);
      },
    });

    return response.toDataStream();
  } catch (error) {
    console.error(`Error generating response for ${userId}:`, error);
    throw new Error('Failed to process the request.');
  }
}
