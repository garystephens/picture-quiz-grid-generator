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

function readAsDataURLPromise(file) {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onerror = reject;
        fr.onload = function (e) {
            resolve({
                fileName: file.name,
                filePath: e.target.result,
            });
        };
        fr.readAsDataURL(file);
    });
}

async function readFilelist(filelist) {
    let fileDetailsArray = [];
    for await (const file of filelist) {
        fileDetailsArray.push(await readAsDataURLPromise(file));
    }
    return fileDetailsArray;
}

function shuffleArray(array) {
    let shuffled = array.slice(); // Copy to keep original unchanged
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export {
    removeExtensionFromFileName,
    convertFileNameToAnswer,
    addClassToElementTemporarily,
    logLoadImagesToGoogleAnalytics,
    readFilelist,
    shuffleArray,
};
