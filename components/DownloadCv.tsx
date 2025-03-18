import React from "react";
import { FaDownload } from "react-icons/fa"; // Import a download icon

const DownloadCV = () => {
  return (
    <div className="fixed top-5 right-10 text-[#86198f] px-5 py-4 rounded-full shadow-lg flex items-center gap-2 bg-[#D1FAE5] hover:bg-[#86EFAC] transition-all">
      <a
        href="/CV.pdf"
        download="Anastasia Dernova_CV.pdf" 
        className="flex items-center gap-2"
      >
        <FaDownload size={18} /> {/* Download Icon */}
        Download CV
      </a>
    </div>
  );
};

export default DownloadCV;
