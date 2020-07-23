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
setOptionsFromLocalStorage
*/

var WATERMARKTEXT_LOCALSTORAGE_NAME = 'watermarkText';
var CROPIMAGES_LOCALSTORAGE_NAME = 'cropImages';
var IMAGESPERROW_LOCALSTORAGE_NAME = 'imagesPerRow';
var IMAGESHAPE_LOCALSTORAGE_NAME = 'imageShape';
var DARKMODE_LOCALSTORAGE_NAME = 'darkMode';

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
    var cropImagesValue = localStorage.getItem(CROPIMAGES_LOCALSTORAGE_NAME);
    if (cropImagesValue !== null) {
        $('#cropImages').attr('checked', cropImagesValue === 'true');
        if (cropImagesValue === 'true') {
            $('#pictureQuizGrid img').addClass('cropImage');
        } else {
            $('#pictureQuizGrid img').removeClass('cropImage');
        }
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
    if (darkMode === 'true') {
        $('body').addClass('darkMode');
    } else {
        $('body').removeClass('darkMode');
    }
}

function saveDarkModeToLocalStorage(value) {
    localStorage.setItem(DARKMODE_LOCALSTORAGE_NAME, value);
}

function setOptionsFromLocalStorage() {
    setWatermarkTextFromLocalStorage();
    setCropImagesFromLocalStorage();
    setDarkModeFromLocalStorage();
    setImagesPerRowFromLocalStorage();
    setImageShapeFromLocalStorage();
}
