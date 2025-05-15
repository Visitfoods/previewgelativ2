import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/ARViewer.module.css';

export default function ARViewer() {
  const router = useRouter();
  const [arMode, setArMode] = useState('target'); // 'target' ou 'hiro'
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Limpar quaisquer scripts anteriores para evitar conflitos
    const oldAframeScript = document.getElementById('aframe-script');
    const oldArScript = document.getElementById('ar-script');
    
    if (oldAframeScript) oldAframeScript.remove();
    if (oldArScript) oldArScript.remove();

    // Função para carregar scripts em sequência
    const loadScripts = async () => {
      try {
        // Carregar A-Frame primeiro
        await new Promise((resolve, reject) => {
          const aframeScript = document.createElement('script');
          aframeScript.id = 'aframe-script';
          aframeScript.src = 'https://aframe.io/releases/1.0.4/aframe.min.js';
          aframeScript.async = true;
          aframeScript.onload = () => {
            console.log('A-Frame carregado com sucesso');
            resolve();
          };
          aframeScript.onerror = () => {
            reject(new Error('Falha ao carregar A-Frame'));
          };
          document.head.appendChild(aframeScript);
        });

        // Depois carregar AR.js
        await new Promise((resolve, reject) => {
          const arScript = document.createElement('script');
          arScript.id = 'ar-script';
          
          if (arMode === 'target') {
            arScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js';
          } else {
            arScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
          }
          
          arScript.async = true;
          arScript.onload = () => {
            console.log('AR.js carregado com sucesso');
            resolve();
          };
          arScript.onerror = () => {
            reject(new Error('Falha ao carregar AR.js'));
          };
          document.head.appendChild(arScript);
        });

        // Todos os scripts carregados
        setScriptsLoaded(true);
      } catch (err) {
        console.error('Erro ao carregar scripts:', err);
        setError('Falha ao carregar os recursos necessários: ' + err.message);
      }
    };

    loadScripts();

    // Limpeza ao desmontar
    return () => {
      const aframeScript = document.getElementById('aframe-script');
      const arScript = document.getElementById('ar-script');
      
      if (aframeScript) aframeScript.remove();
      if (arScript) arScript.remove();
    };
  }, [arMode]);

  const toggleArMode = () => {
    setScriptsLoaded(false);
    setArMode(prevMode => prevMode === 'target' ? 'hiro' : 'target');
  };

  if (error) {
    return (
      <div className={styles.arContainer}>
        <div className={styles.errorContainer}>
          <h2>Erro</h2>
          <p>{error}</p>
          <button 
            className={styles.backButton}
            onClick={() => router.push('/')}
          >
            Voltar à página inicial
          </button>
        </div>
      </div>
    );
  }

  if (!scriptsLoaded) {
    return (
      <div className={styles.arContainer}>
        <div className={styles.loadingContainer}>
          <h2>A carregar recursos...</h2>
          <p>Por favor aguarde enquanto carregamos a experiência AR</p>
        </div>
      </div>
    );
  }

  return (
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
        /* AR com Target Personalizado */
        <a-scene
          embedded
          arjs="sourceType: webcam; debugUIEnabled: false; trackingMethod: best; detectionMode: mono_and_matrix;"
          vr-mode-ui="enabled: false"
          renderer="logarithmicDepthBuffer: true; precision: medium;"
        >
          {/* Usar o target.mind como marcador e GELATI.glb como modelo 3D */}
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

          {/* Câmara com rastreamento de posição */}
          <a-entity camera></a-entity>
        </a-scene>
      ) : (
        /* AR com Marcador Hiro */
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
  );
} 