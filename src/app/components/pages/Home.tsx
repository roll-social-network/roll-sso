'use client'
import type { RollPageComponentProps } from '@/app/components/RollPage'

const Home = ({ currentSite }: RollPageComponentProps) => {
  return (
    <div>
      <p><strong>currentSite:</strong></p>
      <pre>{JSON.stringify(currentSite, null, 2)}</pre>
    </div>
  )
}

export default Home
