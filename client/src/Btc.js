import React, { useEffect, useState } from "react";

const Btc = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [btcPrice, setBtcPrice] = useState();

    useEffect(() => {
        fetch("/btc")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setBtcPrice(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //     return <div>Loading...</div>;
    // } else {
    //     return (
    //         btcPrice
    //     );
    // }
    return (
        <div>
            <h1>Current Bitcoin Price: { btcPrice }</h1>
        </div>
    )
}

export default Btc;