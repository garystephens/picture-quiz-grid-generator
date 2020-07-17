/* global $, gtag */

window.readMultiFiles = function (files) {
    $('td').hide();
    $('#pictureQuizGrid img').each(function () {
        var $image = $(this);
        $image.removeAttr('src').replaceWith($image.clone(true));
        $image.closest('td').hide();
    });
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

function readFiles(files, startingIndex) {
    var file = files[startingIndex];
    var reader = new window.FileReader();
    reader.onload = function (e) {
        var $image = $('#pictureQuizGrid img').eq(startingIndex);
        $image.attr('src', e.target.result);
        $image.closest('td').css('display', 'table-cell');
        readNextFile(files, startingIndex);
    };
    reader.readAsDataURL(file);
}

function readNextFile(files, i) {
    if (i < files.length - 1) {
        readFiles(files, i + 1);
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

function handleWatermarkTextChange() {
    $('#watermarkText').keyup(function () {
        var watermarkText = $('#watermarkText').val();
        $('#watermark').text(watermarkText);
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
        resizeTimeout = setTimeout(setImageSize, 100);
    });
}

function setImageSize() {
    var contentWidth = $('#content').width();
    var imageWidth = Math.round((contentWidth - 20) / 4);
    $('#pictureQuizGrid img').attr('width', imageWidth);
    $('#pictureQuizGrid img').attr('height', imageWidth);
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

function numberTheImages() {
    $('.imageNumber').each(function (index, image) {
        $(image).text(index + 1);
    });
}

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

function handleUserActions() {
    handleDraggingWatermark();
    handleCropImagesChange();
    handleWindowResize();
    handleWatermarkTextChange();
    handleWatermarkRotation();
    handleShowInstructions();
    handleClickImageToCrop();
}

function setSettingsFromCookies() {
    setWatermarkTextFromCookie();
    setCropImagesFromCookie();
}

function setUpGrid() {
    setImageSize();
    numberTheImages();
    cropImagesByDefault();
    showGrid();
}

$(window).on('load', function () {
    setUpGrid();
    setSettingsFromCookies();
    handleUserActions();
});
