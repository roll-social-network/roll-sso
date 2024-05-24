import type { CurrentUser } from "roll-node"

const UserDetails = ({ user }: { user: CurrentUser }) => {
  return (
    <div>
      <p><strong>username:</strong> {user.username}</p>
    </div>
  )
}

export default UserDetails
