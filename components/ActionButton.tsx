import { HTTP_METHOD } from "next/dist/server/web/http";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  url: string;
  method: HTTP_METHOD;
};
export const methods: Record<string, HTTP_METHOD> = {
  post: "POST",
  get: "GET",
  put: "PUT",
  delete: "DELETE",
} as const;

const ActionButton: React.FC<Props> = (props) => {
  const { url, method, ...rest } = props;
  return (
    <button
      {...rest}
      className="font-bold bg-gray-100 hover:bg-gray-300 border-2 border-gray-800 p-1 flex items-center disabled:cursor-not-allowed"
      type="submit"
    >
      <span className="border-2 border-gray-800 mr-4 p-1">{method}</span>
      <span>{url}</span>
    </button>
  );
};

export default ActionButton;
