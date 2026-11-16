// YouTube links open in a new tab on computers (target="_blank" in the HTML).
// On phones, open them in the YouTube app instead, falling back to the website.
(function () {
  var ua = navigator.userAgent;
  var android = /Android/i.test(ua);
  var ios = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  if (!android && !ios) return;
  var YT = /^https?:\/\/(www\.|m\.)?(youtube\.com|youtu\.be)\//i;
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || !YT.test(a.href) || e.defaultPrevented) return;
    e.preventDefault();
    if (android) {
      // Android: ask for the YouTube app; Chrome opens the fallback URL if it isn't installed.
      location.href = 'intent://' + a.href.replace(/^https?:\/\//i, '') +
        '#Intent;scheme=https;package=com.google.android.youtube;S.browser_fallback_url=' +
        encodeURIComponent(a.href) + ';end';
    } else {
      // iOS: a youtube.com link opened in the same tab is handed to the YouTube app if installed.
      location.href = a.href;
    }
  });
})();
