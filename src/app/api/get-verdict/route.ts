import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { manInput, womanInput } = await req.json();

    if (!manInput || !womanInput) {
      return NextResponse.json(
        { error: "Both inputs are required" },
        { status: 400 }
      );
    }

    // Monta o prompt pro modelo
    const prompt = `
Você é um assistente de relacionamentos imparcial.
Analise as duas versões abaixo e dê um veredito equilibrado, empático e breve.

Lado do homem: ${manInput}

Lado da mulher: ${womanInput}

Escreva um veredito que ajude os dois a se entenderem melhor:
`;

    // Chama o Ollama
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma3:4b",
        prompt,
      }),
    });

    if (!response.ok) {
      console.error(await response.text());
      return NextResponse.json(
        { error: "Erro ao comunicar com o Ollama" },
        { status: 500 }
      );
    }

    // Lê a resposta
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let resultText = "";

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.trim().split("\n");

        for (const line of lines) {
          try {
            const json = JSON.parse(line);
            if (json.response) resultText += json.response;
          } catch {
            // ignora pedaços quebrados do stream
          }
        }
      }
    }

    return NextResponse.json({ verdict: resultText.trim() });
  } catch (error) {
    console.error("Erro ao gerar veredito:", error);
    return NextResponse.json(
      { error: "Falha ao gerar veredito." },
      { status: 500 }
    );
  }
}
