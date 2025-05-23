import { useState, useRef, } from 'react';
import JoditEditor from 'jodit-react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navigate from '../Navigate';


const PrivacyPolicy = () => {

  const editor = useRef(null);
  const [content, setContent] = useState('');
  // const [isLoading, seLoading] = useState(false)
  const navigate = useNavigate();
  // const handleTerms = () => {
  //     console.log(content)
  // }
  const config = {
    readonly: false,
    placeholder: 'Start typings...',
    style: {
      height: 600,
    },
    buttons: [
      'image', 'fontsize', 'bold', 'italic', 'underline', '|',
      'font', 'brush',
      'align'
    ]
  }
//sdfs
  return (
    <div className=" mx-auto ">
      <div className="flex justify-between">
        <Navigate title={"Privacy And Policy"} />

      </div>
      <div className='mt-4'>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={newContent => setContent(newContent)}
        // onChange={newContent => { }}
        />
      </div>


      <div className="mt-5 flex justify-center">
        <button

          className="bg-[#02111E] py-2 px-4 rounded text-white"
        >
          Save & change
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
