import React, { PropTypes } from 'react'

const Light = ({
    on,
    onClick
}) => {
    return (
        <div 
            className={`light ${on ? 'light--on' : ''}`} 
            onClick={ onClick }
        />
    )
}

Light.defaultProps = {
    onClick: () => {}
}

Light.propTypes = {
    on: PropTypes.bool,
    onClick: PropTypes.func,
    row: PropTypes.number,
    col: PropTypes.number,
}

export default Light