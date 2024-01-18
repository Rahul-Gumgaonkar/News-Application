import React, { useEffect, useState, useRef } from "react";
import News from "./News";
import "./style.css";
import { Button } from "antd";

function NewsApp() {
  const [newsList, setNewsList] = useState([]);
  const [query, setQuery] = useState("tesla");
  const queryInputRef = useRef(null);
  const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2023-12-18&sortBy=publishedAt&apiKey=1c30091e98ae4eb78bbaaacfa1a4b227`;

  useEffect(() => {
    fetchData();
  }, [query]);

  async function fetchData() {
    try {
      if (!query) {
        // If query is empty, don't make the API call
        return;
      }

      const response = await fetch(apiUrl);
      const jsonData = await response.json();

      setNewsList(jsonData.articles);
    } catch (e) {
      console.log("error occur", e);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const queryValue = queryInputRef.current.value;
    setQuery(queryValue);
  }

  function handleSearch(value) {
    setQuery(value);
  }

  return (
    <div className="news-app">
      <h1 className="heading">Daily News</h1>
      <div className="nav-buttons">
        <Button onClick={() => handleSearch("India")}>India</Button>
        <Button onClick={() => handleSearch("USA")}>USA</Button>
        <Button onClick={() => handleSearch("FIFA")}>Fifa</Button>
        <Button onClick={() => handleSearch("Cricket")}>Cricket</Button>
        <Button onClick={() => handleSearch("Movie")}>Movie</Button>
        <Button onClick={() => handleSearch("Wars")}>Wars</Button>
        <Button onClick={() => handleSearch("Car")}>Car</Button>
      </div>
      <form className="Search-input" onSubmit={handleSubmit}>
        <input className="query-input" type="text" ref={queryInputRef} />
        <input
          className="btn-submit"
          onClick={handleSubmit}
          type="submit"
          value="Search"
        />
      </form>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,30%)",
          justifyContent: "space-between",
          rowGap: "20px",
        }}
      >
        {newsList.map((news) => {
          return <News key={news.url} news={news} />;
        })}
      </div>
    </div>
  );
}

export default NewsApp;
