"use client";
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    link: '',
    message: '',
    format: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you would normally send the data to a server
    alert('Form submitted successfully!');
  };

  return (
    <div className="max-w-xl mx-auto bg-white">
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-2 text-black">Kontakt os</h1>
        <p className="text-sm mb-4 font-medium text-black">Udfyld formularen for at indsende din forespørgsel om annonce-køb.</p>
        
        <div className="space-y-6">
          <div className="bg-black text-white p-6 md:p-8 rounded-md">
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2">
                Navn
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Børge Hansen..."
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded text-black bg-white"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="company" className="block mb-2">
                Firma
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder='Arbejdsgiver...'
                value={formData.company}
                onChange={handleChange}
                className="w-full p-3 rounded text-black bg-white"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='børge@piccolomediagroup.dk'
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded text-black bg-white"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="link" className="block mb-2">
                Link til annonce-filer
              </label>
              <input
                type="url"
                id="link"
                name="link"
                placeholder='F.eks. link til Google Drive, WeTransfer m.v.'
                value={formData.link}
                onChange={handleChange}
                className="w-full p-3 rounded text-black bg-white"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="md:col-span-3">
                <label htmlFor="message" className="block mb-2">
                  Andet
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder='Evt. undren, spørgsmål eller lign.'
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 rounded h-32 bg-white text-black"
                ></textarea>
              </div>
              
              <div className="md:col-span-2 flex items-end">
                <div className="w-full">
                  <div className="relative">
                    <select
                      name="format"
                      value={formData.format}
                      onChange={handleChange}
                      className="w-full p-3 rounded bg-black border border-gray-600 text-white appearance-none pr-10"
                    >
                      <option value="" disabled>Vælg format</option>
                      <option value="quarter">Kvart side</option>
                      <option value="half">Halv side</option>
                      <option value="full">Fuld side</option>
                      <option value="spread">Double side eller mere</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-black hover:bg-red-500 text-white border border-red-500 rounded-full font-medium hover:bg-opacity-90 transition-colors"
              >
                Indsend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}