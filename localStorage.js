/* global
$,
setImageSize,
getImagesPerRow,
setImageNumberFontSizeBasedOnImagesPerRow
*/

/* exported
saveWatermarkTextToLocalStorage,
saveCropImagesToLocalStorage,
saveImagesPerRowToLocalStorage
saveImageShapeToLocalStorage,
saveDarkModeToLocalStorage,
saveWatermarkVerticalToLocalStorage,
saveAnswerDisplayToLocalStorage,
setOptionsFromLocalStorage
*/

var ANSWERDISPLAY_LOCALSTORAGE_NAME = 'answerDisplay';
var WATERMARKTEXT_LOCALSTORAGE_NAME = 'watermarkText';
var WATERMARKVERTICAL_LOCALSTORAGE_NAME = 'watermarkVertical';
var CROPIMAGES_LOCALSTORAGE_NAME = 'cropImages';
var IMAGESPERROW_LOCALSTORAGE_NAME = 'imagesPerRow';
var IMAGESHAPE_LOCALSTORAGE_NAME = 'imageShape';
var DARKMODE_LOCALSTORAGE_NAME = 'darkMode';

function setAnswerDisplayFromLocalStorage() {
    var answerDisplay = localStorage.getItem(ANSWERDISPLAY_LOCALSTORAGE_NAME);
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
    var watermarkVertical = localStorage.getItem(
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
    var watermarkText = localStorage.getItem(WATERMARKTEXT_LOCALSTORAGE_NAME);
    if (watermarkText !== null) {
        $('#watermarkText').val(watermarkText);
        $('#watermark').text(watermarkText);
    }
}

function saveWatermarkTextToLocalStorage(watermarkText) {
    localStorage.setItem(WATERMARKTEXT_LOCALSTORAGE_NAME, watermarkText);
}

function setCropImagesFromLocalStorage() {
    var cropImages = localStorage.getItem(CROPIMAGES_LOCALSTORAGE_NAME);
    if (cropImages !== null) {
        $('#cropImages').attr('checked', cropImages === 'true');
        $('#cropImages').toggleClass('cropImage', cropImages === 'true');
    }
}

function saveCropImagesToLocalStorage(value) {
    localStorage.setItem(CROPIMAGES_LOCALSTORAGE_NAME, value);
}

function setImagesPerRowFromLocalStorage() {
    var imagesPerRow = localStorage.getItem(IMAGESPERROW_LOCALSTORAGE_NAME);
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
    var imageShape = localStorage.getItem(IMAGESHAPE_LOCALSTORAGE_NAME);
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
    var darkMode = localStorage.getItem(DARKMODE_LOCALSTORAGE_NAME);
    $('#darkMode').attr('checked', darkMode === 'true');
    $('body').toggleClass('darkMode', darkMode === 'true');
}

function saveDarkModeToLocalStorage(value) {
    localStorage.setItem(DARKMODE_LOCALSTORAGE_NAME, value);
}

function setOptionsFromLocalStorage() {
    setAnswerDisplayFromLocalStorage();
    setWatermarkTextFromLocalStorage();
    setCropImagesFromLocalStorage();
    setDarkModeFromLocalStorage();
    setImagesPerRowFromLocalStorage();
    setImageShapeFromLocalStorage();
    setWatermarkVerticalFromLocalStorage();
}
