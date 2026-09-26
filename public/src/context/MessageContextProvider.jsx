import { useState } from "react";
import { MessageContext } from "./MessageContext";

export const MessageContextProvider = ({children}) => {
    const [messages, setMessages] = useState([]);

    return (
        <MessageContext.Provider value={ {messages, setMessages}}>
            { children }
        </MessageContext.Provider>
    )
}