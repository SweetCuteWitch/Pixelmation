import { Routes, Route } from 'react-router-dom';
import EditorArea from './components/EditorArea';
import FieldSelector from './components/FieldSelector';

const App = () => {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<FieldSelector />} />
          <Route path="/texture" element={<EditorArea mode={'texture'} />} />
          <Route path="/animation" element={<EditorArea mode={'animation'} />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
