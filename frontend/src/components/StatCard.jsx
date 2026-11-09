function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#141827] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">{title}</p>
        {Icon && <Icon className="text-purple-400" size={21} />}
      </div>

      <h3 className="mt-4 text-3xl font-bold text-white">
        {value}
      </h3>

      {description && (
        <p className="mt-2 text-xs text-gray-500">{description}</p>
      )}
    </div>
  )
}

export default StatCard