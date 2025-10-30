export default function Services() {
  const services = [
    {
      number: "01",
      title: "웹 디자인",
      description: "고객을 매료시키고 충성도 높은 고객으로 전환하는 아름답고 반응형 디자인.",
      icon: "🎨",
    },
    {
      number: "02",
      title: "웹 개발",
      description: "최신 기술과 모범 사례로 구축한 견고하고 확장 가능한 웹 애플리케이션.",
      icon: "💻",
    },
    {
      number: "03",
      title: "디지털 전략",
      description: "디지털 존재감을 비즈니스 목표와 일치시키는 전략 계획 및 컨설팅.",
      icon: "📊",
    },
    {
      number: "04",
      title: "브랜드 아이덴티티",
      description: "강력하고 기억에 남는 시장 입지를 확립하는 포괄적인 브랜딩 솔루션.",
      icon: "🎯",
    },
  ]

  return (
    <section id="story" className="py-20 bg-black text-white overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              우리의 서비스
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            창의성, 전략, 기술을 결합하여 뛰어난 결과를 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.number}
              className="group relative p-8 bg-gray-800 border-2 border-gray-600 rounded-lg hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                    {service.icon}
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {service.number}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {service.description}
                </p>
              </div>

              {/* Floating elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
