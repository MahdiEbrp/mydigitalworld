import React from 'react';
import Card from '../Card';
import CircularLoader from '../CircularLoader';

const Loader = () => {
    return (
        <Card>
            <CircularLoader />
            <p>
                &quot;Loading the awesomeness... Please hold tight!🤗&quot;
            </p>
        </Card>
    );
};

export default Loader;