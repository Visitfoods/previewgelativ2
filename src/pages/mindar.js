import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function MindARPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [scriptCount, setScriptCount] = useState(0);
  const sceneRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Mostrar a tela de carregamento por pelo menos 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      // Garantir que a cena AR é parada quando o componente é desmontado
      if (sceneRef.current && sceneRef.current.stop) {
        sceneRef.current.stop();
      }
    };
  }, []);

  // Verificar quando todos os scripts estão carregados
  useEffect(() => {
    if (scriptCount === 3) {
      setScriptsLoaded(true);
    }
  }, [scriptCount]);

  const handleScriptLoad = () => {
    setScriptCount(prev => prev + 1);
    console.log('Script carregado:', scriptCount + 1);
  };

  const startExperience = () => {
    setIsStarted(true);
    
    // Iniciar a experiência MindAR após o componente ser renderizado
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const sceneEl = document.querySelector('a-scene');
        if (sceneEl) {
          sceneRef.current = sceneEl.systems["mindar-image-system"];
        }
      }
    }, 1000);
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h2>A carregar experiência AR...</h2>
        <p>Por favor aguarde enquanto preparamos a sua experiência de Realidade Aumentada</p>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h2>Experiência AR Gelatomania</h2>
        <p>Clique no botão abaixo para iniciar a experiência AR</p>
        <p>Certifique-se de que permitiu o acesso à câmara</p>
        
        <button
          onClick={startExperience}
          style={{
            backgroundColor: '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '20px 0',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Iniciar Experiência AR
        </button>
        
        <button
          onClick={() => router.push('/')}
          style={{
            backgroundColor: '#555',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '14px',
            margin: '10px 0',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>MindAR - Gelatomania AR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <style>{`
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          .back-button {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          }
          .mindar-ui-scanning {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: transparent;
            z-index: 2;
          }
          .mindar-ui-scanning .inner {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
          .mindar-ui-scanning .inner .scanline {
            width: 100%;
            height: 50px;
            background: white;
            opacity: 0.3;
            position: absolute;
            animation: move 2s linear infinite;
          }
          @keyframes move {
            0%, 100% { top: 0; }
            50% { top: calc(100% - 50px); }
          }
          .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: white;
            z-index: 9999;
          }
        `}</style>
      </Head>

      {/* Scripts necessários para MindAR */}
      <Script
        src="https://aframe.io/releases/1.2.0/aframe.min.js"
        strategy="beforeInteractive"
        onLoad={handleScriptLoad}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.1/dist/mindar-image.prod.js"
        strategy="beforeInteractive"
        onLoad={handleScriptLoad}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.1/dist/mindar-image-aframe.prod.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />

      <button 
        className="back-button"
        onClick={() => {
          if (sceneRef.current && sceneRef.current.stop) {
            sceneRef.current.stop();
          }
          router.push('/');
        }}
      >
        Voltar
      </button>

      {!scriptsLoaded ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: '#fff',
          textAlign: 'center',
          padding: '20px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000
        }}>
          <h2>A carregar scripts AR...</h2>
          <p>Por favor aguarde enquanto os scripts necessários são carregados ({scriptCount}/3)</p>
        </div>
      ) : (
        <div>
          <a-scene
            mindar-image="imageTargetSrc: /targets/target.mind; showStats: false; uiScanning: #scanning-ui; filterMinCF: 0.001; filterBeta: 0.01; missTolerance: 5;"
            embedded
            color-space="sRGB"
            renderer="colorManagement: true; physicallyCorrectLights: true; antialias: true;"
            vr-mode-ui="enabled: false"
            device-orientation-permission-ui="enabled: false"
          >
            <a-assets>
              <a-asset-item id="gelatiModel" src="/models/GELATI.glb"></a-asset-item>
            </a-assets>

            <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

            <a-entity mindar-image-target="targetIndex: 0">
              <a-gltf-model
                rotation="0 0 0"
                position="0 0 0.1"
                scale="0.5 0.5 0.5"
                src="#gelatiModel"
                animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear"
              ></a-gltf-model>
            </a-entity>
          </a-scene>

          <div id="scanning-ui" className="mindar-ui-scanning">
            <div className="inner">
              <div className="scanline"></div>
              <p style={{ color: 'white', fontSize: '20px', marginTop: '20px', backgroundColor: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '5px' }}>
                A procurar o marcador...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 