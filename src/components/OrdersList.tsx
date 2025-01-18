import { RotateCw } from "lucide-react";

const OrdersList = () => {
  const orders = Array(8).fill({
    id: "123",
    table: "5",
    items: [
      { name: "Burger", quantity: 1, price: 8.99 },
      { name: "Fish and Chips", quantity: 3, price: 28.99 },
      { name: "French Fries", quantity: 2, price: 5.99 },
    ],
  });

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Orders (20)</h2>
        <button className="text-white bg-primary px-4 py-2 rounded-lg flex items-center gap-2">
          Manage Orders
          <RotateCw className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {orders.map((order, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-amber-500 rounded-full" />
                  Order #{order.id}
                </span>
                <span className="text-sm text-gray-500">• Table {order.table}</span>
              </div>
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
            {order.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex justify-between items-center mb-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  <span>{item.quantity}x</span>
                  <span>{item.name}</span>
                </div>
                <span>${item.price}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;