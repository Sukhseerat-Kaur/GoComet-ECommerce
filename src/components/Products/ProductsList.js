import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../../redux/slices/productSlice';
import Loading from '../Loading';

import Card from './Card';
import Cart from '../Cart';

const ProductsList = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { showCart } = useSelector((state) => state.showCart);
  const [category, setCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [sortby, setSortby] = useState('');
  const [searchValue, setSearchValue] = useState('');
  console.log('sort', sortby);

  const [localProds, setLocalProds] = useState([]);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  useEffect(() => {
    const createCategory = () => {
      const set = new Set(products.map((val) => val.category.toLowerCase()));
      setCategoryList([...set]);
    };
    if (!isLoading) {
      createCategory();
      setLocalProds(products);
    }
  }, [isLoading, products]);

  useEffect(() => {
    const sortProds = () => {
      console.log('localProds', localProds);
      if (sortby === 'price low to high') {
        let sortedProds = [...localProds].sort((a, b) => {
          return parseInt(a.price) - parseInt(b.price);
        });
        setLocalProds(sortedProds);
      } else if (sortby === 'price high to low') {
        let sortedProds = [...localProds].sort((a, b) => {
          return parseInt(b.price) - parseInt(a.price);
        });
        setLocalProds(sortedProds);
      } else if (sortby === 'rating low to high') {
        let sortedProds = [...localProds].sort((a, b) => {
          return parseInt(a.rating) - parseInt(b.rating);
        });
        setLocalProds(sortedProds);
      } else if (sortby === 'rating high to low') {
        let sortedProds = [...localProds].sort((a, b) => {
          return parseInt(b.rating) - parseInt(a.rating);
        });
        setLocalProds(sortedProds);
      } else setLocalProds(products);

      console.log(localProds);
    };

    sortProds();
  }, [sortby]);

  if (isLoading) return <Loading />;
  return (
    <>
      <Cart />
      <section className="h-screen">
        <div className="flex flex-col mx-auto w-10/12 items-center justify-center p-5">
          <input
            type="text"
            className="p-2"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
          />
          <select
            name="sort by"
            className="p-2 self-end overflow-hidden"
            onClick={(e) => setSortby(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price low to high">Price low to high</option>
            <option value="price high to low">Price high to low</option>
            <option value="rating low to high">Rating low to high</option>
            <option value="rating high to low">Rating high to low</option>
          </select>
        </div>
        <div className="flex-1 bg-gray-400-400 p-3 pt-5 fixed left-0 top-16 h-screen">
          <span
            className=" font-semibold
        "
          >
            FILTERS
          </span>
          <div>
            {categoryList.map((val, idx) => (
              <div>
                <input
                  id={idx}
                  type="checkbox"
                  key={idx}
                  className={`px-2 ml-4 mb-2 rounded-lg bg-red-100 inline-block cursor-pointer ${
                    category.includes(val) && 'bg-pink-300'
                  }`}
                  onChange={() => {
                    const has = category.includes(val);
                    if (has)
                      setCategory((s) => s.filter((item) => item !== val));
                    else setCategory((s) => [...s, val]);
                  }}
                />
                <label key={val} htmlFor={idx}>
                  {val}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto flex flex-wrap w-10/12 justify-center">
          {localProds
            .filter((item) => {
              if (searchValue === '') return item;
              else return item.title.toLowerCase().includes(searchValue);
            })
            .filter(
              (item) =>
                category.includes(item.category) || category.length === 0
            )
            .map((val, idx) => {
              return <Card val={val} key={idx} />;
            })}
        </div>
      </section>
    </>
  );
};

export default ProductsList;
