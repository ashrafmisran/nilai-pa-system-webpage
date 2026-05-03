import { useMemo, useState } from "react";

export default function PASystemRentalWebsite() { const [showMore, setShowMore] = useState(false); const [isSubmitting, setIsSubmitting] = useState(false); const [isSent, setIsSent] = useState(false);

const [bookingForm, setBookingForm] = useState({ nama: "", telefon: "", alamatProgram: "", pakej: "Sewaan Portable Speaker", addon: [], tarikhMula: "", tarikhAkhir: "", });

const addOnServices = [ { title: "Pengacara Majlis", icon: "🎤", subtitle: "Add-on event service", }, { title: "Kameraman", icon: "📷", subtitle: "Photo coverage", }, { title: "Videographer", icon: "🎬", subtitle: "Video production", }, { title: "Sewaan Khemah", icon: "⛺", subtitle: "Canopy & event tent", }, ];

const packageOptions = [ "Sewaan Portable Speaker", "Sewaan Professional PA System Package", "Professional PA System Full Package with Technician", ];

const coverageAreas = [ "Nilai", "Bangi", "Kajang", "Seremban", "Sepang", "Putrajaya", "Dengkil", "Senawang", ];

const handleAddonChange = (service) => { setBookingForm((prev) => { const exists = prev.addon.includes(service);

return {
    ...prev,
    addon: exists
      ? prev.addon.filter((item) => item !== service)
      : [...prev.addon, service],
  };
});

};

const whatsappMessage = useMemo(() => { const addonText = bookingForm.addon.length > 0 ? bookingForm.addon.join(", ") : "Tiada";

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  bookingForm.alamatProgram
)}`;

return encodeURIComponent(
  `Assalamualaikum, saya ingin membuat pertanyaan tempahan PA System.\n\n` +
    `Nama: ${bookingForm.nama}\n` +
    `No Telefon: ${bookingForm.telefon}\n` +
    `Alamat Program: ${bookingForm.alamatProgram}\n` +
    `Google Maps: ${mapsLink}\n` +
    `Pakej: ${bookingForm.pakej}\n` +
    `Perkhidmatan tambahan: ${addonText}\n` +
    `Tarikh Mula Program: ${bookingForm.tarikhMula}\n` +
    `Tarikh Akhir Program: ${bookingForm.tarikhAkhir}`
);

}, [bookingForm]);

const handleSubmitBooking = async () => { try { setIsSubmitting(true);

await fetch(
    "https://script.google.com/macros/s/1Hx-NKNgf3C5xOOX0XOELhKZAktTdPlPc1VQyorABoI-umV-FKElA12Q6/exec",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...bookingForm,
        addon: bookingForm.addon.join(", "),
      }),
    }
  );

  setIsSent(true);

  setTimeout(() => {
    window.location.href = `https://wa.me/60145102864?text=${whatsappMessage}`;
  }, 1200);
} catch (error) {
  alert("Gagal menghantar tempahan. Sila cuba semula.");
} finally {
  setIsSubmitting(false);
}

};

return ( <div className="min-h-screen bg-white text-gray-800"> <section className="bg-black text-white py-20 px-6"> <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"> <div> <h1 className="text-5xl font-bold leading-tight mb-6"> Sewa PA System <span className="block text-yellow-400"> Nilai • Bangi • Seremban • Sepang </span> </h1>

<p className="text-lg text-gray-300 mb-8">
          Servis sewaan portable speaker dan professional sound system untuk majlis kahwin, seminar, ceramah, sekolah dan event korporat.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#booking-form"
            className="bg-yellow-400 text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
          >
            Hantar pertanyaan / tempahan
          </a>

          <a
            href="#packages"
            className="border border-white px-6 py-3 rounded-2xl hover:bg-white hover:text-black transition"
          >
            Lihat Pakej
          </a>
        </div>
      </div>

      <div>
        <img
          src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop"
          alt="PA System"
          className="rounded-3xl shadow-2xl"
        />
      </div>
    </div>
  </section>

  <section id="packages" className="py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">
        Pakej Sewaan
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="border rounded-3xl p-8 shadow-sm hover:shadow-xl transition">
          <h3 className="text-2xl font-bold mb-4">
            Sewaan Portable Speaker
          </h3>

          <p className="text-gray-600 mb-6">
            Sesuai untuk meeting, kelas dan small event.
          </p>

          <div className="text-4xl font-bold mb-2">RM100</div>

          <div className="inline-block bg-green-100 text-green-700 text-sm px-4 py-2 rounded-full mb-6 font-medium">
            🚚 Penghantaran percuma sekitar Nilai
          </div>
        </div>

        <div className="border-2 border-yellow-400 rounded-3xl p-8 shadow-xl relative">
          <div className="absolute top-0 right-0 bg-yellow-400 text-black px-4 py-1 rounded-bl-2xl rounded-tr-3xl text-sm font-semibold">
            Popular
          </div>

          <h3 className="text-2xl font-bold mb-4">
            Sewaan Professional PA System Package
          </h3>

          <p className="text-gray-600 mb-6">
            Sesuai untuk dewan, seminar dan majlis sekolah.
          </p>

          <div className="text-4xl font-bold mb-2">RM800</div>

          <div className="inline-block bg-green-100 text-green-700 text-sm px-4 py-2 rounded-full mb-6 font-medium">
            🚚 Penghantaran percuma sekitar Nilai
          </div>
        </div>

        <div className="border rounded-3xl p-8 shadow-sm hover:shadow-xl transition bg-black text-white">
          <h3 className="text-2xl font-bold mb-4 leading-snug">
            Professional PA System Full Package
          </h3>

          <div className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-xl mb-4 text-sm font-semibold">
            with Technician
          </div>

          <p className="text-gray-300 mb-6">
            Untuk event besar, outdoor dan majlis professional.
          </p>

          <div className="text-4xl font-bold mb-6 text-yellow-400">
            RM1500
          </div>

          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="w-full border border-yellow-400 text-yellow-400 py-3 rounded-2xl mb-4 hover:bg-yellow-400 hover:text-black transition"
          >
            {showMore ? "Hide Details" : "See More"}
          </button>

          {showMore && (
            <div className="bg-white/10 rounded-2xl p-5 mb-6 space-y-4">
              <h4 className="font-semibold text-yellow-400 mb-2">
                Equipment & Support
              </h4>

              <ul className="space-y-2 text-gray-200 text-sm">
                <li>• JBL & Behringer professional speaker</li>
                <li>• Wireless handheld & headset microphone</li>
                <li>• Yamaha professional mixer</li>
                <li>• Audio monitoring headphone</li>
                <li>• Professional audio cabling & stand</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>

  <section className="py-20 px-6 bg-gray-50">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6">
        Saya juga sedang mencari perkhidmatan ini
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {addOnServices.map((service, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleAddonChange(service.title)}
            className={`rounded-3xl p-6 shadow-lg transition text-left ${
              bookingForm.addon.includes(service.title)
                ? "bg-yellow-100 border-2 border-yellow-400"
                : "bg-white hover:shadow-2xl"
            }`}
          >
            <div className="text-5xl mb-4">{service.icon}</div>

            <h3 className="font-semibold text-lg mb-2">
              {service.title}
            </h3>

            <p className="text-sm text-gray-500">
              {service.subtitle}
            </p>
          </button>
        ))}
      </div>
    </div>
  </section>

  <section id="booking-form" className="py-20 px-6 bg-white">
    <div className="max-w-5xl mx-auto">
      <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-200">
        <div className="text-center mb-12">
          <div className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Tempahan Online
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Borang Pertanyaan Tempahan PA System
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih pakej dan nyatakan keperluan tambahan sebelum dihantar ke WhatsApp.
          </p>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-bold mb-6">
            Pilihan Pakej PA System
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {packageOptions.map((item) => {
              const selected = bookingForm.pakej === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setBookingForm({
                      ...bookingForm,
                      pakej: item,
                    })
                  }
                  className={`text-left rounded-3xl p-6 border-2 transition-all ${
                    selected
                      ? "border-yellow-400 bg-yellow-50 shadow-xl scale-[1.02]"
                      : "border-gray-200 bg-white hover:border-yellow-300"
                  }`}
                >
                  <div className="text-lg font-bold mb-3">{item}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            placeholder="Nama penuh"
            value={bookingForm.nama}
            onChange={(e) =>
              setBookingForm({
                ...bookingForm,
                nama: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-2xl px-4 py-4 bg-white"
          />

          <input
            type="text"
            placeholder="01X-XXXXXXX"
            value={bookingForm.telefon}
            onChange={(e) =>
              setBookingForm({
                ...bookingForm,
                telefon: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-2xl px-4 py-4 bg-white"
          />
        </div>

        <div className="mb-10">
          <input
            type="text"
            placeholder="Alamat tempat program"
            value={bookingForm.alamatProgram}
            onChange={(e) =>
              setBookingForm({
                ...bookingForm,
                alamatProgram: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-2xl px-4 py-4 bg-white"
          />
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-bold mb-6">
            Saya juga sedang mencari perkhidmatan ini
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {addOnServices.map((service, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleAddonChange(service.title)}
                className={`rounded-3xl p-5 border-2 transition text-left ${
                  bookingForm.addon.includes(service.title)
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-200 bg-white hover:border-yellow-300"
                }`}
              >
                <div className="text-4xl mb-3">{service.icon}</div>

                <div className="font-bold text-lg mb-1">
                  {service.title}
                </div>

                <div className="text-sm text-gray-500">
                  {service.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <input
            type="date"
            value={bookingForm.tarikhMula}
            onChange={(e) =>
              setBookingForm({
                ...bookingForm,
                tarikhMula: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-2xl px-4 py-4 bg-white"
          />

          <input
            type="date"
            value={bookingForm.tarikhAkhir}
            onChange={(e) =>
              setBookingForm({
                ...bookingForm,
                tarikhAkhir: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-2xl px-4 py-4 bg-white"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmitBooking}
          disabled={isSubmitting}
          className={`block w-full text-center py-5 rounded-2xl text-xl font-bold transition disabled:opacity-50 ${
            isSent
              ? "bg-green-600 text-white"
              : "bg-black text-white hover:scale-[1.01]"
          }`}
        >
          {isSubmitting
            ? "Menghantar pertanyaan..."
            : isSent
            ? "Redirecting to WhatsApp..."
            : "Hantar Pertanyaan / Tempahan"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Tempahan akan dihantar ke WhatsApp dan terus direkod ke Google Calendar admin.
        </p>
      </div>
    </div>
  </section>

  <footer className="bg-black text-white py-10 px-6">
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">
          Kelab Pemuda Sukarelawan Nilai
        </h3>

        <p className="text-gray-400">
          Servis sewaan portable speaker, PA system dan event support sekitar Nilai, Bangi, Seremban dan Sepang.
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Kawasan</h4>

        <ul className="space-y-2 text-gray-400">
          {coverageAreas.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Hubungi</h4>

        <ul className="space-y-2 text-gray-400">
          <li>0145102864</li>
          <li>WhatsApp tersedia</li>
        </ul>
      </div>
    </div>
  </footer>
</div>

); }
