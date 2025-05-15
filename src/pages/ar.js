import dynamic from 'next/dynamic';
import Head from 'next/head';

// Importa dinamicamente o componente ARViewer para evitar problemas de SSR
const ARViewer = dynamic(() => import('../components/ARViewer'), {
  ssr: false,
});

export default function AR() {
  return (
    <>
      <Head>
        <title>Gelatomania AR - Experiência AR</title>
        <meta name="description" content="Experiência de Realidade Aumentada" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <ARViewer />
    </>
  );
} 