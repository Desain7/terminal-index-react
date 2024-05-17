import React, { useEffect, useState } from "react";

function NewsBox() {
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    async function getNews() {
      const res: any = await getNews();
      console.log(res);
      if (res?.code === 0) {
        const {
          data: { data: news },
        } = res;
        setNewsList(news.slice(0, 10));
      } else {
        // message.error("加载失败");
      }
    }
    getNews();
  }, []);
  return (
    <div>
      {newsList.map((news, index) => {
        return (
          <div key={index}>
            <a href={news.url} target="_blank">
              {news.word}
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default NewsBox;
