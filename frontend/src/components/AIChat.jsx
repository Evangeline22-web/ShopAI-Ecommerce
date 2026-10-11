import { useState } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import API from "../api/axios";

function AIChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const res = await API.post("/ai/chat", {
        message,
      });

      setReply(res.data.reply);
    } catch (error) {
      setReply("AI is currently unavailable.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-5 rounded-full shadow-xl hover:bg-blue-700 z-50"
      >
        <FaRobot size={24} />
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50">

          <div className="bg-blue-600 text-white p-4 rounded-t-2xl">
            <h2 className="font-bold">
              🤖 ShopAI Assistant
            </h2>
          </div>

          <div className="p-4">

            <textarea
              rows="4"
              placeholder="Ask anything..."
              className="w-full border rounded-lg p-3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={askAI}
              className="mt-3 w-full bg-blue-600 text-white py-3 rounded-lg flex justify-center items-center gap-2"
            >
              <FaPaperPlane />

              Ask AI
            </button>

            <div className="mt-5 bg-gray-100 rounded-lg p-4 min-h-[120px]">

              {loading ? (
                <p>Thinking...</p>
              ) : (
                <p>{reply}</p>
              )}

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default AIChat;