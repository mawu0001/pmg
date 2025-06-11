import Image from "next/image";
import Button from "./components/Button";

export default function Home() {
  return (
    <>
      <section className="relative h-96 w-full">
        <Image
          src="/images/homepage-indhold/hero-img.webp"
          alt="Eksempel på magasinannonce"
          fill
          className="object-cover"
          priority
        />
        <article className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-2 place-items-center">
          <h1 className="text-4xl font-medium text-white uppercase">
            PMG
            <span className="underline decoration-red-600 "> ad Previewer</span>
          </h1>
          <p className="text-sm mb-2 font-medium text-white">
            Få et realistisk preview af, hvordan din annonce vil tage sig ud i
            et magasin, før du booker annonceplads. Med vores nye værktøj kan du
            nemt uploade dit materiale, placere det i et virkelighedstro
            magasinlayout og sikre, at dit budskab står skarpt – hver gang. Slip
            for gætterier og få fuld tryghed i din annoncering.
          </p>
          <Button title="Previewer" link="Tool" />
        </article>
      </section>
      <section className="bg-black h-96 w-full flex items-center justify-center gap-8 px-4">
        <article className="max-w-md text-white">
          <h2 className="text-2xl font-bold uppercase mb-4">Inspiration</h2>
          <p className="text-sm font-medium mb-6">
            Få inspiration – se hvordan andre har annonceret.
          </p>
          <Button title="Se mere her" link="Inspiration" />
        </article>
        <Image
          src="/images/homepage-indhold/inspiration.webp"
          alt="Eksempel på magasinannonce"
          height={200}
          width={300}
          className="object-cover"
          priority
        />
      </section>
      <section className="bg-white h-96 w-full flex items-center justify-center gap-8 px-4">
        <article className="max-w-md text-black order-2">
          <h2 className="text-2xl font-bold uppercase mb-4">Kontakt os</h2>
          <p className="text-sm font-medium mb-6">
            Har du spørgsmål? Kontakt os – vi hjælper dig gerne videre.
          </p>
          <Button title="Se mere her" link="Contact" />
        </article>
        <Image
          src="/images/homepage-indhold/contact.webp"
          alt="Eksempel på magasinannonce"
          height={200}
          width={300}
          className="object-cover"
          priority
        />
      </section>
    </>
  );
}
