function readMultiFiles(files) {
    $('img').each(function () {
        var $image = $(this);
        $image.removeAttr('src').replaceWith($image.clone());
        $image.closest('td').hide();
    });
    $('.imageNumber').text('');
    readFile(files, 0);
}

function readFile(files, i) {
    var file = files[i];
    var reader = new FileReader();
    reader.onload = function(e){
        var $image = $('img').eq(i);
        $image.attr('src', e.target.result);
        $image.closest('td').css('display', 'table-cell');
        $('.imageNumber').eq(i).text(i+1);
        readNextFile(e, files, i);
    };
    reader.readAsDataURL(file);
}

function readNextFile(e, files, i) {
    if (i < files.length - 1) {
        readFile(files, i+1);
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
        expires: 99999
    });
};

function makeWatermarkDraggable() {
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
    $(window).resize(function() {
        // On resize, don't adjust image size immediately (too computationally heavy), instead wait for user to stop resizing the window first
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setImageSize, 250);
    }) 
}

function setImageSize() {
    var windowWidth = $("body").prop("clientWidth"); // $(window).width();
    var imageWidth = Math.round((windowWidth - 20) / 4);
    $('img').attr('width', imageWidth);
    $('img').attr('height', imageWidth);
}

function makeScreenshot() {
    html2canvas(document.getElementById('pictureQuizGrid'), {scale: 1}).then(canvas => {
        document.body.appendChild(canvas);
    });
}

$(document).ready(function () {
    setImageSize();
    setWatermarkTextFromCookie();
    makeWatermarkDraggable();
    handleWindowResize();
    handleWatermarkTextChange();
    handleWatermarkRotation();
});