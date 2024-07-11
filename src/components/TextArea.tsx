import React, { useEffect, useRef } from "react";

interface TextAreaTypes {
  value: string;
  position: { x: number; y: number };
  onChange: (value: string) => void;
}

const TextArea: React.FC<TextAreaTypes> = ({
  value,
  position,
  onChange,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const textAreaResize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    textAreaResize();
  }, [value]);

  const left = (textAreaRef.current?.clientWidth || 256) / 2;
  const top = (textAreaRef.current?.clientHeight || 32) / 2;

  return (
    <textarea
      ref={textAreaRef}
      autoFocus
      rows={1}
      className="px-2 py-1 w-64 resize-none bg-slate-700 rounded text-white absolute -translate-x-1/2 -translate-y-1/2 cursor-none"
      style={{
        left: `${Math.max(left, Math.min(window.innerWidth - left, position.x))}px`,
        top: `${Math.max(top, Math.min(window.innerHeight - top, position.y))}px`,
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextArea;
