import React, { useState, useEffect } from "react";
import styles from "./AllHero.module.css";
import { fetchHero } from "../../api/FetchSerials.js";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";

export const AllHero = () => {
    const [hero, setHero] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setFavourites } = useAction();
    const { favourites } = useSelector((store) => store.favourite);

    const getSerials = async (params) => {
        try {
            setIsLoading(true);
            const res = await fetchHero(params);
            setHero(res);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log("favourites", favourites);
    }, [favourites]);

    useEffect(() => {
        getSerials();
    }, []);
    return (
        <>
            <h2 className={styles.all}>All heroes:</h2>
            <div className={styles.cards}>
                {isLoading ? (
                    <div className={styles.loading}>Loading...</div>
                ) : (
                    hero?.data?.results.map((serial) => (
                        <div className={styles.card} key={serial.id}>
                            <h2 className={styles.title}>{serial.name}</h2>
                            <img
                                className={styles.hero__img}
                                width={"150px"}
                                height={"150px"}
                                src={serial.image}
                                alt="description"
                            />
                            <button onClick={() => setFavourites(serial)}>
                                Избранное(toggle)
                            </button>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};
