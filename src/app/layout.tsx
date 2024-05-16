import {
  Header,
  Footer
} from 'roll-ui'
import { getCurrentSite } from '@/roll'
import type { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const currentSite = await getCurrentSite()

  return {
    title: currentSite.name
  }
}

const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default Layout
