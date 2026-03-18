import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  
  try {
    const { conversationId, message } = await req.json();

    if (!conversationId || !message) {
      return Response.json({ error: 'Missing conversationId or message' }, { status: 400 });
    }

    // Get conversation first
    const conversation = await base44.asServiceRole.agents.getConversation(conversationId);
    
    // Add message to conversation using service role (no auth required for public chat)
    await base44.asServiceRole.agents.addMessage(conversation, {
      role: 'user',
      content: message
    });

    // Get updated conversation to return latest messages
    const updatedConversation = await base44.asServiceRole.agents.getConversation(conversationId);

    return Response.json({ success: true, conversation: updatedConversation });
  } catch (error) {
    console.error('Error sending message:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});