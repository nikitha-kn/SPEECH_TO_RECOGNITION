// const startBtn = document.getElementById("startbtn");
//     const outputDiv = document.getElementById("output");

//     // Use Web Speech API
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     // Start / Stop button functionality
//     startBtn.addEventListener("click", () => {
//       if (startBtn.textContent === "Start Listening") {
//         recognition.start();
//         startBtn.textContent = "Listening..";
//       } else {
//         recognition.stop();
//         startBtn.textContent = "Start Listening";
//       }
//     });

//     // Update output in real-time
//     recognition.onresult = (event) => {
//       let transcript = "";
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         transcript += event.results[i][0].transcript;
//       }
//       outputDiv.textContent = transcript;
//     };

//     // When recognition ends
//     recognition.onend = () => {
//       startBtn.textContent = "Start Listening";
//     };

//     // Optional: handle errors
//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//     };




// let output = document.getElementById("output");
// let startbtn = document.getElementById("startbtn");

// let recognition;

// if ('webkitSpeechRecognition' in window) {
//   recognition = new webkitSpeechRecognition();
//   recognition.continuous = true;
//   recognition.interimResults = true;
//   recognition.lang = 'en-US';

//   recognition.onresult = function(event) {
//     let transcript = '';
//     for (let i = event.resultIndex; i < event.results.length; i++) {
//       transcript += event.results[i][0].transcript;
//     }
//     output.innerText = transcript;
//   };

//   recognition.onerror = function(event) {
//     output.innerText = "⚠️ Error: " + event.error;
//   };
// } else {
//   output.innerText = "❌ Your browser does not support Speech Recognition. Try Chrome.";
// }

// startbtn.addEventListener("click", () => {
//   if (recognition) {
//     recognition.start();
//     output.innerText = "🎙️ Listening...";
//   }
// });



let output = document.getElementById("output");
let startbtn = document.getElementById("startbtn");
let outputBox = document.querySelector(".output-box");

let recognition;

if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = function() {
    output.innerText = "🎙️ Listening...";
    outputBox.classList.add("listening"); // Add glow
  };

  recognition.onresult = function(event) {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    output.innerText = transcript;
  };

  recognition.onerror = function(event) {
    output.innerText = "⚠️ Error: " + event.error;
    outputBox.classList.remove("listening"); // Remove glow
  };

  recognition.onend = function() {
    outputBox.classList.remove("listening"); // Remove glow when stopped
  };
} else {
  output.innerText = "❌ Your browser does not support Speech Recognition. Try Chrome.";
}

startbtn.addEventListener("click", () => {
  if (recognition) {
    recognition.start();
  }
});
