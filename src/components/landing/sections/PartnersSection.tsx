interface Partner {
  name: string;
  logoUrl?: string;
}

interface PartnersData {
  title?: string;
  subtitle?: string;
  partners: Partner[];
  variant?: 'logos' | 'cards' | 'marquee';
}

export function PartnersSection({ data }: { data: PartnersData }) {
  const variant = data.variant || 'logos';
  const partners = data.partners || [];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-12">
            {data.title && (
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {data.subtitle}
              </p>
            )}
          </div>
        )}

        {variant === 'cards' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-24 hover:shadow-md transition-shadow"
              >
                {partner.logoUrl ? (
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all"
                  />
                ) : (
                  <span className="text-lg font-semibold text-gray-400">{partner.name}</span>
                )}
              </div>
            ))}
          </div>
        ) : variant === 'marquee' ? (
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee space-x-12">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 h-16 px-8 flex items-center justify-center"
                >
                  {partner.logoUrl ? (
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="max-h-10 object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all"
                    />
                  ) : (
                    <span className="text-xl font-semibold text-gray-300 whitespace-nowrap">{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-5xl mx-auto">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="h-12 flex items-center justify-center"
              >
                {partner.logoUrl ? (
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-h-10 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
                  />
                ) : (
                  <span className="text-xl font-semibold text-gray-400 hover:text-gray-600 transition-colors">{partner.name}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
