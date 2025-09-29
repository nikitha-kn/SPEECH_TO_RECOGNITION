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

       if (transcript.toLowerCase().includes("stop listening")) {
      recognition.stop();
      output.innerText = "🛑 Stopped Listening";
      outputBox.classList.remove("listening");
    }
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


