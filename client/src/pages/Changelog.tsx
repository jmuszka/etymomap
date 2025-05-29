import React, { useContext } from 'react'
import { ctx } from '../components/GlobeBackgroundProvider.jsx'
import BackButton from '../components/BackButton.tsx'

const WordPage = ({ setActivePage }) => {

    // Store the word and its definition as strings for quick reference

    const { toggleFocus } = useContext(ctx); // Toggle hovering

    return (
        <div className="flex flex-col text-center">
            <BackButton setActivePage={setActivePage} toggleFocus={toggleFocus} />

            <h1 className="font-bold text-2xl">Release notes</h1><br />

            <div className="text-left px-10">
                <div className="my-5 text-shadow text-shadow-gray-500 text-sm 2xl:text-lg">
                    <b>Version 0.6</b>
                    <ul>
                        <li className="ml-2"> - Added International Phonetic Alphabet spelling for supported words.</li>
                        <li className="ml-2"> - Minor UI tweaks for smaller screens.</li>
                        <li className="ml-2"> - Improved changelog page.</li>
                    </ul>
                     <span className="text-xs">(2025/05/29)</span>
                </div>

                <div className="my-5 text-shadow text-shadow-gray-500 text-sm 2xl:text-lg">
                    <b>Version 0.5</b>
                    <ul>
                        <li className="ml-2"> - Added changelog page.</li>
                    </ul>
                     <span className="text-xs">(2025/05/27)</span>
                </div>

                <div className="my-5 text-shadow text-shadow-gray-500 text-sm 2xl:text-lg">
                    <b>Version 0.4.1</b>
                    <ul>
                        <li className="ml-2"> - Beta release.</li>
                    </ul>
                     <span className="text-xs">(2025/05/25)</span>
                </div>
            </div>
        </div>
    );
}

export default WordPage;