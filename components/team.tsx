export default function Team() {
  const team = [
    {
      name: "김지은",
      role: "크리에이티브 디렉터",
      image: "/professional-woman-headshot.png",
    },
    {
      name: "이준호",
      role: "개발 리드",
      image: "/professional-man-headshot.png",
    },
    {
      name: "박민지",
      role: "UX 디자이너",
      image: "/professional-woman-headshot.png",
    },
    {
      name: "최준영",
      role: "전략 리드",
      image: "/professional-man-headshot.png",
    },
  ]

  return (
    <section id="insights" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">팀 소개</h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
          뛰어난 디지털 경험을 만드는 데 헌신하는 재능 있는 전문가들입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="mb-4 rounded-lg overflow-hidden h-64">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
