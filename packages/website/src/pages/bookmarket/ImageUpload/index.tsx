import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import getFalmerEndpoint from '@ussu/common/src/libs/getFalmerEndpoint';
import { getMslJwt } from '@ussu/common/src/libs/getMslJwt';
import { ImageSourcePurpose } from '@ussu/common/src/types/upload';
import AddImageIcon from '@ussu/common/src/icons/add-image.svg';
import { AspectRatio, OneImage } from '../../../components/OneImage';
import classnames from 'classnames';

interface ImageUploadProps {
  onUploadComplete(data: { resource: string; mediaId: string }): void;
  image: { resource: string } | null;
}

interface ImageUploadState {
  isUploading: boolean;
  uploaded: boolean;
  error: null | any;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  image,
  onUploadComplete,
}) => {
  const [state, setState] = useState<ImageUploadState>({
    isUploading: false,
    uploaded: false,
    error: null,
  });

  const onDrop = useCallback(
    (acceptedFiles: any, rejectedFiles: any) => {
      if (acceptedFiles.length === 0 && rejectedFiles.length > 0) {
        setState({
          ...state,

          error: {
            errors: 'File rejected, must be jpg/png, under 5MB',
          },
        });
        return;
      }

      setState({
        ...state,

        isUploading: true,
        error: null,
      });

      const formData = new FormData();

      formData.append('file', acceptedFiles[0]);
      formData.append('source', String(ImageSourcePurpose.BookMarketListing));

      fetch(`${getFalmerEndpoint()}/images/`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${getMslJwt()}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.ok) {
            onUploadComplete(response.data);
            setState({
              ...state,
              isUploading: false,
              uploaded: true,
            });
          } else {
            setState({
              ...state,
              error: response.data,
            });
          }
        });
    },
    [onUploadComplete, state],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="ImageUpload">
      <div
        {...getRootProps()}
        className={classnames({ 'ImageUpload--active': isDragActive })}
      >
        <input {...getInputProps()} />
        {image ? (
          <OneImage
            src={image.resource}
            aspectRatio={AspectRatio.r3by4}
            alt=""
          />
        ) : (
          <div className="ImageUpload__no-image">
            <div className="ImageUpload__icon">
              <AddImageIcon />
            </div>
            <div>Add an image</div>
          </div>
        )}
      </div>

      {state.isUploading && 'Uploading'}
      {state.uploaded && 'Uploaded'}
      {state.error && (
        <div>
          Sorry an error occurred!
          <pre>{JSON.stringify(state.error.errors)}</pre>
        </div>
      )}
    </div>
  );
};
