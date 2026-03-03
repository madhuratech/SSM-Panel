function QuantitySelector({ quantity, onChange, min = 0, max = 100000 }) {
  const presets = [1000, 5000, 10000, 25000, 50000]

  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 0
    if (value >= min && value <= max) {
      onChange(value)
    }
  }

  const handleBlur = (e) => {
    const value = parseInt(e.target.value) || 0
    if (value < min) {
      onChange(min)
    } else if (value > max) {
      onChange(max)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity (Min: {min.toLocaleString()}, Max: {max.toLocaleString()})
        </label>
        <input
          type="number"
          value={quantity}
          onChange={handleChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none transition-colors"
          placeholder={`Enter quantity (${min} - ${max.toLocaleString()})`}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-600 w-full mb-1">Quick Select:</span>
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              quantity === preset
                ? 'border-primary-600 bg-primary-50 text-primary-600 font-semibold'
                : 'border-gray-300 hover:border-primary-300 text-gray-700'
            }`}
          >
            {preset.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuantitySelector
