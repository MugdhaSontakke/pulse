export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 space-y-4">
      <div className="skeleton h-12 w-12 rounded-xl" />
      <div className="skeleton h-5 w-3/4" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-5/6" />
      <div className="skeleton h-10 w-32 mt-2 rounded-xl" />
    </div>
  )
}

export function SkeletonTable() {
  return (
    <div className="bg-white rounded-2xl p-6 space-y-4">
      <div className="skeleton h-6 w-48 mb-4" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="skeleton h-10 w-10 rounded-full shrink-0" />
          <div className="skeleton h-4 flex-1" />
          <div className="skeleton h-4 w-20" />
          <div className="skeleton h-4 w-16" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="skeleton h-6 w-40 mb-4" />
      <div className="skeleton h-48 w-full rounded-xl" />
    </div>
  )
}
