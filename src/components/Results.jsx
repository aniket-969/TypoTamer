import { useEffect, useState } from "react";
import { formatPercentage } from "../utils/helper";
import { motion } from "framer-motion";
import { updateLeaderBoard } from "../services/firebase/LeaderboardData";
import { useUserContext } from "../context/AuthProvider";
import { useTypingContext } from "../context/TextProvider";
import toast from "react-hot-toast";

const Results = ({
    state,
    errors,
    accuracyPercentage,
    total,
    typingSpeed,
    time,
    mobileInputVisible
}) => {

    const { updateUser, isAnonymous,User } = useUserContext();
    const{selectedOptions} = useTypingContext()
    const initial = { opacity: 0 };
    const animate = { opacity: 1 };
    const [showPopup, setShowPopup] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (!isAnonymous && User?.displayName == null ) {
            setShowPopup(true);
        } else if (state === "finish" && User.displayName != null) {
            updateLeaderboard();
        }
        

        if (isAnonymous && state === "finish") {
            toast.error("Login is required to update your score for leaderboard");
        }
    }, [state, isAnonymous]);
    
    const updateLeaderboard = async (username = null) => {
       
        if(!selectedOptions.text && !selectedOptions.characters && !selectedOptions.num){
            return;
        }

        if (state === "finish") {
            const updates = await updateLeaderBoard(time, typingSpeed, accuracyPercentage, User, username);
            
            if  (typeof updates !== "undefined" && updates.message  ) {
                toast.success(updates.message);
            } 
        }
    };

    const handleClosePopup = async () => {
        try {
            await updateUser(inputValue);
            setShowPopup(false);
            updateLeaderboard(inputValue);  // Pass the username directly
        } catch (error) {
            // console.error("Error updating user:", error);
            toast.error("Failed to update user information.");
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    if (state !== "finish") {
        return null;
    }

    return (
        <>
            <motion.ul
                initial={initial}
                animate={animate}
                className={`flex flex-col items-center space-y-3`}
            >
                <motion.li
                    initial={initial}
                    animate={animate}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-semibold"
                >
                    Results
                </motion.li>
                <motion.li
                    initial={initial}
                    animate={animate}
                    transition={{ duration: 0.3, delay: 0.5 }}
                >
                    WPM: {typingSpeed}
                </motion.li>
                <motion.li
                    initial={initial}
                    animate={animate}
                    transition={{ duration: 0.3, delay: 0.5 }}
                >
                    Accuracy: {formatPercentage(accuracyPercentage)}
                </motion.li>
                <motion.li
                    initial={initial}
                    animate={animate}
                    transition={{ duration: 0.3, delay: 1 }}
                    className="error"
                >
                    Errors: {errors}
                </motion.li>
                <motion.li
                    initial={initial}
                    animate={animate}
                    transition={{ duration: 0.3, delay: 1.4 }}
                >
                    Typed: {total}
                </motion.li>
            </motion.ul>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
                    <div className="bg-sub p-6 rounded shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">User Information Missing</h2>
                        <p className="mb-4">Your display name is not available. Please provide your username for the world to see.</p>
                        <input
                            type="text"
                            placeholder="Type here..."
                            value={inputValue}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                        <button
                            onClick={handleClosePopup}
                            className={`px-4 py-2 text-white rounded ${inputValue ? 'bg-blue-500' : 'bg-gray-400'}`}
                            disabled={!inputValue}
                        >
                            Okay
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Results;
