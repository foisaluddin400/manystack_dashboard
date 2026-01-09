import { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navigate from "../Navigate";

import { message, Spin } from "antd";
import {
  useAddTermsMutation,
  useGetTermsQuery,
} from "../redux/api/categoryApi";

const TermsCondition = () => {
  const { data: privecyData } = useGetTermsQuery();
  const [addPrivecy] = useAddTermsMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleTerms = async () => {
    const data = {
      content: content,
    };

    setLoading(true);
    const res = await addPrivecy(data).unwrap();
    setLoading(false);

    message.success(res?.message);
  };
  const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 600,
    },
    buttons: [
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
    ],
  };
  //sdfdfsdfdsfasfdas

  useEffect(() => {
    setContent(privecyData?.data?.content);
  }, [privecyData]);
  return (
    <div className=" mx-auto ">
      <div className="flex justify-between">
        <Navigate title={"Terms & Condition"} />
      </div>
      <div className="mt-4">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => {}}
        />
      </div>

      <div className="mt-5 flex justify-center">
        <button
          onClick={handleTerms}
          disabled={isLoading}
          className="bg-gradient-to-r from-[#017FF4] to-blue-300 px-5 py-2 text-white roundede"
        >
          {isLoading ? <Spin size="small" /> : "Update"}
        </button>
      </div>
    </div>
  );
};

export default TermsCondition;
