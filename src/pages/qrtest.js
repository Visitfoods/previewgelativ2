import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function QRTest() {
  const router = useRouter();
  const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=gelatomania-ar-test';

  return (
    <div className={styles.container}>
      <Head>
        <title>Gelatomania AR - QR Code Teste</title>
        <meta name="description" content="QR Code para testar a experiência AR" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>QR Code para Teste</h1>
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p className={styles.description}>
            Utilize este QR code para testar a experiência AR:
          </p>
          
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '10px',
            marginTop: '20px',
            marginBottom: '20px',
            display: 'inline-block'
          }}>
            <img 
              src={qrCodeUrl} 
              alt="QR Code para teste"
              style={{ width: '200px', height: '200px' }}
            />
          </div>
          
          <div style={{ marginTop: '20px', maxWidth: '600px', textAlign: 'left' }}>
            <h3 style={{ color: '#fff', marginBottom: '10px' }}>Como usar:</h3>
            <ol style={{ color: '#fff', textAlign: 'left', paddingLeft: '20px' }}>
              <li>Abra a página inicial da aplicação num dispositivo móvel</li>
              <li>Clique em "Iniciar Scanner QR"</li>
              <li>Aponte a câmara para este QR code</li>
              <li>Após a deteção, clique em "Continuar para AR"</li>
              <li>Aponte a câmara para o marcador de teste (imagem target)</li>
              <li>O modelo 3D deverá aparecer sobre o marcador</li>
            </ol>
            
            <h3 style={{ color: '#fff', marginTop: '20px', marginBottom: '10px' }}>Dicas:</h3>
            <ul style={{ color: '#fff', textAlign: 'left', paddingLeft: '20px' }}>
              <li>Certifique-se de que tem boa iluminação</li>
              <li>Mantenha o dispositivo estável</li>
              <li>Se o modelo não aparecer, tente ajustar a distância ao marcador</li>
              <li>Pode imprimir o marcador ou visualizá-lo noutro dispositivo</li>
            </ul>
          </div>
        </div>
        
        <button 
          className={styles.button}
          onClick={() => router.push('/')}
          style={{ marginTop: '30px' }}
        >
          Voltar
        </button>
      </main>
    </div>
  );
} 