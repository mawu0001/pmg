"use client"
import { useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const fileInputRef = useRef(null);

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
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dokumentfremviser</h1>
          
          {/* Dark Mode Toggle */}
          <div className="flex items-center">
            <span className="mr-2 text-sm" aria-hidden="true">Lys</span>
            <button 
              role="switch"
              aria-checked={isDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isDarkMode ? "bg-blue-600" : "bg-gray-200"
              }`}
              onClick={toggleDarkMode}
            >
              <span className="sr-only">Skift mørk tilstand</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="ml-2 text-sm" aria-hidden="true">Mørk</span>
          </div>
        </div>

        {/* Main Upload Area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-12 text-center ${
            isDarkMode ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-white"
          }`}
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
            className={`mx-auto h-12 w-12 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} 
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

        {/* Supported File Format Info */}
        <div className={`mt-8 p-4 rounded-md ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
          <h2 className="text-lg font-black mb-2">Understøttede filformater</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Billeder</h3>
              <p className="text-sm font-light">{supportedFormats.images.join(", ")}</p>
            </div>
            <div>
              <h3 className="font-medium">Dokumenter</h3>
              <p className="text-sm font-light">{supportedFormats.documents.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        {isModalOpen && (
          <div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className={`relative w-full max-w-4xl p-6 rounded-lg shadow-xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 id="modal-title" className="text-xl font-bold truncate max-w-md">
                  {file && file.name}
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  onClick={closeModal}
                  aria-label="Luk forhåndsvisning"
                >
                  <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              {/* Preview Content */}
              <div className="mb-6">
                {renderPreview()}
              </div>

              {/* File Info */}
              <div className="mb-6">
                <p className="text-sm">
                  <span className="font-medium">Type:</span> {file && file.type}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Størrelse:</span> {file && (file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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