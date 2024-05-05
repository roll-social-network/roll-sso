import dynamic from 'next/dynamic'
import roll from '@/roll'

export type RollPageComponentProps = {
  currentSite: object;
}

export type RollPageProps = {
  component: React.ComponentType<RollPageComponentProps>;
}

const importSSR = () => import('@/app/components/RollPage/SSR')
const importNoSSR = () => import('@/app/components/RollPage/NoSSR')

export default dynamic(
  !!roll ? importSSR : importNoSSR,
  { ssr: !!roll }
)
