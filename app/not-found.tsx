'use client'

import { Button } from '@/components/ui'
import { useLang } from '@/components/LanguageProvider'

export default function NotFound() {
  const { isAr } = useLang()
  return (
    <section className="bg-white text-ink">
      <div className="wrap py-32 text-center">
        <p className="eyebrow">404</p>
        <h1 className="h1 mt-5">{isAr ? 'هذه الصفحة غير موجودة.' : 'This page doesn’t exist.'}</h1>
        <p className="lead mx-auto mt-5 max-w-lg">
          {isAr ? 'قد يكون الرابط قديماً أو مكتوباً بشكل غير صحيح.' : 'The link may be old or mistyped.'}
        </p>
        <div className="mt-9">
          <Button href="/">{isAr ? 'العودة إلى الرئيسية' : 'Back to home'}</Button>
        </div>
      </div>
    </section>
  )
}
