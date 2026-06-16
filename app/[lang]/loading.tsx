export default function Loading() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="animate-pulse space-y-12">
        {/* Hero Skeleton */}
        <div className="h-64 bg-brand-surface rounded-[40px]" />
        
        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-brand-surface rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
