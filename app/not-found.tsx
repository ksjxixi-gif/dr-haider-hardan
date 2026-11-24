import { Button } from '@/components/ui'

export default function NotFound() {
  return (
    <section className="on-dark bg-navy-900 text-white">
      <div className="wrap py-32 text-center">
        <p className="eyebrow">404</p>
        <h1 className="h1 mt-5">This page doesn’t exist.</h1>
        <p className="lead mx-auto mt-5 max-w-lg">The link may be old or mistyped.</p>
        <div className="mt-9"><Button href="/">Back to home</Button></div>
      </div>
    </section>
  )
}
