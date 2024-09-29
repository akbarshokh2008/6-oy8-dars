import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";

function Home() {
  const [products, setProducts] = useState([]);
  const nameRef = useRef();
  const priceRef = useRef();
  const deskRef = useRef();

  function handleNewProd(e) {
    e.preventDefault();

    let user = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: deskRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/products", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]);
        nameRef.current.value = "";
        priceRef.current.value = "";
        deskRef.current.value = "";
        alert("Malumotlar muvoffaqiyatli saqlandi✔");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetch("https://auth-rg69.onrender.com/api/products/all")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto w-[1200px]"></div>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create Product
        </h2>
        <form className="space-y-4" onSubmit={handleNewProd}>
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-1"
            >
              Telephon nomi
            </label>
            <input
              ref={nameRef}
              type="text"
              id="username"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter telephon nomi"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-gray-700 font-medium mb-1"
            >
              Narxi
            </label>
            <input
              ref={priceRef}
              type="number"
              id="price"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter narxi"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-1"
            >
              Holati
            </label>
            <textarea
              ref={deskRef}
              id="description"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter holatini kiriting"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit" // Bu submit tugmasi bo'lishi kerak
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>

      <hr />
      <div className="wrapper grid grid-cols-3 gap-12 text-center  pl-10 pr-10 mt-10">
        {products.length > 0 &&
          products.map((product) => {
            return (
              <div
                key={product.id}
                className=" w-full border rounded-lg p-4 shadow-sm bg-slate-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 font-medium mb-1">
                  {product.price}
                </p>
                <p className="text-gray-500 text-sm">{product.description}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
