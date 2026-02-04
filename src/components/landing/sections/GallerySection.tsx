'use client';

interface GalleryItem {
  imageUrl: string;
  title?: string;
  description?: string;
}

interface GalleryData {
  title?: string;
  subtitle?: string;
  items: GalleryItem[];
  variant?: 'grid' | 'masonry' | 'carousel';
}

export function GallerySection({ data }: { data: GalleryData }) {
  const variant = data.variant || 'grid';
  const items = data.items || [];

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-16">
            {data.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {data.subtitle}
              </p>
            )}
          </div>
        )}

        {variant === 'masonry' ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto">
            {items.map((item, index) => (
              <div key={index} className="mb-4 break-inside-avoid">
                <div className="group relative overflow-hidden rounded-xl bg-gray-200">
                  <img
                    src={item.imageUrl || `https://picsum.photos/seed/${index}/600/400`}
                    alt={item.title || `Gallery image ${index + 1}`}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {(item.title || item.description) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="text-white">
                        {item.title && <h3 className="font-semibold text-lg">{item.title}</h3>}
                        {item.description && <p className="text-sm text-gray-200 mt-1">{item.description}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {items.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl bg-gray-200 aspect-[4/3]">
                <img
                  src={item.imageUrl || `https://picsum.photos/seed/${index}/600/400`}
                  alt={item.title || `Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {(item.title || item.description) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      {item.title && <h3 className="font-semibold text-lg">{item.title}</h3>}
                      {item.description && <p className="text-sm text-gray-200 mt-1">{item.description}</p>}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
