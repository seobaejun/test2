"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const projects = [
    {
      title: "전자상거래 플랫폼",
      category: "웹 개발",
      description: "모던한 UI/UX로 구현된 온라인 쇼핑몰",
    },
    {
      title: "SaaS 대시보드",
      category: "UI/UX 디자인",
      description: "데이터 시각화와 사용자 경험을 중시한 관리자 패널",
    },
    {
      title: "브랜드 리디자인",
      category: "브랜딩",
      description: "기업의 새로운 정체성을 담은 브랜드 시스템",
    },
    {
      title: "모바일 앱",
      category: "앱 개발",
      description: "사용자 중심의 직관적인 모바일 경험",
    },
    {
      title: "웹 포트폴리오",
      category: "웹 개발",
      description: "창의적이고 인터랙티브한 개인 포트폴리오",
    },
  ]

  // 네비게이션 함수들
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0))
  }

  // 카드 위치 조정 useEffect
  useEffect(() => {
    if (!containerRef.current || cardsRef.current.length === 0) return

    const cards = cardsRef.current

    // currentIndex에 따라 카드 위치 조정 - 적절한 간격으로 2개씩 보이도록
    gsap.to(cards, {
      x: (index) => (index - currentIndex) * 350, // 카드 간격을 적절하게 조정
      y: 0,
      rotationY: (index) => (index - currentIndex) * 6, // 회전 각도 조정
      rotationX: 0,
      scale: (index) => Math.abs(index - currentIndex) <= 1 ? 1 : 0.75, // 현재와 양옆 카드는 크게
      z: (index) => Math.abs(index - currentIndex) <= 1 ? 10 : -Math.abs(index - currentIndex) * 25,
      duration: 0.8,
      ease: "power2.out"
    })
  }, [currentIndex])

  // 이벤트 리스너 설정 useEffect
  useEffect(() => {
    if (!containerRef.current || cardsRef.current.length === 0) return

    const cards = cardsRef.current

    // 마우스 이벤트 - 호버 시 약간의 회전과 확대 효과
    const handleMouseEnter = (index: number) => {
      gsap.to(cards[index], {
        rotationY: (index - currentIndex) * 6 + 5,
        rotationX: -5,
        scale: 1.05,
        y: -10,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = (index: number) => {
      gsap.to(cards[index], {
        rotationY: (index - currentIndex) * 6,
        rotationX: 0,
        scale: Math.abs(index - currentIndex) <= 1 ? 1 : 0.75,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    // 카드 클릭 이벤트
    const handleCardClick = (index: number) => {
      // 클릭된 카드를 현재 카드로 설정
      setCurrentIndex(index)
    }

    cards.forEach((card, index) => {
      card.addEventListener("mouseenter", () => handleMouseEnter(index))
      card.addEventListener("mouseleave", () => handleMouseLeave(index))
      card.addEventListener("click", () => handleCardClick(index))
    })

    return () => {
      cards.forEach((card, index) => {
        card.removeEventListener("mouseenter", () => handleMouseEnter(index))
        card.removeEventListener("mouseleave", () => handleMouseLeave(index))
        card.removeEventListener("click", () => handleCardClick(index))
      })
    }
  }, [currentIndex])

  return (
    <section id="work" className="py-20 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              주요 작업
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            최신 프로젝트를 살펴보고 아이디어를 현실로 만드는 방법을 확인하세요.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative h-[500px] overflow-hidden"
          style={{ 
            perspective: "1000px",
            transformStyle: "preserve-3d"
          }}
        >
          {/* 왼쪽 화살표 */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* 오른쪽 화살표 */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            {projects.map((project, index) => (
              <div
                key={project.title}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el
                }}
                className="absolute cursor-pointer group"
                style={{
                  width: "300px",
                  height: "400px",
                  transformStyle: "preserve-3d"
                }}
              >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center p-8">
                {/* 아이콘 영역 */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-white">
                    {project.title.charAt(0)}
                  </span>
                </div>
                
                {/* 텍스트 내용 */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-300 mb-3">{project.category}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{project.description}</p>
                </div>

                {/* 글로우 효과 */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              </div>
            ))}
          </div>
        </div>

        {/* 인디케이터 */}
        <div className="flex justify-center space-x-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
            모든 프로젝트 보기
          </button>
        </div>
      </div>
    </section>
  )
}
