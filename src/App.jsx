import React, { useState, useCallback, useRef } from 'react';

// Constante pour l'URL de l'API (port 8001)
const API_BASE_URL = 'http://127.0.0.1:8001';

// Composant principal
const App = () => {
    // État du formulaire et du résultat
    const [text, setText] = useState("Bonjour. Ceci est un exemple de synthèse vocale avec la voix française FF Siwis. La vitesse peut être ajustée ci-dessous.");
    const [speakingRate, setSpeakingRate] = useState(1.0);
    const [audioUrl, setAudioUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const audioRef = useRef(null);

    // Nom de la voix par défaut pour l'affichage (correspond à VOIX_DEFAUT dans app.py)
    const defaultVoiceName = 'ff_siwis';
    const MAX_TEXT_LENGTH = 500;

    // --- 1. FONCTION DE GÉNÉRATION TTS ---
    const generateAudio = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        setAudioUrl('');

        try {
            const response = await fetch(`${API_BASE_URL}/tts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    text: text, 
                    voice: defaultVoiceName, 
                    speed: speakingRate 
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue du serveur.' }));
                throw new Error(`Échec de la génération audio (Code ${response.status}): ${errorData.error || errorData.message}`);
            }

            const audioBlob = await response.blob();
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);

            if (audioRef.current) {
                audioRef.current.src = url;
                audioRef.current.play();
            }

        } catch (err) {
            console.error(err);
            setError(`Erreur: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [text, speakingRate]);

    // --- 2. FONCTION DE TÉLÉCHARGEMENT ---
    const downloadAudio = () => {
        if (audioUrl) {
            const a = document.createElement('a');
            a.href = audioUrl;
            a.download = `synthese_${defaultVoiceName}_${new Date().getTime()}.wav`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <>
            {/* Global styles pour html, body et le root div */}
            <style id="global-styles">
                {`
                    html, body, #root {
                        height: 100%;
                        width: 100%; /* AJOUTÉ: Force la largeur à 100% sur les éléments racines */
                        margin: 0;
                        padding: 0;
                    }
                `}
            </style>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
                    
                    /* Global Styles */
                    .app-container {
                        min-height: 100vh;
                        width: 100%; /* MODIFIÉ: S'assure que le conteneur de l'application prend toute la largeur */
                        background-color: #1f2937; /* Gray 800 */
                        color: #f3f4f6; /* Gray 100 */
                        display: flex;
                        justify-content: center;
                        padding: 30px;
                        font-family: 'Inter', sans-serif;
                    }

                    .main-card {
                        width: 100%;
                        max-width: 600px; /* La carte reste centrée et limitée en largeur */
                        background-color: #111827; /* Gray 900 */
                        padding: 40px;
                        border-radius: 12px;
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
                        transition: all 0.3s ease;
                    }

                    /* Header */
                    .app-header {
                        margin-bottom: 30px;
                        border-bottom: 1px solid #374151; /* Gray 700 */
                        padding-bottom: 20px;
                    }
                    .app-title {
                        font-size: 2.5rem;
                        font-weight: 800;
                        color: #6366f1; /* Indigo 500 */
                    }
                    .app-subtitle {
                        margin-top: 5px;
                        font-size: 0.9rem;
                        color: #9ca3af; /* Gray 400 */
                    }

                    /* Textarea */
                    .textarea-group {
                        margin-bottom: 25px;
                    }
                    .text-label {
                        display: block;
                        font-size: 0.9rem;
                        font-weight: 600;
                        margin-bottom: 8px;
                        color: #d1d5db; /* Gray 300 */
                    }
                    .text-input {
                        width: 100%;
                        padding: 12px;
                        background-color: #374151; /* Gray 700 */
                        border: 1px solid #4b5563; /* Gray 600 */
                        border-radius: 8px;
                        transition: border-color 0.15s ease;
                        resize: vertical;
                        color: white;
                        min-height: 150px;
                    }
                    .text-input:focus {
                        outline: none;
                        border-color: #6366f1; /* Indigo 500 */
                    }

                    /* Controls */
                    .controls-box {
                        margin-bottom: 30px;
                        padding: 20px;
                        background-color: #1f2937; /* Gray 800 */
                        border-radius: 8px;
                        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
                    }
                    .speed-display {
                        font-size: 1.25rem;
                        font-weight: 700;
                        color: #818cf8; /* Indigo 400 */
                    }

                    /* Custom Range Slider Styling (for Webkit/Firefox) */
                    .range-input {
                        width: 100%;
                        height: 6px;
                        background: #4b5563; /* Gray 600 */
                        border-radius: 3px;
                        -webkit-appearance: none;
                        appearance: none;
                        cursor: pointer;
                        margin-top: 5px;
                    }
                    .range-input::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #6366f1; /* Indigo 500 */
                        cursor: pointer;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
                        transition: background 0.15s ease;
                    }
                    .range-input::-moz-range-thumb {
                        width: 20px;
                        height: 20px;
                        border: none;
                        border-radius: 50%;
                        background: #6366f1; /* Indigo 500 */
                        cursor: pointer;
                    }

                    /* Button */
                    .generate-button {
                        width: 100%;
                        padding: 12px 20px;
                        border: none;
                        border-radius: 8px;
                        font-weight: 700;
                        font-size: 1.125rem;
                        transition: all 0.2s ease;
                        color: white;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                        cursor: pointer;
                    }
                    .generate-button:not(:disabled) {
                        background-color: #4f46e5; /* Indigo 600 */
                    }
                    .generate-button:not(:disabled):hover {
                        background-color: #4338ca; /* Indigo 700 */
                        transform: translateY(-1px);
                    }
                    .generate-button:disabled {
                        background-color: #4b5563; /* Gray 600 */
                        color: #9ca3af; /* Gray 400 */
                        cursor: not-allowed;
                    }

                    /* Loading Spinner */
                    .loading-spinner {
                        border: 3px solid rgba(255, 255, 255, 0.3);
                        border-top: 3px solid #fff;
                        border-radius: 50%;
                        width: 16px;
                        height: 16px;
                        animation: spin 1s linear infinite;
                        margin-right: 8px;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    .loading-content {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    /* Result Area */
                    .result-area {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #374151; /* Gray 700 */
                    }
                    .result-box {
                        background-color: #1f2937; /* Gray 800 */
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }
                    .result-title {
                        font-size: 1.25rem;
                        font-weight: 600;
                        color: #a5b4fc; /* Indigo 300 */
                    }

                    /* Audio Player */
                    .audio-player {
                        width: 100%;
                        border-radius: 4px;
                        background: #4b5563; /* Gray 600 */
                    }

                    /* Download Button */
                    .download-button {
                        padding: 8px 15px;
                        border: none;
                        border-radius: 6px;
                        background-color: #6366f1; /* Indigo 500 */
                        color: white;
                        font-weight: 600;
                        transition: background-color 0.15s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                        cursor: pointer;
                    }
                    .download-button:hover {
                        background-color: #4f46e5; /* Indigo 600 */
                    }
                    .download-icon {
                        width: 18px;
                        height: 18px;
                    }

                    /* Error */
                    .error-message {
                        padding: 15px;
                        margin-bottom: 20px;
                        border-radius: 8px;
                        background-color: #991b1b; /* Red 800 */
                        color: white;
                        font-weight: 600;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    .error-icon {
                        width: 24px;
                        height: 24px;
                    }

                    /* Responsive Adjustments */
                    @media (max-width: 640px) {
                        .main-card {
                            padding: 20px;
                        }
                        .app-title {
                            font-size: 2rem;
                        }
                    }
                `}
            </style>
            
            <div className="app-container">
                <div className="main-card">
                    
                    {/* Header */}
                    <header className="app-header">
                        <h1 className="app-title">
                            Kokoro TTS Générateur
                        </h1>
                        <p className="app-subtitle">
                            Voix française.
                        </p>
                    </header>

                    {/* Zone de Saisie */}
                    <div className="textarea-group">
                        <label htmlFor="text-input" className="text-label">
                            Texte à Synthétiser ({text.length}/{MAX_TEXT_LENGTH} caractères)
                        </label>
                        <textarea
                            id="text-input"
                            className="text-input"
                            placeholder="Entrez votre texte ici (max 500 caractères)..."
                            rows="6"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            maxLength={MAX_TEXT_LENGTH}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Contrôles (Vitesse) */}
                    <div className="controls-box">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <label htmlFor="speed-slider" className="text-label" style={{ marginBottom: 0 }}>
                                Vitesse de Lecture
                            </label>
                            <span className="speed-display">
                                {speakingRate.toFixed(2)}x
                            </span>
                        </div>
                        <input
                            id="speed-slider"
                            type="range"
                            className="range-input"
                            min="0.5"
                            max="2.0"
                            step="0.05"
                            value={speakingRate}
                            onChange={(e) => setSpeakingRate(parseFloat(e.target.value))}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Bouton de Génération */}
                    <button
                        onClick={generateAudio}
                        disabled={isLoading || !text.trim()}
                        className="generate-button"
                    >
                        {isLoading ? (
                            <div className="loading-content">
                                <span className="loading-spinner"></span>
                                <span>Génération en cours...</span>
                            </div>
                        ) : (
                            `Générer l'Audio (Voix ${defaultVoiceName})`
                        )}
                    </button>

                    {/* Zone de Résultat et Erreur */}
                    <div className="result-area">
                        {error && (
                            <div className="error-message">
                                <svg xmlns="http://www.w3.org/2000/svg" className="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}
                        
                        {audioUrl && (
                            <div className="result-box">
                                <h2 className="result-title">Lecture Audio</h2>
                                
                                <audio ref={audioRef} controls src={audioUrl} autoPlay className="audio-player"></audio>
                                
                                <button 
                                    className="download-button" 
                                    onClick={downloadAudio}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="download-icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 11.586V3a1 1 0 112 0v8.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span>Télécharger l'Audio (.wav)</span>
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {/* Footer */}
                    <footer style={{ marginTop: '30px', paddingTop: '15px', borderTop: '1px solid #374151', textAlign: 'center', fontSize: '0.75rem', color: '#6b7280' }}>
                        Propulsé par Kokoro v0.19 et FastAPI.
                    </footer>
                </div>
            </div>
        </>
    );
};

export default App;
