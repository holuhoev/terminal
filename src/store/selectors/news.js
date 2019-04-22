import moment from "moment";

export const selectNews = state => {
    const rawNews = state.news.newsList;

    return rawNews.map(news => {
        const date = moment(news.eventDate).format("DD MMMM");

        return {
            id:       news.id,
            imageUrl: news.imageUrl,
            title:    news.title,
            tags:     news.tags,
            topic:    news.topic,
            content:  news.content,
            date
        }
    })
};