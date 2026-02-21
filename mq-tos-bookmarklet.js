(function() {
    var text,
	result;

    /* Attempt to get levels from various sources, in order */
    /* First, try on the current page */
    text = document.querySelector('[data-command-slug="levels_tv_intraday"], [data-command-slug="bl_levels"]')
    ?.querySelector('.data-text')
    ?.textContent.trim() ?? null;

    /* Try selected text on the current page */
    if (!text) text = window.getSelection().toString().trim();

    /* Simple, synchronous text grab successful, complete and exit */
    if (text) return generateLevelsCodeAndPlaceOnClipboard(text);

    /* We're still here, so try the clipboard, which needs to do the asynchronous dance */
    navigator.clipboard
	.readText()
	.then((clipText) => (result = generateLevelsCodeAndPlaceOnClipboard(clipText)))
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
    
    
    function generateLevelsCodeAndPlaceOnClipboard(text) {    
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
			'BL 10': 'CYAN'};

	var levels,
	    isBlindSpotLevels,
	    i,
	    result = 'def bars_in_future = 3;\ndef show = !IsNaN(close[bars_in_future]) and IsNaN(close[bars_in_future - 1]);\n\n';

	/* Text not returned, or fails sanity checks. Notify of failure and exit. */
	if (!(text && isValid(text))) {
	    fail('No usable text found, selected, nor on the clipboard.' +
		 '\n\nPlease reload the page and try again.');
	    return false;
	}

	/* Parse the levels */
	levels = text.slice(text.indexOf(':') + 2).replaceAll('\n', '').split(', '),
	
	isBlindSpotLevels = (levels[0].startsWith('BL'));
	
	for (i = 0; i < levels.length; i += 2) {
	    result += '\ndef level' + i / 2 + ' = ' + levels[i + 1] + ';\n' +
		'plot plot' + i / 2 + ' = level' + i / 2 + ';\n' +
		'plot' + i / 2 + '.SetDefaultColor(Color.' + COLORS[levels[i]] + ');\n' +
		'AddChartBubble(show, level' + i / 2 + ', "' + levels[i] + '", Color.' + COLORS[levels[i]] + ');\n';
	}
	
	return writeClipboardText(result, isBlindSpotLevels);
    }

    
    async function writeClipboardText(text, isBlindSpotLevels) {
	try {
	    await navigator.clipboard.writeText(text);
	    toast('<p style="margin-bottom: 20px;">Updated ' + (isBlindSpotLevels ? 'blind spot' : 'GEX') +
		  ' levels code has been placed on the clipboard.</p>' +
		  '<p>Replace the entire ToS ' + (isBlindSpotLevels ? 'mq_bl' : 'mq_gex') +
		  ' indicator script with the clipboard contents.</p>');
	    return true;
	} catch (error) {
	    console.error(error.message);
	    window.alert('Please reload the page then click the bookmarklet.');
	    return false;
	}
    }

    
    async function toast(text) {
	const TOAST_ID = '__sourdough_toast__';
	const DURATION = 10000;

	/* Remove previous toast */
	document.getElementById(TOAST_ID)?.remove();

	const toast = document.createElement('div');
	toast.id = TOAST_ID;
	/* toast.textContent = text;*/
	toast.innerHTML = text;
	
	Object.assign(toast.style, {
	    /*position: 'absolute',*/
	    position: 'fixed',
	    top: '20px',
	    left: '30%',
	    /*transform: 'translate(-50%, -50%)',*/
	    background: '#cccc00',
	    color: 'black',
	    padding: '10px 14px',
	    borderRadius: '6px',
	    font: '14px system-ui, sans-serif',
	    zIndex: 2147483647,
	    opacity: 0,
	    transition: 'opacity 0.2s ease',
	    pointerEvents: 'none'  /* Capture no clicks */
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
