import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/ARViewer.module.css';

export default function ARViewer() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [arMode, setArMode] = useState('hiro'); // Começar com 'hiro' por ser mais confiável

  useEffect(() => {
    // Definir um timeout para mostrar a mensagem de carregamento por pelo menos 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleArMode = () => {
    setArMode(prevMode => prevMode === 'target' ? 'hiro' : 'target');
  };

  if (isLoading) {
    return (
      <div className={styles.arContainer}>
        <div className={styles.loadingContainer}>
          <h2>A carregar experiência AR...</h2>
          <p>Por favor aguarde enquanto preparamos a sua experiência de Realidade Aumentada</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        {/* Scripts A-Frame e AR.js carregados diretamente no head */}
        <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
        {arMode === 'target' ? (
          <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
        ) : (
          <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
        )}
        <style>{`
          body {
            margin: 0;
            overflow: hidden;
          }
          .a-enter-vr, .a-enter-ar {
            display: none !important;
          }
        `}</style>
      </Head>

      <div className={styles.arContainer}>
        <div className={styles.backButtonContainer}>
          <button 
            className={styles.backButton}
            onClick={() => router.push('/')}
          >
            Voltar
          </button>
        </div>

        <div className={styles.modeToggleContainer}>
          <button 
            className={styles.modeToggleButton}
            onClick={toggleArMode}
          >
            Mudar para modo {arMode === 'target' ? 'Hiro' : 'Target'}
          </button>
        </div>

        {arMode === 'target' ? (
          <div id="arScene" dangerouslySetInnerHTML={{ __html: `
            <a-scene
              embedded
              arjs="sourceType: webcam; debugUIEnabled: false;"
              vr-mode-ui="enabled: false"
              renderer="logarithmicDepthBuffer: true; precision: medium;"
            >
              <a-nft
                type="nft"
                url="/targets/target.mind"
                smooth="true"
                smoothCount="10"
                smoothTolerance="0.01"
                smoothThreshold="5"
              >
                <a-entity
                  gltf-model="/models/GELATI.glb"
                  scale="5 5 5"
                  position="0 0 0"
                  rotation="-90 0 0"
                  animation="property: rotation; to: -90 360 0; loop: true; dur: 10000; easing: linear"
                ></a-entity>
              </a-nft>
              <a-entity camera></a-entity>
            </a-scene>
          `}} />
        ) : (
          <div id="arScene" dangerouslySetInnerHTML={{ __html: `
            <a-scene
              embedded
              arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
              vr-mode-ui="enabled: false"
            >
              <a-marker preset="hiro">
                <a-entity
                  gltf-model="/models/GELATI.glb"
                  scale="0.05 0.05 0.05"
                  position="0 0 0"
                  rotation="0 0 0"
                  animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear"
                ></a-entity>
              </a-marker>
              <a-entity camera></a-entity>
            </a-scene>
          `}} />
        )}

        <div className={styles.instructions}>
          {arMode === 'target' ? (
            <p>Aponte a câmara para o seu QR code personalizado</p>
          ) : (
            <>
              <p>Aponte a câmara para o marcador Hiro</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                <a 
                  href="https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: 'white', textDecoration: 'underline' }}
                >
                  Clique aqui para ver o marcador Hiro
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
} 