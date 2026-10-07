export default function DashboardLoading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-28 rounded-2xl bg-slate-900/60 border border-slate-800/60 p-6 flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-6 w-64 bg-slate-800 rounded-lg" />
          <div className="h-4 w-96 bg-slate-800/60 rounded" />
        </div>
        <div className="hidden sm:flex gap-3">
          <div className="h-10 w-28 bg-slate-800 rounded-xl" />
          <div className="h-10 w-32 bg-slate-800 rounded-xl" />
        </div>
      </div>

      {/* KPI Cards Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-2xl bg-slate-900/40 border border-slate-800/60 p-5 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-slate-800 rounded" />
              <div className="w-8 h-8 rounded-lg bg-slate-800/80" />
            </div>
            <div className="space-y-2">
              <div className="h-7 w-32 bg-slate-800 rounded-lg" />
              <div className="h-3 w-20 bg-slate-800/50 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-96 rounded-2xl bg-slate-900/40 border border-slate-800/60 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-5 w-40 bg-slate-800 rounded" />
            <div className="h-8 w-24 bg-slate-800 rounded-lg" />
          </div>
          <div className="h-72 w-full bg-slate-800/30 rounded-xl" />
        </div>
        <div className="h-96 rounded-2xl bg-slate-900/40 border border-slate-800/60 p-6 space-y-4">
          <div className="h-5 w-32 bg-slate-800 rounded" />
          <div className="space-y-3 pt-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-slate-800/30 p-3" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
