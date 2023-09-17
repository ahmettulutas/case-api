"use client";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type Props = {
  formattedJSON: string;
}
const JsonContainer: React.FC<Props> = ({ formattedJSON }) => {
  const { isCopied, copy } = useCopyToClipboard();

  return (
    <div className="relative my-2">
      <button className="absolute right-1 top-1 bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 px-1 text-sm" onClick={(e) => {
        e.preventDefault();
        copy(formattedJSON);
      }}>
        {isCopied ? "COPIED" : "COPY"}
      </button>
      <pre className="font-mono bg-gray-300 border border-gray-300 p-2 pt-8 overflow-auto max-h-96 text-gray-700">
        {formattedJSON}
      </pre>
    </div>
  );
};

export default JsonContainer;
