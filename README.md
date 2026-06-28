# The Levelator
## Description
MenthorQ provides indicators and levels data for use in TradingView.
*The Levelator* generates code for analogous indicators that use the
MenthorQ levels data on the *thinkorswim* platform. Updating
the levels is easy!

Only two steps are needed to get started:
1. Add two shared indicators to *thinkorswim*
2. Add a bookmarklet to your web browser

### What's a *bookmarklet*?
A bookmarklet is a piece of code that is executed in the web browser,
and appears as any other web site bookmark. *The Levelator*
bookmarklet captures the levels from the MenthorQ web site and
produces the indicator code that displays the levels in thinkorswim.
### What this is: PLEASE READ BEFORE USING
This is a personal side project, with no warranty nor guarantee that it is suitable for use of any kind.

I am not affiliated with MenthorQ beyond being a very satisfied customer. **They may change their web site at any time without warning and break these tools.** I hope I will be able keep this project working as I use it many times daily, but I cannot predict the future.

Nothing here constitutes any form of financial advice as I have no credentials for any of that. Maybe you will find this entertaining, educational, or otherwise useful for some personal purpose I cannot recommend nor predict.

Thank you for reading! Let's get started!
## Adding the thinkorswim indicators
The two indicators are shared similarly to other items you have likely
added to thinkorswim. ("Indicator" is the general term used here.
*thinkorswim* calls these "studies".)

Here are the links to the shared indicators:
- mq_blind_spots
- mq_gex

Once added to thinkorswim, add the two indicators to a chart where you
wish to have the levels displayed.

See [these instructions](https://www.skool.com/predictableprosperity/classroom/d6a1f4fc?md=c5c0ed0736dc4b38ba8e00be0047ece5) for help adding shared items to thinkorswim, if
you are unfamiliar with that process. Jeff is demonstrating the import of a chart, but it's very similar for these indicators. You just need the first couple of minutes if you have not done this before.
## Adding the bookmarklet
I am using Google Chrome, so all instructions and development are
done on that browser. It should work similarly on other browsers,
though no testing has been performed on those other than Google Chrome.

1. Show the bookmarks bar, if it does not already appear. Under the
   *View* menu, choose *Always Show Bookmarks Bar*.
2. Add the bookmarklet to your web browser by dragging the below link to the
bookmarks bar of your browser window:

*The Levelator*
## Updating the indicators
Use these steps to update each indicator. You should have the chart open
where you want them updated, and you should already have the indicators
added to the chart.
### GEX levels (mq_gex)
GEX level data are updated throughout the trading day by MenthorQ. Use
these steps to update the indicator as often as you wish.

1. Navigate to the *Indices & Stocks > Intraday* section of the MenthorQ web site
2. Make sure you have the *TradingView Levels Intraday* block (Command) on the page
3. Click *The Levelator* bookmarklet to capture the GEX levels to the
   clipboard. 
4. In *thinkorswim*, click the *Edit studies* icon in the toolbar. (It
   looks like an Erlenmeyer flask used in a chemistry lab.)
5. Locate the *mq_gex* study in the list, and click the script icon to
   the left of the name.
6. Click within the script so you see a cursor, then press CTRL-a to
   select ALL of the script
7. With the text selected, press CTRL-v to paste the clipboard contents
8. Click OK to close the indicator script
9. Click OK to close the studies window

### Blind spots (mq_blind_spots)
Blind spots are updated by MenthorQ **once per day**, after the end of the
trading session. The most recent data will have the date from **the
previous trading session**.

1. Navigate to the *Indices & Stocks > End Of Day* section of the MenthorQ web site
2. Make sure you have the *Blind Spots Levels* block (Command) on the page
3. Click *The Levelator* bookmarklet to capture the blind spot levels to the clipboard.
4. In *thinkorswim*, click the *Edit studies* icon in the toolbar. (It
   looks like an Erlenmeyer flask used in a chemistry lab.)
5. Locate the *mq_blind_spots* study in the list, and click the script icon to
   the left of the name.
6. Click within the script so you see a cursor, then press CTRL-a to
   select ALL of the script
7. With the text selected, press CTRL-v to paste the clipboard contents
8. Click OK to close the indicator script
9. Click OK to close the studies window
