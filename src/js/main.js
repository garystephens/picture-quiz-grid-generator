import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import PictureQuizGenerator from './ui/pictureQuizGenerator.js';
import '../styles/styles.scss';

function injectPictureQuizGenerator() {
    ReactDOM.render(
        React.createElement(PictureQuizGenerator, {}),
        document.getElementById('content')
    );
}

function showBody() {
    $('body').show();
}

$(window).on('load', function () {
    showBody();
    injectPictureQuizGenerator();
});
