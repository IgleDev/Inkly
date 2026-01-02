import server from './server';

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('Aplicación escoitando no porto:' + port)
})