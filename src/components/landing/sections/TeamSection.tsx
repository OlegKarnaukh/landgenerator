interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  social?: {
    telegram?: string;
    vk?: string;
    email?: string;
  };
}

interface TeamData {
  title?: string;
  subtitle?: string;
  members: TeamMember[];
  variant?: 'grid' | 'cards' | 'compact';
}

export function TeamSection({ data }: { data: TeamData }) {
  const variant = data.variant || 'grid';
  const members = data.members || [];

  return (
    <section className="py-20 md:py-28 bg-white">
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

        {variant === 'compact' ? (
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            {members.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mx-auto mb-3">
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        ) : variant === 'cards' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {members.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mx-auto mb-4">
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                {member.bio && <p className="text-gray-600 text-sm">{member.bio}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {members.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-40 h-40 rounded-2xl overflow-hidden bg-gray-200 mx-auto mb-4 group-hover:shadow-xl transition-shadow">
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-gray-400">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
                {member.bio && <p className="text-gray-600 text-sm mt-2 max-w-xs mx-auto">{member.bio}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
