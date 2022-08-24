import React from 'react';
import PropTypes from 'prop-types';
import ReactCropper from 'react-cropper';
import Button from '../Forms/Button';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cropperjs/dist/cropper.css';

export default class PhotoCropper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: false,
    };
  }

  getCroppedImageBlob = () => new Promise((resolve) => {
    const { cropper } = this.state;
    cropper.getCroppedCanvas({ width: 360, height: 360 }).toBlob((blob) => resolve(blob));
  });

  onSubmit = async () => {
    const { onSubmit } = this.props;
    this.setState({ buttonDisabled: true });
    const croppedImageBlob = await this.getCroppedImageBlob();
    onSubmit(croppedImageBlob);
  };

  onCropperInit = (cropper) => this.setState({ cropper });

  render() {
    const { src } = this.props;
    const { buttonDisabled } = this.state;
    return (
      <div className="PhotoCropper">
        {
                   src
                   && (
                   <ReactCropper
                     onInitialized={this.onCropperInit}
                     viewMode={2}
                     src={src}
                     aspectRatio={1}
                     guides={false}
                     background={false}
                     modal={false}
                     responsive
                     data={{
                       width: 360,
                       height: 360,
                     }}
                   />
                   )
               }
        <Button testId="PhotoCropperSubmit" disabled={!src || buttonDisabled} clickHandler={this.onSubmit}>Upload</Button>
      </div>
    );
  }
}
PhotoCropper.propTypes = {
  src: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
