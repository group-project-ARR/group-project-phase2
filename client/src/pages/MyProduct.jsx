import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Card from "../components/Card";
import MyProductCard from "../components/MyProductCard";

export default function MyProduct() {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/myposts",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      console.log(data);
      setPosts(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Opps!",
        text: error.response.data.message,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {/* Headers */}
      <div className="bg-white-200">
        <div className="dark:bg-transparent">
          <div className="mx-auto flex flex-col items-center py-12 sm:py-12">
            <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-2 sm:mb-2">
              <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl text-center text-gray-800 font-black leading-10">Your Products</h1>
            </div>
            <div className="flex w-11/12 md:w-8/12 xl:w-6/12">
              <div className="flex rounded-md w-full"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 gap-20 md:grid-cols-2 gap-10 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {posts &&
          posts.map((post) => {
            return <MyProductCard key={post.id} posts={post} />;
          })}
      </div>
    </>
  );
}
