import { useEffect } from "react";
import MessageDetail from "./MessageDetail";
import MessageForm from "./MessageForm";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

const Home = () => {
  const {messages, setMessages} = useContext(MessageContext);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("/api/message/");

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const json = await response.json();
        setMessages(json);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessage();
  }, [setMessages]);
  return (
    <div className="main-section">
      <h1>Главная страница</h1>
      <div className="content">
        <div className="messages">
            {messages && messages.map((el) => (
                <MessageDetail key={el._id} message={el} />
            ))}
        </div>
        <MessageForm />
      </div>
    </div>
  );
};

export default Home;
