import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const fetchDataCategories = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL}/categories`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataCategories();
  }, []);

  const params = useParams();
  console.log(params);
  const [inputForm, setInputForm] = useState({
    name: "",
    price: "",
    location: "",
    condition: "",
    imageUrl: "",
    CategoryId: "",
    UserId: localStorage.getItem("id"),
  });

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      console.log("masuk");
      const { data } = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL}/posts/` + params.id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      console.log(data);
      setInputForm(() => {
        return {
          name: data.name,
          price: data.price,
          location: data.location,
          condition: data.condition,
          imageUrl: data.imageUrl,
          categoryId: data.categoryId,
        };
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Opps!",
        text: error.response.data.message,
      });
      console.log(error);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handleDiscard = () => {
    navigate("/myposts");
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios({
        method: "put",
        url: `${import.meta.env.VITE_BASE_URL}/posts/` + params.id,
        data: inputForm,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Good Job!",
        text: "Succesfully Update the Product",
      });
      navigate("/myposts");
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
      <div className="bg-white border border-4 rounded-lg shadow relative m-10">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Edit Product</h3>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="product-modal">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmitForm}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="product-name" className="text-sm font-medium text-gray-900 block mb-2">
                  Product Name
                </label>
                <input
                  onChange={handleChangeInput}
                  value={inputForm.name}
                  type="text"
                  name="name"
                  id="name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Apple Imac 27”"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="category" className="text-sm font-medium text-gray-900 block mb-2">
                  Category
                </label>
                <select
                  onChange={handleChangeInput}
                  type="text"
                  name="CategoryId"
                  id="CategoryId"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Electronics"
                  required
                >
                  <option selected>--select category--</option>
                  {categories &&
                    categories.map((categories) => {
                      return (
                        <option key={categories.id} value={categories.id}>
                          {categories.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="location" className="text-sm font-medium text-gray-900 block mb-2">
                  Location
                </label>
                <input
                  value={inputForm.location}
                  onChange={handleChangeInput}
                  type="text"
                  name="location"
                  id="location"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Apple"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">
                  Price
                </label>
                <input
                  value={inputForm.price}
                  onChange={handleChangeInput}
                  type="number"
                  name="price"
                  id="price"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="500000"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="condition" className="text-sm font-medium text-gray-900 block mb-2">
                  Condition
                </label>
                <input
                  value={inputForm.condition}
                  onChange={handleChangeInput}
                  type="text"
                  name="condition"
                  id="condition"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Good"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="imageUrl" className="text-sm font-medium text-gray-900 block mb-2">
                  Image Url
                </label>
                <input
                  value={inputForm.imageUrl}
                  onChange={handleChangeInput}
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Your Image Url"
                  required
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="product-details" className="text-sm font-medium text-gray-900 block mb-2">
                  Product Details
                </label>
                <textarea id="product-details" rows="6" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Details"></textarea>
              </div>
            </div>{" "}
            <div className="p-6 border-t border-gray-200 rounded-b">
              <button className="text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2" type="submit">
                Update
              </button>
              <button className="text-white bg-slate-500 hover:bg-slate-700 focus:ring-4 focus:ring-slate-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button" onClick={handleDiscard}>
                Discard
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
