import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";
const { v4: uuidv4 } = require("uuid");

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");

  const pexels_key = "ItKTqb41zAh1YPrPvuXpnGlOEJ8HTa5uoyk2dzI1pvnJ4QRsc4AquSQw";
  const pexels_page_api = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
  const pexels_search_api = `https://api.pexels.com/v1/search?query=${currentSearch}page=${page}&per_page=15`;

  const search = async (url) => {
    const fetchData = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: pexels_key,
      },
    }).catch((e) => {
      console.log(e);
    });
    const parsedData = await fetchData.json();
    setData(parsedData.photos);
  };

  const loadMore = async (url) => {
    setPage(page + 1);
    let newURL;
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }
    const fetchData = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: pexels_key,
      },
    }).catch((e) => {
      console.log(e);
    });
    const parsedData = await fetchData.json();
    setData(parsedData.photos);
  };

  useEffect(() => {
    setPage(1);
    search(pexels_page_api);
  }, []);

  useEffect(() => {
    setPage(1);
    if (currentSearch === "") {
      search(pexels_page_api);
    } else {
      search(pexels_search_api);
    }
  }, [currentSearch]);

  return (
    <div className="homePage">
      <h1>This is home page.</h1>
      <Search
        search={() => {
          setCurrentSearch(input);
        }}
        setInput={setInput}
      />
      {data && data.map((d) => <Picture key={uuidv4()} data={d} />)}
      <div className="morePicture">
        <button onClick={loadMore}>Load More</button>
      </div>
    </div>
  );
};

export default HomePage;
