"use client"

import { useState } from "react"
import { Menu, X, User, LogOut } from "lucide-react"
import AuthModal from "./auth-modal"
import { useAuth } from "@/lib/auth-context"
import { logout } from "@/lib/firebase/auth"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, loading } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("로그아웃 실패:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">누모</div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#work" className="text-foreground hover:text-primary transition">
            포트폴리오
          </a>
          <a href="#story" className="text-foreground hover:text-primary transition">
            서비스
          </a>
          <a href="#insights" className="text-foreground hover:text-primary transition">
            팀
          </a>
          {loading ? (
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-foreground hover:text-primary transition"
              >
                <LogOut size={20} />
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 text-foreground hover:text-primary transition"
            >
              <User size={20} />
              로그인
            </button>
          )}
          <a
            href="#contact"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:opacity-90 transition"
          >
            연락하기
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
            <div className="flex flex-col gap-4 p-4">
              <a href="#work" className="text-foreground hover:text-primary transition">
                포트폴리오
              </a>
              <a href="#story" className="text-foreground hover:text-primary transition">
                서비스
              </a>
              <a href="#insights" className="text-foreground hover:text-primary transition">
                팀
              </a>
              {loading ? (
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              ) : user ? (
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-muted-foreground text-center">
                    {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 text-foreground hover:text-primary transition"
                  >
                    <LogOut size={20} />
                    로그아웃
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true)
                    setIsOpen(false)
                  }}
                  className="flex items-center justify-center gap-2 text-foreground hover:text-primary transition"
                >
                  <User size={20} />
                  로그인
                </button>
              )}
              <a
                href="#contact"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:opacity-90 transition text-center"
              >
                연락하기
              </a>
            </div>
          </div>
        )}
      </nav>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  )
}
