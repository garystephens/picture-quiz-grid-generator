/* global $ */

import React from 'react';
import ReactDOM from 'react-dom';
import PictureQuizGenerator from './components/pictureQuizGenerator.js';

import 'normalize.css';
import './styles/styles.scss';

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
