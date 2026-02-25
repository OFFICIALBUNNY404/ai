console.log("[Void AI Debug] Script.js loaded successfully!");

const API_KEY = "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";
const MODEL = "cognitivecomputations/dolphin-mistral-24b-venice-edition:free";

const SYSTEM_PROMPT = `...`; // tetap sama seperti sebelumnya, jangan ubah

async function sendMessage() {
  console.log("[Void AI Debug] Tombol Kirim ditekan!");
  
  const input = document.getElementById("user-input");
  const messagesDiv = document.getElementById("messages");
  const text = input.value.trim();
  
  if (!text) {
    console.log("[Void AI Debug] Input kosong, batal kirim.");
    return;
  }

  console.log("[Void AI Debug] Pesan user:", text);

  // Tampilkan pesan user
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = "Kau: " + text;
  messagesDiv.appendChild(userMsg);

  input.value = "";
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // Loading
  const aiMsg = document.createElement("div");
  aiMsg.className = "message ai";
  aiMsg.textContent = "[VoidKernel]: Memproses melalui Void...";
  messagesDiv.appendChild(aiMsg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  try {
    console.log("[Void AI Debug] Mengirim request ke OpenRouter...");
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "Void AI Uncensored"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: text }
        ],
        temperature: 0.85,
        max_tokens: 4096
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;
    
    aiMsg.textContent = reply;
    console.log("[Void AI Debug] Respon diterima!");
  } catch (err) {
    aiMsg.textContent = `[VoidKernel]: Error: ${err.message}`;
    console.error("[Void AI Debug] Error detail:", err);
  }

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Pasang event
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    console.log("[Void AI Debug] Event click terpasang di tombol");
    sendMessage();
  });
} else {
  console.error("[Void AI Debug] Tombol send-btn tidak ditemukan!");
}

if (userInput) {
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
} else {
  console.error("[Void AI Debug] Textarea user-input tidak ditemukan!");
}

window.onload = () => {
  console.log("[Void AI Debug] Halaman loaded, fokus ke input");
  if (userInput) userInput.focus();
};    aiMsg.textContent = `[VoidKernel]: Error koneksi ke Void: ${err.message}\nCek console (F12) untuk detail.`;
    console.error("Void AI Error:", err);
  }

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Event listeners
document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Auto focus input
window.onload = () => {
  document.getElementById("user-input").focus();
};
