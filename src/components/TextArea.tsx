import React, { useEffect, useRef } from "react";

interface TextAreaTypes
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label: string;
  value: string;
  position: { x: number; y: number };
  onChange: (value: string) => void;
}

const TextArea: React.FC<TextAreaTypes> = ({
  label,
  value,
  position,
  onChange,
  ...props
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const textAreaResize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    textAreaResize();
  }, [value]);

  const left = (textAreaRef.current?.clientWidth || 256) / 2;
  const top = ((textAreaRef.current?.clientHeight || 32) + 20) / 2;

  return (
    <div
      className="flex flex-col gap-1 absolute -translate-x-1/2 -translate-y-1/2 cursor-not-allowed focus-within:z-10"
      style={{
        left: `${Math.max(
          left,
          Math.min(window.innerWidth - left, position.x)
        )}px`,
        top: `${Math.max(
          top,
          Math.min(window.innerHeight - top, position.y)
        )}px`,
      }}
    >
      <label className="font-medium text-xs text-black/80">{label}</label>
      <textarea
        ref={textAreaRef}
        rows={1}
        className="px-2 py-1 w-64 resize-none bg-slate-700 rounded text-white cursor-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
};

export default TextArea;
