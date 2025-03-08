import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key non trovata" }, { status: 500 });
    }

    // Prompt per distinguere i comandi di stile dalle domande normali
    const prompt = `
      Sei un assistente AI su un sito portfolio.Il tuo nome Jack.Il proprietario del portfolio è Salvatore Guerra un programmatore AI. Se l'utente ti chiede di modificare lo stile del sito (es. "cambia il tema", "usa font monospace", "attiva effetto neon"),
      rispondi SOLO con un oggetto JSON VALIDO contenente i parametri richiesti, ad esempio:

      { "theme": "dark" } 
      { "font": "monospace" }
      { "borderRadius": "rounded-xl" }
      { "transitionSpeed": "fast" }
      { "neonEffect": true }
      { "glitchEffect": true }

      NON aggiungere testo extra se il messaggio è un comando di personalizzazione.
      
      Se invece è una domanda normale (es. "Chi sei?", "Quali progetti ci sono nel portfolio?"), rispondi normalmente come un chatbot.

      Ecco il messaggio dell'utente: "${message}"
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "system", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Non ho capito la domanda.";

    try {
      const jsonResponse = JSON.parse(reply); // Prova a convertire la risposta in JSON
      return NextResponse.json(jsonResponse);
    } catch (error) {
      return NextResponse.json({ reply }); // Se non è un JSON valido, restituiscilo come stringa
    }
  } catch (error) {
    return NextResponse.json({ error: "Errore durante la richiesta a OpenAI" }, { status: 500 });
  }
}
