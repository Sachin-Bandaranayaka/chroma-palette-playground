import { RotateCw, Check, Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";

type OrderStatus = "pending" | "in-progress" | "completed";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  table: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
}

const OrdersList = () => {
  const { toast } = useToast();
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [orders, setOrders] = useState<Order[]>(
    Array(8).fill({
      id: "123",
      table: "5",
      status: "pending" as OrderStatus,
      total: 43.97,
      items: [
        { name: "Burger", quantity: 1, price: 8.99 },
        { name: "Fish and Chips", quantity: 3, price: 28.99 },
        { name: "French Fries", quantity: 2, price: 5.99 },
      ],
    })
  );

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast({
      title: "Order Updated",
      description: `Order #${orderId} status changed to ${newStatus}`,
    });
  };

  const filteredOrders = orders.filter(
    (order) => filterStatus === "all" || order.status === filterStatus
  );

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-amber-500";
      case "in-progress":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Orders ({orders.length})</h2>
          <div className="flex gap-2 mt-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              onClick={() => setFilterStatus("pending")}
              size="sm"
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === "in-progress" ? "default" : "outline"}
              onClick={() => setFilterStatus("in-progress")}
              size="sm"
            >
              In Progress
            </Button>
            <Button
              variant={filterStatus === "completed" ? "default" : "outline"}
              onClick={() => setFilterStatus("completed")}
              size="sm"
            >
              Completed
            </Button>
          </div>
        </div>
        <Button className="flex items-center gap-2">
          Manage Orders
          <RotateCw className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredOrders.map((order, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="flex items-center gap-1">
                  <span
                    className={`w-2 h-2 ${getStatusColor(
                      order.status
                    )} rounded-full`}
                  />
                  Order #{order.id}
                </span>
                <span className="text-sm text-gray-500">• Table {order.table}</span>
              </div>
              <div className="flex gap-2">
                {order.status !== "completed" && (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      updateOrderStatus(
                        order.id,
                        order.status === "pending" ? "in-progress" : "completed"
                      )
                    }
                  >
                    {order.status === "pending" ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                  </Button>
                )}
              </div>
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
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="font-medium">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;