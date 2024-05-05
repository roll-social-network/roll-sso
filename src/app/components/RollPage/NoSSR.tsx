'use client'
import useSWR from 'swr'
import roll from '@/roll'
import TraceError from '@/app/components/TraceError'
import { RollPageProps, RollPageComponentProps } from './RollPage'

const NoSSR = ({ component: Component }: RollPageProps) => {
  const { data: currentSite, error, isLoading } = useSWR('getCurrentSite', () => (roll?.getCurrentSite()))
  const data: RollPageComponentProps = {
    currentSite
  }

  if (error) {
    return (
      <TraceError error={error} />
    )
  }

  if (isLoading) {
    return (
      <div>...</div>
    )
  }

  return (
    <Component {...data} />
  )
}

export default NoSSR
