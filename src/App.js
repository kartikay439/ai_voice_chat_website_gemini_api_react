// IMPORTING ALL MODULES
import mic from './assessts/microphone.png'
import g from './assessts/gemini.jpg'
import './css/lang.css'
import './css/App.css'
import React, {useEffect, useState} from 'react';
import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';

const {GoogleGenerativeAI} = require("@google/generative-ai");


// CREATING OBJECT
const speechConfig = speechsdk.SpeechConfig.fromSubscription(process.env.REACT_APP_SPEECH_KEY, process.env.REACT_APP_SPEECH_SERVER);
speechConfig.speechRecognitionLanguage = "hi-IN";
speechConfig.speechSynthesisLanguage = "hi-IN";
speechConfig.speechSynthesisVoiceName = "hi-IN-SwaraNeural"


// SPEECH TO TEXT
let audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
let recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);
// recognizer.setProperty(speechsdk.PropertyId.SpeechServiceConnection_EnhancedDictation,"true")


//  TEXT TO SPEECH
const audioConfig_TEXT_TO_SPEECH = speechsdk.AudioConfig.fromDefaultSpeakerOutput();
const speechSynthesizer = new speechsdk.SpeechSynthesizer(speechConfig, audioConfig_TEXT_TO_SPEECH);

//GOOGLE GEMINI


// REACT COMPONENT
const SpeechToText = () => {


    //USE STATE VARIABLES
    const [text, setText] = useState('');
    const [response, setResponse] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [input_, setInput] = useState('');
    const [s, setS] = useState(0);
    const [language, setLanguage] = useState("Hindi")
    const hindi = () => {
        recognizer.close();
        speechConfig.speechRecognitionLanguage = "hi-IN";

        recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);
        setLanguage("Hindi")

    }
    const english = () => {
        recognizer.close();
        speechConfig.speechRecognitionLanguage = "en-IN";
        setLanguage("English")
        recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    }
    const gujrati = () => {
        recognizer.close();
        speechConfig.speechRecognitionLanguage = "gu-IN";
        setLanguage("Gujrati")

        recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    }
    const marathi = () => {
        recognizer.close();
        speechConfig.speechRecognitionLanguage = "mr-IN";
        setLanguage("Marathi")
        recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    }


    const TextToSpeech = (ask) => {
        speechSynthesizer.speakTextAsync(ask, result => {
                if (result) {
                    setText("");
                    // speechSynthesizer.close();
                    return result.audioData;
                }
            }
            , error => {
                console.log(error);
                speechSynthesizer.close();
            }
        );
        //  speechSynthesizer.close();
        // startListening();
    };
    const startListening = () => {

        // setIsListening(false);
        setResponse("");
        setInput("");

        recognizer.recognized = (s, e) => {
            const result = e.result;
            if (result.reason === speechsdk.ResultReason.RecognizedSpeech) {
                const transcript = result.text;
                setText(transcript);
            }

        };
        recognizer.recognizing = (s, e) => {
            const result = e.result;
            if (result.reason === speechsdk.ResultReason.RecognizingSpeech) {
                const transcript = result.text;
                setText(transcript);
            }
        }

        recognizer.startContinuousRecognitionAsync(() => {
            setIsListening(true);
            setS(0);

        });

    };

    const stopListening = () => {
        recognizer.stopContinuousRecognitionAsync(function () {
            setResponse("")
            setIsListening(false);

            recognizer.pause();

        });

    };


    //GOOGLE GEMINI METHOD
    async function run(ask) {

        // setIsListening(false)
        const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);


        const model = genAI.getGenerativeModel({model: "gemini-pro"});
        const prompt = `${ask} in 20 words`;
        console.log(prompt);
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            setResponse(text);
            TextToSpeech(text);


        } catch (e) {
            console.log(e);
        }


    }




// interval
    useEffect(() => {
        const interval = setInterval(async () => {
            if (text !== '' && text !== undefined && text !== null && s !== 1) {

                setIsListening(false)
// await startListening();
                setInput(text);
                setText('');
                setS(1);

                recognizer.stopContinuousRecognitionAsync
                (function () {
                        // setIsListening(true);
                        recognizer.pause();


                    }
                );
                await run(text);


            }
            console.log(isListening);
            console.log(text);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });


    useEffect(() => {

        const refresh = setInterval(() => {

            if (input_ !== "" && response !== "") {
                setInput('');
                setResponse('');
            }
        }, 120000);

        return () => {
            clearInterval(refresh);
        };
    });


    return (
        <div className='App'>
            <img className="gem" src={g} alt='loading...'/>
            <div className='switch'>
                <button className='lang' onClick={hindi}>HINDI</button>
                <button className='lang' onClick={english}>ENGLISH</button>
                <button className='lang' onClick={gujrati}>GUJARATI</button>
                <button className='lang' onClick={marathi}>MARATHI</button>
                <p className='Show'>{language}</p>
            </div>


            <div className='block1'>
                <div className='response'>
                    <h1 className='reply'> 🤖REPLY!!</h1>
                    <br></br>
                    {response}

                </div>
                <p className='text'>{text}</p>
                <div className='bot'>
                    <button className='stop' onClick={stopListening}>
                        Clear
                    </button>
                    <p className='input'>{input_}</p>
                    <button className='start' onClick={startListening} disabled={isListening}>
                        <img src={mic} alt={'loading...'}/>
                    </button>
                </div>
                <h1 className='listening'>{isListening ? 'LISTENING...' : 'OFF...'}</h1>
            </div>
        </div>
    );
};

export default SpeechToText;
