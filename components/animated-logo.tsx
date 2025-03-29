import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Logo from "./logo";

const INITIAL_SIZE = {
  width: 150,
  height: 89,
};

export const AnimatedLogo = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const newWidth = Math.max(
    INITIAL_SIZE.width * (1 - scrollY * 0.001),
    INITIAL_SIZE.width * 0.5
  );
  const newHeight = Math.max(
    INITIAL_SIZE.height * (1 - scrollY * 0.001),
    INITIAL_SIZE.height * 0.5
  );

  const marginTop = newHeight === INITIAL_SIZE.height * 0.5 ? 16 : 0;

  return (
    <motion.div
      style={{ overflow: "hidden" }}
      animate={{
        marginTop: marginTop,
        width: newWidth,
        height: newHeight,
      }}
      transition={{ type: "spring", stiffness: 100 }}
      className="flex items-center justify-center "
    >
      <Logo />
    </motion.div>
  );
};
