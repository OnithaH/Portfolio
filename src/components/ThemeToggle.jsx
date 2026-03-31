import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className="relative p-2 rounded-full glass border border-indigo-500/30 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <FiMoon className="w-5 h-5 text-indigo-400" />
        ) : (
          <FiSun className="w-5 h-5 text-yellow-400" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
