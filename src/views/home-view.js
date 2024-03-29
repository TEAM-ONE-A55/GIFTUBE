/**
 * Generates the HTML string for the home view of GIFtube.
 *
 * @returns {string} - The HTML string representing the content for the home view.
 */
export const toHomeView = () => `
    <div id="home-view">
        <!-- <h1>GITtube App</h1> --!>

        <h1>What you can do on GIFTube App:</h1>
        <div class = "content">

            <!-- <p>This is gifs app. You can:</p>
            <ul>
                <li>See trending gifs</li>
                <li>Search for gifs</li>
                <li>Save your favorite gifs</li>
            </ul> --!>
            <ul>
              <li>See the latest and greatest stolen... oops, we mean "carefully curated" GIFs.</li>
              <li>Search for GIFs that may or may not have slipped through the cracks of copyright law.</li>
              <li>Save your favorites because, let's be honest, they're probably already saved on your camera roll.</li>
            </ul>
        </div>
    </div>
`;