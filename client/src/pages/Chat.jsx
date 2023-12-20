export default function Chat() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="bg-gray-200 flex-1 overflow-y-scroll">
          <div className="px-4 py-2">
            <div className="flex items-center mb-2">
              <img className="w-8 h-8 rounded-full mr-2" src="https://picsum.photos/50/50" alt="User Avatar" />
              <div className="font-medium">Seller 1</div>
            </div>
            <div className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">Halo, Ada yang bisa di bantu?</div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-500 text-white rounded-lg p-2 shadow mr-2 max-w-sm">Bisa Nego gan?</div>
              <img className="w-8 h-8 rounded-full" src="https://picsum.photos/50/50" alt="User Avatar" />
            </div>
          </div>
        </div>
        <div className="bg-gray-100 px-4 py-2">
          <div className="flex items-center">
            <input className="w-full border rounded-full py-2 px-4 mr-2" type="text" placeholder="Type your message..." />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full">Send</button>
          </div>
        </div>
      </div>
    </>
  );
}
