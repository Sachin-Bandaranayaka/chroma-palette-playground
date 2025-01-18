import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Customer {
  id: string;
  name: string;
  partySize: number;
  time: string;
  status: "waiting" | "seated" | "cancelled";
}

const WaitingList = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    partySize: 2,
  });

  const [waitingCustomers, setWaitingCustomers] = useState<Customer[]>(
    Array(6).fill({
      id: Math.random().toString(36).substr(2, 9),
      name: "John Doe",
      partySize: 4,
      time: "12:30 PM",
      status: "waiting",
    })
  );

  const addCustomer = () => {
    if (!newCustomer.name) {
      toast({
        title: "Error",
        description: "Please enter customer name",
        variant: "destructive",
      });
      return;
    }

    const customer: Customer = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCustomer.name,
      partySize: newCustomer.partySize,
      time: new Date().toLocaleTimeString(),
      status: "waiting",
    };

    setWaitingCustomers([...waitingCustomers, customer]);
    setNewCustomer({ name: "", partySize: 2 });
    setIsOpen(false);
    toast({
      title: "Success",
      description: "Customer added to waiting list",
    });
  };

  const updateCustomerStatus = (customerId: string, status: "seated" | "cancelled") => {
    setWaitingCustomers(
      waitingCustomers.map((customer) =>
        customer.id === customerId ? { ...customer, status } : customer
      )
    );
    toast({
      title: status === "seated" ? "Customer Seated" : "Reservation Cancelled",
      description: `Customer has been ${
        status === "seated" ? "seated" : "removed from waiting list"
      }`,
    });
  };

  const activeWaitingCustomers = waitingCustomers.filter(
    (customer) => customer.status === "waiting"
  );

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Waiting List ({activeWaitingCustomers.length})
        </h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              Add Customer
              <Plus className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Customer to Waiting List</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Customer Name</Label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, name: e.target.value })
                  }
                  placeholder="Enter customer name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partySize">Party Size</Label>
                <Input
                  id="partySize"
                  type="number"
                  min="1"
                  value={newCustomer.partySize}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      partySize: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>
              <Button onClick={addCustomer} className="w-full">
                Add to Waiting List
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {activeWaitingCustomers.map((customer, index) => (
          <div
            key={index}
            className="min-w-[200px] bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{customer.name}</h3>
                <p className="text-sm text-gray-500">
                  Party of {customer.partySize}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateCustomerStatus(customer.id, "seated")}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateCustomerStatus(customer.id, "cancelled")}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                Since {customer.time}
              </span>
              <span className="text-sm text-amber-500 font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                Waiting
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaitingList;