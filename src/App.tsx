import { FC } from 'react';
import ImageList from './components/ImageList';
import ImageUpload from './components/ImageUpload';

const App: FC = () => {
  return (
    <div style={{ width: '100%', textAlign: 'center', paddingTop: '100px' }}>
      <div style={{ width: '100%' }}>
        <ImageUpload />
      </div>
      <div style={{ width: '100%', marginTop: '100px' }}>
        <ImageList />
      </div>
    </div>
  );
};

export default App;
