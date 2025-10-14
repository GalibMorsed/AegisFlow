import React from "react";

const  Body=()=> {
  return (
    <>
      <div>
      </div>
      <section className="homecoming bg-blue-100 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to AegisFlow</h1>
          <p className="text-lg mb-8">
            Your gateway to seamless workflow management, Created by Galib Aditya Chakka  🛐 &
            Saurabh Thakulla 
          </p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
            Get Started
          </button>
        </div>
      </section>
    </>
  );
}

export default Body;