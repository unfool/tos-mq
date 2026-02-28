# Background
MenthorQ provides indicators and levels data for use in TradingView.
This feature implements analogous indicators on the thinkorswim
platform, and provides an easy way to update as often as desired.

You need to do only two things to get started:
- Add two thinkorswim indicators
- Add a bookmarklet to your web browser

A bookmarklet is a piece of code that is executed in the web browser,
and appears as any other web site bookmark. This bookmarklet captures
the levels from the MenthorQ web site and produces the indicator code
that displays the levels in thinkorswim.
# Adding the thinkorswim indicators
The two indicators are shared similar to other items you have probably
added to thinkorswim.

Here are the links to the shared indicators:
- mq_gex
- mq_bl

Once added to thinkorswim, add the two indicators to a chart where you
wish to have the levels displayed.

See *these instructions* for adding shared items to thinkorswim, if
you are unfamiliar with that process.
# Adding the bookmarklet
I am using Google Chrome, so all instructions and development were
done on that browser. It should work similarly on other browsers,
though extensive testing has not been performed on those other than
the current version of Google Chrome.

1. Show the bookmarks bar, if it does not already appear. Under the
   *View* menu, choose *Always Show Bookmarks Bar*.
2. Add the bookmarklet to your web browser by dragging this link to the
bookmarks bar of your browser window:

*MQ Levels ToS*
# Updating the indicators
Use these steps to update the indicators:
// 1. Capture the GEX levels to the clipboard from the *Indices & Stocks > Intraday*
//    section of the MenthorQ web site using the *MQ Levels ToS* bookmarklet
// 2. Click in this script, then select ALL of it by pressing CTRL-a
// 3. With the text selected, paste the clipboard contents by pressing CTRL-v
// 4. Click OK to close the indicator script
// 5. Click OK to close the studies window

1. Go to MenthorQ web site
2. Click bookmarklet

# Notes on using the indicators

