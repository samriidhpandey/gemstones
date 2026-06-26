import { prisma } from '@/lib/prisma';
import { Film, PlayCircle } from 'lucide-react';
import AddToCartButton from '@/components/Cart/AddToCartButton';

export default async function CollectionsPage() {
  const items = await prisma.collectionItem.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      
      {/* Page Header */}
      <div className="pt-12 pb-16 px-6 text-center">
        <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-primary drop-shadow-xl mb-6">
          THE LUXURY COLLECTION
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore our exclusive catalog of rare gemstones. Unparalleled clarity, exceptional cut, and mesmerizing color.
        </p>
      </div>

      {/* Catalog Grid */}
      <main className="flex-1 container mx-auto px-6 pb-32">
        {items.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <h2 className="text-2xl font-serif text-white mb-4">No Collections Yet</h2>
            <p>Admin panel se gemstones add karein to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {items.map((item) => (
              <div key={item.id} className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-primary/50 hover:shadow-primary/20">
                
                {/* Media Container (Video or Image) */}
                <div className="relative aspect-[4/5] overflow-hidden bg-black/50">
                  {item.video ? (
                    <video 
                      src={item.video} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  
                  {/* Video Indicator Badge */}
                  {item.video && (
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                      <PlayCircle size={14} className="text-primary" />
                      <span className="text-xs text-white font-medium tracking-widest">VIDEO</span>
                    </div>
                  )}

                  {/* Price Tag Overlay */}
                  <div className="absolute top-4 right-4 bg-primary text-black font-bold px-4 py-2 rounded-full shadow-lg">
                    {item.price}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-8">
                  <h2 className="font-serif text-3xl font-bold text-white mb-3">{item.name}</h2>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-8 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <AddToCartButton item={{
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    quantity: 1
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
