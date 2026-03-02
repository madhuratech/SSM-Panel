function ServiceCard({ service, isSelected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(service.id)}
      className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 ${
        isSelected
          ? 'border-primary-600 bg-primary-50 shadow-lg'
          : 'border-gray-200 hover:border-primary-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-3xl">{service.icon}</div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{service.name}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        </div>
        
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          isSelected ? 'border-primary-600 bg-primary-600' : 'border-gray-300'
        }`}>
          {isSelected && (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </button>
  )
}

export default ServiceCard
