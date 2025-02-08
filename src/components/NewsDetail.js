import React from "react";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams();
  
  // Fetch detailed article by ID (this could come from an API or a static object)
  const news = {
    1: { title: "News Title", content: "Full news content here..." },
    // Add more mock news items if needed
  };

  const article = news[id];

  if (!article) {
    return <h2>News not found</h2>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export default NewsDetail;
