import React, { Suspense } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { queryClient } from '@/services'
import { Loader } from '@/components/Loader'
import ScrollToTop from '@/components/ScrollToTop'
import Layout from '@/pages'

const Home = React.lazy(() => import('@/pages/Home'))
const MovieDetail = React.lazy(() => import('@/pages/MovieDetail'))
const Movies = React.lazy(() => import('@/pages/Movies'))
const PageNotFound = React.lazy(() => import('@/pages/PageNotFound'))

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='movie/:id' element={<MovieDetail />} />
              <Route path='movies/:category' element={<Movies />} />
              <Route path='*' element={<PageNotFound />} />
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
