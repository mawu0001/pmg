"use client"
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function MagazineAdUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [selectedMagazine, setSelectedMagazine] = useState("udogse"); // Default magazine
  const [currentPage, setCurrentPage] = useState(42); // Starting page
  const [imageFitMode, setImageFitMode] = useState("cover"); // Default to cover instead of contain
  const [isMobileView, setIsMobileView] = useState(false); // Added the state definition here
  const fileInputRef = useRef(null);

  // Color definitions
  const colors = {
    red_color: "#FF0000",    // red
    black_color: "#000000",  // black
    white_color: "#FFFFFF",  // white
    udogse_color: "#000000", // Ud & Se black
    samvirke_color: "#FF0000" // Samvirke red
  };

  // Check for mobile view on component mount and on resize
  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 768);
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Clean up object URL when component unmounts
  useEffect(() => {
    return () => {
      if (selectedImage?.previewUrl) {
        URL.revokeObjectURL(selectedImage.previewUrl);
      }
    };
  }, [selectedImage]);

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
      headerImage: "/api/placeholder/800/120", // DSB logo placeholder
      dummyImages: [
        "/api/placeholder/300/200", // Train image placeholder
        "/api/placeholder/300/150", // Station image placeholder
      ],
      dummyText: {
        headline: "Opdagelsesrejse på skinner",
        subhead: "Tag med på eventyr gennem Danmarks skønneste landskaber",
        sidebar: "Rejsemål i fokus: De historiske togstrækninger i Danmark",
        content: "Tog har forbundet danskerne i over 175 år. Fra Nordsjællands kyster til Vestjyllands vidder har de røde tog været en livline i samfundet. Nu kan du opdage landets historie gennem ruterne..."
      }
    },
    samvirke: {
      title: "SAMVIRKE",
      subtitle: "COOP MAGASINET",
      columnLayout: "three-column",
      fontFamily: "'Nunito', sans-serif",
      headerFont: "'Montserrat', sans-serif",
      primaryColor: colors.samvirke_color,
      secondaryColor: "#F7FFF0",
      headerImage: "/api/placeholder/800/120", // Coop logo placeholder
      dummyImages: [
        "/api/placeholder/300/200", // Food image placeholder
        "/api/placeholder/300/150", // Produce image placeholder
      ],
      dummyText: {
        headline: "Bæredygtig mad i sæson",
        subhead: "Grøntsager der smager af mere når de er i sæson",
        sidebar: "Sæsonens råvarer: Lokale økologiske grøntsager til dit køkken",
        content: "Den bedste mad starter med de bedste råvarer. Årstidens lokale grøntsager giver ikke bare den mest intense smag, men er også bedst for miljøet. Lær hvordan du kan bruge sæsonens skatte..."
      }
    }
  };


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
    } else if (direction === "prev" && currentPage > 4) {
      setCurrentPage(currentPage - 2);
    }
  };

  const toggleImageFitMode = () => {
    // Toggle between cover and contain modes
    setImageFitMode(imageFitMode === "cover" ? "contain" : "cover");
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

  // Magazine spread component - the main view
  const MagazineSpread = () => {
    const template = magazineTemplates[selectedMagazine];
    
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
          {/* Left Page */}
          <div className="w-1/2 border-r border-gray-200 p-6" style={{ fontFamily: template.fontFamily }}>
            <div className="h-full flex flex-col">
              <h1 
                className="text-2xl font-bold mb-2" 
                style={{ color: template.primaryColor, fontFamily: template.headerFont }}
              >
                {template.dummyText.headline}
              </h1>
              <p className="text-sm mb-4 italic">{template.dummyText.subhead}</p>
              
              {/* Dummy magazine content */}
              <div className="flex mb-4 gap-3">
                <div className="w-2/3">
                  <p className="mb-4 text-sm leading-relaxed">
                    {template.dummyText.content}
                  </p>
                  <p className="mb-4 text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta.
                  </p>
                </div>
                <div className="w-1/3">
                  <div className="relative w-full h-32 mb-3">
                    <Image 
                      src={template.dummyImages[0]} 
                      alt="Magazine illustration" 
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <p className="text-xs text-gray-600 italic">
                    Billedtekst: {selectedMagazine === "udogse" ? "Togstation i solnedgang" : "Friske økologiske grøntsager"}
                  </p>
                </div>
              </div>
              
              <div className="flex-1 flex items-end justify-center">
                <div className="text-center text-xs text-gray-400">SIDE {currentPage}</div>
              </div>
            </div>
          </div>
          
          {/* Right Page - Ad Space */}
          <div className="w-1/2 p-6" style={{ fontFamily: template.fontFamily }}>
            <div className="h-full flex flex-col">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 mb-4 flex-1 flex flex-col">
                <h3 
                  className="text-lg font-semibold mb-2 text-center"
                  style={{ color: template.primaryColor, fontFamily: template.headerFont }}
                >
                  {selectedImage ? "Din annonce" : "Klik for at uploade din annonce"}
                </h3>
                
                {selectedImage ? (
                  <div className="relative flex-1 flex items-center justify-center overflow-hidden">
                    <Image 
                      src={selectedImage.previewUrl} 
                      alt={selectedImage.name} 
                      fill
                      className={`object-${imageFitMode}`} 
                      onClick={triggerFileInput}
                      style={{ cursor: "pointer" }}
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs p-1 rounded">
                      Klik for at skifte billede
                    </div>
                    <button
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs p-1 rounded"
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
                    className="flex-1 flex flex-col items-center justify-center cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    <svg 
                      className="h-16 w-16 text-gray-400" 
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
                    <p className="mt-4 text-sm text-gray-500">Klik for at uploade dit billede</p>
                    <p className="mt-1 text-xs text-gray-400">
                      (kun {supportedFormats.join(", ")})
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
                
                <div className="mt-3 text-xs text-gray-500 text-center">
                  Annoncestørrelse: {adSizeGuide[selectedMagazine][0].dimensions} (helside)
                </div>
              </div>
              
              <div className="flex-1 flex items-end justify-center">
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
          <MagazineSpread />

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