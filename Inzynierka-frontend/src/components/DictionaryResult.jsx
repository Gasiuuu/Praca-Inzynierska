import React from 'react';
import DOMPurify from "dompurify";

function DictionaryResult({ data }) {

    function sanitizedData(data) {
        return {__html: DOMPurify.sanitize(data)}
    }

    return (
        <div className="p-4 space-y-6 mx-10 my-10">
            {data.map(group => (
                <section key={group.lang}>
                    {/*<h2 className="text-2xl font-bold">*/}
                    {/*    Język: {group.lang.toUpperCase()}*/}
                    {/*</h2>*/}
                    {group.hits.map((hit, hitIndex) => (
                        <div key={hitIndex}>
                            {hit.roms.map((rom, romIndex) => (
                                <div key={romIndex} className="mb-4">
                                    <div className="flex items-center p-5 bg-gray-200">
                                        <h2
                                            className="text-2xl font-bold"
                                            dangerouslySetInnerHTML={sanitizedData(rom.headword)}
                                        />
                                        <h3
                                            className="text-xl ml-10"
                                            dangerouslySetInnerHTML={sanitizedData(rom.headword_full)}
                                        />
                                        <h4
                                            className="text-lg ml-10"
                                            dangerouslySetInnerHTML={sanitizedData(rom.wordclass)}
                                        />
                                    </div>

                                    <div className="flex flex-col items-center bg-gray-100">
                                        {rom.arabs.flatMap((arab, arabIndex) =>
                                            arab.translations.map((t, tIndex) => (
                                                <div key={`${arabIndex}-${tIndex}`} className="flex w-1/2 justify-between p-2">
                                                    <span
                                                        dangerouslySetInnerHTML={sanitizedData(t.source)}
                                                        className="w-1/2 text-left"
                                                    />
                                                    <span
                                                        dangerouslySetInnerHTML={sanitizedData(t.target)}
                                                        className="w-1/2 text-left"

                                                    />
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </section>
            ))}
        </div>
    )
}

export default DictionaryResult;