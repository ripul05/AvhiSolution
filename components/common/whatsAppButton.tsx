// "use client";

// import Image from "next/image";

// const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
// const message = encodeURIComponent(
//   "Hello, I visited your website avhisolutions.com. I am interested in having more details about your Product. Please get in touch with me."
// );
// export default function WhatsAppButton() {
//   if (!phoneNumber) return null;

//   return (
//     <a
//       href={`https://wa.me/${phoneNumber}?text=${message}`}
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label="Chat on WhatsApp"
//       className="
//         fixed
//         bottom-6
//         left-6
//         z-[9999]
//         transition-transform
//         duration-300
//         hover:scale-110
//         active:scale-95
//       "
//     >
//       <div className="rounded-full shadow-2xl">
//         <Image
//           src="/img/whatsapp.webp"
//           alt="WhatsApp"
//           width={60}
//           height={60}
//           priority
//           className="rounded-full"
//         />
//       </div>
//     </a>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const message = encodeURIComponent(
  "Hello, I visited your website avhisolutions.com. I am interested in having more details about your Product. Please get in touch with me."
);
const TOOLTIP_SEEN_KEY = "avhi_whatsapp_tooltip_seen";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!phoneNumber) return;

    const hasSeenTooltip = window.localStorage.getItem(TOOLTIP_SEEN_KEY);
    if (!hasSeenTooltip) {
      const showTimer = setTimeout(() => {
        setShowTooltip(true);
        window.localStorage.setItem(TOOLTIP_SEEN_KEY, "true");
      }, 1500);

      return () => clearTimeout(showTimer);
    }
  }, []);

  useEffect(() => {
    if (!showTooltip) return;
    const hideTimer = setTimeout(() => setShowTooltip(false), 4000);
    return () => clearTimeout(hideTimer);
  }, [showTooltip]);

  if (!phoneNumber) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex items-end gap-2">
        <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="
          transition-transform
          duration-300
          hover:scale-110
          active:scale-95
        "
      >
        <div className="rounded-full shadow-2xl">
          <Image
            src="/img/whatsapp.webp"
            alt="WhatsApp"
            width={60}
            height={60}
            priority
            className="rounded-full"
          />
        </div>
      </a>

      {showTooltip && (
        <span
          className="
            mb-4
            whitespace-nowrap
            rounded-lg bg-[#080d12] px-3 py-2 text-sm text-white shadow-lg
          "
        >
          Chat with us on WhatsApp
        </span>
      )}
    </div>
  );
}