import { FC } from 'react';
import { IImage } from '../interfaces';

interface ImageProps {
  image: IImage;
}

const Image: FC<ImageProps> = ({ image }) => {
  console.log(image);
  return (
    <div>
      <img
        width="300px"
        src={`http://localhost:3010/uploads/${image.fileName}`}
      />
    </div>
  );
};

export default Image;
