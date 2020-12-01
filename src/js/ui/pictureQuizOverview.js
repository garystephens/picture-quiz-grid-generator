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
                    Just select the images to display in the grid, and then grab
                    a screenshot or print it out.
                </p>
                <br />
                <MultiFileSelector
                    label="SELECT YOUR IMAGES..."
                    onFilesSelected={props.onFilesSelected}
                />
            </div>
            <div style={{ clear: 'both' }}></div>
        </div>
    );
}

PictureQuizOverview.propTypes = {
    onFilesSelected: PropTypes.func.isRequired,
};

export default PictureQuizOverview;
