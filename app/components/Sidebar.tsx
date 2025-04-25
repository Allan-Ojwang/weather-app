"use client";

type SidebarProps = {
  icon: React.ReactNode; // Pass a weather icon component or an <img />
  temperature: string;
  condition: string;
  date: string;
  location: string;
};

const Sidebar = ({ icon, temperature, condition, date, location }: SidebarProps) => {
  return (
    <aside className="bg-gradient-to-b from-blue-100 to-white flex flex-col justify-between items-center w-[200px] h-screen border-r p-4 bg-white">
      <div className="flex flex-col items-center mt-6 space-y-2">
        {icon}
        <p className="text-3xl font-semibold">{temperature}</p>
        <p className="text-2xl text-gray-600">{condition}</p>
      </div>

      <div className="text-xl text-center mb-6">
        <p className="font-medium">{date}</p>
        <p className="">{location}</p>
      </div>
    </aside>
  );
};

export default Sidebar;
