import { LayoutDashboard, Users, ClipboardList, Package2, Table, FileText, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, active: true },
    { icon: Users },
    { icon: ClipboardList },
    { icon: Package2 },
    { icon: Table },
    { icon: FileText },
    { icon: Settings },
    { icon: LogOut },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-white shadow-md flex flex-col items-center py-8 gap-8">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-primary" />
      </div>
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
            item.active
              ? "bg-primary text-white"
              : "hover:bg-primary/10 text-gray-500"
          )}
        >
          <item.icon className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
};

export default Sidebar;