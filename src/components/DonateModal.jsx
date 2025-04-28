import { useState } from "react";
import { SiBuymeacoffee } from "react-icons/si";

const DonateModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div  >
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          backgroundColor: "var(--main-color)",
          color: "var(--bg-color)",
        }}
        className="fixed bottom-6 right-6 font-semibold px-4 py-2 rounded-full shadow-lg hover:brightness-110 transition-all"
      >
        ☕ Buy me a coffee
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="rounded-xl p-6 w-80 max-w-[90%] relative shadow-2xl"
            style={{
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              style={{ color: "var(--text-color)" }}
              className="absolute top-3 right-3 hover:brightness-125 text-2xl font-bold transition-all"
            >
              ×
            </button>

            <h2 className="text-lg font-bold mb-4 text-center">
              Support Me
            </h2>

            <div className="flex flex-col gap-4">
              {/* UPI Payment */}
              <button
                style={{
                  backgroundColor: "var(--sub-color)",
                  color: "#fff",
                }}
                className="py-2 rounded-md font-semibold hover:brightness-125 transition-all"
              >
                 UPI
              </button>

              {/* BuyMeACoffee */}
              <button
                style={{
                  backgroundColor: "var(--caret-color)",
                  color: "#fff",
                }}
                className="flex items-center justify-center gap-2 py-2 rounded-md font-semibold hover:brightness-125 transition-all"
              >
                <SiBuymeacoffee size={20} />
                Buy me a Coffee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonateModal;
