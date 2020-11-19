import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { addClassToElementTemporarily } from '../utils.js';
import { usePrevious } from '../reactUtils.js';

function DraggableWatermark(props) {
    const [watermarkText, setWatermarkText] = useState(props.watermarkText);
    const prevWatermarketText = usePrevious(watermarkText);

    // On change of watermark text
    useEffect(() => {
        setWatermarkText(props.watermarkText);
        // Highlight changes to the watermark with a temporary style change
        if (
            prevWatermarketText !== undefined &&
            props.watermarkText !== prevWatermarketText
        ) {
            addClassToElementTemporarily('#watermarkText', 'highlight', 500);
        }
    }, [props.watermarkText]);

    return (
        <Draggable>
            <div id="watermark">
                <div
                    id="watermarkText"
                    className={props.watermarkVertical ? 'rotate90' : ''}
                >
                    {watermarkText}
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
