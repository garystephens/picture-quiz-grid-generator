import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PictureQuizGridElement from './pictureQuizGridElement.js';
import { addClassToElementTemporarily } from '../utils.js';
import { usePrevious } from '../reactUtils.js';

function PictureQuizGrid(props) {
    const [watermarkText, setWatermarkText] = useState(props.watermarkText);
    const prevWatermarketText = usePrevious(watermarkText);

    // On first render
    useEffect(() => {
        $('#watermark').draggable();
    }, []);

    // On change of watermark text
    useEffect(() => {
        setWatermarkText(props.watermarkText);
        // Highlight changes to the watermark with a temporary style change
        if (
            prevWatermarketText !== undefined &&
            props.watermarkText !== prevWatermarketText
        ) {
            addClassToElementTemporarily('#watermark', 'highlight', 500);
        }
        $('#watermark').draggable();
    }, [props.watermarkText]);

    return (
        <div id="pictureQuizGrid">
            <div
                id="watermark"
                className={props.watermarkVertical ? 'rotate90' : ''}
            >
                {watermarkText}
            </div>
            <div
                id="grid"
                style={{ width: props.gridSize + '%' }}
                className={props.imageShape}
            >
                {props.files.map((file, index) => (
                    <PictureQuizGridElement
                        key={index + 1}
                        filePath={file.filePath}
                        fileName={file.fileName}
                        index={index + 1}
                        widthPercentage={100 / props.imagesPerRow}
                        cropImages={props.cropImages}
                        answerDisplay={props.answerDisplay}
                        reduceFontSize={props.imagesPerRow > 6}
                    ></PictureQuizGridElement>
                ))}
            </div>
        </div>
    );
}

PictureQuizGrid.propTypes = {
    files: PropTypes.array.isRequired,
    gridSize: PropTypes.number.isRequired,
    imagesPerRow: PropTypes.number.isRequired,
    imageShape: PropTypes.string.isRequired,
    cropImages: PropTypes.bool.isRequired,
    answerDisplay: PropTypes.string.isRequired,
    watermarkText: PropTypes.string.isRequired,
    watermarkVertical: PropTypes.bool.isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default PictureQuizGrid;
