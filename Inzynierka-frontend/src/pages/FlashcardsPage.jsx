import React, { useState, useEffect } from 'react'
import CategoriesService from '../services/CategoryService.js';
import { FaPlusCircle } from "react-icons/fa";
import {Link} from "react-router-dom";

function FlashcardsPage() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await CategoriesService.getCategories()
            console.log('Otrzymano kategorie: ', response)
            setCategories(response)
        } catch(error) {
            console.error('Błąd wczytywania kategorii: ', error);
        }
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-3xl font-semibold">Kategorie fiszek</h1>
                <button className="flex flex-row px-4 py-2 rounded-4xl text-[1.2rem] font-semibold text-white no-underline bg-[linear-gradient(45deg,#000080,#800080)]">
                    <FaPlusCircle className="text-2xl mr-2 mt-0.5" />
                    Utwórz zestaw
                </button>
            </div>

            {categories.length === 0
                ? <p>Ładowanie...</p>
                : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {categories.map(cat => (
                            <Link to={`/fiszki/${cat.id}`}>
                                <div
                                    key={cat.id}
                                    className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-102 duration-400 ease-in-out transition"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="h-2/3 w-full relative overflow-hidden">
                                            <img
                                                src={cat.image}
                                                alt={cat.name}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="h-1/3 w-full relative overflow-visible bg-[#f7f7f7]">
                                            <div
                                                className="absolute inset-0 bg-[#f7f7f7]"
                                                style={{
                                                    transformOrigin: 'top left',
                                                    transform: 'skewY(-8deg)'
                                                }}
                                            />
                                            <span
                                                className="absolute bottom-8 right-6 text-3xl font-semibold text-gray-800">
                                            {cat.name}
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default FlashcardsPage