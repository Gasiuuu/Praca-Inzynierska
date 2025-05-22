import React, {useState} from 'react'
import DictionaryInput from "../components/DictionaryInput.jsx";
import DictionaryResult from "../components/DictionaryResult.jsx";

function TranslatePage() {

    const[result, setResult] = useState(null)

    return(
        <div>
            <DictionaryInput onSearchResult={setResult}/>
            {result && <DictionaryResult data={result} /> }
        </div>
    )

}

export default TranslatePage