import React from 'react';

import './Frame.scss';

const Frame = ({src, size}) => {
    return <iframe src={src} className={`frame frame--${size}`} />
}

Frame.Group = ({children}) => <div className="frame-group">{children}</div>

export default Frame;