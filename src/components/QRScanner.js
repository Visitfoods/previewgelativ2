import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import QrScanner from 'qr-scanner';
import styles from '../styles/QRScanner.module.css';

export default function QRScanner() {
  const videoRef = useRef(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const qrScannerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        result => {
          console.log('QR Code detetado:', result.data);
          // Aceitar qualquer QR code e redirecionar para a página AR
          router.push('/ar');
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      qrScannerRef.current.start().catch(err => {
        setError('Erro ao iniciar a câmara: ' + err.message);
      });
    }

    // Cleanup ao desmontar componente
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
      }
    };
  }, [router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Scanner QR</h1>
      <p className={styles.instructions}>Aponte a câmara para um QR code</p>
      
      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.videoContainer}>
        <video ref={videoRef} className={styles.video} />
      </div>
      
      <button 
        className={styles.backButton}
        onClick={() => router.push('/')}
      >
        Voltar
      </button>
    </div>
  );
} 