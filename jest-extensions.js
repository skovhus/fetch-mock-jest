expect.extend({
	toHaveFetched: (fetchMock, url, options) => {
		if (fetchMock.called(url, options)) {
			return { pass: true };
		}
		return {
			pass: false,
			message: () => `fetch should have been called with ${url}`
		};
	},
	toHaveLastFetched: (fetchMock, url, options) => {
		const allCalls = fetchMock.calls();
		if (!allCalls.length) {
			return {
				pass: false,
				message: () => `No calls made to fetch`
			};
		}
		const lastCall = [...allCalls].pop();
		const lastUrlCall = [...fetchMock.calls(url, options)].pop();
		if (lastCall === lastUrlCall) {
			return { pass: true };
		}
		return {
			pass: false,
			message: () => `Last call to fetch should have had a URL of ${url} but was ${lastCall.url}`
		};
	},

	toHaveNthFetched: (fetchMock, n, url, options) => {
		const nthCall = fetchMock.calls()[n - 1];
		const urlCalls = fetchMock.calls(url, options);
		if (urlCalls.includes(nthCall)) {
			return { pass: true };
		}
		return {
			pass: false,
			message: () => `${n}th call to fetch should have had a URL of ${url} but was ${nthCall.url}`
		};
	},

	toHaveFetchedTimes: (fetchMock, times, url, options) => {
		const calls = fetchMock.calls(url, options);
		if (calls.length === times) {
			return { pass: true };
		}
		return {
			pass: false,
			message: () =>
				`fetch should have been called with a URL of ${url} ${times} times, but it was called ${calls.length} times`
		};
	},

	toBeDone: (fetchMock, matcher) => {
		const done = fetchMock.done(matcher);
		if (done) {
			return { pass: true };
		}
		return {
			pass: false,
			message: () =>
				`fetch has not been called the expected number of times ${matcher ? `for ${matcher}` : 'in total'}`
		};
	}
});
