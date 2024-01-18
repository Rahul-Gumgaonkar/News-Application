import React from "react";
import { Button, Card } from "antd";
import "./style.css";

function News({ news }) {
  return (
    <Card className="news-card">
      <img src={news.urlToImage} alt={news.title} />
      <h2>{news.title}</h2>
      <p>{news.description}</p>
      <Button className="btn-read-more" onClick={() => window.open(news.url)}>
        Read More
      </Button>
    </Card>
  );
}

export default News;
