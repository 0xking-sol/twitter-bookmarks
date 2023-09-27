(()=>{
    function e(e) {
        return new Promise(t=>setTimeout(t, e))
    }
    chrome.runtime.onMessage.addListener(async function(t, n, i) {
        if ("iconClicked" === t.action) {
            let n = t.bookmarksURL.split("?")[0]
              , i = t.bookmarksURL.split("?")[1]
              , a = null;
            // Create a div element for the overlay
            var o = document.createElement("div");
            o.style.position = "fixed",
            o.style.top = "0",
            o.style.left = "0",
            o.style.width = "100%",
            o.style.height = "100%",
            o.style.backgroundColor = "rgba(0, 0, 0, 0.75)",
            o.style.zIndex = "9999",
            o.style.display = "flex",
            o.style.alignItems = "center",
            o.style.justifyContent = "center";
            let l = document.createElement("div");
            l.innerHTML = `
    <svg style="margin-right: 25px; scale: 0.75;" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 33 33;270 33 33" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite"/>
        <circle fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30" stroke-dasharray="187" stroke-dashoffset="610">
          <animate attributeName="stroke" values="#4285F4;#DE3E35;#F7C223;#1B9A59;#4285F4" begin="0s" dur="5.6s" fill="freeze" repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="rotate" values="0 33 33;135 33 33;450 33 33" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite"/>
          <animate attributeName="stroke-dashoffset" values="187;46.75;187" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
    `,
            o.appendChild(l);
            // Create the title element
            var r = document.createElement("h1");
            for (r.textContent = "Downloading... DO NOT close this tab.",
            r.style.color = "#fff",
            r.style.fontFamily = '"TwitterChirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
            // Append the title element to the overlay
            o.appendChild(r),
            document.body || await e(500),
            document.body.appendChild(o); ; ) {
                var s = await function(e, t, n, i) {
                    var o = {
                        count: 50,
                        includePromotedContent: !0
                    };
                    e && (o.cursor = e);
                    var r = `${n}?variables=${encodeURIComponent(JSON.stringify(o))}&features=${i}`;
                    return fetch(r, {
                        headers: {
                            accept: "*/*",
                            "accept-language": "en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7",
                            authorization: t.authorization,
                            "cache-control": "no-cache",
                            "content-type": "application/json",
                            pragma: "no-cache",
                            "sec-ch-ua": '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": '"macOS"',
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "sec-gpc": "1",
                            "x-csrf-token": t["x-csrf-token"],
                            "x-twitter-active-user": "yes",
                            "x-twitter-auth-type": "OAuth2Session",
                            "x-twitter-client-language": "zh-tw"
                        },
                        referrer: "https://twitter.com/i/bookmarks",
                        referrerPolicy: "strict-origin-when-cross-origin",
                        body: null,
                        method: "GET",
                        mode: "cors",
                        credentials: "include"
                    }).then(e=>e.json())
                }(a, t.creds, n, // receipt message or action ?
                // trigger fetch...
                // while downloading.. increase the counter...
                function(e) {
                    var t = {};
                    return e && // Iterate over the pairs and populate the queryParams object
                    e.split("&").forEach(function(e) {
                        var n = e.split("=")
                          , i = decodeURIComponent(n[0])
                          , o = n[1] || "";
                        t[i] ? Array.isArray(t[i]) ? t[i].push(o) : t[i] = [t[i], o] : t[i] = o
                    }),
                    t
                }(i).features);
                if (a = function(e) {
                    // {
                    //           "entryId": "cursor-bottom-1764448556264189666",
                    //           "sortIndex": "1764448556264189666",
                    //           "content": {
                    //             "entryType": "TimelineTimelineCursor",
                    //             "__typename": "TimelineTimelineCursor",
                    //             "value": "HBbGu5/JoafK/DAAAA==",
                    //             "cursorType": "Bottom",
                    //             "stopOnEmptyResponse": true
                    //           }
                    //         }
                    var t = e.data.bookmark_timeline_v2.timeline.instructions[0].entries;
                    return t[t.length - 1].content.value
                }(s),
                chrome.runtime.sendMessage({
                    action: "fetch_page",
                    page: s
                }),
                2 === s.data.bookmark_timeline_v2.timeline.instructions[0].entries.length)
                    break;
                // if (counter >= 5) {
                //   break;
                // }
                await e(100)
            }
            document.body.removeChild(o),
            chrome.runtime.sendMessage({
                action: "finish_download"
            });
            // console.log(message);
            // Handle the icon click event here
            // console.log("Icon clicked!");
            // foobar();
        }
    }),
    document.location.href.includes("bookmarks") && function(e, t) {
        let n = new MutationObserver((n,i)=>{
            let o = document.querySelector(e);
            o && (t(o),
            i.disconnect())
        }
        );
        n.observe(document.documentElement, {
            childList: !0,
            subtree: !0
        })
    }('div[data-testid="primaryColumn"] div[aria-haspopup="menu"]', e=>{
        // Do something with the mounted element
        let t = document.createElement("div");
        t.innerHTML = `
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 11L21.2 2.80005" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 6.8V2H17.2" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
        t.addEventListener("click", ()=>{
            chrome.runtime.sendMessage({
                action: "start_download"
            })
        }
        ),
        // button.style.backgroundColor = "red";
        t.style.position = "absolute",
        t.style.width = "50px",
        t.style.height = "50px",
        t.style.right = "33px",
        t.style.display = "flex",
        t.style.justifyContent = "center",
        t.style.alignItems = "center",
        e.parentNode.insertBefore(t, e)
    }
    )
}
)();
