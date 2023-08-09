import Card, { CardContent } from '../Card';
import CircularLoader from '../CircularLoader';

const Sender = () => {
    return (
        <Card>
            <CircularLoader />
            <CardContent>
                <p>
                    Initiating transfer sequence... please stand by as we teleport your request to the server. Estimated time of arrival: a few seconds to a few minutes. Get ready to blast off!🛸
                </p>
            </CardContent>
        </Card>
    );
};

export default Sender;