import React, { useState, useEffect } from 'react';

import PictureQuizGrid from './pictureQuizGrid.js';
import PictureQuizOptions from './pictureQuizOptions.js';
import PictureQuizInstructions from './pictureQuizInstructions.js';
import PictureQuizOverview from './pictureQuizOverview.js';
import config from './defaultConfig.js';
import { shuffleArray } from '../utils/utils.js';
import {
    readFilelist,
    logLoadImagesToGoogleAnalytics,
} from '../utils/utils.js';
import PersistData from '../utils/persistData.js';

function PictureQuizGenerator() {
    const persistGridSize = new PersistData('gridSize');
    const persistAnswerDisplay = new PersistData('answerDisplay');
    const persistWatermarkText = new PersistData('watermarkText');
    const persistWatermarkVertical = new PersistData('watermarkVertical');
    const persistCropImages = new PersistData('cropImages');
    const persistImagesPerRow = new PersistData('imagesPerRow');
    const persistImageShape = new PersistData('imageShape');
    const persistDarkMode = new PersistData('darkMode');
    const persistRandomiseOrder = new PersistData('randomiseOrder');
    const persistFiles = new PersistData('files');

    function getPersistedFiles() {
        const persistedFiles = persistFiles.get();
        if (persistedFiles === null) {
            return undefined;
        }
        return JSON.parse(persistedFiles);
    }

    function makeDefaultFilesArray(imagesPerRow) {
        return Array(
            imagesPerRow * config.DEFAULT_NUM_ROWS_PLACEHOLDER_IMAGES
        ).fill({
            filePath: 'images/answer goes here.png',
            fileName: 'answer goes here.png',
        });
    }

    const [imagesPerRow, setImagesPerRow] = useState(
        persistImagesPerRow.getNumber() || config.DEFAULT_OPTIONS.imagesPerRow
    );
    const [files, setFiles] = useState(
        getPersistedFiles() || makeDefaultFilesArray(imagesPerRow)
    );
    const [gridSize, setGridSize] = useState(
        persistGridSize.getNumber() || config.DEFAULT_OPTIONS.gridSize
    );
    const [imageShape, setImageShape] = useState(
        persistImageShape.get() || config.DEFAULT_OPTIONS.imageShape
    );
    const [cropImages, setCropImages] = useState(
        persistCropImages.getBoolean() !== null
            ? persistCropImages.getBoolean()
            : config.DEFAULT_OPTIONS.cropImages
    );
    const [answerDisplay, setAnswerDisplay] = useState(
        persistAnswerDisplay.get() || config.DEFAULT_OPTIONS.answerDisplay
    );
    const [watermarkText, setWatermarkText] = useState(
        persistWatermarkText.get() || config.DEFAULT_OPTIONS.watermarkText
    );
    const [watermarkVertical, setWatermarkVertical] = useState(
        persistWatermarkVertical.getBoolean() !== null
            ? persistWatermarkVertical.getBoolean()
            : config.DEFAULT_OPTIONS.watermarkVertical
    );
    const [darkMode, setDarkMode] = useState(
        persistDarkMode.getBoolean() !== null
            ? persistDarkMode.getBoolean()
            : config.DEFAULT_OPTIONS.darkMode
    );
    const [randomiseOrder, setRandomiseOrder] = useState(
        persistRandomiseOrder.getBoolean() !== null
            ? persistRandomiseOrder.getBoolean()
            : config.DEFAULT_OPTIONS.randomiseOrder
    );

    async function readNewSetOfFiles(filelist) {
        if (randomiseOrder) {
            filelist = shuffleArray(Array.from(filelist));
        }
        const fileDetails = await readFilelist(filelist);
        setFiles(fileDetails);
        persistFiles.set(JSON.stringify(fileDetails));
    }

    function onFilesSelected(filelist) {
        readNewSetOfFiles(filelist);
        logLoadImagesToGoogleAnalytics(filelist.length);
    }

    useEffect(() => {
        function updateDarkMode() {
            $('body').toggleClass('darkMode', darkMode);
        }

        updateDarkMode();
    }, [darkMode]);

    function onChangeGridSize(gridSize) {
        setGridSize(gridSize);
        persistGridSize.set(gridSize);
    }

    function onChangeImagesPerRow(imagesPerRow) {
        setImagesPerRow(imagesPerRow);
        persistImagesPerRow.set(imagesPerRow);
    }

    function onChangeImageShape(imageShape) {
        setImageShape(imageShape);
        persistImageShape.set(imageShape);
    }

    function onChangeCropImages(cropImages) {
        setCropImages(cropImages);
        persistCropImages.set(cropImages);
    }

    function onChangeAnswerDisplay(answerDisplay) {
        setAnswerDisplay(answerDisplay);
        persistAnswerDisplay.set(answerDisplay);
    }

    function onChangeWatermarkText(watermarkText) {
        setWatermarkText(watermarkText);
        persistWatermarkText.set(watermarkText);
    }

    function onChangeWatermarkVertical(watermarkVertical) {
        setWatermarkVertical(watermarkVertical);
        persistWatermarkVertical.set(watermarkVertical);
    }

    function onChangeDarkMode(darkMode) {
        setDarkMode(darkMode);
        persistDarkMode.set(darkMode);
    }

    function onChangeRandomiseOrder(randomiseOrder) {
        setRandomiseOrder(randomiseOrder);
        persistRandomiseOrder.set(randomiseOrder);
    }

    return (
        <div>
            <div id="main">
                <PictureQuizOverview onFilesSelected={onFilesSelected} />
                <PictureQuizOptions
                    gridSize={gridSize}
                    imagesPerRow={imagesPerRow}
                    minImagesPerRow={config.MIN_IMAGES_PER_ROW}
                    maxImagesPerRow={config.MAX_IMAGES_PER_ROW}
                    imageShape={imageShape}
                    cropImages={cropImages}
                    answerDisplay={answerDisplay}
                    watermarkText={watermarkText}
                    watermarkVertical={watermarkVertical}
                    darkMode={darkMode}
                    randomiseOrder={randomiseOrder}
                    onChangeGridSize={onChangeGridSize}
                    onChangeImagesPerRow={onChangeImagesPerRow}
                    onChangeImageShape={onChangeImageShape}
                    onChangeCropImages={onChangeCropImages}
                    onChangeAnswerDisplay={onChangeAnswerDisplay}
                    onChangeWatermarkText={onChangeWatermarkText}
                    onChangeWatermarkVertical={onChangeWatermarkVertical}
                    onChangeDarkMode={onChangeDarkMode}
                    onChangeRandomiseOrder={onChangeRandomiseOrder}
                />
            </div>
            <PictureQuizInstructions />
            <div style={{ clear: 'both', height: '12px' }}></div>
            <PictureQuizGrid
                files={files}
                gridSize={gridSize}
                imagesPerRow={imagesPerRow}
                imageShape={imageShape}
                cropImages={cropImages}
                answerDisplay={answerDisplay}
                watermarkText={watermarkText}
                watermarkVertical={watermarkVertical}
                darkMode={darkMode}
                randomiseOrder={randomiseOrder}
            />
            <div id="pageUrl">
                garystephens.github.io/picture-quiz-grid-generator
            </div>
        </div>
    );
}

PictureQuizGenerator.propTypes = {};

export default PictureQuizGenerator;
