import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function SimplesViewer() {
  return (
    <>
      <Head>
        <title>Teste Simples - Modelo 3D</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
      </Head>

      <div style={{ position: 'fixed', top: 20, left: 20, zIndex: 10 }}>
        <Link href="/">
          <a className={styles.backButton}>
            Voltar
          </a>
        </Link>
      </div>

      <div dangerouslySetInnerHTML={{ __html: `
        <a-scene>
          <a-entity
            gltf-model="/models/GELATI.glb"
            scale="0.5 0.5 0.5"
            position="0 1 -3"
            rotation="0 45 0"
            animation="property: rotation; to: 0 405 0; loop: true; dur: 10000; easing: linear"
          ></a-entity>
          <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
          <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
          <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
          <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
          <a-sky color="#ECECEC"></a-sky>
        </a-scene>
      `}} />
    </>
  );
} 