"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// originalfarverne fra PMG
const colors = {
  red_color: "#FF0000",    // rød
  black_color: "#000000",  // sort
  white_color: "#FFFFFF",  // white
  udogse_color: "#000000", // Ud & Se sort
  samvirke_color: "#FF0000" // Samvirke rød
};

// modal component til preview af annoncer
function ImageModal({ isOpen, onClose, currentAd, allAds, onPrevious, onNext }) {
  useEffect(() => {
    // Keyboard kan bruges i modalet
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
        case "ArrowRight":
          onNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Fjern body scroll ved åbent modal
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      {/* X knap til modal */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl hover:text-black focus:outline-none"
        aria-label="Luk forhåndsvisning"
      >
        ✕
      </button>
      
      {/* Navigationspile */}
      <button 
        onClick={onPrevious}
        className="absolute left-4 text-white text-5xl opacity-70 hover:opacity-100 focus:outline-none transition-opacity"
        aria-label="Forrige annonce"
      >
        ‹
      </button>
      
      <button 
        onClick={onNext}
        className="absolute right-4 text-white text-5xl opacity-70 hover:opacity-100 focus:outline-none transition-opacity"
        aria-label="Næste annonce"
      >
        ›
      </button>
      
      {/* Modal indhold */}
      <div className="relative w-full max-w-4xl h-full max-h-[80vh] flex flex-col">
        {/* Image container */}
        <div className="relative flex-grow bg-white rounded-lg overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={currentAd.image}
              alt={`Annonceinspiration: ${currentAd.title}`}
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        {/* Caption */}
        <div className="bg-white bg-opacity-90 p-4 rounded-b-lg">
          <h3 className="text-xl font-bold text-black">{currentAd.title}</h3>
          <p className="text-sm text-black">{currentAd.description}</p>
          <p className="text-xs text-black mt-1">
            Magasin: {currentAd.magazine === "both" 
              ? "Begge magasiner" 
              : (currentAd.magazine === "udogse" ? "Ud & Se" : "Samvirke")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdInspirationGrid() {
  const [selectedMagazine, setSelectedMagazine] = useState("udogse");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Inspirations annoncer
  const inspirationAds = [
    {
      id: 1,
      image: "/images/magasin-indhold/gyldendal-ad.webp",
      title: "Gyldendal",
      description: "Gyldendal annonce for deres fagportaler",
      magazine: "both"
    },
    {
      id: 2,
      image: "/images/magasin-indhold/nordisk-film-ad.jpg",
      title: "Nordisk Film",
      description: "Nordisk film annonce for deres nye snackkurv",
      magazine: "udogse"
    },
    {
      id: 3,
      image: "/images/magasin-indhold/ok-coop-ad.avif",
      title: "OK COOP",
      description: "OK offentligører køb af halvdelen af COOP",
      magazine: "samvirke"
    },
    {
      id: 4,
      image: "/images/magasin-indhold/spies-ad.jpg",
      title: "Spies Rejser",
      description: "Spies annonce for deres ny rejsekampagne",
      magazine: "both"
    },
    {
      id: 5,
      image: "/images/magasin-indhold/tn-ad.jpeg",
      title: "TN",
      description: "TN annonce for det økologiske landbrug",
      magazine: "samvirke"
    },
    {
      id: 6,
      image: "/images/magasin-indhold/VEGA-ad.jpg",
      title: "VEGA",
      description: "VEGA annonce for deres nye kalender & kommende shows",
      magazine: "udogse"
    },
    {
      id: 7, 
      image: "/images/magasin-indhold/HK-ad.webp",
      title: "HK",
      description: "HK annonce for en fagperson",
      magazine: "both"
    },
    {
      id: 8,
      image: "/images/magasin-indhold/kea-ad.jpg",
      title: "KEA",
      description: "KEA annonce for en uddannelse på skolen",
      magazine: "udogse"
    },
    {
      id: 9,
      image: "/images/magasin-indhold/norlys-ad.png",
      title: "Norlys",
      description: "Norlys annonce for energi-omtanke",
      magazine: "samvirke"
    }
  ];

  // Filtrer annoncer pr. valgt magasin
  const filteredAds = inspirationAds.filter(ad => 
    ad.magazine === "both" || ad.magazine === selectedMagazine
  );

  // Modal handlers
  const openModal = (index) => {
    setCurrentAdIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const goToPrevious = () => {
    setCurrentAdIndex((prevIndex) => 
      prevIndex === 0 ? filteredAds.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentAdIndex((prevIndex) => 
      prevIndex === filteredAds.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-black" id="inspiration">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl text-black">ANNONCEINSPIRATION</h1>
          <p className="text-sm font-medium">
            Udforsk kreativ annonceinspiration til dit næste opslag i <strong>Ud & Se</strong> eller <strong>Samvirke</strong>.
          </p>
        </div>
      </div>

      {/* Magasin knapper */}
      <div className="mb-6" role="radiogroup" aria-labelledby="magazine-selection-label">
        <h2 className="text-lg font-bold mb-2" id="magazine-selection-label">Vælg magasin</h2>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 rounded-full transition-colors cursor-pointer"
            style={{
              backgroundColor: selectedMagazine === "udogse" ? colors.udogse_color : colors.white_color,
              color: selectedMagazine === "udogse" ? colors.white_color : colors.black_color,
              border: selectedMagazine === "udogse" ? "none" : "2px solid black"
            }}
            onClick={() => setSelectedMagazine("udogse")}
            aria-pressed={selectedMagazine === "udogse"}
            aria-label="Vis inspiration for Ud & Se magasin"
          >
            Ud & Se
          </button>
          <button
            className="px-4 py-2 rounded-full transition-colors cursor-pointer"
            style={{
              backgroundColor: selectedMagazine === "samvirke" ? colors.samvirke_color : colors.white_color,
              color: selectedMagazine === "samvirke" ? colors.white_color : "#FF0000",
              border: selectedMagazine === "samvirke" ? "none" : "2px solid #FF0000"
            }}              
            onClick={() => setSelectedMagazine("samvirke")}
            aria-pressed={selectedMagazine === "samvirke"}
            aria-label="Vis inspiration for Samvirke magasin"
          >
            Samvirke
          </button>
        </div>
      </div>

      {/* Inspirations-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAds.map((ad, index) => (
          <div 
            key={ad.id} 
            className="relative overflow-hidden rounded-lg shadow-md group h-64 cursor-pointer"
            aria-labelledby={`ad-title-${ad.id}`}
            onClick={() => openModal(index)}
          >
            <div className="relative w-full h-full">
              <Image
                src={ad.image}
                alt={`Annonceinspiration: ${ad.title}`}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay ved hover */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                style={{ 
                  backgroundColor: selectedMagazine === "samvirke" 
                    ? "rgba(255, 0, 0, 0.7)" 
                    : "rgba(0, 0, 0, 0.7)" 
                }}
              >
                <h3 
                  id={`ad-title-${ad.id}`}
                  className="text-xl font-bold text-white mb-1"
                >
                  {ad.title}
                </h3>
                <p className="text-sm text-white">
                  {ad.description}
                </p>
              </div>
            </div>
            
            {/* Magasine indikator mærke */}
            <div 
              className="absolute top-2 right-2 px-2 py-1 text-xs rounded"
              style={{ 
                backgroundColor: ad.magazine === "udogse" 
                  ? colors.udogse_color 
                  : (ad.magazine === "samvirke" ? colors.samvirke_color : "#6B7280"),
                color: colors.white_color
              }}
            >
              {ad.magazine === "both" 
                ? "Begge magasiner" 
                : (ad.magazine === "udogse" ? "Ud & Se" : "Samvirke")}
            </div>
          </div>
        ))}
      </div>
      
      {/* CTA */}
      <div className="text-center mt-8">
        <p className="text-md mb-4">Bliv inspireret og skab din egen kreative annonce i dag.</p>
        <Link href="#home"
         className="px-8 py-3 bg-black hover:bg-red-500 text-white border rounded-full font-medium transition-colors cursor-pointer"
         >
          Start din annonce nu
        </Link>
      </div>

      {/* Overlay Modal */}
      {modalOpen && filteredAds.length > 0 && (
        <ImageModal 
          isOpen={modalOpen}
          onClose={closeModal}
          currentAd={filteredAds[currentAdIndex]}
          allAds={filteredAds}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      )}
    </div>
  );
}