import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Index from './page/Index'
import DetailAnime from './page/DetailAnime'

function App() {

    return (<>
        <BrowserRouter>
        <Routes>
            <Route path="/" 
            element={<Index />}
            />
            <Route path="/anime/:id" element={<DetailAnime />} />
        </Routes>
        </BrowserRouter>

    </>)
}

export default App
