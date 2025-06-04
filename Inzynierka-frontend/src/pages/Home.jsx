import React from 'react'
import UserStore from "../stores/UserStore.js";

function Home() {

    const user = UserStore((state) => state.user);
    console.log(user);
    return (
        <div className="px-5 py-3 mb-20">
            <h1 className="text-black text-[30px] font-semibold">
                Panel główny
            </h1>
        </div>
    )
}

export default Home;