import CompetencyList from "./competencyList";
import UserInfo from "./userinfo";

export default function Sidebar() {
  return (
    <aside className="min-h-full w-80" aria-label="Sidebar">
      <div className="h-full overflow-y-auto bg-black py-4 px-3 dark:bg-gray-800">
        <UserInfo />
        <CompetencyList />
      </div>
    </aside>
  );
}
