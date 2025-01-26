'use client'
import { Thread, useEdgeRuntime } from "@assistant-ui/react";
import { makeMarkdownText } from "@assistant-ui/react-markdown";

const MarkdownText = makeMarkdownText();

const ChatPage = () => {
  const runtime = useEdgeRuntime({
    api: "/api/chat",

  });
 
  return (
    <div className="h-full">
      <Thread 
      runtime={runtime}
      assistantMessage={{ components: { Text: MarkdownText } }}
      welcome={{message:'Hare Krishna! Welcome to the Bhagavad Gita Knowledge Hub. Feel free to ask any question about the teachings of the Bhagavad Gita, and I will guide you with the wisdom contained in its verses. May this journey deepen your understanding and bring peace to your heart.',suggestions:[{prompt:"What is Life?"},{prompt:"What is universe?"},{prompt:'धर्म का क्या अर्थ है?'},{prompt:"भक्तीचा काय महत्व आहे?"}]}}
      />
    </div>
  );
};

export default ChatPage;
