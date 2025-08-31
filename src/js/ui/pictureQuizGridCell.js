import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePrevious } from '../utils/reactUtils.js';
import { convertFileNameToAnswer } from '../utils/utils.js';

function PictureQuizGridCell(props) {
    const [cropThisImage, setCropThisImage] = useState(props.cropImages);
    const [isGeneralCropSettingOverridden, setIsGeneralCropSettingOverridden] =
        useState(false);

    const prevCropThisImageValue = usePrevious(cropThisImage);

    useEffect(() => {
        function generalCropSettingHasBeenChanged() {
            return props.cropImages !== prevCropThisImageValue;
        }

        if (generalCropSettingHasBeenChanged()) {
            setIsGeneralCropSettingOverridden(false);
        }
        if (!isGeneralCropSettingOverridden) {
            setCropThisImage(props.cropImages);
        }
    }, [
        props.cropImages,
        prevCropThisImageValue,
        isGeneralCropSettingOverridden,
    ]);

    function toggleImageCropping() {
        //setIsGeneralCropSettingOverridden(true);
        //setCropThisImage(!cropThisImage);
    }

    function onMouseOverDeleteImageButton(e) {
        e.currentTarget.style.opacity = '1.0';
    }

    function onMouseOutDeleteImageButton(e) {
        e.currentTarget.style.opacity = '0.5';
    }

    return (
        <div style={{ width: props.widthPercentage + '%' }}>
            <span
                className={
                    'imageNumber ' + (props.reduceFontSize ? 'small' : '')
                }
            >
                {props.index}
            </span>
            {props.answerDisplay === 'answer' && (
                <span className="answer">
                    {convertFileNameToAnswer(props.fileName)}
                </span>
            )}
            {props.answerDisplay === 'blankSpace' && (
                <span className="spaceForAnswer"></span>
            )}
            {props.allowDelete && (
                <span
                    className="deleteImage exclude-from-output-image"
                    title="Remove this image"
                    onMouseOver={onMouseOverDeleteImageButton}
                    onMouseOut={onMouseOutDeleteImageButton}
                    onClick={props.onDeleteImage}
                >
                    Remove
                </span>
            )}
            <img
                className={cropThisImage ? 'cropImage' : ''}
                src={props.filePath}
                onClick={toggleImageCropping}
            ></img>
        </div>
    );
}

PictureQuizGridCell.propTypes = {
    index: PropTypes.number.isRequired,
    filePath: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    widthPercentage: PropTypes.number.isRequired,
    cropImages: PropTypes.bool.isRequired,
    answerDisplay: PropTypes.string.isRequired,
    reduceFontSize: PropTypes.bool,
    allowDelete: PropTypes.bool,
    onDeleteImage: PropTypes.func.isRequired,
};

export default PictureQuizGridCell;
