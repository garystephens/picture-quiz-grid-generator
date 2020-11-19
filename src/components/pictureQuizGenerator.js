import React, { useState, useEffect } from 'react';

import PictureQuizGrid from './pictureQuizGrid.js';
import PictureQuizOptions from './pictureQuizOptions.js';
import PictureQuizInstructions from './pictureQuizInstructions.js';
import PictureQuizOverview from './pictureQuizOverview.js';

import { readFiles, logLoadImagesToGoogleAnalytics } from '../utils.js';
import PersistData from '../persistData.js';

function PictureQuizGenerator(props) {
    const persistGridSize = new PersistData('gridSize');
    const persistAnswerDisplay = new PersistData('answerDisplay');
    const persistWatermarkText = new PersistData('watermarkText');
    const persistWatermarkVertical = new PersistData('watermarkVertical');
    const persistCropImages = new PersistData('cropImages');
    const persistImagesPerRow = new PersistData('imagesPerRow');
    const persistImageShape = new PersistData('imageShape');
    const persistDarkMode = new PersistData('darkMode');
    const persistFiles = new PersistData('files');

    const DEFAULT_NUM_PLACEHOLDER_IMAGES = 15;

    const defaultFiles = Array(DEFAULT_NUM_PLACEHOLDER_IMAGES).fill({
        filePath: 'images/answer goes here.png',
        index: 0,
        fileName: 'answer goes here.png',
    });

    const DEFAULT_OPTIONS = {
        gridSize: 100,
        imagesPerRow: 5,
        imageShape: 'square',
        cropImages: true,
        answerDisplay: '',
        watermarkText: '',
        watermarkVertical: false,
        darkMode: false,
    };

    function getPersistedFiles() {
        const persistedFiles = persistFiles.get();
        if (persistedFiles === null) {
            return undefined;
        }
        return JSON.parse(persistedFiles);
    }

    const [files, setFiles] = useState(getPersistedFiles() || defaultFiles);
    const [gridSize, setGridSize] = useState(
        persistGridSize.getNumber() || DEFAULT_OPTIONS.gridSize
    );
    const [imagesPerRow, setImagesPerRow] = useState(
        persistImagesPerRow.getNumber() || DEFAULT_OPTIONS.imagesPerRow
    );
    const [imageShape, setImageShape] = useState(
        persistImageShape.get() || DEFAULT_OPTIONS.imageShape
    );
    const [cropImages, setCropImages] = useState(
        persistCropImages.getBoolean() !== null
            ? persistCropImages.getBoolean()
            : DEFAULT_OPTIONS.cropImages
    );
    const [answerDisplay, setAnswerDisplay] = useState(
        persistAnswerDisplay.get() || DEFAULT_OPTIONS.answerDisplay
    );
    const [watermarkText, setWatermarkText] = useState(
        persistWatermarkText.get() || DEFAULT_OPTIONS.watermarkText
    );
    const [watermarkVertical, setWatermarkVertical] = useState(
        persistWatermarkVertical.getBoolean() !== null
            ? persistWatermarkVertical.getBoolean()
            : DEFAULT_OPTIONS.watermarkVertical
    );
    const [darkMode, setDarkMode] = useState(
        persistDarkMode.getBoolean() !== null
            ? persistDarkMode.getBoolean()
            : DEFAULT_OPTIONS.darkMode
    );

    // TODO change to async / await, put compiling of array into util function
    function readNewSetOfFiles(files) {
        const fileList = [];
        function actionPerFile(filePath, index, fileName) {
            fileList.push({
                filePath: filePath,
                index: index,
                fileName: fileName,
            });
        }
        function onComplete() {
            setFiles(fileList);
            persistFiles.set(JSON.stringify(fileList));
        }
        readFiles(files, 0, actionPerFile, onComplete);
    }

    function onFilesSelected(e) {
        readNewSetOfFiles(e.target.files);
        logLoadImagesToGoogleAnalytics(e.target.files.length);
    }

    function updateDarkMode() {
        $('body').toggleClass('darkMode', darkMode);
    }

    useEffect(() => {
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

    return (
        <div>
            <div id="main">
                <PictureQuizOverview onFilesSelected={onFilesSelected} />
                <PictureQuizOptions
                    gridSize={gridSize}
                    imagesPerRow={imagesPerRow}
                    imageShape={imageShape}
                    cropImages={cropImages}
                    answerDisplay={answerDisplay}
                    watermarkText={watermarkText}
                    watermarkVertical={watermarkVertical}
                    darkMode={darkMode}
                    onChangeGridSize={onChangeGridSize}
                    onChangeImagesPerRow={onChangeImagesPerRow}
                    onChangeImageShape={onChangeImageShape}
                    onChangeCropImages={onChangeCropImages}
                    onChangeAnswerDisplay={onChangeAnswerDisplay}
                    onChangeWatermarkText={onChangeWatermarkText}
                    onChangeWatermarkVertical={onChangeWatermarkVertical}
                    onChangeDarkMode={onChangeDarkMode}
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
            />
            <div id="pageUrl">
                garystephens.github.io/picture-quiz-grid-generator
            </div>
        </div>
    );
}

PictureQuizGenerator.propTypes = {};

export default PictureQuizGenerator;
