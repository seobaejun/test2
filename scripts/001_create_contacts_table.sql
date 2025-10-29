-- 연락처 폼 데이터를 저장할 테이블 생성
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 테이블에 RLS 활성화
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 누구나 연락처를 제출할 수 있도록 정책 설정
CREATE POLICY "Allow anyone to insert contacts"
  ON public.contacts FOR INSERT
  WITH CHECK (true);

-- 읽기 권한은 제한 (선택사항)
CREATE POLICY "Allow select contacts"
  ON public.contacts FOR SELECT
  USING (false);
