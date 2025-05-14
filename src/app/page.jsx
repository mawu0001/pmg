"use client"
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Color definitions
const colors = {
  red_color: "#FF0000",    // red
  black_color: "#000000",  // black
  white_color: "#FFFFFF",  // white
  udogse_color: "#000000", // Ud & Se black
  samvirke_color: "#FF0000" // Samvirke red
};

// Supported file formats - now only images
const supportedFormats = [
  ".jpg", ".jpeg", ".png", ".gif", ".webp"
];

// Ad dimension guidelines
const adSizeGuide = {
  udogse: [
    { name: "Helside", dimensions: "210 x 297 mm" },
    { name: "Halvside", dimensions: "210 x 148 mm" },
    { name: "Kvartside", dimensions: "105 x 148 mm" }
  ],
  samvirke: [
    { name: "Helside", dimensions: "203 x 253 mm" },
    { name: "Halvside", dimensions: "203 x 126 mm" },
    { name: "Kvartside", dimensions: "101 x 126 mm" }
  ]
};

// Magazine templates and layouts
const magazineTemplates = {
  udogse: {
    title: "UD & SE",
    subtitle: "DSB MAGASINET",
    columnLayout: "two-column", // two-column or three-column
    fontFamily: "'Georgia', serif",
    headerFont: "'Helvetica Neue', sans-serif",
    primaryColor: colors.udogse_color,
    secondaryColor: "#F0F4F8",
    headerImage: "/images/magasin-indhold/udogse_header.jpg", 
    pageImages: [
      // Each array element represents content for a page spread (page numbers increase by 2)
      {
        image: "/images/magasin-indhold/7-eleven-ad-ud-og-se.jpg",
        caption: "7-Eleven annonce for croissanter",
      },
      {
        image: "/images/magasin-indhold/organdonationsforeningen-ad-ud-og-se.jpg",
        caption: "Organdonationsforeningen annonce for organdonation",
      }
    ]
  },
  samvirke: {
    title: "SAMVIRKE",
    subtitle: "COOP MAGASINET",
    columnLayout: "three-column",
    fontFamily: "'Nunito', sans-serif",
    headerFont: "'Montserrat', sans-serif",
    primaryColor: colors.samvirke_color,
    secondaryColor: "#F7FFF0",
    headerImage: "/images/magasin-indhold/samvirke_header.jpg",
    pageImages: [
      {
        image: "/images/magasin-indhold/albani-ad-samvirke.jpg",
        caption: "Albani annonce for Påskeøl",
      },
      {
        image: "/images/magasin-indhold/fernet-branca-ad-samvirke.jpg",
        caption: "Fernet Branca annonce for 'Life is Bitter'-kampagnen",
      }
    ]
  }
};

// MagazineSpread Component
const MagazineSpread = ({ 
  selectedMagazine, 
  currentPage, 
  currentPageIndex, 
  selectedImage,
  imageFitMode, 
  fileInputRef, 
  triggerFileInput, 
  handleFileChange, 
  toggleImageFitMode, 
  changePageNumber 
}) => {
  const template = magazineTemplates[selectedMagazine];
  const currentPageContent = template.pageImages[currentPageIndex];
  
  return (
    <div className="flex flex-col w-full bg-white text-black shadow-xl">
      {/* Magazine Header */}
      <div 
        className="w-full py-4 px-6 flex items-center justify-between"
        style={{ 
          backgroundColor: template.primaryColor,
          color: colors.white_color
        }}
      >
        <div className="flex items-center">
          <h2 
            className="text-3xl font-bold" 
            style={{ fontFamily: template.headerFont }}
          >
            {template.title}
          </h2>
          <p className="ml-4 text-sm italic">{template.subtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">APRIL 2025</p>
          <p className="text-xs">SIDE {currentPage}-{currentPage + 1}</p>
        </div>
      </div>
      
      {/* Magazine Content - Two Page Spread */}
      <div 
        className="flex flex-row w-full mt-10 mb-10"
        style={{ 
          backgroundColor: template.secondaryColor,
          minHeight: "85vh"
        }}
      >
        {/* Left Page - Content for current page */}
        <div className="w-1/2 border-r border-gray-200 p-6" style={{ fontFamily: template.fontFamily }}>
          <div className="h-full flex flex-col">
            <h1 
              className="text-2xl font-bold mb-2" 
              style={{ color: template.primaryColor, fontFamily: template.headerFont }}
            >
              {currentPageContent.headline}
            </h1>
            
            {/* Featured Image for current page - now fills the entire space */}
            <div className="flex-1 relative w-full h-full">
              <Image 
                src={currentPageContent.image} 
                alt={currentPageContent.caption}
                fill
                className="object-fit"
                style={{ width: "100%", height: "100%" }}
                priority
              />
            </div>
            
            <div className="flex items-end justify-center mt-4">
              <div className="text-center text-xs text-gray-400">SIDE {currentPage}</div>
            </div>
          </div>
        </div>
        
        {/* Right Page - Ad Space (full size) */}
        <div className="w-1/2" style={{ fontFamily: template.fontFamily }}>
          <div className="h-full flex flex-col relative">
            {/* Ad upload area fills the entire right side */}
            <div className="absolute inset-0">
              {selectedImage ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={selectedImage.previewUrl} 
                    alt={selectedImage.name} 
                    fill
                    className={`object-${imageFitMode}`} 
                    onClick={triggerFileInput}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-xs p-2 rounded">
                    Klik for at skifte billede
                  </div>
                  <button
                    className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-xs p-2 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleImageFitMode();
                    }}
                  >
                    {imageFitMode === "cover" ? "Vis hele billedet" : "Fyld hele annoncen"}
                  </button>
                </div>
              ) : (
                <div 
                  className="w-full h-full flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300"
                  onClick={triggerFileInput}
                >
                  <svg 
                    className="h-20 w-20 text-gray-400" 
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
                  <h3 className="mt-4 text-xl font-semibold text-gray-700">Klik for at uploade din annonce</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Understøttede formater: {supportedFormats.join(", ")}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Annoncestørrelse: {adSizeGuide[selectedMagazine][0].dimensions} (helside)
                  </p>
                </div>
              )}
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
            
            {/* Page number at the bottom */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="text-center text-xs text-gray-400">SIDE {currentPage + 1}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Magazine Footer */}
      <div 
        className="w-full py-3 px-6 text-sm flex justify-between items-center"
        style={{ 
          backgroundColor: template.primaryColor,
          color: colors.white_color
        }}
      >
        <p>© 2025 {selectedMagazine === "udogse" ? "DSB" : "Coop Danmark"}</p>
        <div className="flex items-center gap-4">
          <button 
            className="text-white hover:underline text-sm flex items-center"
            onClick={() => changePageNumber("prev")}
            disabled={currentPage <= 4}
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tidligere sider
          </button>
          <p>piccolomedia.dk | Forhåndsvisning</p>
          <button 
            className="text-white hover:underline text-sm flex items-center"
            onClick={() => changePageNumber("next")}
            disabled={currentPage >= 98}
          >
            Næste sider
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function MagazineAdUploader() {
  // State
  const [selectedImage, setSelectedImage] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [selectedMagazine, setSelectedMagazine] = useState("udogse"); // Default magazine
  const [currentPage, setCurrentPage] = useState(42); // Starting page
  const [imageFitMode, setImageFitMode] = useState("cover"); // Default to cover instead of contain
  const [isMobileView, setIsMobileView] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // Track which page content to display
  
  // Refs
  const fileInputRef = useRef(null);

  // Check for mobile view on component mount and on resize
  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 768);
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // When magazine selection changes, reset to the first page content
  useEffect(() => {
    setCurrentPageIndex(0);
  }, [selectedMagazine]);

  // Clean up object URL when component unmounts
  useEffect(() => {
    return () => {
      if (selectedImage?.previewUrl) {
        URL.revokeObjectURL(selectedImage.previewUrl);
      }
    };
  }, [selectedImage]);

  // Handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Only allow image uploads
    if (!file.type.startsWith("image/")) {
      alert("Kun billedfiler er tilladt (.jpg, .jpeg, .png, .gif, .webp)");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setSelectedImage({
      file: file,
      name: file.name,
      type: file.type,
      size: file.size,
      previewUrl: objectUrl
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const downloadMagazine = () => {
    // In a real app, this would generate a PDF of the magazine with the ad
    alert("Din annonce er nu gemt i magasinet. I en rigtig app ville dette downloade en PDF af magasinet med din annonce.");
  };

  const changePageNumber = (direction) => {
    if (direction === "next" && currentPage < 98) {
      setCurrentPage(currentPage + 2);
      // Update page content index
      const nextIndex = (currentPageIndex + 1) % magazineTemplates[selectedMagazine].pageImages.length;
      setCurrentPageIndex(nextIndex);
    } else if (direction === "prev" && currentPage > 4) {
      setCurrentPage(currentPage - 2);
      // Update page content index
      const prevIndex = (currentPageIndex - 1 + magazineTemplates[selectedMagazine].pageImages.length) % magazineTemplates[selectedMagazine].pageImages.length;
      setCurrentPageIndex(prevIndex);
    }
  };

  const toggleImageFitMode = () => {
    // Toggle between cover and contain modes
    setImageFitMode(imageFitMode === "cover" ? "contain" : "cover");
  };

  // If on mobile, show a warning that this tool requires a larger screen
  if (isMobileView) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center text-center p-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">Denne forhåndsvisning virker kun på større skærme</h1>
          <p className="text-md text-gray-600">Brug venligst en tablet eller desktop for at anvende annonceværktøjet.</p>
        </div>
      </div>
    );
  }

  // Main component render for non-mobile devices
  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: colors.white_color,
      color: colors.black_color
    }}>    
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black">ANNONCEVÆRKTØJ</h1>
            <p className="text-sm font-medium">
              Placér din annonce direkte i <strong>Ud & Se</strong> eller <strong>Samvirke</strong> magasinet for Piccolo Media Group.
            </p>
          </div>
        </div>

        {/* Magazine Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Vælg magasin</h2>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 rounded-2xl transition-colors"
              style={{
                backgroundColor: selectedMagazine === "udogse" ? colors.udogse_color : colors.white_color,
                color: selectedMagazine === "udogse" ? colors.white_color : colors.black_color,
                border: selectedMagazine === "udogse" ? "none" : "2px solid black"
              }}
              onClick={() => setSelectedMagazine("udogse")}
            >
              Ud & Se
            </button>
            <button
              className="px-4 py-2 rounded-2xl transition-colors"
              style={{
                backgroundColor: selectedMagazine === "samvirke" ? colors.samvirke_color : colors.white_color,
                color: selectedMagazine === "samvirke" ? colors.white_color : "#FF0000",
                border: selectedMagazine === "samvirke" ? "none" : "2px solid #FF0000"
              }}              
              onClick={() => setSelectedMagazine("samvirke")}
            >
              Samvirke
            </button>
          </div>
        </div>

        {/* Magazine Preview */}
        <div className="mb-6">
          <MagazineSpread 
            selectedMagazine={selectedMagazine}
            currentPage={currentPage}
            currentPageIndex={currentPageIndex}
            selectedImage={selectedImage}
            imageFitMode={imageFitMode}
            fileInputRef={fileInputRef}
            triggerFileInput={triggerFileInput}
            handleFileChange={handleFileChange}
            toggleImageFitMode={toggleImageFitMode}
            changePageNumber={changePageNumber}
          />
        </div>
        <p className="text-xs">Vær opmærksom på, at denne previewer kun fungerer på tablets & PC - <strong>IKKE</strong> på mobil.</p>
        
        {/* Action buttons */}
        <div className="flex justify-end mt-4">
          <button
            className="px-6 py-3 rounded-2xl transition-colors text-lg font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: isButtonHovered
                ? (selectedMagazine === "samvirke" ? colors.black_color : colors.red_color)
                : (selectedMagazine === "samvirke" ? colors.red_color : colors.black_color),
              color: colors.white_color
            }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onClick={downloadMagazine}
            disabled={!selectedImage}
          >
            Gem annonce i magasinet
          </button>
        </div>

        {/* Information and specifications */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">Annonceformater</h2>
            <p className="text-sm mb-4">Annoncen skal uploades som et billede i et af følgende formater:</p>
            
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left pb-2">Format</th>
                  <th className="text-left pb-2">Dimensioner</th>
                </tr>
              </thead>
              <tbody>
                {adSizeGuide[selectedMagazine].map((size, index) => (
                  <tr key={index}>
                    <td className="py-1">{size.name}</td>
                    <td className="py-1">{size.dimensions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">Billedkrav</h2>
            <ul className="text-sm space-y-2">
              <li>• Billedfiler skal være i formaterne: {supportedFormats.join(", ")}</li>
              <li>• Minimum opløsning: 300 DPI</li>
              <li>• Farverum: CMYK</li>
              <li>• Maksimal filstørrelse: 10 MB</li>
            </ul>
            
            <div className="mt-4">
              <h3 className="font-bold text-sm mb-1">Links til specifikationer</h3>
              <a 
                className="text-sm hover:underline block" 
                href="https://piccolomedia.dk/wp-content/uploads/SAMVIRKE_Nyeformater.pdf"
              >
                Prislister og formatmål for <strong>Samvirke</strong>
              </a>
              <a 
                className="text-sm hover:underline block" 
                href="https://piccolomedia.dk/wp-content/uploads/udogse-priser-og-betingelser_DL.pdf"
              >
                Prislister og formatmål for <strong>Ud & Se</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}