import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
            <div className="slider">
                <Slider
                    defaultValue={gridSize}
                    trackStyle={{ backgroundColor: '#09968f' }}
                    handleStyle={{ borderColor: '#09968f' }}
                    min={40}
                    max={100}
                    onChange={(gridSize) => onChangeGridSize(gridSize)}
                />
            </div>
            <label>Images per row:</label>
            <select
                value={imagesPerRow}
                onChange={(e) =>
                    onChangeImagesPerRow(Number(e.currentTarget.value))
                }
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => (
                    <option key={i} value={i}>
                        {i}
                    </option>
                ))}
            </select>
            <label>Grid cell shape:</label>
            <select
                value={imageShape}
                onChange={(e) => onChangeImageShape(e.currentTarget.value)}
            >
                <option value="square">Square</option>
                <option value="portrait">Portrait (3:4)</option>
                <option value="portraitTall">Portrait, tall (9:16)</option>
                <option value="landscape">Landscape (4:3)</option>
                <option value="landscapeWide">Landscape, wide (16:9)</option>
            </select>
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
                    Where answers are shown, they are the file names with their
                    extensions removed. &quot;Elvis Presley.jpg&quot; would be
                    displayed as &quot;Elvis Presley&quot;.
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
