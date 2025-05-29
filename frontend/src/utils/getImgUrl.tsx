function getImgUrl (name:string) {
    return new URL(`../assets/books/${name}`, import.meta.url)
}

export {getImgUrl}

const getImgUrls = (name: string): string => {
    return new URL(`../assets/books/${name}`, import.meta.url).href;
};

export default getImgUrls;
  