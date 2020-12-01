import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { useTemporarilyHighlightChange } from '../utils/reactUtils.js';

function DraggableWatermark(props) {
    useTemporarilyHighlightChange(
        '#watermarkText',
        'highlight',
        500,
        props.watermarkText
    );

    return (
        <Draggable>
            <div id="watermark">
                <div
                    id="watermarkText"
                    className={props.watermarkVertical ? 'rotate90' : ''}
                    style={{
                        display: props.watermarkText === '' ? 'none' : '',
                    }}
                >
                    {props.watermarkText}
                </div>
            </div>
        </Draggable>
    );
}

DraggableWatermark.propTypes = {
    watermarkText: PropTypes.string.isRequired,
    watermarkVertical: PropTypes.bool.isRequired,
};

export default DraggableWatermark;
