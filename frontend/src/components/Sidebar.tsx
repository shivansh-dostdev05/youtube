
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const navigate = useNavigate();

  const mainIcons = [
    { label: "Home", path: "/" },
    { label: "Shorts", path: "/shorts" },
    { label: "Subscriptions", path: "/subscriptions" },
  ];

  const personalIcons = [
    { label: "Library", path: "/library" },
    { label: "History", path: "/history" },
    { label: "Your Videos", path: "/your-videos" },
    { label: "Watch Later", path: "/watch-later" },
    { label: "Liked Videos", path: "/liked-videos" },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] overflow-y-auto bg-white px-3 py-4 text-black transition-all dark:bg-[#0f0f0f] dark:text-white ${
        isOpen ? "w-60" : "w-20"
      }`}
    >
      <div className="space-y-2">
        {mainIcons.map((item) => (
          <div
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex cursor-pointer items-center rounded-xl p-3 hover:bg-gray-100 dark:hover:bg-[#222222] ${
              isOpen ? "justify-start" : "justify-center"
            }`}
          >
            {isOpen && (
              <span className="text-sm">{item.label}</span>
            )}
          </div>
        ))}
      </div>

      {isOpen && (
        <>
          <hr className="my-4 border-gray-300 dark:border-gray-700" />

          <div className="space-y-2">
            {personalIcons.map((item) => (
              <div
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex cursor-pointer items-center rounded-xl p-3 hover:bg-gray-100 dark:hover:bg-[#272727]"
              >
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
