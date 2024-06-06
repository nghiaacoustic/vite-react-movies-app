import { Outlet } from 'react-router-dom'
import { Footer, Header } from '@/components'

export const Layout: React.FC = () => (
  <div>
    <Header></Header>
    <main>
      <Outlet />
    </main>
    <Footer></Footer>
  </div>
)
