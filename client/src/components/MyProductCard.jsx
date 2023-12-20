import { useNavigate } from "react-router-dom";

export default function MyProductCard({ posts, deletePost }) {
  const navigate = useNavigate();

  const updateHandler = () => {
    navigate(`/myposts/${posts.id}`);
  };
  return (
    <>
      <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
          <img src={posts.imageUrl} className="h-full w-full object-cover" alt="Product" />
        </div>
        <div className="p-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="block font-sans text-base font-bold leading-relaxed text-blue-gray-900 antialiased">{posts.name}</p>
            <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">{posts.price}</p>
          </div>
          <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
            <span className="text-teal-700 font-bold"> {posts.location}</span>
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero culpa, eligendi ex necessitatibus vero corporis!
          </p>
        </div>
        <div className="p-6 pt-0">
          <button
            onClick={updateHandler}
            className="w-35 px-6 py-3 mr-2 text-center uppercase font-sans text-xs font-bold text-blue-gray-900 bg-teal-100 rounded-lg transition-all hover:scale-105 hover:bg-teal-900 hover:text-white focus:scale-105 focus:outline-none focus:ring focus:border-blue-500 active:scale-100 active:bg-blue-gray-200 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            type="button"
          >
            Update
          </button>
          <button
            onClick={() => deletePost(posts.id)}
            className="w-35 px-6 py-3 text-center uppercase font-sans text-xs font-bold text-blue-gray-900 bg-red-100 rounded-lg transition-all hover:scale-105 hover:bg-red-900 hover:text-white focus:scale-105 focus:outline-none focus:ring focus:border-blue-500 active:scale-100 active:bg-blue-gray-200 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
