import React from 'react';
import Dropzone from 'react-dropzone';
import bind from 'bind-decorator';
import getFalmerEndpoint from '~libs/getFalmerEndpoint';
import { getMslJwt } from '~libs/getMslJwt';
import { ImageSourcePurpose } from '../../../types/upload';
import { FalmerImage } from '../../../types/events';
import { AspectRatio, OneImage } from '~components/OneImage';

interface IProps {
  onUploadComplete(data: FalmerImage): void;
  image?: FalmerImage;
}

interface IState {
  isUploading: boolean;
  uploaded: boolean;
}

class ImageUpload extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isUploading: false,
      uploaded: false,
    };
  }

  @bind
  onDrop(acceptedFiles: any, rejectedFiles: any) {
    console.log({ acceptedFiles, rejectedFiles });

    this.setState({
      isUploading: true,
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
        this.props.onUploadComplete(response.data);
      });

    setTimeout(() => {
      this.setState({
        isUploading: false,
        uploaded: true,
      });
    }, 2000);
  }

  renderStatus() {
    if (this.state.isUploading) {
      return 'Uploading';
    }

    if (this.state.uploaded) {
      return 'uploaded!';
    }

    return 'nothing uploaded';
  }

  render() {
    return (
      <div>
        <Dropzone
          onDrop={this.onDrop}
          accept="image/jpeg,image/jpg,image/png"
          multiple={false}
          maxSize={8000000}
        >
          Drop image here
          {this.props.image ? (
            <OneImage
              src={this.props.image.resource}
              aspectRatio={AspectRatio.r3by4}
              alt=""
            />
          ) : (
            'No image currently being used!'
          )}
        </Dropzone>
        <div>{this.renderStatus()}</div>
      </div>
    );
  }
}

export { ImageUpload };
