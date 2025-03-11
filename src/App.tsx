
import './App.css'
import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ImageList from './components/ImageList';
function App() {
  const [reload, setReload] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Image Uploader</h1>
      <ImageUpload onUploadSuccess={() => setReload(!reload)} />
      <h2 className="text-xl font-semibold mt-6 mb-4">Uploaded Images</h2>
      <ImageList key={reload ? "reload" : "no-reload"} />
    </div>
  );
}

export default App
