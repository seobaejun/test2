export default function Services() {
  const services = [
    {
      number: "01",
      title: "웹 디자인",
      description: "고객을 매료시키고 충성도 높은 고객으로 전환하는 아름답고 반응형 디자인.",
    },
    {
      number: "02",
      title: "웹 개발",
      description: "최신 기술과 모범 사례로 구축한 견고하고 확장 가능한 웹 애플리케이션.",
    },
    {
      number: "03",
      title: "디지털 전략",
      description: "디지털 존재감을 비즈니스 목표와 일치시키는 전략 계획 및 컨설팅.",
    },
    {
      number: "04",
      title: "브랜드 아이덴티티",
      description: "강력하고 기억에 남는 시장 입지를 확립하는 포괄적인 브랜딩 솔루션.",
    },
  ]

  return (
    <section id="story" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">우리의 서비스</h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
          창의성, 전략, 기술을 결합하여 뛰어난 결과를 제공합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.number}
              className="p-8 bg-card border border-border rounded-lg hover:shadow-lg transition"
            >
              <div className="text-5xl font-bold text-primary mb-4">{service.number}</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
