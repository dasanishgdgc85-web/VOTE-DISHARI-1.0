const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

const SYSTEM_PROMPT = `You are a friendly and knowledgeable assistant that helps Indian citizens — especially first-time voters — understand the Indian election process.

You explain concepts clearly and simply, avoiding jargon. When you use technical terms (like "Lok Sabha", "ECI", "MCC", "EVM"), briefly explain them.

You cover topics like:
- Voter registration and Voter ID
- How elections are announced and scheduled
- Nomination of candidates and political parties
- The Model Code of Conduct
- Polling Day procedures and Electronic Voting Machines (EVMs)
- Vote counting and results
- Government formation
- Rights and responsibilities of voters
- The role of the Election Commission of India

Keep answers concise but complete. Use bullet points for lists. Be encouraging and empowering — voting is a fundamental right. Always be factually accurate about Indian elections.

If someone asks something unrelated to elections or civic processes, politely redirect them to election-related topics.`;

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await db.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    if (messages.length === 0) {
      return Response.json({ error: 'messages is required' }, { status: 400 });
    }

    // Cap conversation length to protect credits
    const recent = messages.slice(-10);
    const history = recent
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n");
    const lastUser = recent.filter((m) => m.role === "user").pop();
    const userText = lastUser?.content || "";

    const prompt = `${SYSTEM_PROMPT}\n\nConversation so far:\n${history}\n\nUser: ${userText}\n\nAssistant:`;

    const response = await db.asServiceRole.integrations.Core.InvokeLLM({ prompt });
    return Response.json({ reply: response });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}