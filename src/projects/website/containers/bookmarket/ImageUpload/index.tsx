import React from 'react';
import Dropzone from 'react-dropzone';
import bind from 'bind-decorator';
import getFalmerEndpoint from '~libs/getFalmerEndpoint';
import { getMslJwt } from '~libs/getMslJwt';
import { ImageSourcePurpose } from '~types/upload';
import { FalmerImage } from '~types/events';
import AddImageIcon from '~icons/add-image.svg';
import { AspectRatio, OneImage } from '~components/OneImage';
import { cx } from 'emotion';

interface IProps {
  onUploadComplete(data: FalmerImage): void;
  image?: FalmerImage;
}

interface IState {
  isUploading: boolean;
  uploaded: boolean;
  error: null | any;
}

class ImageUpload extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isUploading: false,
      uploaded: false,
      error: null,
    };
  }

  @bind
  onDrop(acceptedFiles: any, rejectedFiles: any) {
    if (acceptedFiles.length === 0 && rejectedFiles.length > 0) {
      this.setState({
        error: {
          errors: 'File rejected, must be jpg/png, under 5MB',
        },
      });
      return;
    }

    this.setState({
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
          this.props.onUploadComplete(response.data);
          this.setState({
            isUploading: false,
            uploaded: true,
          });
        } else {
          this.setState({ error: response.data });
        }
      });
  }

  renderStatus() {
    if (this.state.error) {
      return (
        <div>
          Sorry an error occurred!
          <pre>{JSON.stringify(this.state.error.errors)}</pre>
        </div>
      );
    }
    if (this.state.isUploading) {
      return 'Uploading';
    }

    if (this.state.uploaded) {
      return 'Uploaded!';
    }
  }

  render() {
    return (
      <div className="ImageUpload">
        <Dropzone
          onDrop={this.onDrop}
          accept="image/jpeg,image/jpg,image/png"
          multiple={false}
          maxSize={8000000}
        >
          {({ isDragActive }) => (
            <div className={cx({ 'ImageUpload--active': isDragActive })}>
              {this.props.image ? (
                <OneImage
                  src={this.props.image.resource}
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
          )}
        </Dropzone>
        {this.renderStatus()}
      </div>
    );
  }
}

export { ImageUpload };
