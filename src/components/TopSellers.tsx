import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const TopSellers = () => {
  const menuItems = [
    {
      name: "Margherita Pizza",
      description: "Classic Italian pizza with mozzarella cheese and fresh basil.",
      price: 12.99,
      category: "Pizza",
      image: "/lovable-uploads/1b85561e-a389-4192-ad32-a81eee0df3ab.png"
    },
    {
      name: "Macaroni",
      description: "Creamy pasta made with spaghetti, eggs and Parmesan cheese.",
      price: 15.99,
      category: "Pasta",
      image: "/lovable-uploads/1b85561e-a389-4192-ad32-a81eee0df3ab.png"
    },
    {
      name: "New York Cheesecake",
      description: "Rich and creamy cheesecake with a graham cracker crust.",
      price: 6.99,
      category: "Dessert",
      image: "/lovable-uploads/1b85561e-a389-4192-ad32-a81eee0df3ab.png"
    },
    {
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with Caesar dressing and croutons.",
      price: 8.99,
      category: "Salad",
      image: "/lovable-uploads/1b85561e-a389-4192-ad32-a81eee0df3ab.png"
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Top Seller Menu</h2>
        <button className="text-white bg-primary px-4 py-2 rounded-lg flex items-center gap-2">
          New Menu
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="min-w-[300px] bg-white rounded-xl p-4 shadow-sm"
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
                      ${item.price}
                    </span>
                  </div>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mt-2">
                    {item.category}
                  </span>
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