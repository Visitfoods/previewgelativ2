import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import QrScanner from 'qr-scanner';
import styles from '../styles/QRScanner.module.css';

export default function QRScanner() {
  const videoRef = useRef(null);
  const [error, setError] = useState('');
  const [scannedCode, setScannedCode] = useState(null);
  const router = useRouter();
  const qrScannerRef = useRef(null);
  const lastDetectedRef = useRef('');
  const cooldownRef = useRef(false);

  useEffect(() => {
    if (videoRef.current) {
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        result => {
          // Evitar repetições frequentes do mesmo código
          if (cooldownRef.current) return;
          
          const currentCode = result.data;
          
          // Se for o mesmo código, ignorar
          if (currentCode === lastDetectedRef.current) return;
          
          // Registrar o código detetado
          lastDetectedRef.current = currentCode;
          console.log('QR Code detetado:', currentCode);
          setScannedCode(currentCode);
          
          // Definir um cooldown para evitar múltiplas deteções muito rápidas
          cooldownRef.current = true;
          setTimeout(() => {
            cooldownRef.current = false;
          }, 1000);
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          willReadFrequently: true, // Adicionado para otimização
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
  }, []);

  const handleOpenAR = () => {
    // Armazenar o código escaneado para uso posterior, se necessário
    sessionStorage.setItem('scannedQrCode', scannedCode || '');
    router.push('/ar');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Scanner QR</h1>
      <p className={styles.instructions}>Aponte a câmara para um QR code</p>
      
      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.videoContainer}>
        <video ref={videoRef} className={styles.video} />
      </div>
      
      {scannedCode && (
        <div className={styles.scannedInfo}>
          <p>QR Code detetado: <strong>{scannedCode}</strong></p>
          <button 
            className={styles.arButton}
            onClick={handleOpenAR}
          >
            Continuar para AR
          </button>
        </div>
      )}
      
      <button 
        className={styles.backButton}
        onClick={() => router.push('/')}
      >
        Voltar
      </button>
    </div>
  );
} 