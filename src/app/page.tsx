import UserDetails from '@/app/components/UserDetails'
import { getCurrentUser } from '@/app/roll'

const HomePage = async () => {
  const currentUser = await getCurrentUser()

  return (
    <div>
      <section>
        <UserDetails user={currentUser} />
      </section>
    </div>
  )
}

export default HomePage
