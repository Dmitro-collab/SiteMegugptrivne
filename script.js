const apiKey = "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"; // 🔴 Замініть API-ключ та сховайте його на сервері!
const apiUrl = "https://api.deepai.org/api/text-generator"; // API URL

let language = 'uk'; // Встановлено за замовчуванням на українську

document.getElementById('language').addEventListener('change', (event) => {
  language = event.target.value;
});

document.getElementById('input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Забороняємо стандартну дію (перенесення рядка)
    sendMessage();
  }
});

document.getElementById('send-btn').addEventListener('click', sendMessage);

function sendMessage() {
  const userMessage = document.getElementById('input').value.trim();
  if (!userMessage) return;

  addMessage(`Ви: ${userMessage}`);
  document.getElementById('input').value = '';
  fetchAIResponse(userMessage);
}

async function fetchAIResponse(userMessage) {
  document.getElementById('loading').style.display = 'block';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Api-Key": apiKey // 🔹 DeepAI використовує Api-Key
      },
      body: JSON.stringify({ text: userMessage })
    });

    const data = await response.json();
    if (data.output) {
      addMessage(`ШІ: ${data.output.trim()}`);
    } else {
      addMessage('ШІ: Вибачте, я не можу відповісти.');
    }
  } catch (error) {
    console.error("Помилка API:", error);
    addMessage('ШІ: Виникла помилка під час запиту.');
  } finally {
    document.getElementById('loading').style.display = 'none';
  }
}

function addMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  document.getElementById('messages').appendChild(messageElement);
}

// 🔹 Перевірка кнопки перемикання теми
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
  });
}