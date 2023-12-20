import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL}/register`,
        data: form,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      console.log(data);
      navigate("/login");
      Swal.fire("Successfully Registered!");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  return (
    <>
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')" }}></div>
          <div className="w-full p-8 lg:w-1/2">
            <img src="./logo.png" className="my-10 mx-auto" />
            <p className="text-xl text-gray-600 text-center">Register Here!</p>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" name="username" onChange={handleChange} />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" name="email" onChange={handleChange} />
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                </div>
                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" name="password" onChange={handleChange} />
              </div>
              <div className="mt-8">
                <button type="submit" className="bg-teal-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-teal-900">
                  Sign Up
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link to={"/login"} href="#" className="text-xs text-gray-500 uppercase">
                or log in
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
