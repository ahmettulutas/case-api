import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type Props = {
  formattedJSON: string;
}

const JsonContainer: React.FC<Props> = ({ formattedJSON }) => {

  const { isCopied, copy } = useCopyToClipboard();

  return (
    <div className="relative">
      <button className="absolute right-3 top-3 bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 p-1" onClick={(e) => {
        e.preventDefault();
        copy(formattedJSON);
      }}>
        {isCopied ? "COPIED" : "COPY"}
      </button>
      <pre className="font-mono bg-gray-300 border border-gray-300 p-4 overflow-auto max-h-96 text-gray-700">{formattedJSON}</pre>
    </div>
  );
};

export default JsonContainer;
