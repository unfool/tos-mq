(function() {
    const VERSION = '1.0.0';
    var text,
	result;

    /* Attempt to get levels from various sources, in order */
    /* First, try on the current page */
    text = document.querySelector('[data-command-slug="levels_tv_intraday"], [data-command-slug="bl_levels"]')
    ?.querySelector('.data-text')
    ?.textContent.trim() ?? null;
    if (text && isValid(text)) return generateLevelsCodeAndPlaceOnClipboard(text, 'the levels found on the page');

    
    /* Try selected text on the current page */
    text = window.getSelection().toString().trim();
    if (text && isValid(text)) return generateLevelsCodeAndPlaceOnClipboard(text, 'the selected text');

    
    /* We're still here, so try the clipboard, which needs to do the asynchronous dance */
    navigator.clipboard
	.readText()
	.then((clipText) => (result = generateLevelsCodeAndPlaceOnClipboard(clipText, 'the clipboard')))
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
    
    
    function generateLevelsCodeAndPlaceOnClipboard(text, source) {    
	const COLORS = {'Call Resistance': 'LIGHT_RED',
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
			'BL 10': 'CYAN'},
	      NEWLINE = String.fromCharCode(10),  /* Avoid minifier wrecking newlines in generated code  */
	      DOUBLE_NEWLINE = NEWLINE + NEWLINE;

	var levels,
	    isBlindSpotLevels,
	    i,
	    result;

	/* Static beginning of script */
	result = 'def bars_in_future = 3;' + NEWLINE +
	    'def show = !IsNaN(close[bars_in_future]) and IsNaN(close[bars_in_future - 1]);' + DOUBLE_NEWLINE;

	/* Text not returned, or fails sanity checks. Notify of failure and exit. */
	if (!(text && isValid(text))) {
	    fail('No usable text found, selected, nor on the clipboard.' + DOUBLE_NEWLINE +
		 'Please reload the page and try again.' + DOUBLE_NEWLINE +
		 'If you copied levels to the clipboard manually, you may need to copy them again before retrying.');
	    return false;
	}

	/* Parse the levels */
	levels = text.slice(text.indexOf(':') + 2).replaceAll(NEWLINE, '').split(', '),
	
	isBlindSpotLevels = (levels[0].startsWith('BL'));
	
	for (i = 0; i < levels.length; i += 2) {
	    result += NEWLINE + 'def level' + i / 2 + ' = ' + levels[i + 1] + ';' + NEWLINE +
		'plot plot' + i / 2 + ' = level' + i / 2 + ';' + NEWLINE +
		'plot' + i / 2 + '.SetDefaultColor(Color.' + COLORS[levels[i]] + ');' + NEWLINE +
		'AddChartBubble(show, level' + i / 2 + ', "' + levels[i] + '", Color.' + COLORS[levels[i]] + ');' + NEWLINE;
	}
	
	return writeClipboardText(result, source, isBlindSpotLevels);
    }

    
    async function writeClipboardText(text, source, isBlindSpotLevels) {
	try {
	    await navigator.clipboard.writeText(text);
	    toast('<h1 style="margin-bottom: 20px;">Success!</h1>' + 
		  '<p style="margin-bottom: 20px;">Generated <span style="color: gold; font-weight: bold">' +
		    (isBlindSpotLevels ? 'blind spot' : 'GEX') + '</span>' +
		  ' levels code from ' + source + '.</p>' +
		  '<p style="margin-bottom: 30px;">Replace the entire ToS <span style="color: gold; font-weight: bold">' +
		  (isBlindSpotLevels ? 'mq_bl' : 'mq_gex') + '</span>' +
		  ' indicator script with the clipboard contents.</p>' +
		  '<p style="margin-bottom: 20px;"><a style="color: mediumblue;" target="_blank" href="https://google.com">Click here for full instructions</a></p>' +
		  '<p style="color: white; font-size: 70%"; ">The Levelator v' + VERSION + '</p>');
	    return true;
	} catch (error) {
	    console.error(error.message);
	    window.alert('Please reload the page then click the bookmarklet.');
	    return false;
	}
    }

    
    async function toast(text) {
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
	    background: 'steelblue',
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
