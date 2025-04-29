import { motion, useScroll, useTransform } from "motion/react";
import Logo from "./logo";

const INITIAL_SIZE = {
  width: 150,
  height: 89,
};

export const AnimatedLogo = () => {
  const { scrollY } = useScroll();

  const width = useTransform(
    scrollY,
    [0, 2000],
    [INITIAL_SIZE.width, INITIAL_SIZE.width * 0.5]
  );
  const height = useTransform(
    scrollY,
    [0, 2000],
    [INITIAL_SIZE.height, INITIAL_SIZE.height * 0.5]
  );

  const marginTop = useTransform(scrollY, [0, 300], [0, 16]);

  return (
    <motion.div
      style={{
        overflow: "hidden",
        width,
        height,
        marginTop,
      }}
      transition={{ type: "spring", stiffness: 100, duration: 10 }}
      className="flex items-center justify-center "
    >
      <Logo />
    </motion.div>
  );
};
