/* eslint-disable @next/next/no-sync-scripts */
import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document{
    render() {
        return(
            <Html lang='en'>
                <Head>
                    <meta name="description" content="Morning Rituals Soap" />
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"></link>
                    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js" ></script>
                    
                    <script src="https://kit.fontawesome.com/2848bb6c17.js"></script>
                    <script src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}&currency=USD`}></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument