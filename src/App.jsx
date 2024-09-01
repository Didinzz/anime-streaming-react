import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Index from './page/Index'
import DetailAnime from './page/DetailAnime'
import SeeMoreAnime from './page/SeeMoreAnime'
import Streaming from './page/Streaming'

function App() {

    return (<>
        <BrowserRouter>
        <Routes>
            <Route path="/" 
            element={<Index />}
            />
            <Route path="/anime/:id" element={<DetailAnime />} />
            <Route path="/:type" element={<SeeMoreAnime />} />
            <Route path="/streaming" element={<Streaming />} />

        </Routes>
        </BrowserRouter>

    </>)
}

export default App
