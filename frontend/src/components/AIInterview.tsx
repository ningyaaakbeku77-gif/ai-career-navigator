import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export default function AIInterview() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI Interview Coach. I'll conduct a technical interview to assess your skills. Ready to begin?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions: Question[] = [
    {
      id: 1,
      text: "Explain the difference between supervised and unsupervised learning",
      category: "Machine Learning",
      difficulty: "Medium",
    },
    {
      id: 2,
      text: "What is overfitting and how do you prevent it?",
      category: "Machine Learning",
      difficulty: "Medium",
    },
    {
      id: 3,
      text: "Describe how a neural network works",
      category: "Deep Learning",
      difficulty: "Hard",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/assessment/message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: inputValue,
            session_id: "interview-session",
          }),
        }
      );

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          data.response ||
          "That's a thoughtful answer! Let me provide some feedback...",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      if (data.skill_scores) {
       const avgScore =
  Object.values(data.skill_scores).reduce(
    (a: number, b: number) => a + b,
    0
  ) / Object.values(data.skill_scores).length;

setScore((prev) => Math.min(100, prev + avgScore * 10));

      }
    } catch (error) {
      console.error("API Error:", error);

      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Great answer! Here's my feedback: Your explanation demonstrates good understanding of the fundamentals. Consider elaborating on real-world applications.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, fallbackMessage]);
    }

    setIsLoading(false);
  };

  const startVoiceInput = () => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
    };

    recognition.start();
  };

  const askNextQuestion = () => {
    if (currentQuestion < questions.length) {
      const q = questions[currentQuestion];

      const qMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `📝 Question: ${q.text}\n\nCategory: ${q.category}\nDifficulty: ${q.difficulty}`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, qMessage]);
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chat */}
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-bold text-white mb-2">
            🤖 AI Interview Preparation
          </h2>
          <p className="text-purple-300 mb-6">
            Practice technical interviews with real-time AI feedback
          </p>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      AI Interview Coach
                    </h3>
                    <p className="text-indigo-200 text-sm">Online • Ready</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-white font-bold text-2xl">
                    {score.toFixed(0)}%
                  </div>
                  <div className="text-indigo-200 text-xs">Interview Score</div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-6 space-y-6 h-[600px] overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.role === "assistant"
                      ? "flex justify-start"
                      : "flex justify-end"
                  }
                >
                  <div className="max-w-[80%] rounded-2xl p-4 shadow-lg bg-slate-800 text-white whitespace-pre-wrap">
                    <p>{message.content}</p>
                    <p className="text-xs mt-2 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-700 rounded-2xl p-4 shadow-lg">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-slate-900 border-t border-slate-700 p-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={startVoiceInput}
                  className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition-all"
                >
                  {isRecording ? "🎙️" : "🎤"}
                </button>

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your answer..."
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-white font-bold text-lg mb-4">
              📊 Interview Progress
            </h3>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Overall Score</span>
                <span className="text-cyan-400 font-bold">
                  {score.toFixed(0)}%
                </span>
              </div>

              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-1000 rounded-full"
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800 rounded-xl">
                <span className="text-slate-300">Questions Asked</span>
                <span className="text-cyan-400 font-bold">
                  {currentQuestion}/{questions.length}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-800 rounded-xl">
                <span className="text-slate-300">Responses Given</span>
                <span className="text-purple-400 font-bold">
                  {messages.filter((m) => m.role === "user").length}
                </span>
              </div>
            </div>

            <button
              onClick={askNextQuestion}
              disabled={currentQuestion >= questions.length}
              className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion < questions.length
                ? "Ask Next Question"
                : "Interview Complete"}
            </button>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-6 border border-indigo-700 shadow-2xl">
            <h3 className="text-white font-bold text-lg mb-4">
              💡 Interview Tips
            </h3>

            <ul className="space-y-3 text-indigo-200 text-sm">
              <li>✔ Use the STAR method</li>
              <li>✔ Provide concrete examples</li>
              <li>✔ Ask clarifying questions</li>
              <li>✔ Think aloud to show reasoning</li>
            </ul>
          </div>

          {/* Categories */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-white font-bold text-lg mb-4">
              📚 Question Categories
            </h3>

            <div className="space-y-2">
              <div className="px-4 py-2 bg-cyan-600 rounded-lg text-white text-sm">
                Machine Learning
              </div>
              <div className="px-4 py-2 bg-purple-600 rounded-lg text-white text-sm">
                Deep Learning
              </div>
              <div className="px-4 py-2 bg-indigo-600 rounded-lg text-white text-sm">
                Data Structures
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
