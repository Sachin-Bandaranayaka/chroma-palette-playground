import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
}

const TopSellers = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    category: "",
    isAvailable: true,
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Margherita Pizza",
      description: "Classic Italian pizza with mozzarella cheese and fresh basil.",
      price: 12.99,
      category: "Pizza",
      image: "/lovable-uploads/1b85561e-a389-4192-ad32-a81eee0df3ab.png",
      isAvailable: true,
    },
    {
      id: "2",
      name: "Macaroni",
      description: "Creamy pasta made with spaghetti, eggs and Parmesan cheese.",
      price: 15.99,
      category: "Pasta",
      image: "/lovable-uploads/1b85561e-a389-4192-ad32-a81eee0df3ab.png",
      isAvailable: true,
    },
    {
      id: "3",
      name: "New York Cheesecake",
      description: "Rich and creamy cheesecake with a graham cracker crust.",
      price: 6.99,
      category: "Dessert",
      image: "/lovable-uploads/1b85561e-a389-4192-ad32-a81eee0df3ab.png",
      isAvailable: true,
    },
    {
      id: "4",
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with Caesar dressing and croutons.",
      price: 8.99,
      category: "Salad",
      image: "/lovable-uploads/1b85561e-a389-4192-ad32-a81eee0df3ab.png",
      isAvailable: true,
    },
  ]);

  const handleSaveItem = () => {
    if (!newItem.name || !newItem.category || !newItem.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editingItem) {
      setMenuItems(
        menuItems.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                ...newItem,
                image: "/lovable-uploads/1b85561e-a389-4192-ad32-a81eee0df3ab.png",
              }
            : item
        )
      );
      toast({
        title: "Success",
        description: "Menu item updated successfully",
      });
    } else {
      const item: MenuItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: newItem.name!,
        description: newItem.description || "",
        price: newItem.price!,
        category: newItem.category!,
        image: "/lovable-uploads/1b85561e-a389-4192-ad32-a81eee0df3ab.png",
        isAvailable: true,
      };
      setMenuItems([...menuItems, item]);
      toast({
        title: "Success",
        description: "New menu item added successfully",
      });
    }

    setNewItem({
      name: "",
      description: "",
      price: 0,
      category: "",
      isAvailable: true,
    });
    setEditingItem(null);
    setIsOpen(false);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setNewItem(item);
    setIsOpen(true);
  };

  const toggleAvailability = (itemId: string) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === itemId
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    );
    toast({
      title: "Status Updated",
      description: "Item availability has been updated",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Top Seller Menu</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              New Menu
              <Plus className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  placeholder="Enter item name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  placeholder="Enter item description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: parseFloat(e.target.value) })
                  }
                  placeholder="Enter price"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                  placeholder="Enter category"
                />
              </div>
              <Button onClick={handleSaveItem} className="w-full">
                {editingItem ? "Update Item" : "Add Item"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`min-w-[300px] bg-white rounded-xl p-4 shadow-sm ${
                !item.isAvailable ? "opacity-75" : ""
              }`}
            >
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-primary font-semibold">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className={`inline-block px-3 py-1 ${
                        item.isAvailable
                          ? "bg-primary/10 text-primary"
                          : "bg-gray-100 text-gray-500"
                      } rounded-full text-sm`}
                    >
                      {item.category}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => toggleAvailability(item.id)}
                      >
                        {item.isAvailable ? (
                          <X className="w-4 h-4" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default TopSellers;