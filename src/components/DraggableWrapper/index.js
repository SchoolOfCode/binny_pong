import { useRef } from "react";
import { motion } from "framer-motion";

import css from "./DraggableWrapper.module.css";

function DraggableWrapper({ children }) {
  const constraintsRef = useRef(null);
  return (
    <motion.div className={css.container} ref={constraintsRef}>
      <motion.div
        className="item"
        style={{ padding: "1em", position: "absolute" }}
        drag
        dragConstraints={constraintsRef}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default DraggableWrapper;
