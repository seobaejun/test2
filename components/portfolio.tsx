export default function Portfolio() {
  const projects = [
    {
      title: "전자상거래 플랫폼",
      category: "웹 개발",
      image: "/modern-ecommerce-interface.png",
    },
    {
      title: "SaaS 대시보드",
      category: "UI/UX 디자인",
      image: "/analytics-dashboard.png",
    },
    {
      title: "브랜드 리디자인",
      category: "브랜딩",
      image: "/modern-brand-identity.png",
    },
  ]

  return (
    <section id="work" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">주요 작업</h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
          최신 프로젝트를 살펴보고 아이디어를 현실로 만드는 방법을 확인하세요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4 h-64">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
              <p className="text-muted-foreground">{project.category}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition">
            모든 프로젝트 보기
          </button>
        </div>
      </div>
    </section>
  )
}
