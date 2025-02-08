import React, { useEffect, useState } from "react"; 
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

const NewsList = ({ category, onProgress }) => {
  const [newsData, setNewsData] = useState([]); // Holds fetched articles
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [page, setPage] = useState(1); // Tracks current page number
  const [hasMore, setHasMore] = useState(true); // Determines if more data is available

  const fetchNews = async () => {
    onProgress(30); // Start loading bar
    setLoading(true); // Set loading state

    try {
      const response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          country: "us",
          category,
          pageSize: 6, // Number of articles per page
          page, // Current page
          apiKey: "2ddcc18f27564154b4fab4ccbb1693bc", // Replace with your API key
        },
      });

      const fetchedArticles = response.data.articles;

      if (fetchedArticles.length === 0) {
        setHasMore(false); // No more articles to fetch
      } else {
        setNewsData((prevNews) => [...prevNews, ...fetchedArticles]);
      }

      setLoading(false); // End loading
      onProgress(100); // Complete loading bar
    } catch (error) {
      console.error("Error fetching news:", error.message);
      setLoading(false); // End loading on error
      onProgress(100); // Complete loading bar
    }
  };

  // Fetch initial data and reset when the category changes
  useEffect(() => {
    setNewsData([]); // Clear old articles
    setPage(1); // Reset page number
    setHasMore(true); // Enable infinite scroll
    fetchNews(); // Fetch first set of articles
  }, [category]);

  // Fetch more articles when the user scrolls
  const fetchMoreNews = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number
    fetchNews(); // Fetch next set of articles
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        {category.charAt(0).toUpperCase() + category.slice(1)} News
      </h1>
      <InfiniteScroll
        dataLength={newsData.length}
        next={fetchMoreNews}
        hasMore={hasMore}
        loader={<p style={{ textAlign: "center" }}>Loading more news...</p>}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Responsive columns
            gap: "20px", // Space between items
            padding: "20px",
          }}
        >
          {newsData.length > 0 ? (
            newsData.map((article, index) => (
              <div
                key={index}
                style={{
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                }}
              >
                {/* Image (Pinterest style with a max height) */}
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  />
                )}

                {/* Text Content (Title, Author, Source, Description) */}
                <div style={{ padding: "15px" }}>
                  {/* Title */}
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "10px 0" }}>
                  {article.title.slice(0, 50)}..
                  </h3>

                  {/* Author */}
                  {article.author && (
                    <p style={{ fontSize: "0.9rem", color: "#555" }}>
                      <strong>Author:</strong> {article.author}
                    </p>
                  )}

                  {/* Source */}
                  {article.source && (
                    <p style={{ fontSize: "0.9rem", color: "#555" }}>
                      <strong>Source:</strong> {article.source.name}
                    </p>
                  )}

                  {/* Description */}
                  <p style={{ fontSize: "1rem", color: "#333", marginBottom: "10px" }}>
                  {article.description ? article.description.slice(0, 104) + "..." : "No description available."}
                  </p>

                  {/* Link */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      color: "#f11946",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                  >
                    Read more
                  </a>
                </div>
              </div>
            ))
          ) : (
            !loading && <p style={{ textAlign: "center" }}>No news available.</p>
          )}
        </div>
      </InfiniteScroll>

      {/* Show the spinner when loading */}
      {loading && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <img
            src="/spinner.gif"  // Replace this with your spinner GIF path or URL
            alt="Loading..."
            style={{ width: "80px", height: "80px" }}
          />
        </div>
      )}
    </div>
  );
};

NewsList.propTypes = {
  category: PropTypes.string.isRequired,
  onProgress: PropTypes.func.isRequired,
};

export default NewsList;
