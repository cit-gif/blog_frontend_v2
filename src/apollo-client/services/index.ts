import { DocumentNode } from '@apollo/client';
import apolloClient from '..';

export const getDataFromGql = async (gql: DocumentNode, variables = {}) => {
	const { data, error } = await apolloClient.query({
		query: gql,
		variables,
	});
	return { data, error };
};
