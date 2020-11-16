/* global $ */

import './styles.scss';

import { PersistData } from './persistData.js';

import {
    convertFileNameToAnswer,
    addClassToElementTemporarily,
    logToGoogleAnalytics,
    readFiles,
} from './utils.js';

const ANSWERDISPLAY_LOCALSTORAGE_NAME = 'answerDisplay';
const WATERMARKTEXT_LOCALSTORAGE_NAME = 'watermarkText';
const WATERMARKVERTICAL_LOCALSTORAGE_NAME = 'watermarkVertical';
const CROPIMAGES_LOCALSTORAGE_NAME = 'cropImages';
const IMAGESPERROW_LOCALSTORAGE_NAME = 'imagesPerRow';
const IMAGESHAPE_LOCALSTORAGE_NAME = 'imageShape';
const DARKMODE_LOCALSTORAGE_NAME = 'darkMode';

const persistGridSize = new PersistData('gridSize');

// TODO - same for other values persisted?

function setGridSizeFromLocalStorage() {
    const gridSize = persistGridSize.get();
    if (gridSize !== null) {
        $('#gridSizeSlider').slider({ value: gridSize });
        $('#grid').css('width', gridSize + '%');
    }
}

function saveGridSizeToLocalStorage(gridSize) {
    persistGridSize.set(gridSize);
}

function setAnswerDisplayFromLocalStorage() {
    const answerDisplay = localStorage.getItem(ANSWERDISPLAY_LOCALSTORAGE_NAME);
    if (answerDisplay !== null) {
        $('#answerDisplay').val(answerDisplay);
        $('.answer').toggle(answerDisplay === 'answer');
        $('.spaceForAnswer').toggle(answerDisplay === 'blankSpace');
    }
}

function saveAnswerDisplayToLocalStorage(answerDisplay) {
    localStorage.setItem(ANSWERDISPLAY_LOCALSTORAGE_NAME, answerDisplay);
}

function setWatermarkVerticalFromLocalStorage() {
    const watermarkVertical = localStorage.getItem(
        WATERMARKVERTICAL_LOCALSTORAGE_NAME
    );
    if (watermarkVertical !== null) {
        $('#watermarkVertical').attr('checked', watermarkVertical === 'true');
        $('#watermark').toggleClass('rotate90', watermarkVertical === 'true');
    }
}

function saveWatermarkVerticalToLocalStorage(watermarkText) {
    localStorage.setItem(WATERMARKVERTICAL_LOCALSTORAGE_NAME, watermarkText);
}

function setWatermarkTextFromLocalStorage() {
    const watermarkText = localStorage.getItem(WATERMARKTEXT_LOCALSTORAGE_NAME);
    if (watermarkText !== null) {
        $('#watermarkText').val(watermarkText);
        $('#watermark').text(watermarkText);
    }
}

function saveWatermarkTextToLocalStorage(watermarkText) {
    localStorage.setItem(WATERMARKTEXT_LOCALSTORAGE_NAME, watermarkText);
}

function setCropImagesFromLocalStorage() {
    const cropImages = localStorage.getItem(CROPIMAGES_LOCALSTORAGE_NAME);
    if (cropImages !== null) {
        $('#cropImages').attr('checked', cropImages === 'true');
        $('#cropImages').toggleClass('cropImage', cropImages === 'true');
    }
}

function saveCropImagesToLocalStorage(value) {
    localStorage.setItem(CROPIMAGES_LOCALSTORAGE_NAME, value);
}

function setImagesPerRowFromLocalStorage() {
    const imagesPerRow = localStorage.getItem(IMAGESPERROW_LOCALSTORAGE_NAME);
    if (imagesPerRow !== null) {
        $('#imagesPerRow').val(String(imagesPerRow));
        setImageSize(getImagesPerRow());
        setImageNumberFontSizeBasedOnImagesPerRow();
    }
}

function saveImagesPerRowToLocalStorage(value) {
    localStorage.setItem(IMAGESPERROW_LOCALSTORAGE_NAME, value);
}

function setImageShapeFromLocalStorage() {
    const imageShape = localStorage.getItem(IMAGESHAPE_LOCALSTORAGE_NAME);
    if (imageShape !== null) {
        $('#imageShape').val(imageShape);
        $('#grid').removeClass();
        $('#grid').addClass(imageShape);
    }
}

function saveImageShapeToLocalStorage(value) {
    localStorage.setItem(IMAGESHAPE_LOCALSTORAGE_NAME, value);
}

function setDarkModeFromLocalStorage() {
    const darkMode = localStorage.getItem(DARKMODE_LOCALSTORAGE_NAME);
    $('#darkMode').attr('checked', darkMode === 'true');
    $('body').toggleClass('darkMode', darkMode === 'true');
}

function saveDarkModeToLocalStorage(value) {
    localStorage.setItem(DARKMODE_LOCALSTORAGE_NAME, value);
}

function setImageSize(imagesPerRow) {
    imagesPerRow = Number(imagesPerRow);
    $('div#grid > div').css('width', `${String(100 / imagesPerRow)}%`);
    return;
}

function setOptionsFromLocalStorage() {
    setAnswerDisplayFromLocalStorage();
    setWatermarkTextFromLocalStorage();
    setCropImagesFromLocalStorage();
    setDarkModeFromLocalStorage();
    setImagesPerRowFromLocalStorage();
    setImageShapeFromLocalStorage();
    setWatermarkVerticalFromLocalStorage();
    setGridSizeFromLocalStorage();
}

function emptyOutGridTable() {
    $('#grid > div').remove();
}

function readNewSetOfFiles(files) {
    function actionPerFile(filePath, index, fileName) {
        $('#grid').append(makeImageDiv(filePath, index, fileName));
    }
    function onComplete() {
        handleClickImageToCrop();
        //handleFineTuneImagePositioning();
    }
    readFiles(files, 0, actionPerFile, onComplete);
}

window.loadNewSetOfFiles = function (files) {
    emptyOutGridTable();
    readNewSetOfFiles(files);
    logToGoogleAnalytics(files.length);
};

function addPlaceHolderImages(numberOfImages) {
    let index = 0;
    while (index < numberOfImages) {
        const imageDiv = $(
            makeImageDiv('images/yourImageHere.png', index, 'answer goes here')
        );
        $('#grid').append(imageDiv);
        index++;
    }
}

function makeAnswerTag(fileName) {
    const showAnswer = $('#answerDisplay').val() === 'answer';
    const style = showAnswer ? 'style="display:block"' : '';
    const answer = convertFileNameToAnswer(fileName);
    if (fileName === '') {
        return '';
    } else {
        return `<span class="answer" ${style}>${answer}</span>`;
    }
}

function makeSpaceForAnswerTag() {
    const showSpaceForAnswer = $('#answerDisplay').val() === 'blankSpace';
    const style = showSpaceForAnswer ? 'style="display:block"' : '';
    return `<span class="spaceForAnswer" ${style}></span>`;
}

function makeImageDiv(imageData, index, fileName) {
    const cropImages = $('#cropImages').is(':checked');
    const width = String(100 / getImagesPerRow());

    return $(
        '<div style="width:' +
            width +
            '%"><span class="imageNumber">' +
            (index + 1) +
            '</span>' +
            makeAnswerTag(fileName) +
            makeSpaceForAnswerTag() +
            '<img src="' +
            //'</span><img draggable="false" src="' +
            imageData +
            '"' +
            (cropImages ? ' class="cropImage"' : '') +
            '></img></div>'
    );
}

// function moveUp($image) {
//     $image.css('object-position', '50% 40%');
// }

// function handleFineTuneImagePositioning() {
//     const isDragging = false;
//     const startPos;

//     $('#grid > div img')
//         .mousedown(function (e) {
//             isDragging = false;
//             startPos = e.pageY;
//         })
//         .mousemove(function () {
//             isDragging = true;
//         })
//         .mouseup(function (e) {
//             const wasDragging = isDragging;
//             const endPos = e.pageY;
//             isDragging = false;
//             if (wasDragging) {
//                 console.error(endPos - startPos);
//                 if (endPos > startPos) {
//                     moveUp($(this));
//                 }
//             } else {
//                 $(this).toggleClass('cropImage');
//             }
//         });
// }

function handleDraggingWatermark() {
    $('#watermark').draggable();
}

function highlightChangeToWatermark() {
    addClassToElementTemporarily('#watermark', 'highlight', 500);
}

function handleWatermarkTextChange() {
    $('#watermarkText').keyup(function () {
        const watermarkText = $('#watermarkText').val();
        $('#watermark').text(watermarkText);
        highlightChangeToWatermark();

        saveWatermarkTextToLocalStorage(watermarkText);
    });
}

function handleWatermarkVertical() {
    $('#watermarkVertical').click(function () {
        if ($(this).is(':checked')) {
            $('#watermark').addClass('rotate90');
            saveWatermarkVerticalToLocalStorage('true');
        } else {
            $('#watermark').removeClass('rotate90');
            saveWatermarkVerticalToLocalStorage('false');
        }
    });
}

let resizeTimeout;
function recalcImageWidth() {
    // On resize, don't adjust image size immediately (too computationally heavy),
    // instead wait for user to stop resizing the window for a moment
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        setImageSize(getImagesPerRow());
    }, 100);
}

function handleWindowResize() {
    $(window).resize(function () {
        recalcImageWidth();
    });
}

function showGrid() {
    $('#pictureQuizGrid').show();
}

function showBody() {
    $('body').show();
}

/*
function makeScreenshot () {
  html2canvas(document.getElementById('pictureQuizGrid'), { scale: 1 }).then(canvas => {
    document.body.appendChild(canvas)
  })
}
*/

function handleCropImagesChange() {
    $('#cropImages').click(function () {
        if ($(this).is(':checked')) {
            $('#pictureQuizGrid img').addClass('cropImage');
            saveCropImagesToLocalStorage('true');
        } else {
            $('#pictureQuizGrid img').removeClass('cropImage');
            saveCropImagesToLocalStorage('false');
        }
    });
}

function handleShowInstructions() {
    $('#showInstructions').click(function () {
        $('#instructions').toggle();
    });
}

function handleClickImageToCrop() {
    $('#pictureQuizGrid img').click(function () {
        $(this).toggleClass('cropImage');
    });
}

function cropImagesByDefault() {
    $('#pictureQuizGrid img').addClass('cropImage');
}

function setImageNumberFontSizeBasedOnImagesPerRow() {
    if (getImagesPerRow() > 6) {
        $('.imageNumber').css('font-size', '13px');
    } else {
        $('.imageNumber').css('font-size', '');
    }
}

function handleChangeImagesPerRow() {
    $('#imagesPerRow').on('change', function () {
        setImageSize(getImagesPerRow());
        saveImagesPerRowToLocalStorage(getImagesPerRow());
        setImageNumberFontSizeBasedOnImagesPerRow();
    });
}

function getImagesPerRow() {
    return Number($('#imagesPerRow').val());
}

function handleChangeImageShape() {
    $('#imageShape').on('change', function () {
        $('#grid').removeClass();
        $('#grid').addClass($(this).val());
        saveImageShapeToLocalStorage($(this).val());
    });
}

function handleChangeDarkMode() {
    $('#darkMode').click(function () {
        if ($(this).is(':checked')) {
            $('body').addClass('darkMode');
            saveDarkModeToLocalStorage('true');
        } else {
            $('body').removeClass('darkMode');
            saveDarkModeToLocalStorage('false');
        }
    });
}

function handleChangeAnswerDisplay() {
    $('#answerDisplay').on('change', function () {
        const answerDisplay = $(this).val();
        $('.answer').toggle(answerDisplay === 'answer');
        $('.spaceForAnswer').toggle(answerDisplay === 'blankSpace');
        saveAnswerDisplayToLocalStorage(answerDisplay);
    });
}

function handleUserActions() {
    handleDraggingWatermark();
    handleCropImagesChange();
    handleWindowResize();
    handleChangeImagesPerRow();
    handleWatermarkTextChange();
    handleWatermarkVertical();
    handleShowInstructions();
    handleClickImageToCrop();
    handleChangeImageShape();
    handleChangeDarkMode();
    handleChangeAnswerDisplay();
}

function handleChangeGridSizeSlider(event, ui) {
    const gridSizeSliderValue = ui.value;
    $('#grid').css('width', gridSizeSliderValue + '%');
    //$('.imageNumber').css('font-size', $('#grid').width() / 50 + 'px');
    //$('.answer').css('font-size', $('#grid').width() / 50 + 'px');
    saveGridSizeToLocalStorage(gridSizeSliderValue);
}

function initGridSizeSlider() {
    $('#gridSizeSlider').slider({
        min: 40,
        max: 100,
        value: 100,
        slide: handleChangeGridSizeSlider,
    });
}

function setUpGrid() {
    addPlaceHolderImages(getImagesPerRow() * 3);
    cropImagesByDefault();
    showGrid();
}

$(window).on('load', function () {
    initGridSizeSlider();
    setUpGrid();
    handleUserActions();
    setOptionsFromLocalStorage();
    showBody();
});
