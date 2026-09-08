import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Featured from './components/Featured'
import Catalog from './components/Catalog'
import About from './components/About'
import Footer from './components/Footer'
import QuickView from './components/QuickView'
import CartDrawer from './components/CartDrawer'
import Checkout from './components/Checkout'
import { useCart } from './context/CartContext'

export default function App() {
  const [quick, setQuick] = useState(null) // product being viewed
  const [checkout, setCheckout] = useState(false)
  const { closeCart } = useCart()

  const startCheckout = () => {
    closeCart()
    setCheckout(true)
  }

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Featured onOpen={setQuick} />
        <Catalog onOpen={setQuick} />
        <About />
      </main>
      <Footer />

      <QuickView product={quick} onClose={() => setQuick(null)} />
      <CartDrawer onCheckout={startCheckout} />
      <Checkout open={checkout} onClose={() => setCheckout(false)} />
    </div>
  )
}
