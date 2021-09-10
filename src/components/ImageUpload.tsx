import { FC, FormEvent, useState } from 'react';
import axios from 'axios';

const ImageUpload: FC = () => {
  const [file, setFile] = useState<File | null>(null);
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
    <form onSubmit={onSubmitImage}>
      <input
        type="file"
        onChange={(event) => {
          if (!event.target.files) {
            return;
          }
          const imageFile = event.target.files[0];
          const fileReader = new FileReader();
          setFile(imageFile);
        }}
      />
      <input type="submit" value="업로드" />
    </form>
  );
};

export default ImageUpload;
