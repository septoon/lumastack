'use client'
import React, { useEffect, useState } from "react";

interface TextTypingProps {
  text: string;
  speed?: number;
}

export const TextTyping: React.FC<TextTypingProps> = ({ text, speed = 10 }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 250);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="font-mono">
      {displayText}
      <span className={`transition-opacity duration-300 ${showCursor ? "opacity-100" : "opacity-0"}`}>
        |
      </span>
    </span>
  );
};