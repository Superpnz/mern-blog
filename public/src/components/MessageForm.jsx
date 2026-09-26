import { useContext } from "react";
import { useState } from "react";
import { MessageContext } from "../context/MessageContext";

const MessageForm = () => {
    const {setMessages} = useContext(MessageContext);

  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = { text, author };

    try {
      const response = await fetch("/api/message/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setError(null);
        setText("");
        setAuthor("");
        setMessages((prevMessages) => [json, ...prevMessages]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="add-message" onSubmit={handleSubmit}>
      <h3>Форма добавления сообщения</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите сообщение"
      ></textarea>
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        type="text"
        placeholder="Введите автора"
      />

      {error && <div className="error">{error}</div>}
      <button>Добавить</button>
    </form>
  );
};

export default MessageForm;
