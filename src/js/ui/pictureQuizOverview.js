import React from 'react';
import PropTypes from 'prop-types';
import MultiFileSelector from './multiFileSelector.js';

function PictureQuizOverview(props) {
    return (
        <div id="overview">
            <div id="sampleImage">
                <img src="images/samplequiz.jpg" />
            </div>
            <div id="intro">
                <p style={{ marginTop: 0 }}>
                    Easily create a picture quiz, displayed in a numbered grid.
                </p>
                <p>
                    Just select the images to display in the grid, and then save
                    to a file or print it out.
                </p>
                <p>
                    <span style={{ color: 'red' }}>NEW!</span> Add images to
                    grid in multiple batches
                    <br />
                    <span style={{ color: 'red' }}>NEW!</span> Remove individual
                    images
                    <br />
                    <span style={{ color: 'red' }}>NEW!</span> Shuffle images in
                    random order
                    <br />
                    <span style={{ color: 'red' }}>NEW!</span> Copy image grid
                    to clipboard
                </p>
                <br />
                <MultiFileSelector
                    label="➕ ADD IMAGE(S) TO GRID..."
                    onFilesSelected={props.onFilesSelected}
                    title="Select one or more image files to add to the grid"
                />
                <br />
                <button
                    onClick={props.onSaveGridImageToFile}
                    title="Save the image of the grid to a file on your device"
                >
                    📁 SAVE GRID TO FILE
                </button>{' '}
                <div style={{ display: 'inline-block' }}>
                    &nbsp;&nbsp;or&nbsp;&nbsp;
                </div>
                <button
                    onClick={props.onCopyGridImageToClipboard}
                    title="Copy the image of the grid to the clipboard so you can paste it into another app or website"
                >
                    📋 COPY GRID TO CLIPBOARD
                </button>
                <br />
                <br />
                <button
                    className="btnSecondary"
                    disabled={!props.enableClearGrid}
                    onClick={props.onClearGrid}
                    title="Remove all images from the grid"
                >
                    ✖️ CLEAR GRID
                </button>
                &nbsp;
                <button
                    className="btnSecondary"
                    disabled={!props.enableShuffle}
                    onClick={props.onRandomiseGridOrder}
                    title="Randomise the order of images in the grid"
                >
                    🔀 SHUFFLE IMAGES
                </button>
                <br />
            </div>
            <div style={{ clear: 'both' }}></div>
        </div>
    );
}

PictureQuizOverview.propTypes = {
    enableClearGrid: PropTypes.bool.isRequired,
    enableShuffle: PropTypes.bool.isRequired,
    onFilesSelected: PropTypes.func.isRequired,
    onSaveGridImageToFile: PropTypes.func.isRequired,
    onCopyGridImageToClipboard: PropTypes.func.isRequired,
    onClearGrid: PropTypes.func.isRequired,
    onRandomiseGridOrder: PropTypes.func.isRequired,
};

export default PictureQuizOverview;
