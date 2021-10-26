import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { httpUrl } from '@src/config/constrant';
import { httpUrl } from '@src/config/constrant';

const apolloClient = new ApolloClient({
	uri: httpUrl + '/graphql',
	cache: new InMemoryCache(),
});
export default apolloClient;
