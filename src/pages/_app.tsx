import 'jquery/dist/jquery'
import 'jquery/dist/jquery.slim'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/tabler.css'
import '../../public/fonts/icons/fad/css/all.min.css'
import '../../public/fonts/icons/fe/fe.css'
import '../../public/fonts/webfont/satoshi/style.css'
import '@/styles/style.css'
import '@/styles/webfix.css'
import '@/styles/custom.css'
import '@/styles/select-box.css'
import '@/styles/responsive.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import MovieState from '../context/movie/movieState'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MovieState>
        <Component {...pageProps} />
      </MovieState>
    </>
  )
}

export default App;
