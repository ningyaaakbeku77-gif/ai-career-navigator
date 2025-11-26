import { useState } from 'react'

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Please use Chrome.')
      return
    }

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = async (event: any) => {
      const text = event.results[0][0].transcript
      setTranscript(text)
      await sendToAI(text)
    }

    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)

    recognition.start()
  }

  const sendToAI = async (userMessage: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/assessment/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, session_id: 'session-123' })
      })

      const data = await response.json()
      setAiResponse(data.response)
      speakText(data.response)
    } catch {
      const fallback = `I heard: ${userMessage}. Can you tell me more?`
      setAiResponse(fallback)
      speakText(fallback)
    }
  }

  const speakText = (text: string) => {
    const synth = window.speechSynthesis
    if (!synth) return

    synth.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 1
    utter.pitch = 1
    utter.onstart = () => setIsSpeaking(true)
    utter.onend = () => setIsSpeaking(false)
    synth.speak(utter)
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl shadow-2xl border border-purple-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">🎤 AI Voice Assistant</h2>
        <p className="text-purple-300">Speak naturally and get instant career advice</p>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={isListening ? undefined : startListening}
          disabled={isListening}
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 transition-all duration-300 flex items-center justify-center text-6xl hover:scale-110 disabled:scale-100"
        >
          {isListening ? '🎙️' : '🎤'}
        </button>
      </div>

      {isListening && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-red-500 bg-opacity-20 px-6 py-3 rounded-full border border-red-400">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-300 font-semibold">Listening...</span>
          </div>
        </div>
      )}

      {transcript && (
        <div className="mb-6 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-purple-400">
          <div className="text-purple-300 text-sm font-semibold mb-2">You said:</div>
          <div className="text-white text-lg">{transcript}</div>
        </div>
      )}

      {aiResponse && (
        <div className="mb-6 p-6 bg-gradient-to-br from-cyan-500 to-purple-600 bg-opacity-20 backdrop-blur-lg rounded-2xl border border-cyan-400">
          <div className="flex items-center justify-between mb-2">
            <div className="text-cyan-300 text-sm font-semibold">AI Assistant:</div>
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="text-xs bg-red-500 px-3 py-1 rounded-full text-white hover:bg-red-600"
              >
                Stop
              </button>
            )}
          </div>
          <div className="text-white text-lg">{aiResponse}</div>
        </div>
      )}

      <div className="text-center text-purple-300 text-sm">
        <p>Click the microphone and speak your career question</p>
      </div>
    </div>
  )
}

