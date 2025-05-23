"use client";

import { useActionState } from "react";
import { actionSubmit } from "../api/actions";
import Image from "next/image";

function Newsletter() {
  const [state, formAction] = useActionState(actionSubmit);

  return (
    <div className="max-w-6xl mx-auto bg-white px-4 py-8">
      <div id="kontakt" className="grid md:grid-cols-2 gap-8 items-stretch">
        {/* Venstre box med kontaktformular */}
        <div className="bg-white">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-2 text-black">Kontakt os</h1>
            <p className="text-sm mb-4 font-medium text-black">
              Udfyld formularen for at indsende din forespørgsel om annonce-køb.
            </p>

            <form
              action={formAction}
              noValidate
              className="bg-black text-white p-6 md:p-8 rounded-lg space-y-6"
            >
              <div>
                <label htmlFor="name" className="block mb-2">
                  Navn
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Navn..."
                  defaultValue={state?.name}
                  className="w-full p-3 rounded text-black bg-white"
                  required
                />
                {state?.errors?.name && (
                  <p className="bg-red-100 text-red-950 mt-1 p-1 rounded">
                    {state.errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block mb-2">
                  Firma
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Firma..."
                  defaultValue={state?.company}
                  className="w-full p-3 rounded text-black bg-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email..."
                  defaultValue={state?.email}
                  className="w-full p-3 rounded text-black bg-white"
                  required
                />
                {state?.errors?.email && (
                  <p className="bg-red-100 text-red-950 mt-1 p-1 rounded">
                    {state.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="link" className="block mb-2">
                  Link til annonce-filer
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  placeholder="link til evt. drev, fillpacering m.v..."
                  defaultValue={state?.link}
                  className="w-full p-3 rounded text-black bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-3">
                  <label htmlFor="additional_info" className="block mb-2">
                    Andet
                  </label>
                  <textarea
                    id="additional_info"
                    name="additional_info"
                    placeholder="Evt. undren, spørgsmål eller lign."
                    defaultValue={state?.additional_info}
                    className="w-full p-3 rounded h-32 bg-white text-black"
                  ></textarea>
                </div>

                <div className="md:col-span-2 flex items-end">
                  <div className="w-full relative">
                    <label htmlFor="format" className="sr-only">
                      Format
                    </label>
                    <select
                      name="format"
                      defaultValue={state?.format || ""}
                      className="w-full p-3 rounded bg-black underline border-white text-white appearance-none pr-10 cursor-pointer"
                    >
                      <option value="" disabled>
                        Vælg format
                      </option>
                      <option value="quarter">Kvart side</option>
                      <option value="half">Halv side</option>
                      <option value="full">Fuld side</option>
                      <option value="spread">Double side eller mere</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-8 py-3 bg-black hover:bg-red-500 text-white border border-red-500 rounded-full font-medium hover:bg-opacity-90 transition-colors cursor-pointer"
                >
                  Indsend
                </button>
              </div>

              {state?.message && (
                <p className="text-center text-sm text-green-600">{state.message}</p>
              )}
            </form>
          </div>
        </div>

        {/* Højre box med info */}
        <div className="relative flex items-center justify-center p-6 md:p-8">

          <div className="bg-white shadow-xl rounded-lg p-6 space-y-4 z-10 max-w-md">
            <h2 className="text-2xl font-bold text-black">Om annoncering</h2>
            <p className="text-sm text-black">
              Vi hjælper dig med at placere dine annoncer i magasiner som Ud & Se og Samvirke.
              Kontakt os for at høre mere om mulighederne.
<br />
<br />
Du kan upload'e dine designs og filer, tjekke op på om det passer ind i magasinernes generelle udtryk, og kontakte os med spørgsmål. 
<br />
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
      </div>
    </div>
  );
}

export default Newsletter;
