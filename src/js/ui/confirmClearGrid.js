import React from 'react';
import PropTypes from 'prop-types';

const ConfirmClearGrid = ({ onClose, onConfirm }) => (
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
        <p> ⚠️ Are you sure you want to remove all images from the grid?</p>
        <button style={{ backgroundColor: 'red' }} onClick={onConfirm}>
            💣 Remove all images from grid
        </button>
        &nbsp;&nbsp;
        <button onClick={onClose}>🔙 No, go back!</button>
    </div>
);

export default ConfirmClearGrid;

ConfirmClearGrid.propTypes = {
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};
