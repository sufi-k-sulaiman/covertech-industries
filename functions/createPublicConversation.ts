import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Create conversation without requiring user authentication
    const conversation = await base44.asServiceRole.agents.createConversation({
      agent_name: 'covertech_assistant',
      metadata: { source: 'website_chat', timestamp: new Date().toISOString() }
    });

    return Response.json(conversation);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});