import { cn } from "@/lib/utils";

const WaitingList = () => {
  const waitingCustomers = Array(6).fill({
    name: "John Doe",
    partySize: 4,
    time: "12:30 PM",
  });

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Waiting List (12)</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {waitingCustomers.map((customer, index) => (
          <div
            key={index}
            className="min-w-[200px] bg-white rounded-xl p-4 shadow-sm"
          >
            <h3 className="font-semibold">{customer.name}</h3>
            <p className="text-sm text-gray-500">Party of {customer.partySize}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">Since {customer.time}</span>
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