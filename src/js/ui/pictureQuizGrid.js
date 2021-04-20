import React from 'react';
import PropTypes from 'prop-types';
import PictureQuizGridElement from './pictureQuizGridElement.js';
import DraggableWatermark from './draggableWatermark.js';

function PictureQuizGrid(props) {
    return (
        <div id="pictureQuizGrid">
            {props.headerText && (
                <div
                    id="header"
                    style={{
                        width: props.gridSize + '%',
                        fontSize: 30 * (props.gridSize / 100) + 'px',
                        lineHeight: 30 * (props.gridSize / 100) + 'px',
                    }}
                >
                    {props.headerText}
                </div>
            )}
            <DraggableWatermark
                watermarkText={props.watermarkText}
                watermarkVertical={props.watermarkVertical}
            />
            <div
                id="grid"
                style={{ width: props.gridSize + '%' }}
                className={props.imageShape}
            >
                {props.files.map((file, index) => (
                    <PictureQuizGridElement
                        key={index + 1}
                        fileName={file.fileName}
                        filePath={file.filePath}
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
    headerText: PropTypes.string.isRequired,
};

export default PictureQuizGrid;
