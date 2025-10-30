"use client"

import type React from "react"
import { useState } from "react"
import { addDocument } from "@/lib/firebase/firestore"

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage("")
    setErrorMessage("")

    try {
      // Firebase Firestore에 연락 정보 저장
      const docId = await addDocument("contacts", {
        firstName: formData.firstName,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        createdAt: new Date().toISOString(),
      });

      console.log("Firestore에 저장된 문서 ID:", docId);
      setSuccessMessage("메시지가 성공적으로 전송되었습니다!")
      setFormData({ firstName: "", phone: "", email: "", message: "" })

      // 3초 후 성공 메시지 제거
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMessage("메시지 전송에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-black text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              시작할 준비가 되셨나요?
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            프로젝트에 대해 논의하고 함께 멋진 것을 만들어봅시다.
          </p>
        </div>

        <div className="relative">
          {/* Form container with glow effect */}
          <div className="relative p-8 bg-gray-800/50 border border-white/20 rounded-2xl backdrop-blur-sm">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-50" />
            
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <input
                type="text"
                name="firstName"
                placeholder="이름"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="핸드폰 번호"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="이메일"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                required
              />

              <textarea
                name="message"
                placeholder="메시지"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                required
              />

              {successMessage && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 backdrop-blur-sm">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 backdrop-blur-sm">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? "전송 중..." : "메시지 전송"}
              </button>
            </form>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
          <div className="absolute top-1/3 -left-6 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/4 -right-8 w-4 h-4 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "2s" }} />
        </div>
      </div>
    </section>
  )
}
