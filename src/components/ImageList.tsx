import { FC, useEffect } from 'react';
import useSWR from 'swr';
import { IImage } from '../interfaces';
import { fetcher } from '../utils/fetcher';
import Image from './Image';

const ImageList: FC = () => {
  const { data, mutate, error } = useSWR<IImage[]>(
    'http://localhost:3010/image',
    fetcher,
  );

  if (!data) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }

  return (
    <>
      {data.map((image) => {
        return (
          <div style={{ marginBottom: '100px' }}>
            <Image key={image.id} image={image} />
          </div>
        );
      })}
    </>
  );
};

export default ImageList;
