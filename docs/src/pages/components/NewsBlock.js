import React from 'react';
import Dropzone from 'react-dropzone';

class NewsBlockComponentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'This is title',
      standfirst: 'This is standfirst',
      imageBase64: null,
      imageURL: 'https://www.sussexstudent.com/asset/News/6667/uk.jpg?thumbnail_width=200&thumbnail_height=160&resize_type=CropToFit',
    };

    this.handleSetImage = this.handleSetImage.bind(this);
    this.handleStandfirst = this.handleStandfirst.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
  }

  handleSetImage(img) {
    this.setState({ imageBase64: img[0].preview });
  }

  handleTitle(e) {
    console.log(e);
    this.setState({ title: e.target.value });
  }

  handleStandfirst(e) {
    this.setState({ standfirst: e.target.value });
  }

  render() {
    const { imageBase64, imageURL, title, standfirst } = this.state;
    return (
      <div className="App__content-container">
        <h1>NewsBlock</h1>
        <p>Our news block is an item-in-list element for displaying articles.</p>
        <div className="Trail">
          <div className="Trail__row Trail__row--11">
            <div className="NewsBlock">
              <a className="NewsBlock__title-link" href="https://example.com/">
                <div className="NewsBlock__image" style={{ backgroundImage: `url(${imageBase64 || imageURL})` }}>
                  <div className="NewsBlock__title-outer">
                    <h2 className="NewsBlock__title" contentEditable>{title}</h2>
                  </div>
                </div>
              </a>
              <p className="NewsBlock__standfirst" contentEditable>{standfirst}</p>
              <div className="NewsBlock__meta">
                <date className="NewsBlock__date">1 hour ago</date>
              </div>

            </div>
            <div>
              <input type="text" value={title} onChange={this.handleTitle} />
              <Dropzone onDrop={this.handleSetImage}>
                Drop image here.
              </Dropzone>
              <input type="text" value={standfirst} onChange={this.handleStandfirst} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewsBlockComponentPage.title = 'NewsBlock';
NewsBlockComponentPage.slug = 'newsblock';

export default NewsBlockComponentPage;
