/* eslint-disable no-await-in-loop */
import { q, setActiveNav } from './helpers.js';
import { ABOUT, CATEGORIES, CONTAINER_SELECTOR, FAVORITES, TRENDING, UPLOAD, UPLOADBTN } from '../common/constants.js';
import { loadFavorites, loadRandomGif, loadSingleGif, loadTrending, loadUploads } from '../requests/request-service.js';
import { toTrendingView } from '../views/trending-view.js';
import { toAboutView } from '../views/about-view.js';
import { toFavoritesView } from '../views/favorite-view.js';
import { toUploadBtnView } from '../views/upload-btn-view.js';
import { toSearchView } from '../views/search-view.js';
import { getSearch } from '../data/search-data.js';
import { toUploadsView } from '../views/uploads-view.js';
import { toCategoriesView } from '../views/categories.js';
import { toSimpleView } from '../views/gif-view.js';

/**
 * Loads the specified page, sets the active navigation link, and renders the corresponding content.
 *
 * @param {string} [page=''] - The page to load. Possible values: 'TRENDING', 'FAVORITES', 'ABOUT', 'CATEGORIES'.
 * @returns {void|null} No explicit return value or null if an invalid page is provided.
 */
export const loadPage = (page = '') => {
    switch (page) {
    case TRENDING:
        setActiveNav(TRENDING);
        return renderTrending();

    case FAVORITES:
        setActiveNav(FAVORITES);
        return renderFavorites();

    case ABOUT:
        setActiveNav(ABOUT);
        return renderAbout();

    case UPLOAD:
        setActiveNav(UPLOAD);
        return renderUploads();

    case UPLOADBTN:
        return renderUploadBtn();

    case CATEGORIES:
        return renderCategories();

    default: return null;
    }
};

/**
 * Renders the trending GIFs in the specified container using the trending view.
 *
 * @returns {Promise<void>} A promise that resolves after rendering the trending GIFs.
 */
const renderTrending = async () => {
    q(CONTAINER_SELECTOR).innerHTML = toTrendingView(await loadTrending());
};

const renderCategories = async () => {
    q(CONTAINER_SELECTOR).innerHTML = await toCategoriesView();
};
/**
 * Renders the favorite GIFs in the specified container using the favorites view.
 *
 * @returns {Promise<void>} A promise that resolves after rendering the favorite GIFs.
 */
export const renderFavorites = async () => {
    const favorites = loadFavorites();
    const favoriteGifs = [];

    if (favorites.length !== 0) {
        for (const id of favorites) {
            const promise = await loadSingleGif(id);
            favoriteGifs.push(promise);
        }
        q(CONTAINER_SELECTOR).innerHTML = toFavoritesView(favoriteGifs);
        q('#h3-favorite-view').innerHTML = '❤️ Your favorite GIFs';
    } else {
        const promise = await loadRandomGif();
        favoriteGifs.push(promise);
        q(CONTAINER_SELECTOR).innerHTML = toFavoritesView(favoriteGifs, true);
        q('#h3-favorite-view').innerHTML = 'No GIFs yet 🥺';
    }
};

/**
 * Renders the about view in the specified container.
 *
 * @returns {void} No explicit return value.
 */

const renderAbout = () => {
    q(CONTAINER_SELECTOR).innerHTML = toAboutView();
};

/**
 * Renders the search view in GIFtube based on the provided search query.
 *
 * @param {string} query - The search query to be used for fetching search results.
 * @returns {Promise<void>} - A promise that resolves after rendering the search view.
 * @see getSearch
 * @see toSearchView
 */
export const renderSearch = async (query) => {
    q(CONTAINER_SELECTOR).innerHTML = toSearchView(await getSearch(query), query);
};

/**
 * Renders the "Upload Gif" button view in GIFtube.
 *
 * @returns {void} - The function doesn't return a value.
 * @see toUploadBtnView
 */
export const renderUploadBtn = () => {
    q(CONTAINER_SELECTOR).innerHTML = toUploadBtnView();
};

/**
 * Renders the "Uploads" view in GIFtube, displaying information about uploaded GIFs.
 * If there are uploaded GIFs, it retrieves the details for each GIF and updates the view.
 * If there are no uploads, it displays a message indicating the absence of GIFs.
 *
 * @async
 * @function
 * @returns {Promise<void>}
 */
export const renderUploads = async () => {
    const uploads = await loadUploads();
    const uploadGifs = [];
    if (uploads.length !== 0) {
        for (const id of uploads) {
            const promise = await loadSingleGif(id.id);
            uploadGifs.push(promise);
        }
        q(CONTAINER_SELECTOR).innerHTML = toUploadsView();
        q('.h3-uploads-view').innerHTML = `${uploadGifs[0].username}`;
        q('.uploads-container').innerHTML = `${uploadGifs.map((g) => toSimpleView(g)).join('\n')}`;
    } else {
        q(CONTAINER_SELECTOR).innerHTML = toUploadsView();
        q('.h3-uploads-view').innerHTML = 'No GIFs yet 🥺';
    }
};