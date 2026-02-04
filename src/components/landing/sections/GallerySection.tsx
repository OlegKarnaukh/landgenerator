'use client';

interface GalleryItem {
  imageUrl?: string;
  imageKeyword?: string;
  title?: string;
  description?: string;
  category?: string;
}

interface GalleryData {
  title?: string;
  subtitle?: string;
  items: GalleryItem[];
  variant?: 'grid' | 'masonry' | 'carousel';
  category?: string; // For default images
}

// Curated gallery images by category
const GALLERY_IMAGES: Record<string, string[]> = {
  auto: [
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop',
  ],
  beauty: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=400&fit=crop',
  ],
  restaurant: [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop',
  ],
  fitness: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&h=400&fit=crop',
  ],
  photography: [
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1554080353-a576cf803bda?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&h=400&fit=crop',
  ],
  realestate: [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop',
  ],
  default: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&h=400&fit=crop',
  ],
};

function getGalleryImage(index: number, category?: string): string {
  const cat = category?.toLowerCase() || 'default';
  for (const [key, images] of Object.entries(GALLERY_IMAGES)) {
    if (cat.includes(key)) {
      return images[index % images.length];
    }
  }
  return GALLERY_IMAGES.default[index % GALLERY_IMAGES.default.length];
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
            {items.map((item, index) => {
              const imageUrl = item.imageUrl || getGalleryImage(index, item.imageKeyword || data.category);
              return (
                <div key={index} className="mb-4 break-inside-avoid">
                  <div className="group relative overflow-hidden rounded-xl bg-gray-200">
                    <img
                      src={imageUrl}
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
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {items.map((item, index) => {
              const imageUrl = item.imageUrl || getGalleryImage(index, item.imageKeyword || data.category);
              return (
                <div key={index} className="group relative overflow-hidden rounded-xl bg-gray-200 aspect-[4/3]">
                  <img
                    src={imageUrl}
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
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
