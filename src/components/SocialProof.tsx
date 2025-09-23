const SocialProof = () => {
  const agencies = [
    { name: 'CreativeStudio', logo: '🎨' },
    { name: 'DesignHub', logo: '🚀' },
    { name: 'BrandCraft', logo: '⭐' },
    { name: 'PixelForge', logo: '🔥' },
    { name: 'ArtisanCo', logo: '💎' },
    { name: 'VisionLab', logo: '🎯' },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <p className="text-muted-foreground font-medium">
            Trusted by 500+ creative agencies worldwide
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {agencies.map((agency, index) => (
              <div 
                key={agency.name}
                className="flex flex-col items-center space-y-2 transition-all duration-300 hover:scale-110 opacity-60 hover:opacity-100 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl">{agency.logo}</div>
                <span className="text-sm font-medium text-muted-foreground">{agency.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;