function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = ''
}) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 ease-in-out'
  
  const variants = {
    primary: 'gradient-primary text-white hover:shadow-lg hover:scale-105',
    secondary: 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-primary-600 hover:text-primary-600'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const widthClass = fullWidth ? 'w-full' : ''
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''
  
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
