export const normalizeBookData = (data = {}) => {

        return {
            isbn: data?.industryIdentifiers[0]?.identifier,
            title: data.title,
            author: data.authors.toString(),
            publishDate: data.publishedDate.toString(),
            pages: data.pageCount,
            image: data.imageLinks?.thumbnail,
            subtitle: data.subtitle,
            description: data.description,
            publisher: data.publisher,
            language: data.language
        }
}