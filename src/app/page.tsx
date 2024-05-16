import { getCurrentSite } from '@/roll'

const HomePage = async () => {
  const currentSite = await getCurrentSite()

  return (
    <div>
      <div>current site:</div>
      <pre>{JSON.stringify(currentSite, null, 2)}</pre>
    </div>
  )
}

export default HomePage
