export const normalizeBookData = (data = {}, isbn) => {
    debugger;

    return {
        isbn,
        title: data.title,
        author: data.author.toString(),
        publishDate: data.publishDate.toString(),
        pages: data.pages,
        image: data.image,
        subtitle: data.subtitle,
        description: data.description,
        publisher: data.publisher,
        language: data.language
    }
}