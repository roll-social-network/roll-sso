import {
  Header,
  Footer
} from 'roll-ui'
import '@/styles/main.css'

type rootLayoutParams = Readonly<{
  children: React.ReactNode;
}>

const Layout = ({ children }: rootLayoutParams) => {
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
