import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import API_URL from "../api";

const MessageDetail = ({ message }) => {
  const { setMessages } = useContext(MessageContext);

  const handleClick = async () => {
    try {
      const response = await fetch(`${API_URL}/api/message/${message._id}`, {
        method: "DELETE",
      });

      const json = await response.json();

      if (response.ok) {
        setMessages((prevMessage) =>
          prevMessage.filter((el) => el._id !== message._id),
        );
      } else {
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="message">
      <span onClick={handleClick}>X</span>
      <h4>{message.author}</h4>
      <p>{message.text}</p>
      <hr />
      <p>{new Date(message.createdAt).toLocaleString("ru-RU")}</p>
    </div>
  );
};

export default MessageDetail;
