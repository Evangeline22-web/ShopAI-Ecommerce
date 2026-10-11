
import { useEffect, useState } from "react";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";
import API from "../api/axios";

function AIChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const openChat = () => setOpen(true);

    window.addEventListener("shopai:open-chat", openChat);

    return () => {
      window.removeEventListener("shopai:open-chat", openChat);
    };
  }, []);

  const askAI = async (e) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    setLoading(true);
    setReply("");

    try {
      const res = await API.post("/ai/chat", {
        message: message.trim(),
      });

      setReply(
        res.data.reply || "Sorry, I couldn't generate a response."
      );
    } catch (error) {
      console.error(
        "AI Chat Error:",
        error.response?.data || error.message
      );

      setReply(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "AI is currently unavailable. Please check your backend and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-5 rounded-full shadow-xl hover:bg-blue-700 transition z-50"
      >
        {open ? <FaTimes size={24} /> : <FaRobot size={24} />}
      </button>

      {/* AI Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 max-w-full bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4">
            <h2 className="font-bold text-lg">
              🤖 ShopAI Assistant
            </h2>
            <p className="text-sm text-blue-100">
              How can I help you shop today?
            </p>
          </div>

          {/* Chat Content */}
          <div className="p-4">
            <form onSubmit={askAI}>
              <textarea
                rows={3}
                placeholder="Ask about products, prices, or recommendations..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
              />

              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="mt-3 w-full bg-blue-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <FaPaperPlane />
                {loading ? "Thinking..." : "Ask AI"}
              </button>
            </form>

            {/* AI Response */}
            <div className="mt-4 bg-gray-100 rounded-lg p-4 min-h-[100px] max-h-64 overflow-y-auto">
              {loading ? (
                <p className="text-gray-500">
                  Thinking... Please wait.
                </p>
              ) : reply ? (
                <p className="text-gray-800 whitespace-pre-wrap break-words">
                  {reply}
                </p>
              ) : (
                <p className="text-gray-500">
                  Your AI shopping assistant is ready!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChat;
