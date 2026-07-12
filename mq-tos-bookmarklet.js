(function() {
    const VERSION = '2.0.0',
	  NEWLINE = String.fromCharCode(10),  /* Prevent minifier from wrecking newlines in generated code */
	  DOUBLE_NEWLINE = NEWLINE + NEWLINE,
	  SCRIPT_UPDATE_TIMESTAMP = new Date().toString();

    var text,
	result;

    /* Attempt to get levels from each source */
    /* First, try on the current page */
    text = document.querySelector('.mb-2')
    ?.textContent.trim() ?? null;

    if (text && isValid(text)) {
	return generateLevelsCodeAndPlaceOnClipboard(text, true);
    }
    
    /* Second, try the clipboard, which needs to do the asynchronous dance */
    navigator.clipboard
	.readText()
	.then((clipText) => (result = generateLevelsCodeAndPlaceOnClipboard(clipText, false)))
	.catch((errorText) => (fail(errorText)));
    return result;


    function fail(errorText) {
	console.log(errorText);
	window.alert(errorText);
	return false;
    }


    function isValid(text) {
	return (text.includes('Call Resistance,') ||
		text.includes('BL 1,'));
    }
    
    
    function generateLevelsCodeAndPlaceOnClipboard(text, sourceIsWebPage) {    
	const SOURCE_TEXT = (sourceIsWebPage) ? 'the levels found on the page' : 'the clipboard',
	      COLORS = {'Call Resistance': 'LIGHT_RED',
			'Put Support': 'GREEN',
			'HVL': 'VIOLET',
			'1D Min': 'ORANGE',
			'1D Max': 'ORANGE',
			'Call Resistance 0DTE': 'LIGHT_RED',
			'Put Support 0DTE': 'GREEN',
			'HVL 0DTE': 'VIOLET',
			'Gamma Wall 0DTE': 'LIGHT_RED',
			'GEX 1': 'CYAN',
			'GEX 2': 'CYAN',
			'GEX 3': 'CYAN',
			'GEX 4': 'CYAN',
			'GEX 5': 'CYAN',
			'GEX 6': 'CYAN',
			'GEX 7': 'CYAN',
			'GEX 8': 'CYAN',
			'GEX 9': 'CYAN',
			'GEX 10': 'CYAN',
			'BL 1': 'LIGHT_RED',
			'BL 2': 'GREEN',
			'BL 3': 'VIOLET',
			'BL 4': 'ORANGE',
			'BL 5': 'ORANGE',
			'BL 6': 'LIGHT_RED',
			'BL 7': 'GREEN',
			'BL 8': 'VIOLET',
			'BL 9': 'ORANGE',
			'BL 10': 'CYAN'};

	var levels,
	    isBlindSpotLevels,
	    dataUpdatedAndRunNumber,
	    i,
	    result;

	/* Text not returned, or fails sanity checks. Notify of failure and exit. */
	if (!(text && isValid(text))) {
	    fail('No usable text found on the web page nor on the clipboard.' + DOUBLE_NEWLINE +
		 'Please reload the page and try again.' + DOUBLE_NEWLINE +
		 'If you copied levels to the clipboard manually, you may need to copy them again before retrying.');
	    return false;
	}

	
	/* Parse the levels */
	levels = text.slice(text.indexOf(':') + 2).replaceAll(NEWLINE, '').split(', ');

	
	/* Script generation */
	isBlindSpotLevels = (levels[0].startsWith('BL'));

	result = getUpdateDetails(isBlindSpotLevels, sourceIsWebPage, SOURCE_TEXT);

	/* Add update chart labels */
	result += getUpdateChartLabelCode(isBlindSpotLevels, sourceIsWebPage);

	/* Static beginning of script */
	result += 'def bars_in_future = 3;' + NEWLINE +
	    'def show = !IsNaN(close[bars_in_future]) and IsNaN(close[bars_in_future - 1]);' + DOUBLE_NEWLINE;
	
	/* Level lines and labels */
	for (i = 0; i < levels.length; i += 2) {
	    result += NEWLINE + 'def level' + i / 2 + ' = ' + levels[i + 1] + ';' + NEWLINE +
		'plot plot' + i / 2 + ' = level' + i / 2 + ';' + NEWLINE +
		'plot' + i / 2 + '.SetDefaultColor(Color.' + COLORS[levels[i]] + ');' + NEWLINE +
		'AddChartBubble(show, level' + i / 2 + ', "' + levels[i] + '", Color.' + COLORS[levels[i]] + ');' + NEWLINE;
	}

	result += getUpdateDetails(isBlindSpotLevels, sourceIsWebPage, SOURCE_TEXT);
	
	return writeClipboardText(result, SOURCE_TEXT, isBlindSpotLevels, sourceIsWebPage);
    }

    
    function getUpdateChartLabelCode(isBlindSpotLevels, sourceIsWebPage) {
	/* Return the chart label code for appropriate level type */
	const COLOR_STEEL_BLUE = '70, 130, 180',
	      COLOR_SEA_GREEN = '46, 139, 87',
	      COLOR = (isBlindSpotLevels) ? COLOR_STEEL_BLUE : COLOR_SEA_GREEN;
	var labelText = getUpdateChartLabelText(isBlindSpotLevels, sourceIsWebPage),
	    result;
	
	result = 'AddLabel(1, "' + labelText +
	    '", CreateColor(' + COLOR + ')' +
	    ', Location.TOP_LEFT' +
	    ', FontSize.SMALL' +
	    ', yes);' + DOUBLE_NEWLINE;
	
	return result;
    }

    function getUpdateChartLabelText(isBlindSpotLevels, sourceIsWebPage) {
	/* Return the chart label text for appropriate level type */
	const DATA_UPDATED = getLevelsTimestamp();
	var result;

	result = (isBlindSpotLevels) ? 'Blind Spots ' : 'GEX levels ';
	result += (sourceIsWebPage && DATA_UPDATED) ? DATA_UPDATED : '(time n/a)';

	/* Padding added to compensate for thinkorswim cutting off the label text */
	result += '  ';

	return result;
    }


    function getUpdateDetails(isBlindSpotLevels, sourceIsWebPage, sourceText) {
	const BLANK_COMMENT = String.fromCharCode(35) + NEWLINE,
	      LEVELS_TYPE = (isBlindSpotLevels) ? 'Blind Spot' : 'GEX',
	      INDICATOR = (isBlindSpotLevels) ? 'mq_blind_spots' : 'mq_gex',
	      DATA_UPDATED = getLevelsTimestamp();
	var result;

	result = BLANK_COMMENT +
	    BLANK_COMMENT +
	    '# The Levelator ' + 'v' + VERSION + NEWLINE +
	    BLANK_COMMENT +
	    '# ' + LEVELS_TYPE + ' levels' + NEWLINE + 
	    BLANK_COMMENT +
	    BLANK_COMMENT +
	    '# Data retrieved for the ' + INDICATOR + ' indicator from ' + sourceText + '.' + NEWLINE +
	    BLANK_COMMENT;

	if (sourceIsWebPage) {
	    if (DATA_UPDATED)
		result += '# MenthorQ ' + LEVELS_TYPE + ' data updated: ' + DATA_UPDATED + NEWLINE;
	} else {
	    result += '# (MenthorQ update timestamp unavailable from clipboard levels.)' + NEWLINE;
	}
	
	result += BLANK_COMMENT +
	    '# Script last generated by bookmarklet: ' + SCRIPT_UPDATE_TIMESTAMP + NEWLINE +
	    BLANK_COMMENT +
	    BLANK_COMMENT;

	return result;
    }


    function getLevelsTimestamp() {
	var result;

	result = document.querySelector('.container.mx-auto .text-base.font-medium')
	?.textContent.trim() ?? null;
	
	return result;
    }


    async function writeClipboardText(text, sourceText, isBlindSpotLevels, sourceIsWebPage) {
	/* Writes the code text to the clipboard and displays success/failure message */
	var backGroundColor = (isBlindSpotLevels) ? 'steelblue' : 'seagreen',
	    message = '';

	try {
	    await navigator.clipboard.writeText(text);
	    message =
		'<h2 style="all: revert; margin-bottom: 20px;">' + getUpdateChartLabelText(isBlindSpotLevels, sourceIsWebPage) + '</h2>' +
		'<p style="margin-bottom: 20px;">Generated <span style="color: gold; font-weight: bold">' +
		(isBlindSpotLevels ? 'blind spot' : 'GEX') + '</span>' +
		' levels code from <span style="color: gold; font-weight: bold">' + sourceText + '</span>.</p>' +
		'<p style="margin-bottom: 30px;">Replace the entire ToS <span style="color: gold; font-weight: bold">' +
		(isBlindSpotLevels ? 'mq_blind_spots' : 'mq_gex') + '</span>' +
		' indicator script with the clipboard contents.</p>' +
		'<p style="margin-bottom: 20px;"><a style="color: mediumblue;" target="_blank" href="https://unfool.github.io/tos-mq/">Click here for full instructions</a></p>' +
		'<p style="color: white; font-size: 70%"; ">The Levelator v' + VERSION + '</p>';
	    toast(message, backGroundColor);
	    return true;
	} catch (error) {
	    console.error(error.message);
	    window.alert('Please reload the page then click the bookmarklet.');
	    return false;
	}
    }

    
    async function toast(text, backGroundColor) {
	const TOAST_ID = '__sourdough_toast__';
	const DURATION = 12000;

	/* Remove previous toast */
	document.getElementById(TOAST_ID)?.remove();

	const toast = document.createElement('div');
	toast.id = TOAST_ID;
	toast.innerHTML = text;

	/* clicking removes the toast immediately */
	toast.onclick = function() {document.getElementById(TOAST_ID)?.remove();};
	
	Object.assign(toast.style, {
	    position: 'fixed', 
	    top: '2%',
	    left: '30%',
	    background: backGroundColor,
	    color: 'white',
	    padding: '10px 14px',
	    borderRadius: '6px',
	    font: '14px system-ui, sans-serif',
	    zIndex: 2147483647,
	    opacity: 0,
	    transition: 'opacity 0.2s ease',
	});

	document.body.appendChild(toast);

	/* Fade in */
	requestAnimationFrame(() => { toast.style.opacity = 1; });

	/* Fade out + remove */
	setTimeout(() => {
	    toast.style.opacity = 0;
	    setTimeout(() => toast.remove(), 250);
	}, DURATION);
    }
})();
