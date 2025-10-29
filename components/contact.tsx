"use client"

import type React from "react"
import { useState } from "react"
import { addDocument } from "@/lib/firebase/firestore"

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
        lastName: formData.lastName,
        email: formData.email,
        message: formData.message,
        createdAt: new Date().toISOString(),
      });

      console.log("Firestore에 저장된 문서 ID:", docId);
      setSuccessMessage("메시지가 성공적으로 전송되었습니다!")
      setFormData({ firstName: "", lastName: "", email: "", message: "" })

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
    <section id="contact" className="py-20 bg-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">시작할 준비가 되셨나요?</h2>
        <p className="text-lg text-muted-foreground mb-12">프로젝트에 대해 논의하고 함께 멋진 것을 만들어봅시다.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="firstName"
              placeholder="이름"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="성"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <textarea
            name="message"
            placeholder="메시지"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            required
          />

          {successMessage && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">{errorMessage}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "전송 중..." : "메시지 전송"}
          </button>
        </form>
      </div>
    </section>
  )
}
