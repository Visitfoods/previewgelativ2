import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function ModeloViewer() {
  useEffect(() => {
    // Carrega A-Frame
    if (!document.getElementById('aframe-script')) {
      const aframeScript = document.createElement('script');
      aframeScript.id = 'aframe-script';
      aframeScript.src = 'https://aframe.io/releases/1.2.0/aframe.min.js';
      document.head.appendChild(aframeScript);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Visualizador de Modelo 3D - Gelatomania AR</title>
        <meta name="description" content="Visualizador de modelo 3D" />
      </Head>

      <div style={{ position: 'fixed', top: 20, left: 20, zIndex: 1000 }}>
        <Link href="/">
          <a className={styles.backButton}>
            Voltar à Página Inicial
          </a>
        </Link>
      </div>

      <a-scene embedded style={{ width: '100vw', height: '100vh' }}>
        <a-entity
          gltf-model="/models/GELATI.glb"
          scale="0.05 0.05 0.05"
          position="0 1.5 -3"
          rotation="0 0 0"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear"
        ></a-entity>
        
        <a-entity camera position="0 1.6 0"></a-entity>
        <a-sky color="#ECECEC"></a-sky>
        <a-plane position="0 0 0" rotation="-90 0 0" width="10" height="10" color="#7BC8A4"></a-plane>
      </a-scene>
    </div>
  );
} 