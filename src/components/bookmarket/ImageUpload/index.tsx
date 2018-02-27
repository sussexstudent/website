import React from 'react';
import Dropzone from 'react-dropzone'

interface IProps {

}

function onDrop(acceptedFiles: any, rejectedFiles: any) {
  console.log({ acceptedFiles, rejectedFiles });
}

const ImageUpload: React.SFC<IProps> = () => {

  return (
    <div>
      Image uploader

      <Dropzone onDrop={onDrop} accept="image/jpeg, image/png" multiple={false} maxSize={2024}>
        Drop image here
      </Dropzone>
    </div>
  );
};


export { ImageUpload };
