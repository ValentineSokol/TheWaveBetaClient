import React, { lazy, Suspense, useState, useRef } from 'react';
import Button from '../Forms/Button';
import 'cropperjs/dist/cropper.css';

const PhotoCropper = ({ onSubmit, src }) => {
  const [disabled, setDisabled] = useState(false);
  const cropperRef = useRef(null);

  const ReactCropper = lazy(() => import('react-cropper'));

  const onCropperInit = (cropper) => { cropperRef.current = cropper; };
  const getCroppedImageBlob = () => new Promise((resolve) => {
    const { current: cropper } = cropperRef;
    cropper.getCroppedCanvas({ width: 360, height: 360 }).toBlob((blob) => resolve(blob));
  });

  const onImageSubmit = async () => {
    setDisabled(true);
    const croppedImageBlob = await getCroppedImageBlob();
    onSubmit(croppedImageBlob);
  }

  return (
      <div className="PhotoCropper">
        {
            src
            && (
                <Suspense fallback="Loading">
                <ReactCropper
                    onInitialized={onCropperInit}
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
                </Suspense>
            )
        }
        <Button testId="PhotoCropperSubmit" disabled={!src || disabled} clickHandler={onImageSubmit}>Upload</Button>
      </div>
  );
};

export default PhotoCropper;
