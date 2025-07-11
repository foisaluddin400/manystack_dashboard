import logo from "../../assets/header/logo1.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { logout } from "../../page/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { LuLayoutDashboard, LuUserPlus } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoSettingsOutline } from "react-icons/io5";

const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <LuLayoutDashboard />,
    link: "/",
  },
  {
    key: "userManagement",
    label: "User Management",
    icon: <HiOutlineUserGroup />,
    link: "/dashboard/UserManagement",
  },
{
    key: "category",
    label: "Category",
    icon: <TfiMenuAlt />,
    link: "/dashboard/category",
  },
  
  
  // {
  //   key: "categoriesManagement",
  //   label: "Categories Management",
  //   icon: categorie,
  //   link: "/dashboard/CategoriesManagement/Categories",
  //   children: [
  //     {
  //       key: "categories",
  //       label: "Categories",
  //       link: "/dashboard/CategoriesManagement/Categories",
  //     },
  //     {
  //       key: "subcategory",
  //       label: "Subcategory",
  //       link: "/dashboard/CategoriesManagement/Subcategory",
  //     },
  //   ],
  // },
  {
    key: "subscription",
    label: "Subscription",
    icon: <HiOutlineBanknotes />,
    link: "/dashboard/Subscription",
  },
   {
    key: "admin",
    label: "Make Admin",
    icon: <LuUserPlus />,
    link: "/dashboard/admin",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <IoSettingsOutline />
,
    link: "/dashboard/Settings/profile",
    children: [
      {
        key: "profile",
        label: "Profile",
        link: "/dashboard/Settings/profile",
      },
      {
        key: "terms",
        label: "Terms & Condition",
        link: "/dashboard/Settings/Terms&Condition",
      },
      {
        key: "privacy",
        label: "Privacy Policy",
        link: "/dashboard/Settings/PrivacyPolicy",
      },
      {
        key: "Contact",
        label: "Contact Us",
        link: "/dashboard/Settings/contact",
      },
     
    ],
  },
];

const SidBar = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef({});
  const dispatch = useDispatch();

  useEffect(() => {
    const currentPath = location.pathname;

    let activeParent = null;

    items.forEach((item) => {
      if (item.link === currentPath) {
        activeParent = item;
      } else if (
        item.children &&
        item.children.some((child) => child.link === currentPath)
      ) {
        activeParent = item;
      }
    });

    if (activeParent) {
      setSelectedKey(
        activeParent.children
          ? activeParent.children.find((child) => child.link === currentPath)
              ?.key || activeParent.key
          : activeParent.key
      );

      if (activeParent.children && !expandedKeys.includes(activeParent.key)) {
        setExpandedKeys([...expandedKeys, activeParent.key]);
      }
    }
  }, [location]);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  // Logout Function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="custom-sidebar h-[100vh] bg-white">
      
      <div className="custom-sidebar-logo flex justify-start pt-3 pl-5">
        <Link to={'/'}><img src={logo} alt="Logo" className="w-[55px]" /></Link>
      </div>
      <div className="menu-items pt-7">
        {items.map((item) => {
          const isSettingsActive =
            item.key === "settings" &&
            item.children.some((child) => child.link === location.pathname);

          const isCreatorActive =
            item.key === "creatorManagement" &&
            item.children.some((child) => child.link === location.pathname);

          const isCategoriesActive =
            item.key === "categoriesManagement" &&
            item.children.some((child) => child.link === location.pathname);

          return (
            <div key={item.key}>
              <Link
                to={item.link}
                className={`menu-item my-4 mx-5 py-3 px-3 flex items-center cursor-pointer ${
                  selectedKey === item.key || isSettingsActive || isCreatorActive || isCategoriesActive
                    ? "bg-[#017FF4] text-white rounded-md"
                    : "bg-white rounded-md hover:bg-gray-200"
                }`}
                onClick={(e) => {
                  if (item.children) {
                    e.preventDefault(); 
                    onParentClick(item.key); 
                  } else {
                    setSelectedKey(item.key);
                  }
                }}
              >
                <h1 className="w-7">{item.icon}</h1>
                <span className="block w-full ">{item.label}</span>

                {/* Show dropdown arrow if children exist */}
                {item.children && (
                  <FaChevronRight
                    className={`ml-auto transform transition-all duration-300 ${
                      expandedKeys.includes(item.key) ? "rotate-90" : ""
                    }`}
                  />
                )}
              </Link>

              {/* Show children menu if expanded */}
              {item.children && (
                <div
                  className={`children-menu bg-white -my-2 mx-5 transition-all duration-300 ${
                    expandedKeys.includes(item.key) ? "expanded" : ""
                  }`}
                  style={{
                    maxHeight: expandedKeys.includes(item.key)
                      ? `${contentRef.current[item.key]?.scrollHeight}px`
                      : "0",
                  }}
                  ref={(el) => (contentRef.current[item.key] = el)}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.key}
                      to={child.link}
                      className={`menu-item p-4 flex items-center cursor-pointer ${
                        selectedKey === child.key
                          ? "bg-[#017FF4] text-white"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        setSelectedKey(child.key); // Set the selected key for children
                        setExpandedKeys([]); // Close all expanded items
                      }}
                    >
                      <span className="block w-full ">{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="  w-full p-4 px-5">
        <button
          onClick={handleLogout}
          className="w-full flex bg-blue-50 text-black text-start rounded-md  p-3"
        >
          <span className="text-2xl">
            <IoIosLogIn />
          </span>
          <span className="ml-3">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SidBar;
