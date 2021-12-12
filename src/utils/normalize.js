export const normalizeBookData = (data = {}) => {

    if (data?.data?.items?.length > 0) {
        return {
            isbn: data?.data?.items?.[0]?.volumeInfo?.industryIdentifiers[0]?.identifier,
            title: data?.data?.items?.[0]?.volumeInfo?.title,
            author: data?.data?.items[0]?.volumeInfo?.authors.toString(),
            publishDate: data?.data?.items[0]?.volumeInfo?.publishedDate.toString(),
            pages: data?.data?.items[0]?.volumeInfo?.pageCount,
            image: data?.data?.items[0]?.volumeInfo?.imageLinks?.thumbnail,
            subtitle: data?.data?.items[0]?.volumeInfo?.subtitle,
            description: data?.data?.items[0]?.volumeInfo?.description,
            publisher: data?.data?.items[0]?.volumeInfo?.publisher,
            language: data?.data?.items[0]?.volumeInfo?.language
        }
    }
    return {
        isbn: data?.data?.items?.volumeInfo?.industryIdentifiers[0]?.identifier,
        title: data?.data?.items?.volumeInfo?.title,
        author: data?.data?.items?.volumeInfo?.authors.toString(),
        publishDate: data?.data?.items?.volumeInfo?.publishedDate.toString(),
        pages: data?.data?.items?.volumeInfo?.pageCount,
        image: data?.data?.items?.volumeInfo?.imageLinks?.thumbnail,
        subtitle: data?.data?.items?.volumeInfo?.subtitle,
        description: data?.data?.items?.volumeInfo?.description,
        publisher: data?.data?.items?.volumeInfo?.publisher,
        language: data?.data?.items?.volumeInfo?.language
    }

}