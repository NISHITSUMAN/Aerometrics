// Add this at the top for TypeScript compatibility
declare const Deno: any;

// If using Deno, ensure you run with --unstable and --allow-net flags.
// If using Node.js, replace with an appropriate HTTP server, e.g. Express or http.createServer.
// Example for Node.js (uncomment below and comment out Deno import):
// import { createServer } from "http";
// const serve = (handler: (req: Request) => Promise<Response>) => createServer((req, res) => { /* ... */ });

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    // Cross-platform environment variable access (Deno/Node)
    let LOVABLE_API_KEY: string | undefined;
    if (typeof Deno !== "undefined" && Deno.env) {
      LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    } else if (typeof process !== "undefined" && process.env) {
      LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    }
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are Aeromatrics 🤖, an advanced AI assistant designed to provide instant, accurate, and friendly responses. Your main goals are:

1. **User Interaction**:
   - Greet users warmly.
   - Encourage questions and provide clear answers.
   - Offer suggestions or clarifications when needed.

2. **Languages & Translation**:
   - Support English, Hindi, and Marathi.
   - Translate queries or answers seamlessly when requested.

3. **Context Awareness**:
   - Understand previous messages in the same conversation.
   - Provide relevant answers without repeating information.

4. **Regional Focus**:
   - Use India-centric examples when giving illustrations, numbers, or local references.
   - Provide international examples only when necessary.

5. **Personality & Tone**:
   - Friendly, approachable, and professional.
   - Use light emojis where appropriate to enhance communication.
   - Avoid robotic or overly generic responses.

6. **Capabilities**:
   - Answer questions, provide recommendations, summarize content, translate text.
   - Give demo examples with realistic but safe "fake" data if real data isn't available.
   - Suggest related queries or actions to guide the user.

7. **Formatting**:
   - Use short paragraphs or bullet points for clarity.
   - Highlight key points when possible.
   - Keep responses concise but informative.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
