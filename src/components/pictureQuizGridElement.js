import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePrevious } from '../reactUtils.js';
import { convertFileNameToAnswer } from '../utils.js';

function PictureQuizGridElement(props) {
    const [cropThisImage, setCropThisImage] = useState(props.cropImages);
    const [
        isGeneralCropSettingOverridden,
        setIsGeneralCropSettingOverridden,
    ] = useState(false);

    const prevCropThisImage = usePrevious(cropThisImage);

    useEffect(() => {
        if (props.cropImages !== prevCropThisImage) {
            // General crop setting has been changed, so override for this image no longer applies
            setIsGeneralCropSettingOverridden(false);
        }
        if (!isGeneralCropSettingOverridden) {
            setCropThisImage(props.cropImages);
        }
    });

    function onImageClick() {
        // Clicking an image overrides the general crop setting for that image
        setIsGeneralCropSettingOverridden(true);
        setCropThisImage(!cropThisImage);
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
            <img
                className={cropThisImage ? 'cropImage' : ''}
                src={props.filePath}
                onClick={onImageClick}
            ></img>
        </div>
    );
}

PictureQuizGridElement.propTypes = {
    index: PropTypes.number.isRequired,
    filePath: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    widthPercentage: PropTypes.number.isRequired,
    cropImages: PropTypes.bool.isRequired,
    answerDisplay: PropTypes.string.isRequired,
    reduceFontSize: PropTypes.bool,
};

export default PictureQuizGridElement;
