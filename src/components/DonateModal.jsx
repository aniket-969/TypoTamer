import { useState } from "react";
import { SiBuymeacoffee } from "react-icons/si";
import qrImage from "../../assets/qrcode.jpg"

const DonateModal = () => {
  const [open, setOpen] = useState(false);
  const [upiModalOpen, setUpiModalOpen] = useState(false);

  const upiLink = "upi://pay?pa=aniketbaranwal8090-1@oksbi&pn=Aniket%20Baranwal&cu=INR";

  return (
    <div>
      {/* Floating Donate Button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          backgroundColor: "var(--main-color)",
          color: "var(--bg-color)",
        }}
        className="fixed bottom-[15%] right-[30%] sm:bottom-6 sm:right-6 font-semibold px-4 py-2 rounded-full shadow-lg hover:brightness-110 transition-all"
      >
        ☕ Buy me a coffee
      </button>

      {/* Main Donate Modal */}
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="rounded-xl p-6 w-80 max-w-[90%] relative shadow-2xl flex flex-col items-center"
            style={{
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
            }}
          >
            {/* Close Main Modal */}
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

            {/* Pay via UPI button */}
            <button
              onClick={() => {
                setUpiModalOpen(true);
                setOpen(false);
              }}
              className="bg-[var(--sub-color)] text-white font-semibold py-2 px-4 rounded-md hover:brightness-110 transition-all w-full mb-3"
            >
              Pay via UPI
            </button>

            {/* BuyMeACoffee button */}
            {/* BuyMeACoffee link */}
<a
  href="https://buymeacoffee.com/aniket969"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center gap-2 bg-[var(--caret-color)] hover:bg-[var(--error-color)] text-white py-2 w-full rounded-md font-semibold transition-all"
>
  <SiBuymeacoffee size={20} />
  Buy me a Coffee
</a>

          </div>
        </div>
      )}

      {/* UPI Payment Modal */}
      {upiModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="rounded-xl p-6 w-80 max-w-[90%] relative shadow-2xl flex flex-col items-center"
            style={{
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
            }}
          >
            {/* Close UPI Modal */}
            <button
              onClick={() => setUpiModalOpen(false)}
              style={{ color: "var(--text-color)" }}
              className="absolute top-3 right-3 hover:brightness-125 text-2xl font-bold transition-all"
            >
              ×
            </button>

            <h2 className="text-lg font-bold mb-4 text-center">
              Pay via UPI
            </h2>

            {/* QR Code */}
            <img
              src={qrImage}
              alt="UPI QR Code"
              className="w-80 h-80 rounded-md mb-4"
            />

            {/* Clickable UPI Link */}
            <a
              href={upiLink}
              className="bg-[var(--sub-color)] text-white font-semibold py-2 px-4 rounded-md hover:brightness-110 transition-all w-full text-center flex flex-col"
            >
              Open UPI App to Pay
              <span>( Mobile Only )</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonateModal;
