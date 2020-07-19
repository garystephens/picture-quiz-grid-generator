/* global $, gtag */

function emptyOutGridTable() {
    $('#grid > div').remove();
}

window.readMultiFiles = function (files) {
    emptyOutGridTable();
    readFiles(files, 0);
    $('#watermark').show();
    logToGoogleAnalytics(files.length);
};

function logToGoogleAnalytics(numberOfImages) {
    gtag('event', 'loadImages', {
        event_category: 'loadImages',
        event_label: numberOfImages,
        value: Number(numberOfImages),
    });
}

function addPlaceHolderImages(numberOfImages) {
    var count = 0;

    while (count < numberOfImages) {
        $('#grid').append($(makeImageDiv('images/yourImageHere.png', count)));
        count++;
    }
}

function makeImageDiv(fileName, index) {
    var cropImages = $('#cropImages').is(':checked');
    var width = String(100 / getNumberOfColumns());

    return $(
        '<div style="width:' +
            width +
            '%"><span class="imageNumber">' +
            (index + 1) +
            '</span><img src="' +
            fileName +
            '"' +
            (cropImages ? ' class="cropImage"' : '') +
            '></img></div>'
    );
}

function readFiles(files, index) {
    var file = files[index];
    var reader = new window.FileReader();
    reader.onload = function (e) {
        $('#grid').append(makeImageDiv(e.target.result, index));
        readNextFile(files, index);
    };
    reader.readAsDataURL(file);
}

function readNextFile(files, i) {
    if (i < files.length - 1) {
        readFiles(files, i + 1);
    } else {
        handleClickImageToCrop();
    }
}

var WATERMARKTEXT_COOKIE_NAME = 'watermarkText';

function setWatermarkTextFromCookie() {
    var watermarkText = $.cookie(WATERMARKTEXT_COOKIE_NAME);
    if (watermarkText !== undefined) {
        $('#watermarkText').val(watermarkText);
        $('#watermark').text(watermarkText);
    }
}

function saveWatermarkTextToCookie(watermarkText) {
    $.cookie(WATERMARKTEXT_COOKIE_NAME, watermarkText, {
        expires: 99999,
    });
}

var CROPIMAGES_COOKIE_NAME = 'cropImages';

function setCropImagesFromCookie() {
    var cookieValue = $.cookie(CROPIMAGES_COOKIE_NAME);
    if (cookieValue !== undefined) {
        $('#cropImages').attr('checked', cookieValue === 'true');
        if (cookieValue === 'true') {
            $('#pictureQuizGrid img').addClass('cropImage');
        } else {
            $('#pictureQuizGrid img').removeClass('cropImage');
        }
    }
}

function saveCropImagesToCookie(value) {
    $.cookie(CROPIMAGES_COOKIE_NAME, value, {
        expires: 99999,
    });
}

function handleDraggingWatermark() {
    $('#watermark').draggable();
}

var highlightWaterMarkTimeout;
function highlightChangeToWatermark() {
    $('#watermark').addClass('highlight');
    if (highlightWaterMarkTimeout) {
        clearTimeout(highlightWaterMarkTimeout);
    }
    highlightWaterMarkTimeout = setTimeout(function () {
        $('#watermark').removeClass('highlight');
    }, 500);
}

function handleWatermarkTextChange() {
    $('#watermarkText').keyup(function () {
        var watermarkText = $('#watermarkText').val();
        $('#watermark').text(watermarkText);
        highlightChangeToWatermark();

        saveWatermarkTextToCookie(watermarkText);
    });
}

function handleWatermarkRotation() {
    $('#verticalWatermark').click(function () {
        if ($(this).is(':checked')) {
            $('#watermark').addClass('rotate90');
        } else {
            $('#watermark').removeClass('rotate90');
        }
    });
}

function handleWindowResize() {
    var resizeTimeout;
    $(window).resize(function () {
        // On resize, don't adjust image size immediately (too computationally heavy), instead wait for user to stop resizing the window for a moment
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            setImageSize($('#numberOfColumns').val());
        }, 100);
    });
}

function setImageSize(numberOfColumns) {
    numberOfColumns = Number(numberOfColumns);
    $('div#grid > div').css('width', String(100 / numberOfColumns) + '%');
    return;
}

function showGrid() {
    $('#pictureQuizGrid').show();
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
            saveCropImagesToCookie('true');
        } else {
            $('#pictureQuizGrid img').removeClass('cropImage');
            saveCropImagesToCookie('false');
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

function handleChangeNumberOfColumns() {
    $('#numberOfColumns').on('change', function () {
        setImageSize(getNumberOfColumns());
        if (getNumberOfColumns() > 6) {
            $('.imageNumber').css('font-size', '14px');
        } else {
            $('.imageNumber').css('font-size', '');
        }
    });
}

function getNumberOfColumns() {
    return Number($('#numberOfColumns').val());
}

function handleChangeImageShape() {
    $('#imageShape').on('change', function () {
        $('#grid').removeClass();
        $('#grid').addClass($(this).val());
    });
}

function handleUserActions() {
    handleDraggingWatermark();
    handleCropImagesChange();
    handleWindowResize();
    handleChangeNumberOfColumns();
    handleWatermarkTextChange();
    handleWatermarkRotation();
    handleShowInstructions();
    handleClickImageToCrop();
    handleChangeImageShape();
}

function setSettingsFromCookies() {
    setWatermarkTextFromCookie();
    setCropImagesFromCookie();
}

function numberTheImages() {}

function setUpGrid() {
    addPlaceHolderImages(getNumberOfColumns() * 3);
    numberTheImages();
    cropImagesByDefault();
    showGrid();
}

$(window).on('load', function () {
    setUpGrid();
    setSettingsFromCookies();
    handleUserActions();
});
