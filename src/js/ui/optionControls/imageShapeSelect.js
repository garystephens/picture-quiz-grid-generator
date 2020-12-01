import React from 'react';
import PropTypes from 'prop-types';

function ImageShapeSelect(props) {
    return (
        <select
            value={props.defaultValue}
            onChange={(e) => props.onChange(e.currentTarget.value)}
        >
            <option value="square">Square</option>
            <option value="portrait">Portrait (3:4)</option>
            <option value="portraitTall">Portrait, tall (9:16)</option>
            <option value="landscape">Landscape (4:3)</option>
            <option value="landscapeWide">Landscape, wide (16:9)</option>
        </select>
    );
}

ImageShapeSelect.propTypes = {
    defaultValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default ImageShapeSelect;
