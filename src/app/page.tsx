"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [manInput, setManInput] = useState("");
  const [womanInput, setWomanInput] = useState("");
  const [verdict, setVerdict] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Aplica o tema no body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setVerdict("");

    try {
      const response = await fetch("/api/get-verdict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manInput, womanInput }),
      });

      if (!response.ok) throw new Error("Erro ao obter veredito");

      const data = await response.json();
      setVerdict(data.verdict);
    } catch (error) {
      console.error(error);
      setVerdict("Erro ao processar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100"
          : "bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 text-gray-900"
      }`}
    >
      {/* Botão de alternar tema */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
      >
        {darkMode ? "🌞" : "🌙"}
      </button>

      <div className="text-center max-w-2xl w-full">
        <h1 className="text-4xl font-extrabold mb-4">
          💬 Relationship Assistant
        </h1>
        <p className="opacity-80 mb-8">
          Compare os dois lados e receba um veredito justo e empático.
        </p>

        <form
          onSubmit={handleSubmit}
          className={`p-8 rounded-2xl shadow-xl w-full transition-all backdrop-blur-md ${
            darkMode
              ? "bg-gray-800/70 border border-gray-700"
              : "bg-white/70 border border-gray-200"
          }`}
        >
          <div className="mb-6">
            <label
              className="block font-semibold mb-2"
              htmlFor="manInput"
            >
              Lado do Homem
            </label>
            <textarea
              id="manInput"
              value={manInput}
              onChange={(e) => setManInput(e.target.value)}
              rows={4}
              required
              className={`w-full rounded-xl p-3 resize-none focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-900 border border-gray-700 text-gray-100 focus:ring-blue-500"
                  : "bg-white border border-gray-300 text-gray-900 focus:ring-blue-400"
              }`}
              placeholder="Digite o ponto de vista do homem..."
            />
          </div>

          <div className="mb-6">
            <label
              className="block font-semibold mb-2"
              htmlFor="womanInput"
            >
              Lado da Mulher
            </label>
            <textarea
              id="womanInput"
              value={womanInput}
              onChange={(e) => setWomanInput(e.target.value)}
              rows={4}
              required
              className={`w-full rounded-xl p-3 resize-none focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-900 border border-gray-700 text-gray-100 focus:ring-pink-500"
                  : "bg-white border border-gray-300 text-gray-900 focus:ring-pink-400"
              }`}
              placeholder="Digite o ponto de vista da mulher..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : darkMode
                ? "bg-gradient-to-r from-blue-500 to-pink-500 hover:scale-[1.02] shadow-md text-white"
                : "bg-gradient-to-r from-blue-600 to-pink-500 hover:scale-[1.02] shadow-md text-white"
            }`}
          >
            {isLoading ? (
              <span className="animate-pulse">Analisando...</span>
            ) : (
              "Gerar Veredito 💡"
            )}
          </button>
        </form>

        {verdict && (
          <div
            className={`p-6 rounded-2xl shadow-lg mt-10 w-full text-left animate-fadeIn backdrop-blur-md ${
              darkMode
                ? "bg-gray-800/70 border border-gray-700"
                : "bg-white/80 border border-gray-200"
            }`}
          >
            <h2 className="text-2xl font-bold mb-3 text-center">
              🧩 Veredito
            </h2>
            <p className="whitespace-pre-line leading-relaxed">{verdict}</p>
          </div>
        )}
      </div>
    </main>
  );
}
