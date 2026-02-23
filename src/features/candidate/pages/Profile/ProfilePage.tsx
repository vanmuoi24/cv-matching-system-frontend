import { useState } from "react";
import ProfileMain from "./Profilelayout/ProfileMain";
import ProfileSidebar from "./Profilelayout/ProfileSidebar";

const ProfilePage = () => {
  const [activeMenu, setActiveMenu] = useState("profile");

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="w-80 fixed left-20 top-32 bottom-0 bg-white shadow-lg overflow-y-auto h-100 rounded-2xl">
          <ProfileSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-80 p-6" style={{marginTop:105}} >
          <div className="max-w-5xl mx-auto">
            <ProfileMain activeMenu={activeMenu} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
