const OPENAI_API_KEY = "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";
const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/completions";

const chatToggle = document.getElementById('chat-toggle');
const chatWidget = document.getElementById("chat-widget");
const chatContainer = document.getElementById("chat-container");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSendButton = document.getElementById("chat-send");
const loadingElement = document.getElementById("loading"); // Ensure this element exists in your HTML
const askMindMateButton = document.querySelector('.self-empowring'); // Select the "Ask MindMate" button


let chatVisible = false;
let introMessageSent = false;


chatToggle.addEventListener('click', () => {
    toggleChat();
});

askMindMateButton.addEventListener('click', () => {
    toggleChat();
});

chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        const userInput = chatInput.value.trim();
        if (userInput) {
            addChatMessage("You", userInput);
            sendChatMessage(userInput);
            chatInput.value = "";
        }
    }
});

chatSendButton.addEventListener("click", () => {
    const userInput = chatInput.value.trim();
    if (userInput) {
        addChatMessage("You", userInput);
        sendChatMessage(userInput);
        chatInput.value = "";
    }
});

function toggleChat() {
    chatVisible = !chatVisible;
    chatWidget.classList.toggle('visible', chatVisible);
    chatToggle.innerText = chatVisible ? 'Close Chat' : 'Open Chat';
    if (!introMessageSent) {
        addChatMessage("Chat", "Welcome! I'm here as your Wellness Assistant. What can I do to support you today?");
        introMessageSent = true;
    }
}

function addChatMessage(sender, message) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("chat-message-container");
    const messageHeader = document.createElement("div");
    messageHeader.classList.add("chat-message-header");
    messageHeader.textContent = sender + ":";
    const messageBody = document.createElement("div");
    messageBody.classList.add("chat-message-body");
    messageBody.textContent = message;
    messageContainer.appendChild(messageHeader);
    messageContainer.appendChild(messageBody);
    chatMessages.appendChild(messageContainer);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function sendChatMessage(message) {
    loadingElement.style.display = "block"; // Ensure this element is styled appropriately

    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", // Make sure this is the model you intend to use
            messages: [{
                role: "user",
                content: message
            }]
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.choices && data.choices.length > 0 && data.choices[0].message) {
            const chatbotResponse = data.choices[0].message.content.trim();
            addChatMessage("Chat", chatbotResponse);
        } else {
            console.error("Unexpected response format:", data);
            addChatMessage("Chat", "Sorry, I didn't get that.");
        }
        loadingElement.style.display = "none";
    })
    .catch(error => {
        console.error("Failed to send message:", error);
        addChatMessage("Chat", "Sorry, I'm currently unavailable. Please try again later.");
        loadingElement.style.display = "none";
    });
}


















// MIT License

// Copyright (c) 2023 Patrick Loeber

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.














// const OPENAI_API_KEY = "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";
// const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/completions";

// const chatToggle = document.getElementById('chat-toggle');
// const chatWidget = document.getElementById("chat-widget");
// const chatContainer = document.getElementById("chat-container");
// const chatMessages = document.getElementById("chat-messages");
// const chatInput = document.getElementById("chat-input");
// const chatSendButton = document.getElementById("chat-send");
// const loadingElement = document.getElementById("loading"); // Ensure this element exists in your HTML

// let chatVisible = false;
// let introMessageSent = false;

// chatToggle.addEventListener('click', () => {
//     chatVisible = !chatVisible;
//     chatWidget.classList.toggle('visible', chatVisible);
//     chatToggle.innerText = chatVisible ? 'Close Chat' : 'Open Chat';
//     if (!introMessageSent) {
//         addChatMessage("Chat", "Hello! I'm the assistant. How can I help you today?");
//         introMessageSent = true;
//     }
// });

// chatInput.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter' && !event.shiftKey) {
//         event.preventDefault();
//         const userInput = chatInput.value.trim();
//         if (userInput) {
//             addChatMessage("You", userInput);
//             sendChatMessage(userInput);
//             chatInput.value = "";
//         }
//     }
// });

// chatSendButton.addEventListener("click", () => {
//     const userInput = chatInput.value.trim();
//     if (userInput) {
//         addChatMessage("You", userInput);
//         sendChatMessage(userInput);
//         chatInput.value = "";
//     }
// });

// function addChatMessage(sender, message) {
//     const messageContainer = document.createElement("div");
//     messageContainer.classList.add("chat-message-container");
//     const messageHeader = document.createElement("div");
//     messageHeader.classList.add("chat-message-header");
//     messageHeader.textContent = sender + ":";
//     const messageBody = document.createElement("div");
//     messageBody.classList.add("chat-message-body");
//     messageBody.textContent = message;
//     messageContainer.appendChild(messageHeader);
//     messageContainer.appendChild(messageBody);
//     chatMessages.appendChild(messageContainer);
//     chatContainer.scrollTop = chatContainer.scrollHeight;
// }

// function sendChatMessage(message) {
//   loadingElement.style.display = "block"; // Ensure this element is styled appropriately

//   fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//           model: "gpt-3.5-turbo", // Make sure this is the model you intend to use
//           messages: [{
//               role: "user",
//               content: message
//           }]
//       }),
//   })
//   .then(response => response.json())
//   .then(data => {
//       if (data && data.choices && data.choices.length > 0 && data.choices[0].message) {
//           const chatbotResponse = data.choices[0].message.content.trim();
//           addChatMessage("Chat", chatbotResponse);
//       } else {
//           console.error("Unexpected response format:", data);
//           addChatMessage("Chat", "Sorry, I didn't get that.");
//       }
//       loadingElement.style.display = "none";
//   })
//   .catch(error => {
//       console.error("Failed to send message:", error);
//       addChatMessage("Chat", "Sorry, I'm currently unavailable. Please try again later.");
//       loadingElement.style.display = "none";
//   });
// }










// const OPENAI_API_KEY = "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";
// const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/completions";

// const chatToggle = document.getElementById('chat-toggle');
// const chatWidget = document.getElementById("chat-widget");
// const chatContainer = document.getElementById("chat-container");
// const chatMessages = document.getElementById("chat-messages");
// const chatInput = document.getElementById("chat-input");
// const chatSendButton = document.getElementById("chat-send");
// const loadingElement = document.getElementById("loading"); // Ensure this element exists in your HTML
// const tryChatBotButton = document.getElementById("tryChatBotButton"); // Select the "Try Our ChatBot" button

// let chatVisible = false;
// let introMessageSent = false;

// chatToggle.addEventListener('click', () => {
//     toggleChat();
// });

// tryChatBotButton.addEventListener('click', () => {
//     toggleChat();
// });

// chatInput.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter' && !event.shiftKey) {
//         event.preventDefault();
//         const userInput = chatInput.value.trim();
//         if (userInput) {
//             addChatMessage("You", userInput);
//             sendChatMessage(userInput);
//             chatInput.value = "";
//         }
//     }
// });

// chatSendButton.addEventListener("click", () => {
//     const userInput = chatInput.value.trim();
//     if (userInput) {
//         addChatMessage("You", userInput);
//         sendChatMessage(userInput);
//         chatInput.value = "";
//     }
// });

// function toggleChat() {
//     chatVisible = !chatVisible;
//     chatWidget.classList.toggle('visible', chatVisible);
//     chatToggle.innerText = chatVisible ? 'Close Chat' : 'Open Chat';
//     if (!introMessageSent) {
//         addChatMessage("Chat", "Hello! I'm the assistant. How can I help you today?");
//         introMessageSent = true;
//     }
// }

// function addChatMessage(sender, message) {
//     const messageContainer = document.createElement("div");
//     messageContainer.classList.add("chat-message-container");
//     const messageHeader = document.createElement("div");
//     messageHeader.classList.add("chat-message-header");
//     messageHeader.textContent = sender + ":";
//     const messageBody = document.createElement("div");
//     messageBody.classList.add("chat-message-body");
//     messageBody.textContent = message;
//     messageContainer.appendChild(messageHeader);
//     messageContainer.appendChild(messageBody);
//     chatMessages.appendChild(messageContainer);
//     chatContainer.scrollTop = chatContainer.scrollHeight;
// }

// function sendChatMessage(message) {
//   loadingElement.style.display = "block"; // Show the loading element

//   fetch(OPENAI_API_ENDPOINT, {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//           model: "gpt-3.5-turbo", // Adjust the model as necessary
//           messages: [{
//               role: "user",
//               content: message
//           }]
//       }),
//   })
//   .then(response => response.json())
//   .then(data => {
//       if (data && data.choices && data.choices.length > 0 && data.choices[0].message) {
//           const chatbotResponse = data.choices[0].message.content.trim();
//           addChatMessage("Chat", chatbotResponse);
//       } else {
//           console.error("Unexpected response format:", data);
//           addChatMessage("Chat", "Sorry, I didn't get that.");
//       }
//       loadingElement.style.display = "none"; // Hide the loading element
//   })
//   .catch(error => {
//       console.error("Failed to send message:", error);
//       addChatMessage("Chat", "Sorry, I'm currently unavailable. Please try again later.");
//       loadingElement.style.display = "none"; // Hide the loading element
//   });
// }
