/* global $, gtag */

function removeExtensionFromFileName(fileName) {
    return fileName.substr(0, fileName.lastIndexOf('.')) || fileName;
}

function convertFileNameToAnswer(fileName) {
    return removeExtensionFromFileName(fileName).replace(/_/g, ' ');
}

let addClassTemporarilyTimeout;
function addClassToElementTemporarily(selector, className, delay) {
    $(selector).addClass(className);
    if (addClassTemporarilyTimeout) {
        clearTimeout(addClassTemporarilyTimeout);
    }
    addClassTemporarilyTimeout = setTimeout(function () {
        $(selector).removeClass(className);
    }, delay);
}

function logLoadImagesToGoogleAnalytics(numberOfImages) {
    gtag('event', 'loadImages', {
        event_category: 'loadImages',
        event_label: numberOfImages,
        value: Number(numberOfImages),
    });
}

// Read contents of specified files, perform actionPerFile for each file, when finished call onComplete
function readFiles(files, index, actionPerFile, onComplete) {
    const file = files[index];
    const reader = new window.FileReader();
    reader.onload = function (e) {
        const filePath = e.target.result;
        const fileName = files[index].name;
        actionPerFile(filePath, index, fileName);
        if (index < files.length - 1) {
            readFiles(files, index + 1, actionPerFile, onComplete);
        } else {
            onComplete();
        }
    };
    reader.readAsDataURL(file);
}

// function JSONStringifyFilelist(fileList) {
//     const newFiles = [];
//     for (let i = 0; i < fileList.length; i++) {
//         newFiles.push({
//             lastModified: fileList[i].lastModified,
//             lastModifiedDate: fileList[i].lastModifiedDate,
//             name: fileList[i].name,
//             size: fileList[i].size,
//             type: fileList[i].type,
//         });
//     }
//     return JSON.stringify(newFiles);
// }

export {
    removeExtensionFromFileName,
    convertFileNameToAnswer,
    addClassToElementTemporarily,
    logLoadImagesToGoogleAnalytics,
    readFiles,
};
