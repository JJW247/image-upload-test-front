import { FC, FormEvent, useState } from 'react';
import axios from 'axios';

const ImageUpload: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any>(null);
  const [percent, setPercent] = useState<number>(0);
  const onSubmitImage = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append('image', file);
      const response = await axios.post(
        'http://localhost:3010/image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            setPercent((progressEvent.loaded / progressEvent.total) * 100);
          },
        },
      );
      if (response.statusText !== 'Created') {
        throw new Error('알 수 없는 오류가 발생하였습니다!');
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      style={{ width: '100%', textAlign: 'center' }}
      onSubmit={onSubmitImage}
    >
      {preview && (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <img style={{ width: '300px' }} src={preview} />
        </div>
      )}
      {percent !== 0 && (
        <div style={{ width: '100%', marginTop: '30px', marginBottom: '30px' }}>
          <div
            style={{
              width: 100,
              height: 20,
              border: '1px solid black',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <div style={{ width: `${percent}%`, backgroundColor: 'red' }}>
              {percent}%
            </div>
          </div>
        </div>
      )}
      <input
        type="file"
        onChange={(event) => {
          if (!event.target.files || !event.target.files[0]) {
            return;
          }
          const imageFile = event.target.files[0];
          const fileReader = new FileReader();
          setFile(imageFile);
          fileReader.readAsDataURL(imageFile);
          fileReader.onload = (readerEvent) =>
            setPreview(readerEvent.target?.result);
        }}
      />
      <input type="submit" value="업로드" />
    </form>
  );
};

export default ImageUpload;
