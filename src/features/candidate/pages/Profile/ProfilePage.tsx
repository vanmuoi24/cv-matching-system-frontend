import { useState } from "react";
import ProfileMain from "./Profilelayout/ProfileMain";
import ProfileSidebar from "./Profilelayout/ProfileSidebar";
import Container from "../../../../shared/components/Container";

const ProfilePage = () => {
  const [activeMenu, setActiveMenu] = useState("profile");

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-120px)]">
      <Container className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-4">
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden lg:sticky lg:top-[132px]">
              <ProfileSidebar
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
            </div>
          </aside>

          <section className="lg:col-span-8">
            <ProfileMain activeMenu={activeMenu} />
          </section>
        </div>
      </Container>
    </div>
  );
};
export default ProfilePage;
