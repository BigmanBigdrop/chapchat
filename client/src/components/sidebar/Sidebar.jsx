import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput /> {/* Affiche le champ de recherche */}
      <div className="divider px-3"></div>
      <Conversations /> {/* Affiche les conversations */}
      <LogoutButton /> {/* Affiche le bouton de déconnexion */}
    </div>
  );
};

export default Sidebar;
