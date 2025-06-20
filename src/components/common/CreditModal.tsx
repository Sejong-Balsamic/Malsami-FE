import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

interface CreditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const teamMembers = {
  Designer: ["김성림", "윤지희", "이예진"],
  Backend: ["백지훈", "서새찬"],
  Frontend: ["손재호", "서새찬", "이유진"],
};

export default function CreditModal({ isOpen, onClose }: CreditModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative w-[90%] max-w-md rounded-2xl bg-white p-8 shadow-2xl"
            variants={modalVariants}
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              onClick={onClose}
              aria-label="닫기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <Image
                src="/image/mascotCredit.png"
                alt="세종말싸미 마스코트"
                width={120}
                height={120}
                className="mx-auto mb-4"
              />
              <h2 className="font-tuesday-younah text-4xl font-bold text-gray-800">세종말싸미</h2>
              <p className="mt-2 text-sm text-gray-500">세종대학교 학생들을 위한 커뮤니티</p>
            </div>

            <div className="mt-8 space-y-4">
              {Object.entries(teamMembers).map(([role, members]) => (
                <div key={role}>
                  <h3 className="font-suit-bold text-lg text-gray-700">{role}</h3>
                  <p className="font-suit-medium text-gray-500">{members.join(", ")}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-gray-200 pt-4 text-center">
              <p className="text-xs text-gray-400">© 2024 Sejong-Malsami. All rights reserved.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
