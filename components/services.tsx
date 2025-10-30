"use client"

import { Calendar, Code, FileText, User, Clock } from "lucide-react"
import { RadialOrbitalTimeline } from "@/components/ui/radial-orbital-timeline"

export default function Services() {
  const timelineData = [
    {
      id: 1,
      title: "웹 디자인",
      date: "1단계",
      content: "고객을 매료시키고 충성도 높은 고객으로 전환하는 아름답고 반응형 디자인을 제작합니다.",
      category: "Design",
      icon: FileText,
      relatedIds: [2],
      energy: 100,
    },
    {
      id: 2,
      title: "웹 개발",
      date: "2단계",
      content: "최신 기술과 모범 사례로 구축한 견고하고 확장 가능한 웹 애플리케이션을 개발합니다.",
      category: "Development",
      icon: Code,
      relatedIds: [1, 3],
      energy: 90,
    },
    {
      id: 3,
      title: "디지털 전략",
      date: "3단계",
      content: "디지털 존재감을 비즈니스 목표와 일치시키는 전략 계획 및 컨설팅을 제공합니다.",
      category: "Strategy",
      icon: Calendar,
      relatedIds: [2, 4],
      energy: 60,
    },
    {
      id: 4,
      title: "브랜드 아이덴티티",
      date: "4단계",
      content: "강력하고 기억에 남는 시장 입지를 확립하는 포괄적인 브랜딩 솔루션을 구축합니다.",
      category: "Branding",
      icon: User,
      relatedIds: [3],
      energy: 30,
    },
  ]

  return (
    <section id="story" className="py-20 bg-black text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              우리의 서비스
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            창의성, 전략, 기술을 결합하여 뛰어난 결과를 제공하는 우리의 작업 프로세스입니다.
          </p>
        </div>

        {/* Timeline Component */}
        <div className="flex justify-center">
          <RadialOrbitalTimeline data={timelineData} className="w-full max-w-4xl" />
        </div>

      </div>
    </section>
  )
}