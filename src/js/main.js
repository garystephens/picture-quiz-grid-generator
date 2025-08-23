import React from 'react';
import { createRoot } from 'react-dom/client';

import 'normalize.css';

import PictureQuizGenerator from './ui/pictureQuizGenerator.js';
import '../styles/styles.scss';

function injectPictureQuizGenerator() {
    const container = document.getElementById('content');
    const root = createRoot(container);
    root.render(React.createElement(PictureQuizGenerator, {}));
}

function showBody() {
    $('body').show();
}

showBody();
injectPictureQuizGenerator();
