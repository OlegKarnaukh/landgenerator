'use client';

const GALLERY_IMAGES: Record<string, string[]> = {
  restaurant: [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    'https://images.unsplash.com/photo-1482049016gy-b0f71c7e-d7e3-4?w=600&q=80',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
  ],
  beauty: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    'https://images.unsplash.com/photo-1487412947147-5cebf1001294?w=600&q=80',
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  ],
  fitness: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
  ],
};

interface GalleryData {
  title?: string;
  subtitle?: string;
  category?: string;
  images?: string[];
}

export function LifestyleGallerySection({ data }: { data: GalleryData }) {
  const category = data.category || 'default';
  const images = data.images?.length ? data.images : (GALLERY_IMAGES[category] || GALLERY_IMAGES.default);

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(data.title || data.subtitle) && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            {data.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="text-lg text-stone-600">{data.subtitle}</p>
            )}
          </div>
        )}

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.slice(0, 6).map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid overflow-hidden rounded-xl group cursor-pointer"
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ height: index % 3 === 0 ? '400px' : '300px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
