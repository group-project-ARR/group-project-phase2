import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      let url;
      if (searchTerm) {
        url = `http://localhost:3000/sell/?search=${searchTerm}`;
      } else {
        url = `http://localhost:3000/sell`;
      }
      const { data } = await axios({
        method: "get",
        url,
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
  }, [searchTerm]);

  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {/* <!-- Hero Section --> */}
      <section className="bg-teal-900 text-white py-20 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 mb-10 md:mb-10">
            <h1 className="text-6xl font-bold leading-tight mb-4">Your Needs Solution.</h1>
            <p className="text-xl mb-6">We offer reasonable price with best quality to help you achieve your needs.</p>
            <Link to={"/create"} className="bg-white text-teal-600 font-bold py-3 px-6 rounded hover:bg-teal-600 hover:text-white">
              Start Selling
            </Link>
          </div>
          <div className="md:w-1/2">
            <img src="https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hero Image" className="w-full rounded-xl" />
          </div>
        </div>
      </section>
      {/* Headers */}
      <div className="bg-white-200">
        <div className="dark:bg-transparent">
          <div className="mx-auto flex flex-col items-center py-12 sm:py-24">
            <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
              <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl text-center text-gray-800 font-black leading-10">
                Need some products? <br />
                Here's the
                <span className="text-teal-700"> Solution</span>
              </h1>
              <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-500 font-normal text-center text-xl">We're only selling the best quality pre-owned products</p>
            </div>
            <div className="flex w-11/12 md:w-8/12 xl:w-6/12">
              <div className="flex rounded-md w-full">
                <input
                  type="text"
                  name="q"
                  className="w-full p-3 rounded-md rounded-r-none border border-2 border-gray-300 placeholder-current dark:bg-gray-500 dark:text-gray-300 dark:border-none"
                  placeholder="keyword"
                  onChange={handleChangeSearch}
                />
                <button
                  onSubmit={(e) => {
                    e.preventDefault();
                    fetchData();
                  }}
                  className="inline-flex items-center gap-2 bg-teal-700 text-white text-lg font-semibold py-3 px-6 rounded-r-md"
                >
                  <span>Find</span>
                  <svg
                    className="text-gray-200 h-5 w-5 p-0 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 56.966 56.966"
                    style={{ enableBackground: "new 0 0 56.966 56.966" }}
                    xmlSpace="preserve"
                  >
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 gap-20 md:grid-cols-2 gap-10 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {posts &&
          posts.map((post) => {
            return <Card key={post.id} posts={post} />;
          })}
      </div>
    </>
  );
}
