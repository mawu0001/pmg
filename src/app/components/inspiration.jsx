"use client";
import { useState } from "react";
import Image from "next/image";

// originalfarverne fra PMG
const colors = {
  red_color: "#FF0000",    // rød
  black_color: "#000000",  // sort
  white_color: "#FFFFFF",  // white
  udogse_color: "#000000", // Ud & Se sort
  samvirke_color: "#FF0000" // Samvirke rød
};

export default function AdInspirationGrid() {
  const [selectedMagazine, setSelectedMagazine] = useState("udogse");

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
            className="px-4 py-2 rounded-full transition-colors"
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
            className="px-4 py-2 rounded-full transition-colors"
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
        {filteredAds.map((ad) => (
          <div 
            key={ad.id} 
            className="relative overflow-hidden rounded-lg shadow-md group h-64"
            aria-labelledby={`ad-title-${ad.id}`}
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
        <button
         className="px-8 py-3 bg-black hover:bg-red-500 text-white border rounded-full font-medium transition-colors"
         >
          Start din annonce nu
        </button>
      </div>
    </div>
  );
}