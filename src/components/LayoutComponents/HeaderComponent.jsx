import { useDispatch, useSelector } from "react-redux";
import { Menu, Moon, SlidersHorizontal, SunMoon, X } from "lucide-react";

// HACK: IMPORTING DARKMODE SLICES
import { toggleSideBar } from "../../features/slices/SidebarSlice";
import { toggleDarkMode } from "../../features/slices/themeSlice";
import Input from "../ui/Input";
import Logo from "../ui/Logo";
import { changeFeedType } from "../../features/slices/feedTypeSlice";
import { changeSearchType } from "../../features/slices/searchSlice";

export default function HeaderComponent() {
  const isDarkMode = useSelector((state) => state.theme.themeSelector);
  const isSideBarOpened = useSelector((state) => state.sidebar.isOpened);
  const searchType = useSelector((state) => state.search.type);

  const dispatch = useDispatch();

  const handleSideBarOpen = function () {
    dispatch(toggleSideBar(!isSideBarOpened));
  };

  const handleToggleTheme = function () {
    dispatch(toggleDarkMode(isDarkMode === "dark" ? "light" : "dark"));
  };

  const handlesearchType = function () {
    if (searchType === "movie") dispatch(changeSearchType("tv"));
    if (searchType === "tv") dispatch(changeSearchType("person"));
    if (searchType === "person") dispatch(changeSearchType("movie"));
  };

  return (
    <header className="w-full min-h-[5vh] flex flex-col  lg:flex-row items-center justify-between py-2 gap-3">
      <div className="w-full flex items-center gap-2 lg:hidden">
        <button
          className="w-5 h-5 lg:hidden text-white cursor-pointer "
          onClick={handleSideBarOpen}
        >
          {isSideBarOpened ? (
            <X className="size-full" />
          ) : (
            <Menu className="size-full" />
          )}
        </button>

        {!isSideBarOpened && <Logo />}

        <FeedType />
        <button
          className="w-5 h-5 text-white cursor-pointer"
          onClick={handleToggleTheme}
        >
          {isDarkMode === "dark" ? (
            <SunMoon className="size-full" />
          ) : (
            <Moon className="size-full" />
          )}
        </button>
      </div>

      <div className="flex lg:hidden items-center justify-between sm:justify-start sm:gap-5 w-full">
        <button
          className="text-white text-[5px] flex items-center gap-1 border-[1px] border-sky-700/[.5] p-1 cursor-pointer rounded-lg shadow-sm    shadow-sky-700/[.3]"
          onClick={handlesearchType}
        >
          <SlidersHorizontal className="size-3" />
          <span className="text-gray-200">{searchType}</span>
        </button>
        <Input placeholder={"Tv Shows"} />
      </div>

      <div className="hidden lg:flex">
        <FeedType />
      </div>

      <div className="hidden lg:flex gap-2 items-center">
        <button
          className="text-white text-[5px] flex items-center gap-1 border-[1px] border-sky-700/[.5] p-1 cursor-pointer rounded-lg shadow-sm    shadow-sky-700/[.3]"
          onClick={handlesearchType}
        >
          <SlidersHorizontal className="size-3" />
          <span className="text-gray-200">{searchType}</span>
        </button>
        <Input placeholder={"Tv Shows"} />
        <button
          className="w-5 h-5 text-white cursor-pointer"
          onClick={handleToggleTheme}
        >
          {isDarkMode === "dark" ? (
            <SunMoon className="size-full" />
          ) : (
            <Moon className="size-full" />
          )}
        </button>
      </div>
    </header>
  );
}

const FeedType = function () {
  const feedType = useSelector((state) => state.feedType.type);
  const dispatch = useDispatch();

  const handleClickToggle = function () {
    if (feedType === "movie") {
      dispatch(changeFeedType("tv"));
    } else {
      dispatch(changeFeedType("movie"));
    }
  };

  return (
    <button
      onClick={handleClickToggle}
      className="ml-auto text-sky-700 shadow-sm    shadow-sky-700/[.7] px-2 py-1 cursor-pointer"
    >
      {feedType === "movie" ? "MOVIES" : "TV SERIES"}
    </button>
  );
};
