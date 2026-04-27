export function SkeletonCard() {
  return (
    <div className="space-y-4 py-2">
      <div className="skeleton h-8 w-8 rounded" />
      <div className="skeleton h-4 w-40" />
      <div className="skeleton h-3 w-full" />
      <div className="skeleton h-3 w-3/4" />
    </div>
  )
}
export function SkeletonTable() {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-4">
      <div className="skeleton h-4 w-28" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="skeleton h-8 w-8 rounded-full shrink-0" />
          <div className="skeleton h-3 flex-1" />
          <div className="skeleton h-3 w-14" />
        </div>
      ))}
    </div>
  )
}
export function SkeletonChart() {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-6">
      <div className="skeleton h-4 w-28 mb-4" />
      <div className="skeleton h-44 w-full rounded" />
    </div>
  )
}
