import React from 'react';
import PropTypes from 'prop-types';
import GridSizeSlider from './optionControls/gridSizeSlider.js';
import ImageShapeSelect from './optionControls/imageShapeSelect.js';
import NumberSelect from './optionControls/numberSelect.js';

function PictureQuizOptions(props) {
    return (
        <div id="options">
            <span></span>
            <span style={{ fontWeight: 'bold' }}>OPTIONS</span>
            <label>Grid size:</label>
            <GridSizeSlider
                defaultValue={props.gridSize}
                onChange={props.onChangeGridSize}
            />
            <label>Images per row:</label>
            <NumberSelect
                min={props.minImagesPerRow}
                max={props.maxImagesPerRow}
                defaultValue={props.imagesPerRow}
                onChange={props.onChangeImagesPerRow}
            />
            <label>Grid cell shape:</label>
            <ImageShapeSelect
                defaultValue={props.imageShape}
                onChange={props.onChangeImageShape}
            />
            <label>Crop images to fit:</label>
            <span>
                <input
                    type="checkbox"
                    defaultChecked={props.cropImages}
                    style={{ marginRight: '10px' }}
                    onChange={(e) =>
                        props.onChangeCropImages(e.currentTarget.checked)
                    }
                />
                <span className="tip">
                    (You can also click a specific image to crop/uncrop it)
                </span>
            </span>
            <label>Show:</label>
            <span>
                <select
                    value={props.answerDisplay}
                    onChange={(e) =>
                        props.onChangeAnswerDisplay(e.currentTarget.value)
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
            <label>Load images in random order:</label>
            <span>
                <input
                    type="checkbox"
                    defaultChecked={props.randomiseOrder}
                    onChange={(e) =>
                        props.onChangeRandomiseOrder(e.currentTarget.checked)
                    }
                />
            </span>
            <label>Watermark text:</label>
            <span>
                <input
                    type="text"
                    value={props.watermarkText}
                    onChange={(e) =>
                        props.onChangeWatermarkText(e.currentTarget.value)
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
                    defaultChecked={props.watermarkVertical}
                    onChange={(e) =>
                        props.onChangeWatermarkVertical(e.currentTarget.checked)
                    }
                />
            </span>
            <label>Dark mode:</label>
            <span>
                <input
                    type="checkbox"
                    defaultChecked={props.darkMode}
                    onChange={(e) =>
                        props.onChangeDarkMode(e.currentTarget.checked)
                    }
                />
            </span>
            <label>Header text:</label>
            <span>
                <input
                    type="text"
                    value={props.headerText}
                    style={{ width: '90%' }}
                    onChange={(e) =>
                        props.onChangeHeaderText(e.currentTarget.value)
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
    randomiseOrder: PropTypes.bool.isRequired,
    headerText: PropTypes.string.isRequired,
    onChangeGridSize: PropTypes.func.isRequired,
    onChangeImagesPerRow: PropTypes.func.isRequired,
    onChangeImageShape: PropTypes.func.isRequired,
    onChangeCropImages: PropTypes.func.isRequired,
    onChangeAnswerDisplay: PropTypes.func.isRequired,
    onChangeWatermarkText: PropTypes.func.isRequired,
    onChangeWatermarkVertical: PropTypes.func.isRequired,
    onChangeDarkMode: PropTypes.func.isRequired,
    onChangeRandomiseOrder: PropTypes.func.isRequired,
    onChangeHeaderText: PropTypes.func.isRequired,
};

export default PictureQuizOptions;
