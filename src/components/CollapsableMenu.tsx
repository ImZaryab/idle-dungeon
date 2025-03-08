import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CollapsableMenuProps {
  isOpen: boolean;
  menuTitle: string;
  position: "left" | "right";
  handleOpen: () => void;
  children?: ReactNode;
}

const CollapsableMenu = ({
  isOpen,
  menuTitle,
  position,
  handleOpen,
  children,
}: CollapsableMenuProps) => {
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: { translateY: "0%" },
        closed: { translateY: "82%" },
      }}
      transition={{ ease: [0.08, 0.65, 0.53, 0.96], duration: 0.3 }}
      className={`menu pb-10 z-10 text-black min-w-[32dvw] min-h-[30dvh] absolute bottom-0 select-none ${
        position === "left" && "left-0"
      } ${
        position === "right" && "right-0"
      } bg-[url('/ui-menu-bg.svg')] bg-no-repeat bg-cover`}
      onClick={handleOpen}
    >
      <div className="w-full pt-6 text-center text-white relative bg-[url('/ui-menu-topbar.svg')] bg-no-repeat bg-cover border-b-8 border-black">
        <div className={`absolute top-10 right-10 transition-all duration-300 ${!isOpen && "-rotate-180"}`}>
          <img src="/ui-chevron.svg" className="w-8"/>
        </div>
        <span style={{ fontSize: "2rem" }}>{menuTitle}</span>
      </div>
      {children}
    </motion.div>
  );
};

export default CollapsableMenu;
