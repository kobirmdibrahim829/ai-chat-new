"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col">

      {/* Top Bar */}
      <div className="w-full flex justify-between items-center px-6 py-4 border-b border-white/10">
        <h1 className="text-lg font-semibold tracking-wide">
          MD Ibrahim Kabir
        </h1>

        <button
          onClick={() => (window.location.href = "/login")}
          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition"
        >
          Login
        </button>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex items-center justify-center px-4">

        <div className="w-full max-w-3xl text-center space-y-8">

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold">
            👋 Welcome to Your AI Chat Platform
          </h2>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg">
            A modern AI-powered chat system where you can talk, explore, and interact
            with intelligent responses in real time.
          </p>

          {/* Feature Box */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">

            <div className="bg-white/10 border border-white/10 rounded-xl p-5">
              <h3 className="font-semibold mb-2">🤖 AI Chat</h3>
              <p className="text-sm text-gray-300">
                Talk with smart AI assistant instantly.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-xl p-5">
              <h3 className="font-semibold mb-2">⚡ Fast Response</h3>
              <p className="text-sm text-gray-300">
                Get quick and accurate answers in real time.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-xl p-5">
              <h3 className="font-semibold mb-2">🔐 Secure Login</h3>
              <p className="text-sm text-gray-300">
                Safe authentication with JWT system.
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">

            <button
              onClick={() => (window.location.href = "/login")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
            >
              🔐 Login
            </button>

            <button
              onClick={() => (window.location.href = "/signup")}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition"
            >
              🆕 Signup
            </button>

            <button
              onClick={() => {
                const guestId =
                  "guest_" + Math.random().toString(36).substring(2, 10);
                localStorage.setItem("token", guestId);
                window.location.href = "/chat";
              }}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold transition"
            >
              👤 Guest Mode
            </button>

          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 px-6 py-4 text-center text-sm text-gray-400 space-y-1">

        <p>
          📧 Email: kobirmdibrahim829@gmail.com
        </p>

        <p>
          📱 Phone: 01750840542
        </p>

      </div>

    </div>
  );
}