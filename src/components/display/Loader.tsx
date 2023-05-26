import React from 'react';
import Card, { CardContent } from '../Card';
import CircularLoader from '../CircularLoader';

const Loader = () => {
    return (
        <Card>
            <CircularLoader />
            <CardContent>
                <p>
                    &quot;Loading the awesomeness... Please hold tight!🤗&quot;
                </p>
            </CardContent>
        </Card>
    );
};

export default Loader;