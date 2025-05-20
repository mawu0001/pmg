"use client"
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// CSS-variabl til scaling af magasinet
const globalStyles = `
  :root {
    --magazine-scale: 1;
  }
`;

// Farver fra PMG
const colors = {
  red_color: "#FF0000",    // rød
  black_color: "#000000",  // sort
  white_color: "#FFFFFF",  // white
  udogse_color: "#000000", // Ud & Se sort
  samvirke_color: "#FF0000" // Samvirke rød
};

// Supported file formats - now only images
const supportedFormats = [
  ".jpg", ".jpeg", ".png", ".gif", ".webp"
];

// Annonce guidelines info
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

// Magasin layout information
const magazineTemplates = {
  udogse: {
    title: "UD & SE",
    subtitle: "DSB MAGASINET",
    columnLayout: "two-column", //enten to eller 3 kolonner
    fontFamily: "'Georgia', serif",
    headerFont: "'Helvetica Neue', sans-serif",
    primaryColor: colors.udogse_color,
    secondaryColor: "#F0F4F8",
    headerImage: "/images/magasin-indhold/udogse_header.jpg", 
    pageImages: [
      // hvert et array element repræsenterer content for en side, og de stiger med 2
      {
        image: "/images/magasin-indhold/7-eleven-ad-ud-og-se.jpg",
        caption: "7-Eleven annonce for croissanter",
        headline: "7-Eleven Tilbud"
      },
      {
        image: "/images/magasin-indhold/organdonationsforeningen-ad-ud-og-se.jpg",
        caption: "Organdonationsforeningen annonce for organdonation",
        headline: "Organdonation"
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
        headline: "Albani Påskeøl"
      },
      {
        image: "/images/magasin-indhold/fernet-branca-ad-samvirke.jpg",
        caption: "Fernet Branca annonce for 'Life is Bitter'-kampagnen",
        headline: "Fernet Branca"
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
    <div 
      className="flex flex-col bg-white text-black shadow-xl mx-auto"
      style={{
        width: "420mm",    // defineret width af 420mm
        height: "300mm",   // defineret height af 300mm
        transform: "scale(var(--magazine-scale))",
        transformOrigin: "center top"
      }}
      role="region"
      aria-label={`${template.title} magazine preview, pages ${currentPage}-${currentPage + 1}`}
    >
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
        className="flex flex-row w-full"
        style={{ 
          backgroundColor: template.secondaryColor,
          height: "calc(300mm - 90px)", // defineret height for content area
          overflow: "hidden"
        }}
      >
        {/* Venstre side - Content */}
        <div className="w-1/2 border-r border-gray-200 p-6" style={{ fontFamily: template.fontFamily }}>
          <div className="h-full flex flex-col">
            <h1 
              className="text-2xl font-bold mb-2" 
              style={{ color: template.primaryColor, fontFamily: template.headerFont }}
            >
              {currentPageContent.headline}
            </h1>
            
            {/* billede for venstre side */}
            <div className="flex-1 relative w-full h-full">
              <Image 
                src={currentPageContent.image} 
                alt={currentPageContent.caption}
                fill
                className="object-fit"
                style={{ width: "100%", height: "100%" }}
                priority
                aria-describedby={`page-${currentPage}-description`}
              />
              <span id={`page-${currentPage}-description`} className="sr-only">
                {currentPageContent.caption}
              </span>
            </div>
            
            <div className="flex items-end justify-center mt-4">
              <div className="text-center text-xs text-gray-400">SIDE {currentPage}</div>
            </div>
          </div>
        </div>
        
        {/* Højre side - annonce upload */}
        <div className="w-1/2" style={{ fontFamily: template.fontFamily }}>
          <div className="h-full flex flex-col relative">
            {/* Annoncen fylder hele højre plads */}
            <div className="absolute inset-0">
              {selectedImage ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={selectedImage.previewUrl} 
                    alt={`Din uploadede annonce: ${selectedImage.name}`} 
                    fill
                    className={`object-${imageFitMode}`} 
                    onClick={triggerFileInput}
                    style={{ cursor: "pointer" }}
                  />
                  <div 
                    className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-xs p-2 rounded"
                    aria-hidden="true"
                  >
                    Klik for at skifte billede
                  </div>
                  <button
                    className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-xs p-2 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleImageFitMode();
                    }}
                    aria-label={imageFitMode === "cover" ? "Vis hele billedet" : "Fyld hele annoncen"}
                  >
                    {imageFitMode === "cover" ? "Vis hele billedet" : "Fyld hele annoncen"}
                  </button>
                </div>
              ) : (
                <div 
                  className="w-full h-full flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300"
                  onClick={triggerFileInput}
                  role="button"
                  tabIndex={0}
                  aria-label="Klik for at uploade din annonce"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      triggerFileInput();
                    }
                  }}
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
                aria-label="Upload annoncebillede"
                id="ad-image-upload"
              />
            </div>
            
            {/* Sidenummer */}
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
            aria-label="Gå til tidligere sider"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tidligere sider
          </button>
          <p>piccolomedia.dk | Forhåndsvisning</p>
          <button 
            className="text-white hover:underline text-sm flex items-center"
            onClick={() => changePageNumber("next")}
            disabled={currentPage >= 98}
            aria-label="Gå til næste sider"
          >
            Næste sider
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
  // Indsæt global styles
  useEffect(() => {
    // tilføj global styles til head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);
    
    // Clean
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  // States
  const [selectedImage, setSelectedImage] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [selectedMagazine, setSelectedMagazine] = useState("udogse"); // Normalt magazine
  const [currentPage, setCurrentPage] = useState(42); // Startside (42) dummy
  const [imageFitMode, setImageFitMode] = useState("cover"); // Billeder skal 'cover'
  const [isMobileView, setIsMobileView] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // tænk over hvad der skal vises af content
  
  // Refs
  const fileInputRef = useRef(null);
  const magazineContainerRef = useRef(null);

  // Tjek efter mobilstørrelse, og tilføj fejl hvis på mobil
  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 768);
    checkMobile(); // første tjek
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sidens scaling logik
  useEffect(() => {
    // omregn mm til px 
    const calculateMagazineScale = () => {
      const magazineWidth = 420; // mm
      const magazineHeight = 300; // mm
      
      // Container dimensions, med padding
      const containerWidth = document.querySelector('.magazine-container-wrapper')?.clientWidth || window.innerWidth * 0.95;
      
      // Udregn mulig højde
      const headerHeight = document.querySelector('.magazine-header')?.offsetHeight || 100;
      const footerHeight = document.querySelector('.magazine-footer')?.offsetHeight || 150;
      const availableHeight = window.innerHeight - headerHeight - footerHeight - 40; // 40px ekstra margins
      
// Konverter millimeter til pixels (ca. 1mm ≈ 3.78px ved 96 dpi)
const magazineWidthInPx = magazineWidth * 3.78;
const magazineHeightInPx = magazineHeight * 3.78;

// Beregn skalering baseret på både bredde og højde
const scaleFactorWidth = containerWidth / magazineWidthInPx;
const scaleFactorHeight = availableHeight / magazineHeightInPx;

// Brug den mindste skaleringsværdi, så magasinet altid passer ind i rammen
const scaleFactor = Math.min(scaleFactorWidth, scaleFactorHeight, 1);

// Gem skaleringsfaktor som en CSS-variabel
document.documentElement.style.setProperty('--magazine-scale', scaleFactor.toString());

// Justér containerens højde, så den passer til magasinet efter skalering
if (magazineContainerRef.current) {
  const scaledHeight = magazineHeightInPx * scaleFactor;
  magazineContainerRef.current.style.height = `${scaledHeight}px`;
}
    };
// Beregn skalering første gang og når vinduet ændrer størrelse
calculateMagazineScale();
window.addEventListener('resize', calculateMagazineScale);

return () => {
  window.removeEventListener('resize', calculateMagazineScale);
};
  }, []);

// Når brugeren vælger et nyt magasin, vis første side
useEffect(() => {
  setCurrentPageIndex(0);
}, [selectedMagazine]);

// Ryd op i billede-linket når komponenten fjernes
useEffect(() => {
  return () => {
    if (selectedImage?.previewUrl) {
      URL.revokeObjectURL(selectedImage.previewUrl);
    }
  };
}, [selectedImage]);

 // Når brugeren vælger en fil
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Kun billedfiler er tilladt
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

  // Fortæl skærmlæsere at billede blev uploadet
  const announcement = document.getElementById('a11y-announcement');
  if (announcement) {
    announcement.textContent = `Billede ${file.name} er blevet uploadet. Du kan nu se det i magasinet.`;
  }
};

// Åbn filvælgeren, som om brugeren selv trykkede
const triggerFileInput = () => {
  fileInputRef.current.click();
};

// Brugeren vil gemme annoncen i magasinet
const downloadMagazine = () => {
  // I en rigtig app ville dette gemme som en PDF
  alert("Din annonce er nu gemt i magasinet. I en rigtig app ville dette downloade en PDF af magasinet med din annonce.");
};

// Skift mellem sider i magasinet
const changePageNumber = (direction) => {
  if (direction === "next" && currentPage < 98) {
    setCurrentPage(currentPage + 2);

    // Gå videre til næste sideindhold
    const nextIndex = (currentPageIndex + 1) % magazineTemplates[selectedMagazine].pageImages.length;
    setCurrentPageIndex(nextIndex);
  } else if (direction === "prev" && currentPage > 4) {
    setCurrentPage(currentPage - 2);

    // Gå tilbage til forrige sideindhold
    const prevIndex = (currentPageIndex - 1 + magazineTemplates[selectedMagazine].pageImages.length) % magazineTemplates[selectedMagazine].pageImages.length;
    setCurrentPageIndex(prevIndex);
  }
};

// Skift mellem at tilpasse billedet som 'cover' eller 'contain'
const toggleImageFitMode = () => {
  setImageFitMode(imageFitMode === "cover" ? "contain" : "cover");
};

// Hvis skærmen er for lille (mobil), vis en advarsel
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

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: colors.white_color,
      color: colors.black_color
    }}
    role="application"
    aria-label="Magasin annonceværktøj"
    >    
      {/* Accessibility announcement region */}
      <div 
        aria-live="polite" 
        id="a11y-announcement" 
        className="sr-only"
      ></div>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 magazine-header">
          <div>
            <h1 className="text-3xl font-black">ANNONCEVÆRKTØJ</h1>
            <p className="text-sm font-medium">
              Placér din annonce direkte i <strong>Ud & Se</strong> eller <strong>Samvirke</strong> magasinet for Piccolo Media Group.
            </p>
          </div>
        </div>

        {/* Magazine Selection */}
        <div className="mb-4" role="radiogroup" aria-labelledby="magazine-selection-label">
          <h2 className="text-lg font-bold mb-2" id="magazine-selection-label">Vælg magasin</h2>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 rounded-2xl transition-colors"
              style={{
                backgroundColor: selectedMagazine === "udogse" ? colors.udogse_color : colors.white_color,
                color: selectedMagazine === "udogse" ? colors.white_color : colors.black_color,
                border: selectedMagazine === "udogse" ? "none" : "2px solid black"
              }}
              onClick={() => setSelectedMagazine("udogse")}
              aria-pressed={selectedMagazine === "udogse"}
              aria-label="Vælg Ud & Se magasin"
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
              aria-pressed={selectedMagazine === "samvirke"}
              aria-label="Vælg Samvirke magasin"
            >
              Samvirke
            </button>
          </div>
        </div>

        {/* Magazine Preview Container */}
        <div className="mb-4">
          <h2 className="sr-only">Magasin forhåndsvisning</h2>
          <div 
            className="magazine-container-wrapper" 
            style={{ 
              width: "100%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center"
            }}
          >
            {/* FIXED MAGAZINE CONTAINER */}
            <div 
              className="magazine-container flex justify-center" 
              ref={magazineContainerRef}
              style={{ 
                width: "100%",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                position: "relative",
                transformOrigin: "center top"
              }}
            >
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
          </div>
        </div>
                
        <p className="text-xs" role="alert">Vær opmærksom på, at denne previewer kun fungerer på tablets & PC - <strong>IKKE</strong> på mobil.</p>
        
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
            aria-disabled={!selectedImage}
            aria-label={!selectedImage ? "Gem annonce i magasinet - Upload et billede først" : "Gem annonce i magasinet"}
          >
            Gem annonce i magasinet
          </button>
        </div>

        {/* Information & specifikationer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 magazine-footer">
          <div className="p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2" id="ad-formats-heading">Annonceformater</h2>
            <p className="text-sm mb-4">Annoncen skal uploades som et billede i et af følgende formater:</p>
            
            <table className="w-full text-sm" aria-labelledby="ad-formats-heading">
              <thead>
                <tr>
                  <th className="text-left pb-2" scope="col">Format</th>
                  <th className="text-left pb-2" scope="col">Dimensioner</th>
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
            <h2 className="text-lg font-bold mb-2" id="image-requirements-heading">Billedkrav</h2>
            <ul className="text-sm space-y-2" aria-labelledby="image-requirements-heading">
              <li>• Billedfiler skal være i formaterne: {supportedFormats.join(", ")}</li>
              <li>• Minimum opløsning: 300 DPI</li>
              <li>• Farverum: CMYK</li>
              <li>• Maksimal filstørrelse: 10 MB</li>
            </ul>
            
            <div className="mt-4">
              <h3 className="font-bold text-sm mb-1" id="specs-links-heading">Links til specifikationer</h3>
              <ul aria-labelledby="specs-links-heading">
                <li>
                  <a 
                    className="text-sm hover:underline block" 
                    href="https://piccolomedia.dk/wp-content/uploads/SAMVIRKE_Nyeformater.pdf"
                    aria-label="Download prislister og formatmål for Samvirke (PDF)"
                  >
                    Prislister og formatmål for <strong>Samvirke</strong>
                  </a>
                </li>
                <li>
                  <a 
                    className="text-sm hover:underline block" 
                    href="https://piccolomedia.dk/wp-content/uploads/udogse-priser-og-betingelser_DL.pdf"
                    aria-label="Download prislister og formatmål for Ud & Se (PDF)"
                  >
                    Prislister og formatmål for <strong>Ud & Se</strong>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}