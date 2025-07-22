// src/containers/attachments/CommissionModal.tsx
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Heart, X } from "lucide-react";
import { useState } from "react";

interface CommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommissionModal = ({ isOpen, onClose }: CommissionModalProps) => {
  const [commissionType, setCommissionType] = useState("custom");
  const [step, setStep] = useState<
    "select" | "confirm" | "processing" | "success"
  >("select");

  const commissionOptions = [
    {
      id: "custom",
      name: "Custom Artwork",
      price: 150,
      description:
        "Commission a personalized piece created specifically for you",
    },
    {
      id: "donation",
      name: "Program Donation",
      price: 25,
      description: "Support ArTech's programs and help more artists create",
    },
    {
      id: "workshop",
      name: "Workshop Sponsorship",
      price: 100,
      description: "Sponsor a workshop to provide new tools and materials",
    },
  ];

  const selectedOption = commissionOptions.find(
    (opt) => opt.id === commissionType
  );

  const handleSubmit = async () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
    }, 3000);
  };

  const resetModal = () => {
    setStep("select");
    setCommissionType("custom");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-obsidian-500/90 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div
              className="bg-obsidian-400 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden 
                          border border-luxury-gold-500/20 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-luxury-gold-500/10">
                <h2 className="font-playfair text-3xl text-white">
                  Support ArTech
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-luxury-gold-500/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-pearl-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                {step === "select" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="mb-8">
                      <label className="block text-pearl-300 mb-4">
                        Choose how you'd like to support our artists
                      </label>
                      <div className="space-y-4">
                        {commissionOptions.map((option) => (
                          <label
                            key={option.id}
                            className={`block p-4 rounded-lg border cursor-pointer transition-colors ${
                              commissionType === option.id
                                ? "border-luxury-gold-500 bg-luxury-gold-500/10"
                                : "border-luxury-gold-500/20 hover:border-luxury-gold-500/40"
                            }`}
                          >
                            <input
                              type="radio"
                              name="commissionType"
                              value={option.id}
                              checked={commissionType === option.id}
                              onChange={(e) =>
                                setCommissionType(e.target.value)
                              }
                              className="sr-only"
                            />
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-white font-medium mb-1">
                                  {option.name}
                                </h3>
                                <p className="text-pearl-300 text-sm">
                                  {option.description}
                                </p>
                              </div>
                              <span className="text-luxury-gold-500 font-medium">
                                ${option.price}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-obsidian-300/30 rounded-xl p-6 mb-8">
                      <div className="flex justify-between items-center">
                        <span className="text-pearl-300">Selected Option</span>
                        <span className="text-white">
                          {selectedOption?.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-luxury-gold-500 font-medium">
                          Total
                        </span>
                        <span className="text-2xl text-white font-light">
                          ${selectedOption?.price}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep("confirm")}
                      className="w-full bg-luxury-gold-500 text-obsidian-500 py-4 rounded-lg 
                               font-medium hover:bg-luxury-gold-400 transition-colors 
                               flex items-center justify-center gap-2"
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {step === "confirm" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="text-center mb-8">
                      <Heart className="w-16 h-16 text-luxury-gold-500 mx-auto mb-4" />
                      <h3 className="text-2xl text-white mb-2">
                        Confirm Support
                      </h3>
                      <p className="text-pearl-300">
                        You are about to support{" "}
                        {selectedOption?.name.toLowerCase()}
                        for ${selectedOption?.price}
                      </p>
                    </div>

                    <div className="bg-obsidian-300/30 rounded-xl p-6 mb-8">
                      <p className="text-sm text-pearl-300 mb-4">
                        Your support helps:
                      </p>
                      <ul className="space-y-2 text-sm text-pearl-400">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-luxury-gold-500 mt-0.5" />
                          <span>Provide artists with tools and materials</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-luxury-gold-500 mt-0.5" />
                          <span>Expand programs to all five boroughs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-luxury-gold-500 mt-0.5" />
                          <span>
                            Support artists with intellectual disabilities
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep("select")}
                        className="flex-1 bg-obsidian-300 text-white py-4 rounded-lg 
                                 font-medium hover:bg-obsidian-200 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="flex-1 bg-luxury-gold-500 text-obsidian-500 py-4 rounded-lg 
                                 font-medium hover:bg-luxury-gold-400 transition-colors"
                      >
                        Confirm Support
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === "processing" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div
                      className="w-20 h-20 border-4 border-luxury-gold-500/20 border-t-luxury-gold-500 
                                  rounded-full animate-spin mx-auto mb-6"
                    />
                    <h3 className="text-2xl text-white mb-2">
                      Processing Support
                    </h3>
                    <p className="text-pearl-300">
                      Thank you for supporting our artists...
                    </p>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="w-20 h-20 bg-luxury-gold-500 rounded-full flex items-center 
                               justify-center mx-auto mb-6"
                    >
                      <Check className="w-10 h-10 text-obsidian-500" />
                    </motion.div>
                    <h3 className="text-2xl text-white mb-2">Thank You!</h3>
                    <p className="text-pearl-300 mb-6">
                      Your support helps our artists continue creating amazing
                      works
                    </p>
                    <button
                      onClick={resetModal}
                      className="bg-luxury-gold-500 text-obsidian-500 px-8 py-3 rounded-lg 
                               font-medium hover:bg-luxury-gold-400 transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommissionModal;
