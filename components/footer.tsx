export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">부스트웹</h3>
            <p className="text-background/80">의미 있는 디지털 경험을 만듭니다.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="#" className="hover:text-background transition">
                  웹 디자인
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  개발
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  전략
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">회사</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="#" className="hover:text-background transition">
                  소개
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  블로그
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  채용
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">연결</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="#" className="hover:text-background transition">
                  트위터
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  링크드인
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  인스타그램
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/80">
          <p>&copy; 2025 부스트웹 에이전시. 모든 권리 보유.</p>
        </div>
      </div>
    </footer>
  )
}
