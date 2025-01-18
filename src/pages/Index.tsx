import { Switch } from "@/components/ui/switch";
import Sidebar from "@/components/Sidebar";
import WaitingList from "@/components/WaitingList";
import OrdersList from "@/components/OrdersList";
import TopSellers from "@/components/TopSellers";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Sidebar />
      <div className="pl-20">
        <div className="max-w-[1400px] mx-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Tax</span>
                <Switch />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Online Order</span>
                <Switch />
              </div>
            </div>
          </div>
          <WaitingList />
          <OrdersList />
          <TopSellers />
        </div>
      </div>
    </div>
  );
};

export default Index;