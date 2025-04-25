"use client";

type SidebarProps = {
  icon: React.ReactNode;
  temperature: string;
  condition: string;
  date: string;
  location: string;
};

const Sidebar = ({
  icon,
  temperature,
  condition,
  date,
  location,
}: SidebarProps) => {
  const formattedCondition =
    condition.charAt(0).toUpperCase() + condition.slice(1);

  return (
    <aside className="bg-gradient-to-b from-blue-100 to-white flex flex-col justify-between items-center w-[200px] h-screen p-4 bg-white">
      <div className="flex flex-col items-center mt-6 space-y-2">
        {icon}
        <p className="text-3xl font-bold">{temperature}</p>
        <p className="text-xl font-semibold">{formattedCondition}</p>
        <p className="">{location}</p>
      </div>

      <div className="text-xl text-center mb-6">
        <p className="font-medium">{date}</p>
      </div>
    </aside>
  );
};

export default Sidebar;
