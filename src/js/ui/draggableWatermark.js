import React, { useRef } from 'react';
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
    const nodeRef = useRef(null);

    return (
        <Draggable nodeRef={nodeRef}>
            <div id="watermark" ref={nodeRef}>
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
