'use client';
import Image from 'next/image';

const heroImages = [
  '/images/monteerly/monteerly16editorarabthobecollaboration.png',
  '/images/monteerly/monteerly21photographersaudiheritagetraditional.png',
  '/images/monteerly/monteerly22photographeralgeriandroneaerial.png',
  '/images/monteerly/monteerly23photographerlibraryheritagecinematic.png',
  '/images/monteerly/monteerly24photographeralgeriandronecityshot.png',
  '/images/monteerly/monteerly14editorprofessionaldualscreen.png',
  '/images/monteerly/monteerly12editorredshirttimeline.png',
  '/images/monteerly/monteerly10multiplatformpublishinghero.png',
  '/images/monteerly/monteerly13analyticsdashboardwomanai.png',
  '/images/monteerly/monteerly15creatorworkspacelaptopmodern.png',
  '/images/monteerly/monteerly07techinnovationportrait.png',
  '/images/monteerly/monteerly08brandingcreativeassets.png',
  '/images/monteerly/monteerly05securitydigitallockcyber.png',
  '/images/monteerly/monteerly04heroheadermarketingbanner.png',
  '/images/monteerly/monteerly20testimonialbusinessexeccorporate.png',
  '/images/monteerly/monteerly18testimonialexecutivegrowthcharts.png',
  '/images/monteerly/monteerly17testimonialwomangraysuitoffice.png',
  '/images/monteerly/monteerly19testimonialcreativehoodiefreelance.png',
  '/images/monteerly/monteerly11globalcollaborationgrid4up.png',
  '/images/monteerly/monteerly09aiperformanceadvisorhologram.png',
  '/images/monteerly/monteerly06marketingshowcasefull.png',
  '/images/monteerly/monteerly03profileahmedgamalcircle.png',
  '/images/monteerly/monteerly02mainlogofull.svg',
  '/images/monteerly/monteerly01faviconappicon.png'
];

export default function HeroGallery() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
      {heroImages.map((src, i) => (
        <div key={i} className="group relative aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
          <Image 
            src={src} 
            alt={`Monteerly Studio ${i+1}`} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <span className="bg-white/20 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold">
              صورة {i+1}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
