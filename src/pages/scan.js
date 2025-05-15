import dynamic from 'next/dynamic';
import Head from 'next/head';

// Importa dinamicamente o componente QRScanner para evitar problemas de SSR com acesso à câmara
const QRScanner = dynamic(() => import('../components/QRScanner'), {
  ssr: false,
});

export default function Scan() {
  return (
    <>
      <Head>
        <title>Gelatomania AR - Scanner QR</title>
        <meta name="description" content="Scanner QR para Gelatomania AR" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <QRScanner />
    </>
  );
} 