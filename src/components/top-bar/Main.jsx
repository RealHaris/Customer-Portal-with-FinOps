import {
  Dropdown,
  DropdownContent,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Lucide
} from "@/base-components";
import { darkMode as darkModeStore, darkModeValue } from "@/stores/dark-mode";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { helper as $h } from "@/utils";
import dom from "@left4code/tw-starter/dist/js/dom";

function Main() {
  const darkMode = useRecoilValue(darkModeStore);
  const setDarkModeValue = useSetRecoilState(darkModeValue);

  const setDarkModeClass = () => {
    darkMode ? dom("html").addClass("dark") : dom("html").removeClass("dark");
  };

  const switchMode = () => {
    setDarkModeValue(() => !darkMode);
    localStorage.setItem("darkMode", !darkMode);
    setDarkModeClass();
  };

  setDarkModeClass();

  return (
    <>
      <div className="top-bar">
        <nav aria-label="breadcrumb" className="-intro-x mr-auto hidden sm:flex"></nav>

        <div>
          <button
            id="theme-toggle"
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-5"
            onClick={switchMode}
          >
            {darkMode == true ? (
              <Lucide icon="Moon" className="notification__icon dark:text-slate-500"></Lucide>
            ) : (
              <Lucide icon="Sun" className="notification__icon dark:text-slate-500"></Lucide>
            )}
          </button>
        </div>
        <div className="text-end mr-3 mt-2">
          <div className="font-medium">{$h.getLocalStorageData("CustomerName")}</div>
          <div className="text-xs mt-0.5 dark:text-slate-500">
            {$h.getLocalStorageData("CustomerId")}
          </div>
        </div>
        <Dropdown className="intro-x w-8 h-8">
          <DropdownToggle
            tag="div"
            role="button"
            className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in mt-1"
          >
            <Lucide icon="User" className="content-center w-full" />
          </DropdownToggle>
          <DropdownMenu className="w-56">
            <DropdownContent className="bg-primary text-white">
              <DropdownHeader tag="div" className="!font-normal">
                <div className="font-medium">{$h.getLocalStorageData("CustomerName")}</div>
                <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                  {$h.getLocalStorageData("CustomerId")}
                </div>
                <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                  {$h.getTokenData()?.email}
                </div>
              </DropdownHeader>
              <DropdownDivider className="border-white/[0.08]" />
              <DropdownItem className="hover:bg-white/5" link="/profile">
                <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Change Password
              </DropdownItem>
              <DropdownDivider className="border-white/[0.08]" />
              <DropdownItem className="hover:bg-white/5" link="/logout">
                <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" />
                <div>Logout</div>
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
}

export default Main;
