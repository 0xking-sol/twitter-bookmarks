const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchAllData(bearerToken, csrfToken, url, features) {
    let cursor = null;
    let allData = [];

    while (true) {
        const options = {
            count: 50,
            includePromotedContent: false,
            cursor: cursor,
        };

        const fetchURL = `${url}?variables=${encodeURIComponent(JSON.stringify(options))}&features=${features}`;

        const response = await fetch(fetchURL, {
            headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7",
        authorization: `Bearer ${bearerToken}`,
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "x-csrf-token": csrfToken,
        "x-twitter-active-user": "yes",
        "x-twitter-auth-type": "OAuth2Session",
        "x-twitter-client-language": "zh-tw",
      },

            referrer: "https://twitter.com/i/bookmarks",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
            mode: "cors",
            credentials: "include",
        });

        const data = await response.json();
        const newEntries = data.data.bookmark_timeline_v2.timeline.instructions[0].entries;

        // Break if no new data
        if (newEntries.length === 0) break;

        allData.push(...newEntries);

        cursor = newEntries.find(entry => entry.content.entryType === "TimelineTimelineCursor" && entry.content.cursorType === "Bottom")?.content?.value;

        if (!cursor || newEntries.length < options.count) break;

        await sleep(100);
    }

    allData = allData.filter(entry => entry.content.entryType !== "TimelineTimelineCursor");

    // Directly trim down the data here
    allData = allData.map(data => {
        // Extract tweet text
        const tweet_text = data.content?.itemContent?.tweet_results?.result?.legacy?.full_text;

        // Extract URL
        const urls = data.content?.itemContent?.tweet_results?.result?.legacy?.entities?.urls || [];
        const url = urls[0]?.expanded_url || null;

        // Extract username
        const username = data.content?.itemContent?.tweet_results?.result?.core?.user_results?.result?.legacy?.screen_name;

        // Extract media URL
        const binding_values = data.content?.itemContent?.tweet_results?.result?.card?.legacy?.binding_values || [];
        const media_url = binding_values.find(binding => binding.key.startsWith("player_image"))?.value?.image_value?.url;

        return {
            tweet_text,
            url,
            username,
            media_url
        };
    });

    return allData;
}
