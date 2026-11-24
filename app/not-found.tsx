import { ArrowLink } from '@/components/ui'

export default function NotFound() {
  return (
    <section className="wrap py-40">
      <p className="kicker mb-8">404</p>
      <h1 className="display">This page <em>doesn’t exist.</em></h1>
      <div className="mt-12"><ArrowLink href="/">Back home</ArrowLink></div>
    </section>
  )
}
