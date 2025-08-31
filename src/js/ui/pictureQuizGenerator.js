import React, { useState, useEffect } from 'react';
import domtoimage from 'dom-to-image';
import toast, { Toaster } from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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
import CustomConfirm from './confirmClearGrid.js';

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
    const persistHeaderText = new PersistData('headerText');

    function getPersistedFiles() {
        const persistedFiles = persistFiles.get();
        if (persistedFiles === null) {
            return undefined;
        }
        try {
            return JSON.parse(persistedFiles);
        } catch (ex) {
            // Persisted list of files must be corrupted - so wipe it
            persistFiles.clear();
        }
    }

    function makeDefaultFilesArray(imagesPerRow) {
        return Array(
            imagesPerRow * config.DEFAULT_NUM_ROWS_PLACEHOLDER_IMAGES
        ).fill({
            filePath: 'images/answer goes here.png',
            fileName: 'answer goes here.png',
            isPlaceHolder: true,
        });
    }

    function weAreShowingPlaceholderImages() {
        return files && files[0] && files[0].isPlaceHolder;
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
    const [headerText, setHeaderText] = useState(
        persistHeaderText.get() || config.DEFAULT_OPTIONS.headerText
    );

    async function readNewSetOfFiles(filelist) {
        if (randomiseOrder) {
            filelist = shuffleArray(Array.from(filelist));
        }
        const fileDetails = await readFilelist(filelist);
        const filesToAddTo = weAreShowingPlaceholderImages() ? [] : files;
        const newFileList = filesToAddTo.concat(fileDetails);
        setFiles(newFileList);
        persistFiles.set(JSON.stringify(newFileList));
    }

    function onFilesSelected(filelist) {
        readNewSetOfFiles(filelist);
        logLoadImagesToGoogleAnalytics(filelist.length);
    }

    function doClearingOfGrid() {
        const defaultFileArray = makeDefaultFilesArray(imagesPerRow);
        setFiles(defaultFileArray);
        persistFiles.set(JSON.stringify(defaultFileArray));
    }

    async function clearGrid() {
        confirmAlert({
            customUI: ({ onClose }) => (
                <CustomConfirm
                    onClose={onClose}
                    onConfirm={() => {
                        doClearingOfGrid();
                        onClose();
                    }}
                />
            ),
        });
    }

    function randomiseGridOrder() {
        const filesInNewOrder = shuffleArray(files);
        setFiles(filesInNewOrder);
        persistFiles.set(JSON.stringify(filesInNewOrder));
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

    function onChangeHeaderText(headerText) {
        setHeaderText(headerText);
        persistHeaderText.set(headerText);
    }

    function excludeMarkedElements(node) {
        return !node.classList?.contains('exclude-from-output-image');
    }

    function saveGridImageToFile() {
        domtoimage
            .toPng(document.getElementById('gridAreaToSaveToDisk'), {
                filter: excludeMarkedElements,
            })
            .then(function (dataUrl) {
                const downloadLink = document.createElement('a');
                downloadLink.href = dataUrl;
                switch (answerDisplay) {
                    case 'answer':
                        downloadLink.download = 'picture-quiz-with-answers.png';
                        break;
                    case 'blankSpace':
                        downloadLink.download =
                            'picture-quiz-with-spaces-for-answers.png';
                        break;
                    default:
                        downloadLink.download = 'picture-quiz.png';
                        break;
                }
                downloadLink.click();
                toast(
                    `✅ Image saved to file '${downloadLink.download}'.\n\nIt should be in your Downloads folder.`
                );
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }

    async function copyGridImageToClipboard() {
        try {
            const blob = await domtoimage.toBlob(
                document.getElementById('gridAreaToSaveToDisk'),
                {
                    filter: excludeMarkedElements,
                }
            );
            const item = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([item]);
            toast(
                '✅ Image copied to clipboard 📋.\n\nYou can now paste it into another app or website.'
            );
        } catch (err) {
            console.error('Failed to copy image: ', err);
        }
    }

    function deleteImage(index) {
        const newFileList = [
            ...files.slice(0, index),
            ...files.slice(index + 1),
        ];
        setFiles(newFileList);
        persistFiles.set(JSON.stringify(newFileList));
    }

    return (
        <div>
            <div id="main">
                <PictureQuizOverview
                    enableClearGrid={!weAreShowingPlaceholderImages()}
                    enableShuffle={
                        !weAreShowingPlaceholderImages() && files.length > 1
                    }
                    onFilesSelected={onFilesSelected}
                    onSaveGridImageToFile={saveGridImageToFile}
                    onCopyGridImageToClipboard={copyGridImageToClipboard}
                    onClearGrid={clearGrid}
                    onRandomiseGridOrder={randomiseGridOrder}
                />
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
                    headerText={headerText}
                    onChangeGridSize={onChangeGridSize}
                    onChangeImagesPerRow={onChangeImagesPerRow}
                    onChangeImageShape={onChangeImageShape}
                    onChangeCropImages={onChangeCropImages}
                    onChangeAnswerDisplay={onChangeAnswerDisplay}
                    onChangeWatermarkText={onChangeWatermarkText}
                    onChangeWatermarkVertical={onChangeWatermarkVertical}
                    onChangeDarkMode={onChangeDarkMode}
                    onChangeRandomiseOrder={onChangeRandomiseOrder}
                    onChangeHeaderText={onChangeHeaderText}
                />
            </div>
            <PictureQuizInstructions />
            <div style={{ clear: 'both', height: '12px' }}></div>
            <div id="gridAreaToSaveToDisk">
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
                    headerText={headerText}
                    onDeleteImage={deleteImage}
                />
                <div id="pageUrl">
                    garystephens.github.io/picture-quiz-grid-generator
                </div>
            </div>
            <Toaster />
        </div>
    );
}

PictureQuizGenerator.propTypes = {};

export default PictureQuizGenerator;
