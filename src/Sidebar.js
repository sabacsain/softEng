import { useState } from "react";
import { useAuth } from './AuthContext'; // Update the path accordingly
import LogoutModal from './Logout';
import "./css/sidebar.css";
import "./css/logout.css";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [currentTab, setCurrentTab] = useState("/dashboard");
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  let history = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    history('/login');
  };

  const handleCloseModal = () => {
    setLogoutModalOpen(false);
  };
  return (
    <nav className="sidebar">
      <div className="logo-container">
        <img id="logo" src={require("./icons/logo.png")} alt="logo" />
      </div>
      <div>
        <ul>
          <li>
            <SidebarOption
              currentTab={currentTab}
              changeCurrentTab={setCurrentTab}
              page={"/dashboard"}
              text={"Dashboard"}
              icon={
                <svg
                  width="18"
                  height="24"
                  viewBox="0 0 18 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="13.2178"
                    y="7"
                    width="2.93727"
                    height="13"
                    rx="1"
                    stroke="#272C37"
                    stroke-width="2"
                    stroke-linejoin="round"
                  />
                  <rect
                    x="7.34326"
                    y="13"
                    width="2.93727"
                    height="7"
                    rx="1"
                    stroke="#272C37"
                    stroke-width="2"
                    stroke-linejoin="round"
                  />
                  <rect
                    x="1.46875"
                    y="9"
                    width="2.93727"
                    height="11"
                    rx="1"
                    stroke="#272C37"
                    stroke-width="2"
                    stroke-linejoin="round"
                  />
                </svg>
              }
            />
            <SidebarOption
              currentTab={currentTab}
              changeCurrentTab={setCurrentTab}
              page={"todaywaste"}
              text={"Today's Waste"}
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21 6H3V9C4.10457 9 5 9.89543 5 11V15C5 17.8284 5 19.2426 5.87868 20.1213C6.75736 21 8.17157 21 11 21H13C15.8284 21 17.2426 21 18.1213 20.1213C19 19.2426 19 17.8284 19 15V11C19 9.89543 19.8954 9 21 9V6ZM10.5 11C10.5 10.4477 10.0523 10 9.5 10C8.94772 10 8.5 10.4477 8.5 11V16C8.5 16.5523 8.94772 17 9.5 17C10.0523 17 10.5 16.5523 10.5 16V11ZM15.5 11C15.5 10.4477 15.0523 10 14.5 10C13.9477 10 13.5 10.4477 13.5 11V16C13.5 16.5523 13.9477 17 14.5 17C15.0523 17 15.5 16.5523 15.5 16V11Z"
                    fill="#272C37"
                  />
                  <path
                    d="M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059"
                    stroke="#272C37"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              }
            />

            <SidebarOption
              currentTab={currentTab}
              changeCurrentTab={setCurrentTab}
              page={"inventory"}
              text={"Inventory"}
              icon={
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.62127 5.01493C4.80316 4.28737 4.8941 3.92359 5.16536 3.71179C5.43663 3.5 5.8116 3.5 6.56155 3.5H17.4384C18.1884 3.5 18.5634 3.5 18.8346 3.71179C19.1059 3.92359 19.1968 4.28737 19.3787 5.01493L20.5823 9.82938C20.6792 10.2168 20.7276 10.4104 20.7169 10.5678C20.6892 10.9757 20.416 11.3257 20.0269 11.4515C19.8769 11.5 19.6726 11.5 19.2641 11.5C18.7309 11.5 18.4644 11.5 18.2405 11.4478C17.6133 11.3017 17.0948 10.8625 16.8475 10.2678C16.7593 10.0556 16.7164 9.79856 16.6308 9.28457C16.6068 9.14076 16.5948 9.06886 16.5812 9.04994C16.5413 8.99439 16.4587 8.99439 16.4188 9.04994C16.4052 9.06886 16.3932 9.14076 16.3692 9.28457L16.2877 9.77381C16.2791 9.82568 16.2747 9.85161 16.2704 9.87433C16.0939 10.8005 15.2946 11.4777 14.352 11.4995C14.3289 11.5 14.3026 11.5 14.25 11.5C14.1974 11.5 14.1711 11.5 14.148 11.4995C13.2054 11.4777 12.4061 10.8005 12.2296 9.87433C12.2253 9.85161 12.2209 9.82568 12.2123 9.77381L12.1308 9.28457C12.1068 9.14076 12.0948 9.06886 12.0812 9.04994C12.0413 8.99439 11.9587 8.99439 11.9188 9.04994C11.9052 9.06886 11.8932 9.14076 11.8692 9.28457L11.7877 9.77381C11.7791 9.82568 11.7747 9.85161 11.7704 9.87433C11.5939 10.8005 10.7946 11.4777 9.85199 11.4995C9.82887 11.5 9.80258 11.5 9.75 11.5C9.69742 11.5 9.67113 11.5 9.64801 11.4995C8.70541 11.4777 7.90606 10.8005 7.7296 9.87433C7.72527 9.85161 7.72095 9.82568 7.7123 9.77381L7.63076 9.28457C7.60679 9.14076 7.59481 9.06886 7.58122 9.04994C7.54132 8.99439 7.45868 8.99439 7.41878 9.04994C7.40519 9.06886 7.39321 9.14076 7.36924 9.28457C7.28357 9.79856 7.24074 10.0556 7.15249 10.2678C6.90524 10.8625 6.38675 11.3017 5.75951 11.4478C5.53563 11.5 5.26905 11.5 4.73591 11.5C4.32737 11.5 4.12309 11.5 3.97306 11.4515C3.58403 11.3257 3.31078 10.9757 3.28307 10.5678C3.27239 10.4104 3.32081 10.2168 3.41765 9.82938L4.62127 5.01493Z"
                    fill="#272C37"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.01747 13C5 13.4209 5 13.915 5 14.4998V20.4998C5 21.4426 5 21.914 5.29289 22.2069C5.58579 22.4998 6.05719 22.4998 7 22.4998H10V18.4998C10 17.9475 10.4477 17.4998 11 17.4998H13C13.5523 17.4998 14 17.9475 14 18.4998V22.4998H17C17.9428 22.4998 18.4142 22.4998 18.7071 22.2069C19 21.914 19 21.4426 19 20.4998V14.4998C19 13.915 19 13.4209 18.9825 13C18.6177 12.9991 18.2446 12.9888 17.9002 12.9085C17.3808 12.7875 16.904 12.5517 16.5 12.2266C15.9159 12.6967 15.1803 12.9805 14.3867 12.9989C14.3456 12.9998 14.3022 12.9998 14.2609 12.9998H14.2608L14.25 12.9998L14.2392 12.9998H14.2391C14.1978 12.9998 14.1544 12.9998 14.1133 12.9989C13.3197 12.9805 12.5841 12.6967 12 12.2266C11.4159 12.6967 10.6803 12.9805 9.88668 12.9989C9.84555 12.9998 9.80225 12.9998 9.76086 12.9998H9.76077L9.75 12.9998L9.73923 12.9998H9.73914C9.69775 12.9998 9.65445 12.9998 9.61332 12.9989C8.8197 12.9805 8.08409 12.6967 7.5 12.2266C7.09596 12.5517 6.6192 12.7875 6.09984 12.9085C5.75542 12.9888 5.38227 12.9991 5.01747 13Z"
                    fill="#272C37"
                  />
                </svg>
              }
            />

            <SidebarOption
              currentTab={currentTab}
              changeCurrentTab={setCurrentTab}
              page={"priceconversion"}
              text={"Price Conversion"}
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.58579 5.58579C2 6.17157 2 7.11438 2 9V15C2 16.8856 2 17.8284 2.58579 18.4142C3.17157 19 4.11438 19 6 19H18C19.8856 19 20.8284 19 21.4142 18.4142C22 17.8284 22 16.8856 22 15V9C22 7.11438 22 6.17157 21.4142 5.58579C20.8284 5 19.8856 5 18 5H6C4.11438 5 3.17157 5 2.58579 5.58579ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H7C7.55228 9 8 8.55228 8 8C8 7.44772 7.55228 7 7 7H5ZM16 16C16 15.4477 16.4477 15 17 15H19C19.5523 15 20 15.4477 20 16C20 16.5523 19.5523 17 19 17H17C16.4477 17 16 16.5523 16 16ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                    fill="#272C37"
                  />
                </svg>
              }
            />

            <SidebarOption
              currentTab={currentTab}
              changeCurrentTab={setCurrentTab}
              page={"settings"}
              text={"Settings"}
              icon={
                <svg
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.6817 14.8839L20.6204 13.6935C20.8284 12.571 20.8284 11.4194 20.6204 10.2968L22.6817 9.10646C22.9188 8.97098 23.0252 8.69034 22.9478 8.42905C22.4107 6.70647 21.4962 5.14841 20.301 3.85164C20.1172 3.65326 19.8172 3.60487 19.5849 3.74035L17.5236 4.93067C16.6575 4.18551 15.6607 3.60971 14.5817 3.23229V0.856494C14.5817 0.585527 14.393 0.348431 14.1269 0.290367C12.3511 -0.106406 10.5317 -0.0870511 8.84301 0.290367C8.57688 0.348431 8.38817 0.585527 8.38817 0.856494V3.23713C7.31398 3.61939 6.31721 4.19519 5.44624 4.93551L3.3898 3.74519C3.1527 3.60971 2.85754 3.65326 2.67367 3.85648C1.47852 5.14841 0.564004 6.70647 0.0269089 8.43388C-0.0553489 8.69517 0.055941 8.97582 0.293037 9.1113L2.35432 10.3016C2.14626 11.4242 2.14626 12.5758 2.35432 13.6984L0.293037 14.8887C0.055941 15.0242 -0.0505102 15.3048 0.0269089 15.5661C0.564004 17.2887 1.47852 18.8467 2.67367 20.1435C2.85754 20.3419 3.15754 20.3903 3.3898 20.2548L5.45108 19.0645C6.31721 19.8096 7.31398 20.3855 8.39301 20.7629V23.1435C8.39301 23.4145 8.58172 23.6516 8.84784 23.7096C10.6236 24.1064 12.443 24.0871 14.1317 23.7096C14.3978 23.6516 14.5865 23.4145 14.5865 23.1435V20.7629C15.6607 20.3806 16.6575 19.8048 17.5285 19.0645L19.5897 20.2548C19.8268 20.3903 20.122 20.3467 20.3059 20.1435C21.501 18.8516 22.4155 17.2935 22.9526 15.5661C23.0252 15.3 22.9188 15.0193 22.6817 14.8839ZM11.4849 15.8661C9.35107 15.8661 7.61398 14.129 7.61398 11.9952C7.61398 9.8613 9.35107 8.12421 11.4849 8.12421C13.6188 8.12421 15.3559 9.8613 15.3559 11.9952C15.3559 14.129 13.6188 15.8661 11.4849 15.8661Z"
                    fill="#272C37"
                  />
                </svg>
              }
            />
          </li>
          <div>
            <hr></hr>
            <li className="sidebar-logout" onClick={handleLogout}>
              <span>
                <svg
                  width="50"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.37905 2.66859L12.0686 2.08881C15.2892 1.58272 16.8995 1.32967 17.9497 2.22779C19 3.12591 19 4.75596 19 8.01607V10.9996H13.0806L15.7809 7.62428L14.2191 6.37489L10.2191 11.3749L9.71938 11.9996L10.2191 12.6243L14.2191 17.6243L15.7809 16.3749L13.0806 12.9996H19V15.9831C19 19.2432 19 20.8733 17.9497 21.7714C16.8995 22.6695 15.2892 22.4165 12.0686 21.9104L8.37905 21.3306C6.76632 21.0771 5.95995 20.9504 5.47998 20.3891C5 19.8279 5 19.0116 5 17.3791V6.6201C5 4.98758 5 4.17132 5.47998 3.61003C5.95995 3.04874 6.76632 2.92202 8.37905 2.66859Z"
                    fill="#222222"
                  />
                </svg>
              </span>
              Logout
            </li>
          </div>
        </ul>
      </div>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleConfirmLogout}
        onClose={handleCloseModal}
      />
    </nav>
  )

//for each option in the sidebar
function SidebarOption({ currentTab, page, text, icon, changeCurrentTab }) {
  /*set tab as active */
  function HandleClick() {
    changeCurrentTab((current) => (current = page));
  }

  return (
    <Link
      to={page}
      style={{ textDecoration: "none", color: "#272C37" }}
      onClick={HandleClick}
    >
      <li className={`sidebarOption ${currentTab === page ? "hovered" : ""}`}>
        <span>{icon}</span> {text}
      </li>
    </Link>
  );
}
}
