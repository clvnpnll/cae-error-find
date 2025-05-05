import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { QuestionMarkdown } from "./questionMarkdown";

interface ComponentProps {
  title: string;
  content: string;
  isCorrect: boolean;
}

export const QuizResultItem = ({
  title,
  isCorrect,
  content,
}: ComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((state) => !state);
  };

  return (
    <div
      className={`border-b transition ${
        isCorrect
          ? "bg-green-50 hover:bg-green-100"
          : "bg-red-50 hover:bg-red-100"
      }`}
    >
      <button
        className={`px-12 md:px-20 py-4 flex justify-between font-medium w-full items-center gap-8`}
        onClick={toggleOpen}
      >
        <span className="text-lg font-semibold">{title}</span>
        <span className="flex items-center gap-4">
          <span className="font-semibold">
            {isCorrect ? "Correct" : "Wrong"}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaChevronDown size={12} />
          </motion.div>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 px-12 md:px-20 text-gray-600 flex">
              <QuestionMarkdown
                question={`*Correct Sentence:* &nbsp; ${content}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
