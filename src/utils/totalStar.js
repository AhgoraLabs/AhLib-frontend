export const totalStart = (star = []) => {
   return parseInt(star.reduce((acc,curr) => curr + acc))/star.length
}