import {
  Header,
  Footer
} from 'roll-ui'
import { getCurrentSite } from '@/app/roll'
import type { Metadata } from 'next'
import '@/styles/main.css'

export const generateMetadata = async (): Promise<Metadata> => {
  const currentSite = await getCurrentSite()

  return {
    title: currentSite.name
  }
}

const LayoutHeader = async () => {
  const currentSite = await getCurrentSite()

  return (
    <Header title={currentSite.name} />
  )
}

const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <html lang="en">
      <body>
        <LayoutHeader />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default Layout
