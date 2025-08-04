import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

interface AudioManagerProps {
  scene: 'chai-stall' | 'mandir';
}

export const AudioManager = ({ scene }: AudioManagerProps) => {
  const synthRef = useRef<Tone.Synth | null>(null);
  const noiseRef = useRef<Tone.Noise | null>(null);
  const filterRef = useRef<Tone.Filter | null>(null);
  const reverbRef = useRef<Tone.Reverb | null>(null);

  useEffect(() => {
    const initAudio = async () => {
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }

      // Initialize audio components
      synthRef.current = new Tone.Synth().toDestination();
      noiseRef.current = new Tone.Noise('brown');
      filterRef.current = new Tone.Filter(400, 'lowpass');
      reverbRef.current = new Tone.Reverb(3);

      // Chain for ambient sounds
      noiseRef.current.chain(filterRef.current, reverbRef.current, Tone.Destination);
    };

    initAudio();

    return () => {
      synthRef.current?.dispose();
      noiseRef.current?.dispose();
      filterRef.current?.dispose();
      reverbRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!noiseRef.current || !filterRef.current) return;

    // Stop any existing ambient sounds
    noiseRef.current.stop();

    if (scene === 'chai-stall') {
      // Chai stall ambient sounds
      filterRef.current.frequency.value = 300;
      noiseRef.current.volume.value = -25;
      noiseRef.current.start();
    } else if (scene === 'mandir') {
      // Mandir ambient sounds
      filterRef.current.frequency.value = 200;
      noiseRef.current.volume.value = -30;
      noiseRef.current.start();
    }
  }, [scene]);

  const playBellSound = () => {
    if (!synthRef.current) return;
    
    // Temple bell sound
    synthRef.current.triggerAttackRelease('C5', '2n');
    setTimeout(() => synthRef.current?.triggerAttackRelease('G4', '4n'), 100);
    setTimeout(() => synthRef.current?.triggerAttackRelease('E4', '8n'), 200);
  };

  const playChaiSound = () => {
    if (!synthRef.current) return;
    
    // Chai serving sound effect
    synthRef.current.triggerAttackRelease('A3', '8n');
    setTimeout(() => synthRef.current?.triggerAttackRelease('C4', '8n'), 50);
  };

  // Expose functions for parent components
  (window as any).playBellSound = playBellSound;
  (window as any).playChaiSound = playChaiSound;

  return null;
};