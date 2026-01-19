import { FaGraduationCap } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <aside className="h-screen bg-orange-50 w-64 shadow-lg text-gray-800">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold flex items-center gap-1">
          <FaGraduationCap /> Scholl System
        </h1>
      </div>
    </aside>
  );
};

export default Sidebar;
