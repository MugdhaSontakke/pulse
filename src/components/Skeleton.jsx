export function SkeletonCard() {
  return (
    <div className="border border-gray-100 rounded-xl p-8 space-y-4">
      <div className="skeleton h-10 w-10 rounded-lg" />
      <div className="skeleton h-5 w-2/3" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-4/5" />
    </div>
  )
}
export function SkeletonTable() {
  return (
    <div className="border border-gray-100 rounded-xl p-6 space-y-4">
      <div className="skeleton h-5 w-32" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="skeleton h-8 w-8 rounded-full shrink-0" />
          <div className="skeleton h-4 flex-1" />
          <div className="skeleton h-4 w-16" />
        </div>
      ))}
    </div>
  )
}
export function SkeletonChart() {
  return (
    <div className="border border-gray-100 rounded-xl p-6">
      <div className="skeleton h-5 w-32 mb-4" />
      <div className="skeleton h-44 w-full rounded-lg" />
    </div>
  )
}
