import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  const handleStartScan = () => {
    router.push('/scan');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Gelatomania AR</title>
        <meta name="description" content="Experiência de Realidade Aumentada" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bem-vindo à Gelatomania AR
        </h1>

        <p className={styles.description}>
          Escaneia um QR code para iniciar a experiência de Realidade Aumentada
        </p>

        <button
          className={styles.button}
          onClick={handleStartScan}
        >
          Iniciar Scanner QR
        </button>

        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link href="/ar">
            <a className={styles.buttonSecondary}>
              Aceder Diretamente à Experiência AR
            </a>
          </Link>
          
          <Link href="/qrtest">
            <a className={styles.buttonSecondary}>
              Ver QR Code para Teste
            </a>
          </Link>
          
          <Link href="/modelo">
            <a className={styles.buttonSecondary}>
              Visualizar Modelo 3D
            </a>
          </Link>
          
          <Link href="/simples">
            <a className={styles.buttonSecondary}>
              Teste Simples (Apenas Modelo)
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
} 