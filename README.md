# Twitter Bookmarks Extractor

This script allows you to fetch and clean your Twitter bookmarks, extracting only the most relevant data: the tweet's text, its URL, the username of the tweeter, and any associated media URL.

## How to Use

1. **Open Twitter in a Web Browser**: 
   Log into your Twitter account and navigate to the bookmarks page.

2. **Open Developer Tools**: 
   - For Chrome: Press `Cmd + Option + J` (Mac) or `Ctrl + Shift + J` (Windows/Linux).
   - For Firefox: Press `Cmd + Option + K` (Mac) or `Ctrl + Shift + K` (Windows/Linux).

3. **Execute the Script**: 
   Copy the entire script and paste it into the console of the Developer Tools, then execute it.

4. **Call the `fetchAllData` Function**: 
   You need to provide specific parameters to the function:

    ```javascript
    const results = await fetchAllData(bearerToken, csrfToken, url, features);
    ```

   Where:
   - `bearerToken`: This is the Bearer token associated with Twitter's API requests. You can find it in the headers of any API request made on the Twitter website. Look for a header that starts with "Bearer" followed by a long string.
      Copy everything after bearer:
         ![image](https://github.com/0xking-sol/twitter-bookmarks/assets/124360861/0ba42731-1f97-4466-b9bd-9de1116746e1)

     
   - `csrfToken`: This is a token used by Twitter for cross-site request forgery protection. It can also be found in the headers of any API request made on the Twitter website.
     
        Copy the csrf token variable:
     
     ![image](https://github.com/0xking-sol/twitter-bookmarks/assets/124360861/2af9e084-48de-4392-ac6d-9f38cd072153)

   
   - `url`: This is the endpoint URL for the API call.
  
        Copy up to the question mark:
           ![image](https://github.com/0xking-sol/twitter-bookmarks/assets/124360861/346968b0-94c5-4543-8ef7-4e0907b46784)

   - `features`: A string that represents additional features or configurations for the request. It's often a comma-separated list of values, but you'll need to capture the exact string from a live request to the Twitter API.
  
       copy all of the features:
        ![image](https://github.com/0xking-sol/twitter-bookmarks/assets/124360861/88d2a757-178e-448b-9f8f-9c15881aba5f)


6. **Extract and Save Data**: 
   Once the data is fetched, it will be stored in the `results` variable (or whatever variable name you choose). You can copy the bookmarks which will be in json format.
    
<img width="753" alt="Screenshot 2023-09-29 at 12 44 18" src="https://github.com/0xking-sol/twitter-bookmarks/assets/124360861/afb70d5c-bf34-4c75-8e6e-f7c1de546cb9">

## Function Details


The main function, `fetchAllData`, operates as follows:

- It sets initial conditions, including the number of tweets to fetch per request (`count`) and a cursor for pagination.
- It constructs the API request URL and headers, then sends the request.
- The response is parsed, and new data entries are appended to the `allData` list.
- The cursor is updated for the next page of results.
- The function waits for a short period (`sleep(100)`) to avoid hitting rate limits.
- Once all data is fetched, it trims down the data to extract only the relevant fields.
- The cleaned data is returned.
