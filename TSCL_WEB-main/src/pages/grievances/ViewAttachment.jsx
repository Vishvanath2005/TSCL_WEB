import React,{useEffect,useState}from "react";
import axios from "axios";
import { API } from "../../Host";
import { toast } from "react-toastify";




const ViewAttachment = (props) => {
    const {attachmentFile} = props;
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${API}/new-grievance-attachment/file/${attachmentFile}`, {
                responseType: 'blob' 
              });
              const blob = new Blob([response.data], { type: response.headers['content-type'] });
              const url = URL.createObjectURL(blob);
              setImageUrl(url);
            
          } catch (error) {
            console.error("Error fetching data", error);
          }
        };
        fetchData();
      }, [attachmentFile]);

   
    
 
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ">
      <div className="bg-white w-fit h-fit  font-lexend m-2 rounded-xl">
      
        <div className="  py-6 mx-8 my-3 gap-5 ">
        {imageUrl && (
            <img src={imageUrl} alt="attachment" className="w-72 h-72 mb-3" />
          )}
            <div
              className="border border-primary text-primary bg-none font-lexend rounded-3xl px-3 py-1.5 text-center"
              onClick={props.toggleModal}
            >
              cancel
            </div>
          </div>
      </div>
    </div>
  );
};

export default ViewAttachment;
