export default function Card() {
  return (
    <>
      <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
          <img
            src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
            className="h-full w-full object-cover"
            alt="Product"
          />
        </div>
        <div className="p-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">Apple AirPods</p>
            <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">$95.00</p>
          </div>
          <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case.</p>
        </div>
        <div className="p-6 pt-0">
          <button
            className="w-full px-6 py-3 text-center uppercase font-sans text-xs font-bold text-blue-gray-900 bg-blue-gray-100 border border-blue-gray-900 rounded-lg transition-all hover:scale-105 hover:bg-teal-900 hover:text-white focus:scale-105 focus:outline-none focus:ring focus:border-blue-500 active:scale-100 active:bg-blue-gray-200 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            type="button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
