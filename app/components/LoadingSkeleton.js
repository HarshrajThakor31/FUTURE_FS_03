export function CharacterCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden animate-pulse">
      <div className="h-80 bg-gray-700"></div>
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function CharacterDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6 py-16">
        <div className="h-6 bg-gray-700 rounded w-32 mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-[3/4] bg-gray-700 rounded-2xl animate-pulse"></div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
              <div className="h-12 bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-1 bg-gray-700 rounded w-32 animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-4/5 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}