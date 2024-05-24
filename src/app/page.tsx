import UserDetails from '@/app/components/UserDetails'
import { getCurrentUser } from '@/app/roll'

const HomePage = async () => {
  const currentUser = await getCurrentUser()

  return (
    <div>
      <UserDetails user={currentUser} />
    </div>
  )
}

export default HomePage
