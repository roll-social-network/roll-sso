'use server'
import roll from '@/roll'
import { RollPageProps, RollPageComponentProps } from './RollPage'

const SSR = async ({ component: Component }: RollPageProps) => {
  const currentSite = await roll?.getCurrentSite()
  const data: RollPageComponentProps = {
    currentSite
  }

  return (
    <Component {...data} />
  )
}

export default SSR
