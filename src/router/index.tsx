import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router";
import StartScreen from "../pages/StartScreen";
import { GameScreen } from "../pages/GameScreen";
import NoPage from "../pages/NoPage";
import LoginPage from "../pages/Login";
import { useUser } from "@clerk/clerk-react";
import { AuthGuard } from "../components/auth/AuthGuard";
import Layout from "../components/Layout";
import WorldMap from "../pages/WorldMap";

const blackBox = {
  initial: {
    height: "100vh",
  },
  animate: {
    height: 0,
    display: "none",
    transition: {
      when: "afterChildren",
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const textContainer = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 0.25,
      when: "afterChildren",
    },
  },
};

const text = {
  initial: {
    y: 40,
  },
  animate: {
    y: 80,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const InitialTransition = () => {
  return (
    <motion.div
      className="absolute bottom-0 z-50 flex items-center justify-center w-full bg-black"
      initial="initial"
      animate="animate"
      variants={blackBox}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      onAnimationComplete={() =>
        document.body.classList.remove("overflow-hidden")
      }
    >
      <motion.svg variants={textContainer} className="absolute z-50 flex">
        <pattern
          id="pattern"
          patternUnits="userSpaceOnUse"
          width={750}
          height={800}
          className="text-white"
        >
          <rect className="w-full h-full fill-current" />
          <motion.rect
            variants={text}
            className="w-full h-full text-gray-600 fill-current"
          />
        </pattern>
        <text
          className="text-4xl font-bold"
          textAnchor="middle"
          x="50%"
          y="50%"
          style={{ fill: "url(#pattern)", fontSize: "2rem" }}
        >
          idle dungeon
        </text>
      </motion.svg>
    </motion.div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/map" element={<WorldMap />} />
          <Route
            path="/"
            element={
              <AuthGuard>
                <InitialTransition />
                <StartScreen />
              </AuthGuard>
            }
          />
          <Route
            path="/game"
            element={
              <AuthGuard>
                <InitialTransition />
                <GameScreen />
              </AuthGuard>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <>
              <NoPage />
            </>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
