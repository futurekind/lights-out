import React, { PropTypes } from 'react'

const Controls = props => {
    return (
        <div className="controls">
            <div>
                <i className="material-icons">access_time</i>
            </div>
        </div>
    )
}

Controls.propTypes = {
    currentTime: PropTypes.string,
}

export default Controls