import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePrevious } from '../utils/reactUtils.js';
import { convertFileNameToAnswer } from '../utils/utils.js';

function PictureQuizGridElement(props) {
    const [cropThisImage, setCropThisImage] = useState(props.cropImages);
    const [
        isGeneralCropSettingOverridden,
        setIsGeneralCropSettingOverridden,
    ] = useState(false);

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
                onClick={toggleImageCropping}
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
