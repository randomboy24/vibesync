"use client";
import { MoveDiagonal } from "lucide-react";
import { useState } from "react";

export const Space = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function Modal() {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    {/* Close Button */}
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
                        onClick={() => setIsModalOpen(false)}
                    >
                        &times;
                    </button>

                    {/* Modal Title */}
                    <h2 className="text-2xl font-semibold text-gray-100 mb-4">Create a New Space</h2>

                    {/* Instructions */}
                    <p className="text-gray-400 mb-4">Enter a name for the space (optional):</p>

                    {/* Input Field */}
                    <input
                        type="text"
                        placeholder="Space Name"
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Create Space Button */}
                    <button
                        className="w-full mt-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        onClick={() => null} // Placeholder for button action
                    >
                        Create Space
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            {!isModalOpen ? (
                <button
                    className="bg-gray-700 text-gray-200 hover:text-white hover:bg-gray-600 rounded-lg w-32 h-8"
                    onClick={() => setIsModalOpen(true)}
                >
                    Create Space
                </button>
            ) : (
                <div className="h-screen flex justify-center items-center">
                    <Modal />
                </div>
            )}
        </div>
    );
};
