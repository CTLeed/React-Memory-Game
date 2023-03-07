import React, { useState, useEffect } from "react";
import Card from "./Card";
import { shuffle } from "./utils";
import Batman from "../imgs/Batman.avif";
import Aquaman from "../imgs/Aquaman.avif";
import Cyborg from "../imgs/Cyborg.avif";
import Flash from "../imgs/Flash.avif";
import GreenLantern from "../imgs/GreenLantern.avif";
import MartianManhunter from "../imgs/MartianManhunter.avif";
import Superman from "../imgs/Superman.avif";
import WonderWoman from "../imgs/WonderWoman.avif";
import Back from "../imgs/JL.avif";
// import Joker from "../imgs/Joker.avif"

const images = [
    Batman,
    Aquaman,
    Cyborg,
    Flash,
    GreenLantern,
    MartianManhunter,
    Superman,
    WonderWoman,
];

const Board = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    // Create the cards and shuffle them
    useEffect(() => {
        const newCards = images
            .map((image, index) => ({
                id: index,
                image,
                isFlipped: false,
                isMatched: false,
            }))
            .concat(
                images.map((image, index) => ({
                    id: index + images.length,
                    image,
                    isFlipped: false,
                    isMatched: false,
                }))
            );

        setCards(shuffle(newCards));
    }, []);

    const handleClick = (id) => {
        const card = cards.find((card) => card.id === id);
        // If the card is already matched or flipped, ignore the click
        if (card.isMatched || card.isFlipped) {
            return;
        }
        if (flippedCards === 2) {
            return;
        }
        // Flip the card over
        const newCards = cards.map((card) =>
            card.id === id ? { ...card, isFlipped: true } : card
        );
        setCards(newCards);
        // Add the flipped card to the list
        setFlippedCards([...flippedCards, { id, image: card.image, isFlipped: true }]);
    };

    useEffect(() => {
        console.log(flippedCards)
        if (flippedCards.length === 2) {
            if (flippedCards[0].image === flippedCards[1].image) {
                setMatchedCards([...matchedCards, ...flippedCards]);
            } else {
                // Flip the cards back over after a delay
                setTimeout(() => {
                    const newCards = cards.map((card) =>
                        flippedCards.find((c) => c.id === card.id)
                            ? { ...card, isFlipped: false }
                            : card
                    );
                    setCards(newCards);
                    setFlippedCards([]);
                }, 500);
                // Empty the flippedCards array
            }
            setFlippedCards([]);
        }
        if (matchedCards.length === 16) {
            window.location.reload();
        }
    }, [flippedCards]);

    return (
        <div className="container">
            <div className="header">
                <div className="box">
                    <h2>Remember the Justice League?</h2>
                </div>
            </div>
            <div className="board">
                <div className="row">
                    {cards.slice(0, 8).map((card) => (
                        <Card
                            key={card.id}
                            id={card.id}
                            image={card.isFlipped || card.isMatched ? card.image : Back}
                            isFlipped={card.isFlipped || card.isMatched}
                            handleClick={handleClick}
                        />
                    ))}
                </div>
                <div className="row">
                    {cards.slice(8, 16).map((card) => (
                        <Card
                            key={card.id}
                            id={card.id}
                            image={card.isFlipped || card.isMatched ? card.image : Back}
                            isFlipped={card.isFlipped}
                            isMatched={card.isMatched}
                            handleClick={handleClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Board;