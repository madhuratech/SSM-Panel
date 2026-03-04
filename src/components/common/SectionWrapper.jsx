function SectionWrapper({ 
  children, 
  className = '',
  background = 'white',
  id
}) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-primary-50 to-accent-50'
  }
  
  return (
    <section id={id} className={`py-16 md:py-24 ${backgrounds[background]} ${className} relative`}>
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {children}
      </div>
    </section>
  )
}

export default SectionWrapper
