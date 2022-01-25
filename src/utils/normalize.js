export const normalizeBookData = (data = {}, isbn) => {

    return {
        isbn,
        title: data.title,
        author: data.author?.toString(),
        pages: data.pages,
        image: data.image,
        subtitle: data.subtitle,
        description: data.description,
        publisher: data.publisher,
        language: data.language
    }
}