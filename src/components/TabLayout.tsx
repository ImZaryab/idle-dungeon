import Tab from "./Tab";

interface TabLayoutProps {
  tabs: string[];
  value: string;
  handleTabChange: (value: string) => void;
}

const TabLayout = ({ tabs, value, handleTabChange }: TabLayoutProps) => {
  return (
    <>
      {tabs.map((t, index) => (
        <Tab
          key={index}
          isActive={value === t}
          value={t}
          handleTabChange={handleTabChange}
        />
      ))}
    </>
  );
};

export default TabLayout;
