import { useEffect, useRef, useState } from "react";
import axios from 'axios';


export default function Copilot() {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const fetchMessages = async () => {
        const res = await axios.get('http://127.0.0.1:8000/fetch-messages');
        setMessages(res.data.messages);
        console.log(messages);
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        fetchMessages();
    }, [])

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = {
            sender: 'user',
            text: message,
            model: 'llama3.2:1b'
        };

        setMessages(prev => [...prev, userMessage]);

        setMessage('');

        const typingMessage = {
            id: Date.now(),
            sender: 'bot',
            text: 'Thinking...'
        };
        setMessages(prev => [...prev, typingMessage]);

        try {
            const res = await axios.post('http://127.0.0.1:8000/chat', {
                text: userMessage.text,
                model: userMessage.model
            });

            setMessages(prev => prev.map(msg =>
                msg.id === typingMessage.id ? { ...msg, text: res.data.reply } : msg
            ));
        } catch (err) {
            setMessages(prev => prev.map(msg =>
                msg.id === typingMessage.id ? { ...msg, text: 'Error: could not fetch reply' } : msg
            ));
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col max-w-full h-full font-bold text-2xl text-white">
            <div className="flex justify-center items-center w-full min-h-1/10">Copilot chat</div>
            <div className="flex flex-col flex-1">
                <div className="flex flex-col gap-5 w-full p-5 h-148 overflow-y-auto scrollbar-hidden">
                    {messages.map((msg, index) => (
                        <div key={index} className={`max-w-full font-normal text-sm p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-zinc-600 self-end rounded-br-none' : 'bg-zinc-900 self-start rounded-bl-none'}`}>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="flex gap-5 justify-center items-center w-full h-30 p-5">
                    <input className="border-2 h-1/2 p-5 text-base w-2/3 font-medium rounded-lg focus:outline-none" type="text" placeholder="Ask a question"
                        onChange={(e) => setMessage(e.target.value)} value={message}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }} />

                    <button onClick={sendMessage} className="hover:scale-110 cursor-pointer duration-200">
                        <img className="w-8" src="/send.png" alt="send" />
                    </button>
                </div>
            </div>
        </div>
    );

} 