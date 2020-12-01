import React from 'react';
import PropTypes from 'prop-types';

function MultiFileSelector(props) {
    return (
        <div>
            <label id="fileSelectorLabel" htmlFor="fileSelector">
                {props.label}
            </label>
            <input
                type="file"
                id="fileSelector"
                name="fileSelector"
                multiple
                onChange={(event) => {
                    props.onFilesSelected(event.target.files);
                }}
                onClick={(event) => {
                    // Reset value so that if same files are selected next time, it fires the onChange and reloads them (since file contents may have changed)
                    event.target.value = null;
                }}
            />
        </div>
    );
}

MultiFileSelector.propTypes = {
    label: PropTypes.string.isRequired,
    onFilesSelected: PropTypes.func.isRequired,
};

export default MultiFileSelector;
