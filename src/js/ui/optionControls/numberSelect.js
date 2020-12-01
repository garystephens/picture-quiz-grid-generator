import React from 'react';
import PropTypes from 'prop-types';

function NumberSelect(props) {
    const numberarray = [];
    for (let i = props.min; i <= props.max; i++) {
        numberarray.push(i);
    }

    return (
        <select
            value={props.defaultValue}
            onChange={(e) => props.onChange(Number(e.currentTarget.value))}
        >
            {numberarray.map((i) => (
                <option key={i} value={i}>
                    {i}
                </option>
            ))}
        </select>
    );
}

NumberSelect.propTypes = {
    defaultValue: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
};

export default NumberSelect;
