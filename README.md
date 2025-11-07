# 💬 Mediador IA – Assistente de Conciliação de Casais

Este projeto é uma aplicação web construída com **React.js** e uma IA local rodando via **Ollama** utilizando o modelo **Gemma 4:3B**.  
A aplicação permite que um homem e uma mulher escrevam o ponto de vista de cada um, e a IA responde como um **mediador imparcial**, buscando uma solução equilibrada e empática.

---

## 🧠 Funcionalidades

- Campo para o **ponto de vista do homem**
- Campo para o **ponto de vista da mulher**
- IA gera um **veredito conciliador**
- **Tema claro/escuro** ajustável na interface
- Processamento **100% local** (não depende de internet)
- **Privacidade total** — nada é enviado para servidores externos

---

## 🏗️ Tecnologias Utilizadas

| Tecnologia | Função |
|-----------|--------|
| React.js (Next.js App Router) | Interface e fluxo do usuário |
| Tailwind CSS | Estilização responsiva & modo dark |
| Node.js / API Route (`/api/get-veredito`) | Ponte entre UI e IA |
| Ollama | Infra local de modelos LLM |
| Gemma 4:3B | Modelo de IA que produz o veredito |

---

## ⚙️ Requisitos

Antes de iniciar, você precisa ter:

| Requisito | Versão Recomendada |
|----------|-------------------|
| Node.js | 18+ |
| NPM ou Yarn | Qualquer versão recente |
| **Ollama instalado** | https://ollama.com/download |
| Modelo Gemma | `gemma:4b` ou equivalente |

---

## 📥 Instalando o Modelo IA (Obrigatório)

Após instalar o Ollama, rode:

```bash
ollama pull gemma:4b
