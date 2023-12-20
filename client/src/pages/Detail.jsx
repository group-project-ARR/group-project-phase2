import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Detail() {
  const params = useParams();
  const navigate = useNavigate();
  //   console.log(params);
  const [post, setPost] = useState({});
  console.log(post);

  const fetchPostById = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `http://localhost:3000/sell/` + params.id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostById();
  }, []);

  const handleChat = () => {
    navigate("/chats");
  };
  return (
    <>
      <div className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img className="w-full h-full object-cover" src={post[0]?.imageUrl} alt="Product Image" />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button className="w-full bg-teal-700 text-white py-2 px-4 rounded-full font-bold hover:bg-teal-900">Buy Now</button>
                </div>
                <div className="w-1/2 px-2">
                  <button onClick={handleChat} className="w-full bg-teal-100 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-teal-400">
                    Chat Seller
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{post[0]?.name}</h2>

              <span className="bg-gray-300 text-gray-700 py-1 px-2 rounded-full font-medium"> {post[0]?.Category?.name}</span>
              <p className="text-teal-700 font-bold text-sm mt-4"> {post[0]?.location}</p>
              <p className="text-gray-600 text-sm mb-4 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo. Integer euismod libero id mauris malesuada tincidunt.</p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700">Price:</span>
                  <span className="text-gray-600"> IDR {post[0]?.price}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-700">Condition:</span>
                  <span className="text-gray-600"> {post[0]?.condition}</span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700">Seller Information:</span>
                <div className="flex items-center mt-2 mb-4">
                  <p className="text-teal-700 font-bold text-sm">{post[0]?.User?.username}</p>
                </div>
                <span className="font-bold text-gray-700">Product Description:</span>
                <p className="text-gray-600 text-sm mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et
                  venenatis sem blandit. Quisque ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
