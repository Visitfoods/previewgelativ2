import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function QRTest() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Teste QR Code - Gelatomania AR</title>
        <meta name="description" content="Página de teste QR Code" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          QR Code para Teste
        </h1>

        <p className={styles.description}>
          Escaneia este QR code com a aplicação para iniciar a experiência AR
        </p>

        <div style={{ margin: '2rem 0' }}>
          <Image 
            src="/qrcode.jpg" 
            alt="QR Code para AR" 
            width={300} 
            height={300}
            style={{
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Link href="/ar" className={styles.button}>
            Aceder Diretamente à Experiência AR
          </Link>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <Link href="/" className={styles.backButton}>
            Voltar à Página Inicial
          </Link>
        </div>
      </main>
    </div>
  );
} 