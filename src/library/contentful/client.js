const contentful = require('contentful');

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const isConfigured = Boolean(space && accessToken);

export const client = isConfigured
	? contentful.createClient({ space, accessToken })
	: null;

export const getEntries = async (query = {}) => {

	try {
		return await client.getEntries(query);
	} catch (error) {
		console.warn('Contentful fetch failed:', error?.message || error);
		return { items: [] };
	}
};
