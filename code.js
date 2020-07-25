/* global
$,
gtag,
setOptionsFromLocalStorage,
saveImageShapeToLocalStorage,
saveWatermarkTextToLocalStorage,
saveDarkModeToLocalStorage,
saveImagesPerRowToLocalStorage,
saveCropImagesToLocalStorage,
saveWatermarkVerticalToLocalStorage,
saveAnswerDisplayToLocalStorage
 */

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
        $('#grid').append(
            $(makeImageDiv('images/yourImageHere.png', count, ''))
        );
        count++;
    }
}

function removeExtensionFromFileName(fileName) {
    return fileName.substr(0, fileName.lastIndexOf('.')) || fileName;
}

function convertFileNameToAnswer(fileName) {
    return removeExtensionFromFileName(fileName).replace(/_/g, ' ');
}

function makeAnswerTag(fileName) {
    var showAnswer = $('#answerDisplay').val() === 'answer';

    if (fileName === '') {
        return '';
    } else {
        return (
            '<span class="answer" ' +
            (showAnswer ? 'style="display:block"' : '') +
            '>' +
            convertFileNameToAnswer(fileName) +
            '</span>'
        );
    }
}

function makeSpaceForAnswerTag() {
    var showSpaceForAnswer = $('#answerDisplay').val() === 'blankSpace';

    return (
        '<span class="spaceForAnswer" ' +
        (showSpaceForAnswer ? 'style="display:block"' : '') +
        '></span>'
    );
}

function makeImageDiv(imageData, index, fileName) {
    var cropImages = $('#cropImages').is(':checked');
    var width = String(100 / getImagesPerRow());

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

function readFiles(files, index) {
    var file = files[index];
    var reader = new window.FileReader();
    reader.onload = function (e) {
        $('#grid').append(
            makeImageDiv(e.target.result, index, files[index].name)
        );
        readNextFile(files, index);
    };
    reader.readAsDataURL(file);
}

function readNextFile(files, i) {
    if (i < files.length - 1) {
        readFiles(files, i + 1);
    } else {
        handleClickImageToCrop();
        //handleFineTuneImagePositioning();
    }
}

// function moveUp($image) {
//     $image.css('object-position', '50% 40%');
// }

// function handleFineTuneImagePositioning() {
//     var isDragging = false;
//     var startPos;

//     $('#grid > div img')
//         .mousedown(function (e) {
//             isDragging = false;
//             startPos = e.pageY;
//         })
//         .mousemove(function () {
//             isDragging = true;
//         })
//         .mouseup(function (e) {
//             var wasDragging = isDragging;
//             var endPos = e.pageY;
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

function handleWindowResize() {
    var resizeTimeout;
    $(window).resize(function () {
        // On resize, don't adjust image size immediately (too computationally heavy),
        // instead wait for user to stop resizing the window for a moment
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            setImageSize($('#imagesPerRow').val());
        }, 100);
    });
}

function setImageSize(imagesPerRow) {
    imagesPerRow = Number(imagesPerRow);
    $('div#grid > div').css('width', String(100 / imagesPerRow) + '%');
    return;
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
        $('.imageNumber').css('font-size', '14px');
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
        var answerDisplay = $(this).val();
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

function numberTheImages() {}

function setUpGrid() {
    addPlaceHolderImages(getImagesPerRow() * 3);
    numberTheImages();
    cropImagesByDefault();
    showGrid();
}

$(window).on('load', function () {
    setUpGrid();
    handleUserActions();
    setOptionsFromLocalStorage();
    showBody();
});
