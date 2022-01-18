export const totalStars = (star = []) => {
   return star.length > 0 ? parseInt(star.reduce((acc,curr) => curr + acc)) / star.length : 0;
}