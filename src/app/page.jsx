"use client"
import { useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const fileInputRef = useRef(null);

  // Color definitions
  const colors = {
    red_color: "#FF0000",    // red
    black_color: "#000000",  // black
    white_color: "#FFFFFF",  // white
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileType(selectedFile.type);

    // Create a URL for the file
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    // Open modal with preview
    openModal();

    // Clean up URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const downloadFile = () => {
    if (!file) return;

    const link = document.createElement("a");
    link.href = previewUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Supported file formats
  const supportedFormats = {
    images: [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"],
    documents: [".pdf", ".txt", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"]
  };

  // Render preview based on file type
  const renderPreview = () => {
    if (!file) return null;

    if (fileType.startsWith("image/")) {
      return (
        <div className="relative w-full h-64 md:h-96">
          <Image 
            src={previewUrl} 
            alt={file.name} 
            fill 
            className="object-contain" 
            aria-label={`Forhåndsvisning af ${file.name}`}
          />
        </div>
      );
    } else if (fileType === "application/pdf") {
      return (
        <iframe 
          src={previewUrl} 
          className="w-full h-96" 
          title="PDF Forhåndsvisning"
          aria-label="PDF dokument forhåndsvisning"
        />
      );
    } else {
      return (
        <div className="flex items-center justify-center h-64 text-center">
          <p>Forhåndsvisning er ikke tilgængelig for denne filtype. Du kan stadig downloade filen.</p>
        </div>
      );
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: isDarkMode ? colors.black_color : colors.white_color,
      color: isDarkMode ? colors.white_color : colors.black_color 
    }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
          <h1 className="fluid-title font-darker font-black" >DOKUMENTFREMVISER</h1>
<p className="text-sm -mt-2 font-darker font-medium">Til testing af annonceringer i bladene <strong>Ud & Se</strong> eller <strong>Samvirke</strong>, for Piccolo Media Group.</p>
</div>
          {/* Dark Mode Toggle */}
          <div className="flex items-center">
            <span className="mr-2 text-sm" aria-hidden="true">Lys</span>
            <button 
              role="switch"
              aria-checked={isDarkMode}
              style={{
                position: "relative",
                display: "inline-flex",
                height: "1.5rem",
                width: "2.75rem",
                alignItems: "center",
                borderRadius: "9999px",
                transition: "background-color 0.3s",
                backgroundColor: isDarkMode ? colors.red_color : "#E5E7EB",
                outline: "none"
              }}
              onClick={toggleDarkMode}
            >
              <span className="sr-only">Skift mørk tilstand</span>
              <span
                style={{
                  display: "inline-block",
                  height: "1rem",
                  width: "1rem",
                  transform: isDarkMode ? "translateX(1.5rem)" : "translateX(0.25rem)",
                  borderRadius: "9999px",
                  backgroundColor: colors.white_color,
                  transition: "transform 0.3s"
                }}
              />
            </button>
            <span className="ml-2 text-sm" aria-hidden="true">Mørk</span>
          </div>
        </div>

        {/* Main Upload Area */}
        <div 
          style={{
            border: "2px dashed",
            borderColor: isDarkMode ? "#4B5563" : "#D1D5DB",
            borderRadius: "0.5rem",
            padding: "3rem",
            textAlign: "center",
            backgroundColor: isDarkMode ? "#1F2937" : colors.white_color
          }}
          onClick={triggerFileInput}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              triggerFileInput();
            }
          }}
          tabIndex="0"
          role="button"
          aria-label="Upload fil"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            aria-hidden="true"
            accept={Object.values(supportedFormats).flat().join(",")}
          />
          <svg 
            style={{ 
              margin: "0 auto", 
              height: "3rem", 
              width: "3rem", 
              color: isDarkMode ? "#9CA3AF" : "#4B5563" 
            }}
            stroke="currentColor" 
            fill="none" 
            viewBox="0 0 48 48" 
            aria-hidden="true"
          >
            <path 
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
              strokeWidth={2} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
          <p className="mt-2 text-sm">Klik eller træk og slip for at uploade en fil</p>
        </div>

        {/* Supported file format info */}
        <div style={{ 
          marginTop: "2rem", 
          padding: "1rem", 
          borderRadius: "0.375rem",
          backgroundColor: isDarkMode ? "#4B5563" : "#F9FAFB" 
        }}>
          <h2 className="text-lg font-bold mb-2">Understøttede filformater</h2>
          <a 
            className="text-sm hover:underline" 
            aria-roledescription="link to external PDF" 
            aria-label="link" 
            href="https://piccolomedia.dk/wp-content/uploads/SAMVIRKE_Nyeformater.pdf"
          >
            Prislister og formatmål for <strong>Samvirke</strong>
          </a>
          <br />
          <a 
            className="text-sm hover:underline" 
            aria-roledescription="link to external PDF" 
            aria-label="link" 
            href="https://piccolomedia.dk/wp-content/uploads/udogse-priser-og-betingelser_DL.pdf"
          >
            Prislister og formatmål for <strong>Ud & Se</strong>
          </a>
          
          {/* Changed grid layout to flex with formats stacked on the right */}
          <div className="flex flex-row justify-end">
            <div className="flex flex-col">
              <div className="mb-2">
                <h3 className="font-bold">Billeder</h3>
                <p className="text-sm font-light">{supportedFormats.images.join(", ")}</p>
              </div>
              <div>
                <h3 className="font-bold">Dokumenter</h3>
                <p className="text-sm font-light">{supportedFormats.documents.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preview modal */}
        {isModalOpen && (
          <div 
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50, 
              backgroundColor: "rgba(0, 0, 0, 0.6)"
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div style={{
              position: "relative",
              width: "100%",
              maxWidth: "56rem",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              backgroundColor: isDarkMode ? colors.black_color : colors.white_color,
              color: isDarkMode ? colors.white_color : colors.black_color,
              border: `1px solid ${isDarkMode ? colors.white_color : colors.black_color}`
            }}>
              {/* Modal header */}
              <div className="flex justify-between items-center mb-4">
                <h2 id="modal-title" className="text-xl font-bold truncate max-w-md">
                  {file && file.name}
                </h2>
                <button
                  style={{
                    color: colors.red_color,
                    outline: "none"
                  }}
                  onClick={closeModal}
                  aria-label="Luk forhåndsvisning"
                >
                  <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              {/* Preview content */}
              <div className="mb-6">
                {renderPreview()}
              </div>

              {/* File info */}
              <div className="mb-6">
                <p className="text-sm">
                  <span className="font-medium">Type:</span> {file && file.type}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Størrelse:</span> {file && (file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              {/* Actions (knap) with hover effect */}
              <div className="flex justify-end">
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: isButtonHovered ? colors.black_color : colors.red_color,
                    color: colors.white_color,
                    borderRadius: "0.25rem",
                    outline: "none",
                    transition: "background-color 0.3s ease"
                  }}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  onClick={downloadFile}
                  aria-label="Download fil"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}