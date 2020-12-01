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
    // for (let i = 0; i < files.length; i++) {
    //     output.push(await readAsDataURL(files[i]));
    // }

    // Promise.all(Array.prototype.map.call(files, readAsDataURL))
    //     .then((fileList) => {
    //         onComplete(fileList);
    //         // ...use `urls` (an array) here...
    //     })
    //     .catch((error) => {
    //         // ...handle/report error...
    //     });

    // const fileList = [];
    // function readFile(index) {
    //     const file = files[index];
    //     const reader = new window.FileReader();
    //     reader.onload = function (e) {
    //         const filePath = e.target.result;
    //         const fileName = files[index].name;
    //         fileList.push({
    //             fileName: fileName,
    //             filePath: filePath,
    //         });
    //         if (index < files.length - 1) {
    //             readFile(index + 1);
    //         } else {
    //             onComplete(fileList);
    //         }
    //     };
    //     reader.readAsDataURL(file);
    // }
    // readFile(0);
}

function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export {
    removeExtensionFromFileName,
    convertFileNameToAnswer,
    addClassToElementTemporarily,
    logLoadImagesToGoogleAnalytics,
    readFilelist,
    shuffleArray,
};
