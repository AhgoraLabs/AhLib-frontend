export const totalStars = (star = []) => {
   return parseInt(star.reduce((acc,curr) => curr + acc)) / star.length
}