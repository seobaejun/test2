export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-background to-background overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
          몰입형 디지털 경험
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          혁신적인 웹 솔루션으로 브랜드를 변화시키고 최첨단 디자인과 기술로 고객을 매료시킵니다.
        </p>
        <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition">
          프로젝트 시작하기
        </button>
      </div>
    </section>
  )
}
