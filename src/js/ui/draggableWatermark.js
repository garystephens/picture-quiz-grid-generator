import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
//import { addClassToElementTemporarily } from '../utils/utils.js';
import { useTemporarilyHighlightChange } from '../utils/reactUtils.js';

function DraggableWatermark(props) {
    //const prevWatermarketText = usePrevious(props.watermarkText);

    useTemporarilyHighlightChange(
        '#watermarkText',
        'highlight',
        500,
        props.watermarkText
    );

    // // On change of watermark text
    // useEffect(() => {
    //     // Highlight changes to the watermark with a temporary style change
    //     if (
    //         prevWatermarketText !== undefined &&
    //         props.watermarkText !== prevWatermarketText
    //     ) {
    //         addClassToElementTemporarily('#watermarkText', 'highlight', 500);
    //     }
    // }, [props.watermarkText, prevWatermarketText]);

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
