export default function Team() {
  const team = [
    {
      name: "김지은",
      role: "크리에이티브 디렉터",
      icon: "🎨",
    },
    {
      name: "이준호",
      role: "개발 리드",
      icon: "💻",
    },
    {
      name: "박민지",
      role: "UX 디자이너",
      icon: "✨",
    },
    {
      name: "최준영",
      role: "전략 리드",
      icon: "📊",
    },
  ]

  return (
    <section id="insights" className="py-20 bg-black text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              팀 소개
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            뛰어난 디지털 경험을 만드는 데 헌신하는 재능 있는 전문가들입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div 
              key={member.name} 
              className="group relative text-center p-6 bg-gray-800/50 border border-white/20 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-3xl">
                  {member.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  {member.role}
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
