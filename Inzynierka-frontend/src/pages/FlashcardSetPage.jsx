import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import FlashcardService from "../services/FlashcardService.js";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import { IoVolumeMedium } from "react-icons/io5";

const colorMap = {
    niebieski: {
        label: "Rzeczownik",
        bg: "bg-blue-500",
        border: "border-8 border-blue-500",
    },
    czerwony: {
        label: "Czasownik",
        bg: "bg-red-500",
        border: "border-7 border-red-500",
    },
    żółty: {
        label: "Związek frazeologiczny",
        bg: "bg-yellow-500",
        border: "border-7 border-yellow-500",
    },
    zielony: {
        label: "Przymiotnik",
        bg: "bg-green-500",
        border: "border-7 border-green-500",
    }
}

function FlashcardSetPage() {

    const { categoryId } = useParams();
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFront, setIsFront] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFlashcards = async (categoryId) => {
        try {
            const response = await FlashcardService.getFlashcardByCategoryId(categoryId)
            console.log("odp z endpointu: ", response)
            setFlashcards(response)
            setCurrentIndex(0)
            setIsFront(true)
        } catch(error) {
            console.error(error);
            setError("Nie udało załadować się fiszek")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFlashcards(categoryId);
    }, [categoryId]);

    if(loading) return <p>Ładowanie...</p>;
    if(error) return <p>{error}</p>
    if(flashcards.length === 0) return <p>Brak fiszek w tej kategorii</p>

    const card = flashcards[currentIndex]
    const { label, bg, border } = colorMap[card.color] || {label: '', bg: '', border: ''};

    const prevCard = () => {
        setCurrentIndex(i => Math.max(i - 1, 0))
        setIsFront(true)
    }

    const nextCard = () => {
        setCurrentIndex(i => Math.min(i + 1, flashcards.length - 1))
        setIsFront(true)
    }

    const toggleSide = () => setIsFront(f => !f)


    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center justify-between">
                <button
                    onClick={prevCard}
                    disabled={currentIndex === 0}
                    className="p-4 mr-3 bg-[#9b0707] hover:bg-[#920707] transition duration 500 rounded-full cursor-pointer disabled:opacity-70"
                >
                    <BiSolidLeftArrow className="text-3xl text-white" />
                </button>

                <div
                    className={`mb-10 rounded-lg relative h-110 w-120`}
                    style={{ perspective: "1000px" }}
                >
                    <div
                        key={currentIndex}
                        className="relative w-full h-full transition-transform duration-700"
                        style={{
                            transformStyle: "preserve-3d",
                            transform: isFront ? "rotateY(0deg)" : "rotateY(180deg)",
                        }}
                    >
                        <div
                            className={`absolute inset-0 bg-[#f5f5f5] rounded-4xl shadow-xl overflow-hidden ${border}`}
                            style={{ backfaceVisibility: "hidden" }}
                        >
                            <div className={`${bg} inline-block w-1/2 min-w-[130px] px-3 py-2 text-white text-center text-lg md:text-xl lg:text-2xl font-medium`} style={{
                                clipPath: 'polygon(0 0, 100% 0, calc(100% - 30px) 100%, 0 100%)'
                            }}>
                                <span className="mr-[30px]">{label}</span>
                            </div>
                            <div className="p-5 text-center space-y-2">
                                {card.image && (
                                    <img src={card.image} alt="obraz" className="mx-auto max-h-32"/>
                                )}
                                <div className="flex flex-row justify-center">
                                    <p className="text-4xl font-bold">{card.front}</p>
                                    <button
                                        onClick={() => {
                                            const audio = new Audio(card.front_audio);
                                            audio.play();
                                        }}
                                        className=" ml-2 p-3 bg-gray-300 rounded-full hover:bg-gray-400 transition duration-300"
                                    >
                                        <IoVolumeMedium/>
                                    </button>
                                </div>

                                {card.article && (
                                    <p>
                                        <span className="italic text-gray-500">Rodzajnik: </span>
                                        {card.article}
                                    </p>
                                )}
                                {card.plural && (
                                    <p>
                                        <span className="italic text-gray-500">Liczba mnoga: </span>
                                        {card.plural}
                                    </p>
                                )}
                                {card.synonym && (
                                    <p>
                                        <span className="italic text-gray-500">Synonim: </span>
                                        {card.synonym}
                                    </p>
                                )}
                                {card.example_sentence && (
                                    <p>
                                        <span className="italic text-gray-500">Przykład: </span>
                                        {card.example_sentence}
                                        <button
                                            onClick={() => {
                                                const audio = new Audio(card.example_sentence_audio);
                                                audio.play();
                                            }}
                                            className=" ml-2 p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition duration-300"
                                        >
                                            <IoVolumeMedium/>
                                        </button>

                                    </p>

                                )}
                            </div>
                        </div>

                        <div
                            className={`absolute inset-0 bg-[#f5f5f5] rounded-4xl shadow-xl overflow-hidden ${border}`}
                            style={{
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                            }}
                        >
                            <div
                                className={`${bg} inline-block w-1/2 px-3 py-2 text-white text-center text-2xl font-medium`} style={{
                                clipPath: 'polygon(0 0, 100% 0, calc(100% - 30px) 100%, 0 100%)'
                            }}>
                                <span className="mr-[30px]">{label}</span>
                            </div>
                            <div className="p-5 text-center space-y-2">
                                {card.image && (
                                    <img src={card.image} alt="obraz" className="mx-auto max-h-32" />
                                )}
                                <p className="text-4xl font-bold mb-10">{card.reverse}</p>

                                {card.example_sentence_translation && (
                                    <p>
                                        <span className="italic text-gray-500">Tłumaczenie zdania: </span>
                                        {card.example_sentence_translation}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={nextCard}
                    disabled={currentIndex === flashcards.length - 1}
                    className="p-4 ml-3 bg-[#16660c] hover:bg-[#155f0b] transition duration 500 rounded-full cursor-pointer disabled:opacity-70"
                >
                    <BiSolidRightArrow className="text-3xl text-white" />
                </button>
            </div>

            <button
                onClick={toggleSide}
                className="block mx-auto mb-6 px-4 py-2 rounded text-lg font-semibold text-white bg-gradient-to-r from-blue-800 to-purple-800 cursor-pointer outline-none"
            >
                {isFront ? "Pokaż tył" : "Pokaż przód"}
            </button>
            <p className="text-center">
                {currentIndex + 1} / {flashcards.length}
            </p>
        </div>
    );
}

export default FlashcardSetPage