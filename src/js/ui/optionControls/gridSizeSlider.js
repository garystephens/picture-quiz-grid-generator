import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function GridSizeSlider(props) {
    return (
        <div className="slider">
            <Slider
                defaultValue={props.defaultValue}
                onChange={(gridSize) => props.onChange(gridSize)}
                trackStyle={{ backgroundColor: '#09968f' }}
                handleStyle={{ borderColor: '#09968f' }}
                min={40}
                max={100}
            />
        </div>
    );
}

GridSizeSlider.propTypes = {
    defaultValue: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default GridSizeSlider;
