# The Levelator
## Background
MenthorQ provides indicators and levels data for use in TradingView.
*The Levelator* generates code for analogous indicators that use the
MenthorQ levels data on the *thinkorswim* platform. It makes updating
the levels easy! If you have 

You need to do only two things to get started:
- Add two indicators to *thinkorswim*
- Add a bookmarklet to your web browser

A bookmarklet is a piece of code that is executed in the web browser,
and appears as any other web site bookmark. *The Levelator*
bookmarklet captures the levels from the MenthorQ web site and
produces the indicator code that displays the levels in thinkorswim.
## Adding the thinkorswim indicators
The two indicators are shared similar to other items you have probably
added to thinkorswim. ("Indicator" is the general term used here.
*thinkorswim* calls these "studies".)

Here are the links to the shared indicators:
- mq_blind_spots
- mq_gex

Once added to thinkorswim, add the two indicators to a chart where you
wish to have the levels displayed.

See *these instructions* for adding shared items to thinkorswim, if
you are unfamiliar with that process.
## Adding the bookmarklet
I am using Google Chrome, so all instructions and development were
done on that browser. It should work similarly on other browsers,
though no testing has been performed on those other than Google Chrome.

1. Show the bookmarks bar, if it does not already appear. Under the
   *View* menu, choose *Always Show Bookmarks Bar*.
2. Add the bookmarklet to your web browser by dragging the below link to the
bookmarks bar of your browser window:

*The Levelator*
## Updating the indicators
Use these steps to update each indicator. You should have the chart
where you want them updated, and you should have already have them
added to the chart.
### GEX levels
GEX level data are updated throughout the trading day by MenthorQ. Use
these steps to update the indicator as often as you wish.

1. Navigate to the *Indices & Stocks > Intraday* section of the MenthorQ web site
2. Make sure you have the *TradingView Levels Intraday* block (Command) on the page
3. Click *The Levelator* bookmarklet to capture the GEX levels to the
   clipboard
4. In *thinkorswim*, click the *Edit studies* icon in the toolbar. (It
   looks like an Erlenmeyer flask used in a chemistry lab.)
5. Locate the *mq_gex* study in the list, and click the script icon to
   the left of the name.
6. Click within the script so you see a cursor, then press CTRL-a to
   select ALL of the script
7. With the text selected, press CTRL-v to paste the clipboard contents
8. Click OK to close the indicator script
9. Click OK to close the studies window

### Blind spots
Blind spots are updated by MenthorQ **once per day**, after the end of the
trading session. The most recent data will have the date from **the
previous trading session**.

1. Navigate to the *Indices & Stocks > End Of Day* section of the MenthorQ web site
2. Make sure you have the *Blind Spots Levels* block (Command) on the page
3. Click *The Levelator* bookmarklet to capture the blind spot levels to the clipboard
4. In *thinkorswim*, click the *Edit studies* icon in the toolbar. (It
   looks like an Erlenmeyer flask used in a chemistry lab.)
5. Locate the *mq_gex* study in the list, and click the script icon to
   the left of the name.
6. Click within the script so you see a cursor, then press CTRL-a to
   select ALL of the script
7. With the text selected, press CTRL-v to paste the clipboard contents
8. Click OK to close the indicator script
9. Click OK to close the studies window



## Notes on using the indicators
