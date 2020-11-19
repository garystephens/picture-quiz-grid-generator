import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GridSizeSlider from './optionControls/gridSizeSlider.js';
import ImageShapeSelect from './optionControls/imageShapeSelect.js';
import NumberSelect from './optionControls/numberSelect.js';

function PictureQuizOptions(props) {
    const [gridSize, setGridSize] = useState(props.gridSize);
    const [imagesPerRow, setImagesPerRow] = useState(props.imagesPerRow);
    const [imageShape, setImageShape] = useState(props.imageShape);
    const [cropImages, setCropImages] = useState(props.cropImages);
    const [answerDisplay, setAnswerDisplay] = useState(props.answerDisplay);
    const [watermarkText, setWatermarkText] = useState(props.watermarkText);
    const [watermarkVertical, setWatermarkVertical] = useState(
        props.watermarkVertical
    );
    const [darkMode, setDarkMode] = useState(props.darkMode);

    function onChangeGridSize(gridSize) {
        setGridSize(gridSize);
        props.onChangeGridSize(gridSize);
    }

    function onChangeImagesPerRow(imagesPerRow) {
        setImagesPerRow(imagesPerRow);
        props.onChangeImagesPerRow(imagesPerRow);
    }

    function onChangeImageShape(imageShape) {
        setImageShape(imageShape);
        props.onChangeImageShape(imageShape);
    }

    function onChangeCropImages(cropImages) {
        setCropImages(cropImages);
        props.onChangeCropImages(cropImages);
    }

    function onChangeAnswerDisplay(answerDisplay) {
        setAnswerDisplay(answerDisplay);
        props.onChangeAnswerDisplay(answerDisplay);
    }

    function onChangeWatermarkText(watermarkText) {
        setWatermarkText(watermarkText);
        props.onChangeWatermarkText(watermarkText);
    }

    function onChangeWatermarkVertical(watermarkVertical) {
        setWatermarkVertical(watermarkVertical);
        props.onChangeWatermarkVertical(watermarkVertical);
    }

    function onChangeDarkMode(darkMode) {
        setDarkMode(darkMode);
        props.onChangeDarkMode(darkMode);
    }

    return (
        <div id="options">
            <span></span>
            <span style={{ fontWeight: 'bold' }}>OPTIONS</span>
            <label>Grid size:</label>
            <GridSizeSlider
                defaultValue={gridSize}
                onChange={onChangeGridSize}
            />
            <label>Images per row:</label>
            <NumberSelect
                min={props.minImagesPerRow}
                max={props.maxImagesPerRow}
                defaultValue={imagesPerRow}
                onChange={onChangeImagesPerRow}
            />
            <label>Grid cell shape:</label>
            <ImageShapeSelect
                defaultValue={imageShape}
                onChange={onChangeImageShape}
            />
            <label>Crop images to fit:</label>
            <span>
                <input
                    type="checkbox"
                    defaultChecked={cropImages}
                    onChange={(e) =>
                        onChangeCropImages(e.currentTarget.checked)
                    }
                />
                <br />
                <span className="tip">
                    You can also click a specific image to crop/uncrop it.
                </span>
            </span>
            <label>Show:</label>
            <span>
                <select
                    value={answerDisplay}
                    onChange={(e) =>
                        onChangeAnswerDisplay(e.currentTarget.value)
                    }
                >
                    <option value="none">No answer spaces or answers</option>
                    <option value="blankSpace">
                        Blank space for writing answers
                    </option>
                    <option value="answer">Answers</option>
                </select>
                <br />
                <span className="tip">
                    Where answers are shown, they are the file names without
                    their extensions. <i>Elvis Presley.jpg</i> would be
                    displayed as <i>Elvis Presley</i>.
                </span>
            </span>
            <label>Dark mode:</label>
            <span>
                <input
                    type="checkbox"
                    defaultChecked={darkMode}
                    onChange={(e) => onChangeDarkMode(e.currentTarget.checked)}
                />
            </span>
            <span style={{ paddingTop: '10px' }}> </span>
            <span> </span>
            <label>Watermark text:</label>
            <span>
                <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) =>
                        onChangeWatermarkText(e.currentTarget.value)
                    }
                />
                <br />
                <span className="tip">
                    Watermark can be dragged to your preferred location.
                </span>
            </span>
            <label>Vertical watermark:</label>
            <span>
                <input
                    type="checkbox"
                    defaultChecked={watermarkVertical}
                    onChange={(e) =>
                        onChangeWatermarkVertical(e.currentTarget.checked)
                    }
                />
            </span>
        </div>
    );
}

PictureQuizOptions.propTypes = {
    gridSize: PropTypes.number.isRequired,
    imagesPerRow: PropTypes.number.isRequired,
    minImagesPerRow: PropTypes.number.isRequired,
    maxImagesPerRow: PropTypes.number.isRequired,
    imageShape: PropTypes.string.isRequired,
    cropImages: PropTypes.bool.isRequired,
    answerDisplay: PropTypes.string.isRequired,
    watermarkText: PropTypes.string.isRequired,
    watermarkVertical: PropTypes.bool.isRequired,
    darkMode: PropTypes.bool.isRequired,
    onChangeGridSize: PropTypes.func.isRequired,
    onChangeImagesPerRow: PropTypes.func.isRequired,
    onChangeImageShape: PropTypes.func.isRequired,
    onChangeCropImages: PropTypes.func.isRequired,
    onChangeAnswerDisplay: PropTypes.func.isRequired,
    onChangeWatermarkText: PropTypes.func.isRequired,
    onChangeWatermarkVertical: PropTypes.func.isRequired,
    onChangeDarkMode: PropTypes.func.isRequired,
};

export default PictureQuizOptions;
