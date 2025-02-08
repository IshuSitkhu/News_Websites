import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteScrollWrapper = ({ children, fetchMore, hasMore, loader }) => {
  return (
    <InfiniteScroll
      dataLength={children.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={loader}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollWrapper;
