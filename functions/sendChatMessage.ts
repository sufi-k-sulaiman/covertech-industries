import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { conversationId, message } = await req.json();

    if (!conversationId || !message) {
      return Response.json({ error: 'Missing conversationId or message' }, { status: 400 });
    }

    // Add message to conversation using service role
    await base44.asServiceRole.agents.addMessage(conversationId, {
      role: 'user',
      content: message
    });

    // Get updated conversation to return latest messages
    const conversation = await base44.asServiceRole.agents.getConversation(conversationId);

    return Response.json({ success: true, conversation });
  } catch (error) {
    console.error('Error sending message:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});