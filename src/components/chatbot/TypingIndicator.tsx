const TypingIndicator = () => {
  return (
    <div className="flex gap-3 mb-4 justify-start">
      <div className="w-8 h-8 flex-shrink-0 mt-1" /> {/* Spacer for alignment */}

      <div className="bg-muted text-foreground rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1.5 items-center">
          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
