import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import styles from '../styles/ARViewer.module.css';

export default function ARViewer() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [arMode, setArMode] = useState('hiro'); // Começar com 'hiro' por ser mais confiável
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [aframeLoaded, setAframeLoaded] = useState(false);
  const [arjsLoaded, setArjsLoaded] = useState(false);

  useEffect(() => {
    // Definir um timeout para mostrar a mensagem de carregamento por pelo menos 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Verificar quando ambos os scripts estão carregados
  useEffect(() => {
    if (aframeLoaded && arjsLoaded) {
      console.log('Todos os scripts carregados');
      setScriptsLoaded(true);
    }
  }, [aframeLoaded, arjsLoaded]);

  const toggleArMode = () => {
    // Reiniciar o estado de carregamento ao mudar de modo
    setArjsLoaded(false);
    setScriptsLoaded(false);
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

      {/* Carrega A-Frame primeiro */}
      <Script
        src="https://aframe.io/releases/1.2.0/aframe.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('A-Frame carregado');
          setAframeLoaded(true);
        }}
      />

      {/* Carrega AR.js depois */}
      <Script
        src={
          arMode === 'target'
            ? 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js'
            : 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js'
        }
        strategy="afterInteractive"
        onLoad={() => {
          console.log('AR.js carregado');
          setArjsLoaded(true);
        }}
      />

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

        {!scriptsLoaded ? (
          <div className={styles.loadingContainer}>
            <h2>A carregar scripts AR...</h2>
            <p>Por favor aguarde enquanto os scripts necessários são carregados</p>
          </div>
        ) : arMode === 'target' ? (
          <div id="arScene">
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
          </div>
        ) : (
          <div id="arScene">
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
          </div>
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