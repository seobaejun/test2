"use client"

import { useState } from "react"
import { X, Eye, EyeOff } from "lucide-react"
import { signInWithEmail, signUpWithEmail } from "@/lib/firebase/auth"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      if (isLogin) {
        // 로그인
        await signInWithEmail(email, password)
        setSuccess("로그인에 성공했습니다!")
        setTimeout(() => {
          onClose()
          setEmail("")
          setPassword("")
        }, 1500)
      } else {
        // 회원가입
        if (password !== confirmPassword) {
          setError("비밀번호가 일치하지 않습니다.")
          return
        }
        if (password.length < 6) {
          setError("비밀번호는 6자 이상이어야 합니다.")
          return
        }
        await signUpWithEmail(email, password)
        setSuccess("회원가입에 성공했습니다!")
        setTimeout(() => {
          onClose()
          setEmail("")
          setPassword("")
          setConfirmPassword("")
        }, 1500)
      }
    } catch (error: any) {
      console.error("Auth error:", error)
      if (error.code === "auth/user-not-found") {
        setError("존재하지 않는 이메일입니다.")
      } else if (error.code === "auth/wrong-password") {
        setError("잘못된 비밀번호입니다.")
      } else if (error.code === "auth/email-already-in-use") {
        setError("이미 사용 중인 이메일입니다.")
      } else if (error.code === "auth/weak-password") {
        setError("비밀번호가 너무 약합니다.")
      } else if (error.code === "auth/invalid-email") {
        setError("유효하지 않은 이메일입니다.")
      } else {
        setError("오류가 발생했습니다. 다시 시도해주세요.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* 모달 */}
      <div className="relative bg-background border border-border rounded-lg p-8 w-full max-w-md mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isLogin ? "로그인" : "회원가입"}
          </h2>
          <p className="text-muted-foreground">
            {isLogin ? "계정에 로그인하세요" : "새 계정을 만드세요"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                placeholder="비밀번호를 입력하세요"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="비밀번호를 다시 입력하세요"
                required
              />
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "처리 중..." : (isLogin ? "로그인" : "회원가입")}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            {isLogin ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}
          </p>
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError("")
              setSuccess("")
            }}
            className="text-primary hover:underline font-medium"
          >
            {isLogin ? "회원가입" : "로그인"}
          </button>
        </div>
      </div>
    </div>
  )
}
