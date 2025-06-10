"use client";
import Image from "next/image";

const Infobox = () => {
  return (
    <div className="relative flex items-center justify-center p-6 md:p-8">
      <div className="bg-white shadow-xl rounded-lg p-6 space-y-4 z-10 max-w-md">
        <h2 className="text-2xl font-bold text-black">Om annoncering</h2>
        <p className="text-sm text-black">
          Vi hjælper dig med at placere dine annoncer i magasiner som Ud & Se og
          Samvirke. Kontakt os for at høre mere om mulighederne.
          <br />
          <br />
          Du kan upload'e dine designs og filer, tjekke op på om det passer ind
          i magasinernes generelle udtryk, og kontakte os med spørgsmål. <br />
          <br />
          Vi kender magasinerne, og vi vil gerne kende dine ønsker.
        </p>
        <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden relative">
          <Image
            src="/images/contactform-pictures/samvirke-collage.jpeg"
            alt="Eksempel på magasinannonce"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Infobox;
