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
      aframeScript.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
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
        {/* Modelo 3D que será mostrado sobre o marcador */}
        <a-entity
          gltf-model="/models/meuModelo.glb"
          scale="0.5 0.5 0.5"
          position="0 0 0"
          rotation="0 0 0"
        ></a-entity>

        {/* Marcador padrão (pode ser personalizado) */}
        <a-marker preset="hiro">
          {/* Conteúdo do marcador */}
        </a-marker>

        {/* Câmara */}
        <a-entity camera></a-entity>
      </a-scene>

      <div className={styles.instructions}>
        <p>Aponte a câmara para o marcador</p>
      </div>
    </div>
  );
} 