import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './page/Index'
import DetailAnime from './page/DetailAnime'
import SeeMoreAnime from './page/SeeMoreAnime'
import Streaming from './page/Streaming'
import Search from './page/Search'
function App() {

    return (<>
        <BrowserRouter>
            <Routes>
                <Route path="/"
                    element={<Index />} />
                <Route path="/anime/:slug" element={<DetailAnime />} />
                <Route path="/:type" element={<SeeMoreAnime />} />
                <Route path="/anime/:id/episode/:slugStream" element={<Streaming />} />
                <Route path="/search/:keyword" element={<Search />} />

            </Routes>
        </BrowserRouter>

    </>)
}

export default App
