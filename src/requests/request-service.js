import { getTrending } from '../data/trending-data.js';
import { getFavorites } from '../data/favorites.js';
import { getSingleGif } from '../data/single-gif.js';
import { getRandomGif } from '../data/random-gif.js';
import { getUploads } from '../data/uploads.js';
import { getGifsByIds } from '../data/gifs-by-id.js';

/**
 * Loads trending GIFs asynchronously using the getTrending function.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array of objects containing information about trending GIFs.
 */
export const loadTrending = async () => {
    const trending = await getTrending();

    return trending;
};

/**
 * Loads the list of favorite GIF IDs from localStorage.
 *
 * @returns {string[]} An array containing the IDs of favorite GIFs retrieved from localStorage.
 */
export const loadFavorites = () => {
    const favorites = getFavorites();

    return favorites;
};

/**
 * Loads a single GIF asynchronously using the getSingleGif function.
 *
 * @param {string} id - The ID of the GIF to load information for.
 * @returns {Promise<Object>} A promise that resolves to an object containing information about the specified GIF.
 */
export const loadSingleGif = async (id) => {
    const singleGif = await getSingleGif(id);

    return singleGif;
};

/**
 * Loads a random GIF asynchronously using the getRandomGif function.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing information about a randomly selected GIF.
 */
export const loadRandomGif = async () => {
    const randomGif = await getRandomGif();

    return randomGif;
};

/**
 * Loads uploaded GIFs by retrieving their IDs from local storage and fetching
 * details using the GIPHY API.
 *
 * @async
 * @function
 * @returns {Promise<Object[]>} An array of objects containing information about the uploaded GIFs.
 */
export const loadUploads = async () => {
    const uploads = getUploads();
    const idsCommaSeparated = uploads.join(',');
    const gifs = await getGifsByIds(idsCommaSeparated);

    return gifs;
};