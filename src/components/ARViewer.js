import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/ARViewer.module.css';

export default function ARViewer() {
  const router = useRouter();

  useEffect(() => {
    // Verifica se o script A-Frame já existe para evitar duplicação
    if (!document.getElementById('aframe-script')) {
      const aframeScript = document.createElement('script');
      aframeScript.id = 'aframe-script';
      aframeScript.src = 'https://aframe.io/releases/1.2.0/aframe.min.js';
      document.head.appendChild(aframeScript);

      // Adiciona script de AR após o A-Frame carregar
      aframeScript.onload = () => {
        const arScript = document.createElement('script');
        arScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
        document.head.appendChild(arScript);
      };
    }

    // Retorna função de limpeza ao desmontar
    return () => {
      // A limpeza é feita automaticamente quando o componente é desmontado
    };
  }, []);

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

      {/* A-Frame Scene para AR */}
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        vr-mode-ui="enabled: false"
      >
        {/* Usar marcador padrão Hiro para simplificar o teste */}
        <a-marker preset="hiro">
          <a-entity
            gltf-model="/models/GELATI.glb"
            scale="0.05 0.05 0.05"
            position="0 0 0"
            rotation="0 0 0"
            animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear"
          ></a-entity>
        </a-marker>

        {/* Câmara com rastreamento de posição */}
        <a-entity camera></a-entity>
      </a-scene>

      <div className={styles.instructions}>
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
      </div>
    </div>
  );
} 