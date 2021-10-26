const serverApi = 'http://localhost:1337';
const httpUrl = 'http://localhost:3000';
// const serverApi = process.env.serverApi?.trim() || '';
// const httpUrl = process.env.httpUrl_?.trim() || '';
// console.log('sever', serverApi + 1, typeof serverApi);
// const url = new URL(serverApi);
// console.log(url);
const hostApi = 'localhost:1337';
const qualityImage = 100;
const limitFindUser = 20;
const limitFindGroupProduct = 10;

module.exports = {
	serverApi,
	hostApi,
	httpUrl,
};
// export * from './constrant';
