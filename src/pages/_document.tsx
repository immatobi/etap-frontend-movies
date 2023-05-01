import Document, { Html, Head, Main, NextScript } from 'next/document';

class AppDocument extends Document {

    static async getInitialProps(ctx: any) {
        const originalRenderPage = ctx.renderPage
        
        // Run the React rendering logic synchronously
        ctx.renderPage = () =>
        originalRenderPage({
          // Useful for wrapping the whole react tree
          enhanceApp: (App: any) => App,
          // Useful for wrapping in a per-page basis
          enhanceComponent: (Component: any) => Component,
        })
        
        // Run the parent `getInitialProps`, it now includes the custom `renderPage`
        const initialProps = await Document.getInitialProps(ctx)
    
        return initialProps
    }

    render() {

        return (

            <Html lang='en'>

                <Head >
                    <meta name="description" content="Gaming Infrastructure for all gamers - Play. Connect. Reward. Be a Gamr"/>
                    <meta name ="keywords" content="Game, Gaming, Gamers, Gamr, Game Development, Game Hub, GamrVrse, Content Creation, Esports, Talent, Playstation, Xbox, Mobile, PC, Video Gaming, Mobile Gaming, PC Gaming, gaming accessories, gaming console,cloud gaming, gaming server, lan center, esports news, valorant, pub, mortal kombat, esports league, Africa, USA, South America, Europe, Asia, esports games, mobile games, console games, tournaments, prize money, prize pool, 1v1, battle royale, android, iOS, game streaming, leaderboard, gamr, esports arena"/>
                    <link rel="icon" href="/gamr-favicon.png" />          
                    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
        
                </Head>

                <body className='body'>
                    <Main />
                    <NextScript />
                </body>

            </Html>
        )
        
    }

}

export default AppDocument;